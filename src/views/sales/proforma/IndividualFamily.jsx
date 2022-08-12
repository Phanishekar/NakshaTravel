import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Label,
    Input,
    Button,
    Spinner

  } from "reactstrap";
  import {country,currency,RegistrationType,Terms} from "./../../country/CountryList"
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import "assets/scss/pages/data-list.scss";
  import SingleSelect from "components/common/formBasic/singleSelect";
  import axios from "axios";
  import getall from "./details/InduvidualFamily";
  import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Icon from "react-feather";
  // let TripType=[
  //   {label:"One Way",value:"One Way"},
  //   {label:"Round Trip",value:"Round Trip"},
  //   {label:"Multi City",value:"Multi City"},];
    
  //   let BillingType=[
  //   {label:"Primary",value:"Primary"},
  //   {label:"Normal",value:"Normal"}
  //   ];

export default class CorporateEmployee extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      individual:[],
      customer_options:[],
      billing_type:'',
      trip_type:'',
      valueSet:false,
      IndividualDetails:[],
      FamilyDetails:[],
      PassengersValues: [{ name: "", id : "" }],
      individualPassport:'',
      individulPassport:''
     } 
   }
    
   async getDetailsTwo(id)
   {
    const all= await getall(id)
this.setState({
      valueSet:true,
      IndividualDetails:all.Individual[0].Details,
      individualPassport:all.Individual[2].Passport,
      individulPassport:all.Individual[1].Insurance,
      FamilyDetails:all
});

    console.log(this.state.FamilyDetails);
    this.setState({
     
    })
   }
  
   handleSubmit = (e) => {

    this.setState(
      {
        btnLoading:true,
      }
      );
    
    var formData = new FormData(document.querySelector("#dsr"));
    let i=0,Name=[],Data=[];
    for(var pair of formData.entries())
    {
      console.log(pair[0],pair[1]);
      Name[i]=pair[0];
      Data[i]=pair[1];
      i++;
    }

    for(var j=0;j<i;j++ )
    {
      formData.append(Name[i],Data[i]);
    }
      e.preventDefault();
      
    
      axios
      .post(`/api/dsr/save`, formData)
      .then((response) => {
      if (response.data.status == 200) {
      toast.success(response.data.Result); 
      this.props.history.push("/dsr");
      } else {
        this.setState(
          {
            uploading:false,
          }
          )
       
      toast.error("Please Check All feilds");
      console.log(response.data.Result);
      this.setState(
        {
          error:response.data.Result,
        }
        );
      }
      })
      .catch((error) => {
      toast.error("oops!..  someething wet Wrong");
      this.setState({ btnLoading: false });
      });
    
}  
   getValuesFn = (data) => {
     
    if (data.id == "customer_options") {

        
      this.setState({
        customer_options:data.value,

      });
      this.getDetailsTwo(data.value)
    }
    else if (data.id == "dsr_currency") {
      this.setState({
        dsr_currency:data.value,
      });
    }
    // else if (data.id == "billing_type") {

        
    //   this.setState({
    //     billing_type:data.value,

    //   });
    // }
    // else if (data.id == "trip_type") {

        
    //   this.setState({
    //     trip_type:data.value,

    //   });
    // }
  }
  async componentDidMount() {
    const res2 = await axios.get(`api/individualcustomer/getselect`);
    console.log(res2)
    this.setState({
      individual:res2.data.customer,
       
    })

   }
 render(){
let  options='';
options  = this.state.individual.map(function (corporate) {
     
  return {label:corporate.individual_name,value:corporate.individual_customer_id}
  
})
        

 return (
    
<div>
                  <Label>Select by Individual Name</Label>
                  <SingleSelect
     name="customer_options"
       options={options}    
       getValuesFn={this.getValuesFn}  
       selectedValue={this.state.customer_options}                 
/>
<Input name="type" value="ProForma"
hidden /> 
         
         <br /><br />  
         
         <div style={{display:"flex",justifyContent:"flex-end"}}>
                <Button.Ripple  color="info" type="submit"><b>Next</b> <Icon.ArrowRight /></Button.Ripple>
           </div>
</div>

 )
 }
  }


