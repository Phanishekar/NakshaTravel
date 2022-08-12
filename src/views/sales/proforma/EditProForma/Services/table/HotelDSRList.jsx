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
        HotelDSR:[],
        loading:true,
     } 
     this.deleteFlight=this.deleteFlight.bind(this)
   }

 

  async deleteFlight(e)
   {
    const resd= await axios.get(`/api/dsr/hotel/delete/${e.target.value}`);
    console.log(resd.data); 
    if(resd.data.status==200)
    {
    toast.warning("Deleted Succesfully")
    this.setState({
        loading:false
    });
    const x= await this.props.getdetails()
    console.log(x)
    this.setState({
        HotelDSR:x.HotelDSR,
        loading:false
    });
   }

}

   async componentDidMount() {
   let id=this.props.id;
    const x= await this.props.getdetails(id)
    console.log(x)
    this.setState({
        HotelDSR:x.HotelDSR,
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
      this.state.HotelDSR.map( (item) =>{
      
        return(
          <tr key={item.hotel_dsr_id}>
      
            <td>
              
              <b>{item.hotel_name}</b> <br/> <b>Booking Date:</b> {item.booking_date}   . <b>Room Number:</b> {item.room_number}<br />
               <b>Guest Names:</b>{item.guest_names} <br></br> <b>Meal Plan:</b> {item.meal_plan} , <br></br>  <b>Bed:</b> {item.bed} 
                ,   <b>Check In:</b>{item.start_date} ,  <b>Check Out:</b> {item.end_date} ,    <br></br> {item.total_days} <b>days</b>  ,{item.total_nights} <b>nights</b>  <br></br>
              
               </td>
            
            
            <td>{item.invoice_total}  {this.props.currency}</td>

            <td>
            <Button id='delete-passenger' type='button'  value={`${item.hotel_dsr_id}`} color='danger' onClick={this.deleteFlight}>Delete</Button>
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
  