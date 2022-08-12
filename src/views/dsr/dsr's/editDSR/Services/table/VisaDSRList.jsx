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
import axios from 'axios';
import { toast } from 'react-toastify';




export default class InsuranceDSRList extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
        VisaDSR:[],
        loading:true,
     } 
     this.deleteFlight=this.deleteFlight.bind(this)
   }

 

   async deleteFlight(e)
   {
    const resd= await axios.get(`/api/dsr/visa/delete/${e.target.value}`);
    console.log(resd.data); 
    if(resd.data.status==200)
    {
    toast.warning("Deleted Succesfully")
    this.setState({
        loading:false
    });
     this.getdetails()
   }

}

async getdetails()
{
  let id=this.props.id;
  const x= await this.props.getVisa(id)
  console.log(x)
  this.setState({
    VisaDSR:x.visaDSR,
      loading:false
  });
}

   async componentDidMount() {
this.getdetails()
    
}
  
 render(){
  
    var HTML_TABLE="";
    if(this.state.loading)
    {
      HTML_TABLE= <tr><td colSpan="3">....</td></tr>;
    }
    else{
      HTML_TABLE= 
      this.state.VisaDSR.map( (item) =>{
      
        return(
          <tr key={item.visa_dsr_id}>

            <td><b>{item.country}</b> <br/> <b>Name :</b> {item.passenger_names}  <br></br><b>Visa Number:</b> {item.visa_number} , <b>Visa Type:</b> {item.visa_type} .<br />
               <b>Issue Date:</b>{item.issue_date} <br></br> <b>Expiry Date:</b> {item.expiry_date} 
               </td>
            
            
            <td>{item.invoice_total}  {this.props.currency}</td>
            <td>
            <Button id='delete-passenger' type='button'  value={`${item.visa_dsr_id}`} color='danger' onClick={this.deleteFlight}>Delete</Button>
            </td>
          </tr>
        )
      })
    }
   
 return (
    

    <React.Fragment>
       
        
        {HTML_TABLE}
    
    </React.Fragment>
 )
 }
  }
  