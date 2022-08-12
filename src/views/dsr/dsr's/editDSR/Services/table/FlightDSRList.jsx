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



export default class FlightDSRList extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      FlightDSR:[]
     } 
     this.deleteFlight=this.deleteFlight.bind(this)
   }
  async deleteFlight(e)
   {
    const resd= await axios.get(`/api/dsr/flight/delete/${e.target.value}`);
    console.log(resd.data); 
    if(resd.data.status==200)
    {
    toast.warning("Deleted Succesfully")
    const x= await this.props.getFlightdetails()
    console.log(x)
    this.setState({
      FlightDSR:x.FlightDSR,
        loading:false
    });
   }

}
   async componentDidMount() {
    let id=this.props.id;
    const x= await this.props.getFlightdetails(id)
    console.log(x)
    this.setState({
      FlightDSR:x.FlightDSR,
        loading:false
    });

   
   }
  
 render(){
  
    var HTML_TABLE="";
    if(this.state.loading)
    {
      HTML_TABLE= <tr><td colSpan="3">....</td></tr>;
    }
    else{
      HTML_TABLE= 
      this.state.FlightDSR.map( (item) =>{
      
        return(
          <tr key={item.flightdsr_id}>
           
            <td><b>{item.airLine}</b> <br/> <b>Passengers:</b> {item.passenger_names}   . <b>Route:</b> {item.route}<br />
               <b>Tcket Number:</b>{item.ticket_number} ,  <b>PNR Number:</b> {item.PNR_number} ,   <b>GDS Portal:</b> {item.GDS_portal}</td>
            
            
            <td>{item.invoice_amount} {this.props.currency}</td>
            <td>
            <Button id='delete-passenger' type='button'  value={`${item.flight_dsr_id}`} color='danger' onClick={this.deleteFlight}>Delete</Button>
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