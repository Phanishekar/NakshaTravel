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
  import {country,currency,RegistrationType,Terms} from "./../../../../country/CountryList"
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import "assets/scss/pages/data-list.scss";
  import SingleSelect from "components/common/formBasic/singleSelect";
  import axios from "axios";
  import getall from "../../../dsr's/details/InduvidualFamily";
  import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles.css";
var ind_id=0;
export default class PassengerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      passengers:[],
      family:[],
      mice_id	:this.props.id,
      mice_family_id:this.props.fId,
      is_it_unique:'',
      passenger_id:'',
     } 
     this.handleSubmit =this.handleSubmit.bind(this);
     this.deletePasenger =this.deletePasenger.bind(this);
   }

   async deletePasenger(e)
   {
    const res3=await axios.get(`/api/mice/deletePassenger/${e.target.value}`);
    
  this.getPassengers();
   }
   async getPassengers()
   {
    let res=await axios.get(`/api/mice/getAllPassengers/${this.props.id}/${this.props.fId}`)
    console.log(res.data);
    await this.setState({
      passengers: res.data.mice,
      loading:false,
      ind_id:0,
     
    })
   }
  async componentDidMount() {
   this.getPassengers();

    const res2=await axios.get(`/api/individualfamily/getfamily/${this.props.emp}`);
    this.setState({
      family:res2.data.customerfamily
  });
  }
  getValuesFn = (data) => {
     
    if (data.id == "passenger_id") {
      this.setState({
        passenger_id:data.value,
        is_it_unique:this.props.id+this.props.fId+data.value,
      });
    }
  

  }; 

  handleSubmit = (e) => {
    this.setState(
      {
        btnLoading:true,
        
      }
      );
      
    
      e.preventDefault();
    
      axios
      .post(`/api/mice/savePassenger`, this.state)
      .then((response) => {
        console.log(response.data)
        if (response.data.status ==200) {
          toast.success(response.data.Result);
          this.getPassengers();
            
        } else {
          toast.error("Selected Member is alredy Added or May it is Null");
          this.setState(
            {
              error:response.data.Result,
              btnLoading:false,
              loading:false
            
            }
            
            );
            console.log(response.data.messages);
        }
      })
      .catch((error) => {
        toast.error("Cant Add This record");
        this.setState(
          {
            btnLoading:false,
          }
          );
        
      });

     
   
      

    
    
} 

 render(){
  var options="";
  options  = this.state.family.map(function (corporate) {
     
    return {label:corporate.individual_family_name,value:corporate.individual_customer_family_id}
    
  })
 
 
  var HTML_TABLE="",i="";
  if(this.state.loading)
  {
    HTML_TABLE= <tr><td colSpan="3"><h2>....</h2></td></tr>;
  }
  else{
    HTML_TABLE= 
    this.state.passengers.map( (item,i) =>{
      i++;
      let dle=item.head,btn=''
      if(dle=='YES')
          {
           btn= <span style={{opacity:0.8,color:'red'}}>Family Head</span>
            
          }
          else
          {
            btn=<Button id='delete-passenger' type='button'  value={`${item.mice_passengers_id}`} color='danger' onClick={this.deletePasenger}>Delete</Button>
          }
      return(
        <tr key={item.mice_pasenger_id}>
          <td>{i}</td>
          <td><b>Name:</b>{item.passenger_name} <br/><b>E-mail:</b>{item.passenger_email} <br />
          <b>Phone Number:</b>{item.passenger_phone}</td>
          
          
          <td>
          {btn}
          </td>
        </tr>
      )
    })
  }

 return (
    

    <React.Fragment>
<Card>
  <CardHeader><CardTitle><b>Family-{this.props.fId}</b> Passenger List</CardTitle></CardHeader>
  <CardBody>

  <form onSubmit={this.handleSubmit} id="passenger">
        <Input name="mice_id"  hidden></Input>
        <Input name="mice_family_id"  hidden></Input>
        <Input name="is_it_unique"  hidden></Input>
        <Row>

        <Col lg='6'>
                <Label>Add Passengers </Label> 

                <SingleSelect 
                name="passenger_id"
                options={options}    
                getValuesFn={this.getValuesFn}  
                selectedValue={this.state.passenger_id}  />
            </Col>
            <Col lg='6'>
            <Label></Label> <br />
               <Button color="primary" type="submit">ADD</Button>
            </Col> 
        </Row>
            </form>

            <br></br>
  <table id="customers">
        <tr>
        <th>Sl No</th>
        <th>Passenger Detail</th>
        <th>Delete</th>
        </tr>
        {HTML_TABLE}
        </table>
  </CardBody>
  </Card>

          </React.Fragment>
 )
 }
  }


