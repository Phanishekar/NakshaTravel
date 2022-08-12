import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Button,
    Label,
    Input,
    FormGroup,
  } from "reactstrap";
  import "assets/scss/pages/data-list.scss";
  import SingleSelect from "components/common/formBasic/singleSelect";
import axios from 'axios';
import * as Icon from "react-feather";
import   "./style.css"
import { toast } from 'react-toastify';


export default class DsrEdit extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      email:'',
      phone_number:'',
      addres:'',
      addres2:'',
      city:'',
      state:'',
      country:'',
      pincode:'',
      customer_name:'',
      DSR:'',
      passengers:[],
      individual:[],
      customer_options:'',
      loading:true
     } 
     this.getDetails=this.getDetails.bind(this);
     this.deletePasenger=this.deletePasenger.bind(this);
     this.handleSubmit =this.handleSubmit.bind(this);
   }

   async deletePasenger(e)
   {
   
   var ids=e.target.value

const result= await axios.get(`/api/dsr/delete/${ids}`);
console.log(result.data);
if(result.data.Result=='success')
{
    toast.warning('Deleted Sucesfully')
    
    this.getDetails();
}


console.log(result.data.status);
   }
  

   async getDetails()
   {

    
    
    let id=this.props.id;
    const res= await axios.get(`/api/dsr/getById/${id}`);
    console.log(res.data); 
    if(res.data.status==200)
    {
    this.setState({
        DSR:res.data.dsr[0],
        
    });

    console.log(this.state.passengers)
    }
    if(res.data.passenger)
    {
      this.setState({
        passengers:res.data.passenger,
       
      });
    }
    if(res.data.dsr[0].customer_type=="Individual")
    {
      const res2=await axios.get(`api/individualcustomer/getselect`);
      this.setState({
       
        individual:res2.data.customer,
       
    });
    console.log(res.data.dsr[0].customer_id)
    }
    else if(res.data.dsr[0].customer_type=="Corporate")
    {
      const res2=await axios.get(`api/corporatecustomer/getselect`);
      this.setState({
       
        individual:res2.data.customer,
        
    });
    }
   }
   async componentDidMount() {
this.getDetails();
this.setState({
  loading:false
})

let id=this.props.id;
    const res= await axios.get(`/api/dsr/getById/${id}`);
    console.log(res.data); 
    if(res.data.status==200)
    {
    await this.setState({
        customer_name:res.data.dsr[0].customer_id,
      email:res.data.dsr[0].email,
      phone_number:res.data.dsr[0].phone_number,
      addres:res.data.dsr[0].addres1,
      addres2:res.data.dsr[0].addres2,
      city:res.data.dsr[0].city,
      state:res.data.dsr[0].state,
      country:res.data.dsr[0].country,
      pincode:res.data.dsr[0].pincode,
        
    });
    console.log(this.state.customer_name); 
  }

   }
   handleSubmit = (e) => {
    this.setState(
      {
        btnLoading:true,
        
      }
      );
      
    var formData = new FormData(document.querySelector("#passenger"));
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
      .post(`/api/dsr/addPassenger`, formData)
      .then((response) => {
        console.log(response.data)
        if (response.data.status ==200) {
          toast.success(response.data.Result);
          this.getDetails()
            
        } else {
          toast.error("Please Upload Valid Details");
          this.setState(
            {
              error:response.data.Result,
              btnLoading:false,
                loading:false
            
            }
            );
        }
      })
      .catch((error) => {
        toast.error(error.data.Result);
        this.setState(
          {
            btnLoading:false,
          }
          );
        
      });
 
}   
getValuesFn = (data) =>
  {
     
    if (data.id == "customer_name") {
      this.setState({
        customer_name:data.value,
      
      });
      this.setAddres(data.value)
    }


  }; 

  async setAddres(id)
  {
    const res= await axios.get(`/api/corporatecustomer/getById/${id}`);
    this.setState({
      email:res.data.customer.company_email,
      phone_number:res.data.customer.company_phone_number,
      country:res.data.customer.company_shipping_country, 
      state:res.data.customer.company_shipping_state, 
      city:res.data.customer.company_shipping_city,
      addres :res.data.customer.company_shipping_addres,
      addres2 :res.data.customer.company_shipping_addres_2,
      pincode:res.data.customer.company_shipping_city_pincode,
    })
   
  }
 render(){
  let currency=[];
  let  options=[];

  if(this.state.DSR.customer_type=="Individual")
  {
   
options  = this.state.individual.map(function (corporate) {
     
  return {label:corporate.individual_name,value:corporate.individual_customer_id}
  
})
  }
 else if(this.state.DSR.customer_type=="Corporate")
  {
    
options  = this.state.individual.map(function (corporate) {
     
  return {label:corporate.company_name,value:corporate.corparate_customer_id}
  
})
  }

   
 return (
    

    <React.Fragment>
 
        <Row>
        <Col lg='12'>
                <b>ProForma Number:</b> P-{this.state.DSR.dsr_number}
            </Col>
           
        </Row>
        <br></br>
        <Row>
       
            <Col lg='6'>
                {/* <b>Customer Name:</b> {this.state.DSR.customer_name} */}
                <FormGroup>
                <Label for="customer_name">Customer Name</Label> <br />
                        <SingleSelect  
                               name="customer_name"
                               options={options}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.customer_name}
                               >
                             
                        </SingleSelect >
                      </FormGroup>
            </Col>
        </Row>
        <br></br>
        <Row>
        <Col lg='6'>
                <b>Email:</b> {this.state.email}<br/>
                <br/>
                <b>Phone Number:</b> {this.state.phone_number}
            </Col>
            <Col lg='6'>
                <b>Billing Addres:</b>  {this.state.addres},{this.state.addres2}<br/>
                {this.state.city},{this.state.state},{this.state.country}<br/>
                pincode-{this.state.pincode}
            </Col>
        </Row>
        <br /><br />
        
        <Row>
                <Col lg="6" >
                  <FormGroup >
                    <Label for="estimate_date">Estimate Date</Label>
                    <Input 
                      name="estimate_date"
                      type='date'
                      value={this.state.company_registration_number}
                      onChange={this.handleChange} />
                  </FormGroup>
                </Col>

                <Col lg="6" >
                  <FormGroup >
                    <Label for="expiry_date">Expiry Date</Label>
                    <Input name="expiry_date"
                      type='date'
                      value={this.state.company_registration_number}
                      onChange={this.handleChange} >
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
    
    

    </React.Fragment>
 )
 }
  }