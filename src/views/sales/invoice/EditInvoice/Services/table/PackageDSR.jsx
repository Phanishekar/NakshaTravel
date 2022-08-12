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




export default class PackageDSR extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
        packageDSR:[],
        loading:true,
     } 
     this.deleteFlight=this.deleteFlight.bind(this)
   }

 

  async deleteFlight(e)
   { 
    const resd= await axios.get(`/api/dsr/package/delete/${e.target.value}`);
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
  //   let id=this.props.id;
  //   const res= await axios.get(`/api/dsr/package/getAll`);
  //   console.log(res.data); 

  //   if(res.data.status==200)
  //   {
  //   this.setState({
  //       packageDSR:res.data.result,
  //       loading:false
  //   });

  //  }
  let id=this.props.id;
  const x= await this.props.getPackagedetails(id)
    console.log(x)
    this.setState({
      packageDSR:x.PackageDSR,
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
      this.state.packageDSR.map( (item) =>{
      
        return(
          <tr key={item.hotel_dsr_id}>
  


            <td><b>{item.package_type}</b>  <b>Destination:</b> {item.destination}  <br />
               <b>Passengers Names:</b>{item.passengers} <br></br> <b>Start Date:</b>{item.start_date} ,  <b>End Date:</b> {item.end_date} 
                ,  <br></br> {item.number_adult} <b>Adult</b>  ,{item.number_children} <b>children</b>  <br></br>
               </td>
            
            
            <td>{item.invoice_total}  {this.props.currency}</td>
            <td>
            <Button id='delete-passenger' type='button'  value={`${item.package_dsr_id}`} color='danger' onClick={this.deleteFlight}>Delete</Button>
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
  