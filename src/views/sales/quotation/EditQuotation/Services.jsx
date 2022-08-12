import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Label,
  Row,
  Col,
  Spinner,
  Input,
  Table,
  Pagination
} from "reactstrap";
import { NavLink, Link, useParams } from "react-router-dom";
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import { toast } from "react-toastify";
import axios from "axios";
import Select from 'react-select'
import * as Icon from "react-feather";
import AddHotel from "./Services/AddHotel";
import AddFlight from './Services/AddFlight';
import Visa from './Services/Visa';
import Insurance from './Services/Insurance';
import Others from './Services/Others';
import ADDPackage from './Services/ADDPackage';
import SingleSelect from 'components/common/formBasic/singleSelect';
import FlightDSRList from './Services/table/FlightDSRList';
import HotelDSRList from './Services/table/HotelDSRList';
import PackageDSR from "./Services/table/PackageDSR";
import InsuranceDSRList from './Services/table/InsuranceDSRList';
import VisaDSRList from './Services/table/VisaDSRList';
import OtherDSRList from './Services/table/OtherDSRList';
import "./style.css"
const selectFormOption = [
  { value: 'Others', label: 'Others' },
  { value: 'Hotel', label: 'Hotel' },
  { value: 'Package', label: 'Package' },
  { value: 'Flight', label: 'Flight' },
  { value: 'Visa', label: 'Visa' },
  { value: 'Insurance', label: 'Insurance' },
]





let lodform = false;
let readAdd='';
export default class Services extends Component {

  constructor(props) {
    super(props);
    this.state = {

      ledger: [],
      customer: "",
      loading: true,
      selectedForm: '',
      selectitem: false,
      loadingtable:true
      
    };
    this.initialState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.submitFlight = this.submitFlight.bind(this);
    this.submitPackage = this.submitPackage.bind(this);
    this.submitVisa = this.submitVisa.bind(this);
    this.submitInsurance = this.submitInsurance.bind(this);
    this.submitOthers  = this.submitOthers .bind(this);
 
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value });
  }

  getValuesFn = (data) => {
     
    if (data.id == "selectedForm") {
      this.setState({
        selectedForm:data.value,
        loading: false,
      });
    }
   
  
  }; 
  async  getdetails(id){
   
        const res= await axios.get(`/api/dsr/hotel/getAll/${id}`);
    console.log(res.data); 
    if(res.data.status==200)
    
    {
    
return {status:res.data.status,HotelDSR:res.data.result};

}
else
  {
    return {status:500,Hotel:"error Occured pls try again later"};
  }
  }

  async  getFlightdetails(id){
    const res2= await axios.get(`/api/dsr/flight/getAll/${id}`);
    console.log(res2.data); 
//     if(res.data.status==200)
//     {
//     this.setState({
//         FlightDSR:res.data.result,
        
//     });

// }
if(res2.data.status==200)
    
{

return {status:res2.data.status,FlightDSR:res2.data.result};

}
else
{
return {status:500,Hotel:"error Occured pls try again later"};
}
  }
  async  getPackagedetails(id){
    const res2= await axios.get(`/api/dsr/package/getAll/${id}`);
    console.log(res2.data); 
//     if(res.data.status==200)
//     {
//     this.setState({
//         FlightDSR:res.data.result,
        
//     });

// }
if(res2.data.status==200)
    
{

return {status:res2.data.status,PackageDSR:res2.data.result};

}
else
{
return {status:500,Packag:"error Occured pls try again later"};
}
  }

  async getVisa(id)
  {
    const res2= await axios.get(`/api/dsr/visa/getAll/${id}`);
    console.log(res2.data); 
//     if(res.data.status==200)
//     {
//     this.setState({
//         FlightDSR:res.data.result,
        
//     });

// }
if(res2.data.status==200)
    
{

return {status:res2.data.status,visaDSR:res2.data.result};

}
else
{
return {status:500,visa:"error Occured pls try again later"};
}

  }

  async getInsurance(id)
  {
    const res2= await axios.get(`/api/dsr/insurance/getAll/${id}`);
    console.log(res2.data); 
//     if(res.data.status==200)
//     {
//     this.setState({
//         FlightDSR:res.data.result,
        
//     });

// }
if(res2.data.status==200)
    
{

return {status:res2.data.status,InsuranceDSR:res2.data.result};

}
else
{
return {status:500,Insurance:"error Occured pls try again later"};
}
  }
  async getOther(id)
  {
   
    const res2= await axios.get(`/api/dsr/other/getAll/${id}`);
    console.log(res2.data); 

if(res2.data.status==200)
    
{

return {status:res2.data.status,OtherDSR:res2.data.result};

}
else
{
return {status:500,Other:"error Occured pls try again later"};
}
  }


 

  SelectForm(event) {
    console.log("Select Form")
    this.setState({
      loading: false,
      selectedForm: event.target.value
    });

  }

submit(data)
{
  this.setState({
    loadingtable: true,
  });
  axios.post(`api/dsr/hotel/save`,data)
  .then((response) => {
    if (response.data.status == 200) {
      toast.success(response.data.Result);
      this.setState({
        loadingtable: false,
        loading :true
      });
    }
     else {
      toast.error(response.data.Result);
    }
  })
  .catch((error) => {
    toast.error(error.Result);
  });
  
}

submitFlight(dataFlight)
{
  this.setState({
    loadingtable: true,
  });
  axios.post(`api/dsr/flight/save`,dataFlight)
  .then((response) => {
    if (response.data.status == 200) {
      toast.success(response.data.Result);
      this.setState({
        loadingtable: false,
        loading :true
      });
     
    }
     else {
      toast.error(response.data.Result);
    }
  })
  .catch((error) => {
    toast.error(error.Result);
  });
}
async submitPackage(dataPackage)
{
  await this.setState({
    loadingtable: true,
  });
  axios.post(`api/dsr/package/save`,dataPackage)
  .then((response) => {
    if (response.data.status == 200) {
      toast.success(response.data.Result);
      this.setState({
        loadingtable: false,
        loading :true
      });
     
    }
     else {
      toast.error(response.data.Result);
    }
  })
  .catch((error) => {
    toast.error(error.Result);
  });
}
async submitVisa (dataVisa)
{
  await this.setState({
    loadingtable: true,
  });
  axios.post(`api/dsr/visa/save`,dataVisa)
  .then((response) => {
    if (response.data.status == 200) {
      toast.success(response.data.Result);
      this.setState({
        loadingtable: false,
        loading :true
      });
     
    }
     else {
      toast.error(response.data.Result);
    }
  })
  .catch((error) => {
    toast.error(error.Result);
  });
 
}
async submitInsurance (dataInsurance)
{
  await this.setState({
    loadingtable: true,
  });
  axios.post(`api/dsr/insurance/save`,dataInsurance)
  .then((response) => {
    if (response.data.status == 200) {
      toast.success(response.data.Result);
      this.setState({
        loadingtable: false,
        loading :true
      });
     
    }
     else {
      toast.error(response.data.Result);
    }
  })
  .catch((error) => {
    toast.error(error.Result);
  });
}
async submitOthers (dataOthers)
{
  await this.setState({
    loadingtable: true,
  });
  axios.post(`api/dsr/other/save`,dataOthers)
  .then((response) => {
    if (response.data.status == 200) {
      toast.success(response.data.Result);
      this.setState({
        loadingtable: false,
        loading :true
      });
     
    }
     else {
      toast.error(response.data.Result);
    }
  })
  .catch((error) => {
    toast.error(error.Result);
  });
}

componentDidMount()
{
  this.setState({
    loadingtable:false,
  })
}

  render() {

var hotel='';
var Flight="";
var Package='';
var visa='';
var insurance='';
var other='';
if(this.state.loadingtable){
  hotel='...';
  Flight="....";
  Package='';
}
else {
  hotel=<HotelDSRList id={this.props.id} currency={this.props.currency} getdetails={this.getdetails}></HotelDSRList>;
  Flight=<FlightDSRList id={this.props.id} currency={this.props.currency}  getFlightdetails={this.getFlightdetails}></FlightDSRList>;
  Package=<PackageDSR id={this.props.id} currency={this.props.currency} getPackagedetails={this.getPackagedetails}></PackageDSR>;
  visa=<VisaDSRList id={this.props.id} currency={this.props.currency}  getVisa={this.getVisa}></VisaDSRList>;
  insurance=<InsuranceDSRList  id={this.props.id} currency={this.props.currency} getInsurance={this.getInsurance}></InsuranceDSRList>;
  other=<OtherDSRList  id={this.props.id} currency={this.props.currency} getOther={this.getOther} ></OtherDSRList>
}
    var user_HTML_TABLE = "";
    if (this.state.loading == true) {
      user_HTML_TABLE = <tr><td colSpan="5">No Form Selected</td></tr>;
    }
    else {

      if (this.state.selectedForm == 'Hotel') {
        user_HTML_TABLE = <AddHotel id={this.props.id} cID={this.props.cID} Ctype={this.props.Ctype} currency={this.props.currency} submit={this.submit} />
      }
      else if (this.state.selectedForm == 'Flight') {
        user_HTML_TABLE = <AddFlight id={this.props.id} cID={this.props.cID} Ctype={this.props.Ctype}  currency={this.props.currency} submitFlight={this.submitFlight} />
      }
      else if (this.state.selectedForm == 'Visa') {
        user_HTML_TABLE = <Visa id={this.props.id} cID={this.props.cID} Ctype={this.props.Ctype}  currency={this.props.currency} submitVisa={this.submitVisa}/>
      }
      else if (this.state.selectedForm == 'Insurance') {
        user_HTML_TABLE = <Insurance  id={this.props.id} cID={this.props.cID} Ctype={this.props.Ctype}  currency={this.props.currency}  submitInsurance={this.submitInsurance}/>
      }
      else if (this.state.selectedForm == 'Others') {
        user_HTML_TABLE = <Others id={this.props.id}  cID={this.props.cID} Ctype={this.props.Ctype}  currency={this.props.currency} submitOthers={this.submitOthers}  />
      }
      else if (this.state.selectedForm == 'Package') {
        user_HTML_TABLE = <ADDPackage id={this.props.id} cID={this.props.cID} Ctype={this.props.Ctype}  currency={this.props.currency} submitPackage={this.submitPackage}/>
      }


    }


    return (<React.Fragment>
     
     
          <form onSubmit={this.handleSubmit} id="services" >

<Row>
              <Col >
                <FormGroup>
                  <Label for='add_service'>Select & ADD Services</Label> <br />

                  <SingleSelect
                  name="selectedForm"
                  selectedValue={this.state.selectedForm}
                  options={selectFormOption}
                  getValuesFn={this.getValuesFn}
                  />
<br/>
                  {user_HTML_TABLE}
                 
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <br/>
            <table id="customers" >
        <tr>
        <th>Service Or Item Detail</th>
        <th >Total Amount</th>
        <th>Delete</th>
        </tr>
        <br/> <br/>
        {Flight}
        {hotel}
        {Package}
        {visa}
        {insurance}
        {other}
        </table>
           
          </form>
        
      <br/> <br/>
    </React.Fragment>
    );
  }
}









