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
    Input

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
      tabEdit:'nav-link active',
      tabService:'nav-link',
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
      const res2=await axios.get(`/api/individualfamily/getfamily/${res.data.dsr[0].customer_id}`);
      this.setState({
       
        individual:res2.data.customerfamily
    });
    console.log(res.data.dsr[0].customer_id)
    }
    else if(res.data.dsr[0].customer_type=="Corporate")
    {
      const res2=await axios.get(`/api/corporatecustomer/getallEmployees/${res.data.dsr[0].customer_id}`);
      this.setState({
       
        individual:res2.data.customer
    });
    }
   }
   async componentDidMount() {
this.getDetails();
this.setState({
  loading:false
})

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
toggleActice=(e)=>{

  e.preventDefault();
    
      axios
      .post(`/api/dsr/makeIvoice`, this.state.DSR)
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
   getValuesFn = (data) => {
     
    if (data.id == "customer_options") {
      this.setState({
        customer_options:data.value,

      });
    }
  

  }; 
 render(){
  let  options=[];

  if(this.state.DSR.customer_type=="Individual")
  {
   
options  = this.state.individual.map(function (corporate) {
     
  return {label:corporate.individual_family_name,value:corporate.individual_customer_family_id}
  
})
  }
 else if(this.state.DSR.customer_type=="Corporate")
  {
    
options  = this.state.individual.map(function (corporate) {
     
  return {label:corporate.individual_name,value:corporate.individual_customer_id}
  
})
  }

    var HTML_TABLE="",i="";
    if(this.state.loading)
    {
      HTML_TABLE= <tr><td colSpan="3"><h2>....</h2></td></tr>;
    }
    else{
      HTML_TABLE= 
      this.state.passengers.map( (item,i) =>{
        i++;
        return(
          <tr key={item.dsr_pasenger_id}>
            <td>{i}</td>
            <td><b>Name:</b>{item.passenger_name} <br/><b>E-mail:</b>{item.passenger_email} <br />
            <b>Phone Number:</b>{item.passenger_phone}</td>
            
            
            <td>
            <Button id='delete-passenger' type='button'  value={`${item.dsr_passenger_id}`} color='danger' onClick={this.deletePasenger}>Delete</Button>
            </td>
          </tr>
        )
      })
    }
   
 return (
    

    <React.Fragment>
   <Card>
    <CardHeader><CardTitle>DSR Customer & Passenger</CardTitle></CardHeader>
    <CardBody>
    <div style={{display:"flex",justifyContent:"flex-end"}}>
                  {this.state.DSR.type=="DSR"?<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-outline-info'>{this.state.DSR.type}</Button>:<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-outline-dark'>{this.state.DSR.type}</Button>} </div>
        <Row>
        <Col lg='12'>
                <b>DSR Number:</b> DSR-{this.state.DSR.dsr_number}
            </Col>
           
        </Row>
        <br></br>
        <Row>
        <Col lg='6'>
                <b>Customer Type:</b> {this.state.DSR.customer_type}
            </Col>
            <Col lg='6'>
                <b>Customer Name:</b> {this.state.DSR.customer_name}
            </Col>
        </Row>
        <br></br>
        <Row>
        <Col lg='6'>
                <b>Email:</b> {this.state.DSR.email}<br/>
                <b>Phone Number:</b> {this.state.DSR.phone_number}
            </Col>
            <Col lg='6'>
                <b>Billing Addres:</b>  {this.state.DSR.addres1},{this.state.DSR.addres2}<br/>
                {this.state.DSR.city},{this.state.DSR.state},{this.state.DSR.country}<br/>
                pincode-{this.state.DSR.pincode}
            </Col>
        </Row><br /><br />
        <form onSubmit={this.handleSubmit} id="passenger">
        <Input name="dsr_number" value={this.state.DSR.dsr_number} hidden></Input>
        <Input name="customer_type" value={this.state.DSR.customer_type} hidden></Input>
        <Input name="is_unique" value={this.state.DSR.dsr_number+this.state.DSR.customer_type+this.state.customer_options} hidden></Input>
        <Row>

        <Col lg='6'>
                <Label>Add Passengers </Label> 

                <SingleSelect 
                name="customer_options"
                options={options}    
                getValuesFn={this.getValuesFn}  
                selectedValue={this.state.customer_options}  />
            </Col>
            <Col lg='6'>
            <Label></Label> <br />
               <Button color="primary" type="submit">ADD</Button>
            </Col> 
        </Row>
            </form>
        <hr />
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