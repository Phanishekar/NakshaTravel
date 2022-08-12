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




export default class OtherDSRList extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
         OtherDSR:[],
        loading:true,
     } 
     this.deleteFlight=this.deleteFlight.bind(this)
   }

 

   async deleteFlight(e)
   {
    const resd= await axios.get(`/api/dsr/other/delete/${e.target.value}`);
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
  const x= await this.props.getOther(id)
  console.log(x)
  this.setState({
     OtherDSR:x. OtherDSR,
      loading:false
  });
}

   async componentDidMount() {
this.getdetails()
   
}
  
 render(){
  
    var HTML_TABLE="";
    var HTML_Label="";
    if(this.state.OtherDSR!='')
    {
      HTML_Label=
      <div>
        <h5><u>Other Items</u></h5>
        </div>;
    }
    if(this.state.loading)
    {
      HTML_TABLE= <tr><td colSpan="3">....</td></tr>;
    }
    else{
      HTML_TABLE= 
      this.state.OtherDSR.map( (item) =>{
      
        return(
          <tr key={item.visa_dsr_id}>

            <td><b>{item.item_details}</b> <br/> <b>Quantity :</b> {item.quantity} {item.quantity_unit} 
               </td>
            
            
            <td>{item.total}  {this.props.currency}</td>
            <td>
            <Button id='delete-passenger' type='button'  value={`${item.other_dsr_id}`} color='danger' onClick={this.deleteFlight}>Delete</Button>
            </td>
          </tr>
        )
      })
    }
   
 return (
    

    <React.Fragment>  
      {HTML_Label}
   
        {HTML_TABLE}
     
    </React.Fragment>
 )
 }
  }
  