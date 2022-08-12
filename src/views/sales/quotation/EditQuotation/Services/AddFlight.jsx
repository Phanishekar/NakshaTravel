import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label,Col,Row } from 'reactstrap'
import Select from 'react-select'
import axios from 'axios';
import SingleSelect from "components/common/formBasic/singleSelect";
import {tax} from "../../../../country/CountryList"
import { toast } from 'react-toastify';
var option=[];
var tripType=[{label:"One Way",value:"One Way"},
{label:"Round Trip",value:"Round Trip"},
{label:"Multi City",value:"Multi City"}]
export default class AddFlight extends Component {
  constructor(props) {
    super(props);
  this.state = {
    dsr_type:"Quotation",
    dsr_number:this.props.id,
    airLine:'',
    travel_date:"",
    passenger_names:[],
    GDS_portal:"",
    trip_type:"",
    ticket_number:"", 
    route:"",
    supplier_id:'',
    supplier_name:'',
    PNR_number:"",
    passenger:[],
    tax:0,
    fare_charge:0,
    ipp:0,
    invoice_amount:0,
    supplier_service_charge:0,
    supplier_total:'',
    total:'',
    price:0,
    retain:0,
    supplier:'',
    currency:'',
    selectPassenger:[],
    selectsupplier:[],
    selectAirLine:[],
    selectFamily:[]
   
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmitFlight = this.handleSubmitFlight.bind(this);
}


getpassengers = (e) => {
  console.log(e)
  
this.setState({

  passenger_names:(Array.isArray(e)?e.map(x=>x.value):[]),

});

}

getValuesFn = async(data) => {
     
   if(data.id == "trip_type")
 {
   
   this.setState({

     trip_type:data.value
 
   });

 }

 else if(data.id == "tax")
 {
 
  await this.setState({

     tax:data.value
 
   });
   this.sum();
 }
 else if(data.id == "supplier_name")
 {
   this.setState({

    supplier_name:data.name,
    supplier_id:data.value,
   });
   console.log(data)
 }
 else if(data.id == "airLine")
 {
   this.setState({

    airLine:data.value
 
   });

 }
 
}; 

  async sum()
  {
     let x= parseFloat(this.state.fare_charge)+parseFloat(this.state.ipp)+parseFloat(this.state.supplier_service_charge);
  console.log(this.state.fare_charge, this.state.ipp)
  let total=(parseFloat(this.state.tax)/100)*parseFloat(x);
 let all=parseFloat(x)+parseFloat(total)
 let price=parseFloat(this.state.price)
   await this.setState({
    supplier_total:all.toFixed(2),
    invoice_amount:price.toFixed(2)
 })
 let retains=parseFloat(this.state.invoice_amount)-parseFloat(all)
 this.setState({
  retain:retains.toFixed(2)
 })
  }

   handleChange = async (e)  => {    

    if(e.target.name=='fare_charge'||e.target.name=='ipp'||e.target.name=='tax'||e.target.name=='supplier_service_charge'||e.target.name=='invoice_amount'||e.target.name=='price')
    {
      
      const { name, value,} = e.target;
      await this.setState({ [name]: value });

      this.sum();
    }
    else
     {
      const { name, value,} = e.target;
    this.setState({ [name]: value });
    }
    
}
handleSubmitFlight(e) 
{
  console.log(this.state);
    e.preventDefault();
    let dataFlight=this.state;
    this.props.submitFlight(dataFlight)

}
async componentDidMount() {
  let id=this.props.id;
  const res= await axios.get(`/api/dsr/getById/${id}`);
  console.log(res.data); 
  if(res.data.status==200)
  {
  this.setState({
     currency:res.data.dsr[0].dsr_currency,
      
  });

  console.log(res.data.dsr[0].dsr_currency)
  }

  if(this.props.Ctype=="Individual")
  {
  const res2 = await axios.get(`api/individualfamily/selectFamily/${this.props.cID}`);
  console.log(this.props.id);
  this.setState({
    selectFamily:res2.data.customer,
     
  })
  
  }
  else{
    const res2 = await axios.get(`api/individualcustomer/selectEmployee/${this.props.cID}`);
  console.log(this.props.id);
  this.setState({
      selectPassenger:res2.data.customer,
     
  })

  }
  
  const res3 = await axios.get(`api/purchases/supplier/selectSupplier`);

  this.setState({
      selectsupplier:res3.data.supplier,
     
  })

  const res4 = await axios.get(`api/productandservices/services/selectairline`);

  this.setState({
    selectAirLine:res4.data.AirLine,
     
  })
  

 }
  render() {
    let  options='';
    if(this.props.Ctype=="Individual")
  {
    options  = this.state.selectFamily.map(function (passenger) {
     
        return {label:passenger.individual_family_name,value:passenger.individual_family_name}
        
})
  }
  else
  {
    options  = this.state.selectPassenger.map(function (passenger) {
     
      return {label:passenger.individual_name,value:passenger.individual_name}
      
})
  }
let  supplier='';
supplier  = this.state.selectsupplier.map(function (supplier) {
 
    return {label:supplier.supplier_company_name,value:supplier.supplier_id,name:supplier.supplier_company_name}
    
})

let  airLine='';
airLine  = this.state.selectAirLine.map(function (AirLine) {
 
    return {label:AirLine.air_line_name,value:AirLine.air_line_name}
    
})
    return (
<React.Fragment>
        <br></br>
       
      
        
        <h1>Flight</h1>

      <br></br>
        <form onSubmit={this.handleSubmitFlight}>
          <Input type="hidden" naame="dsr_number" value={this.props.id} />
        <Row>
        <Col lg="4">
                  <FormGroup>
                      <Label for='date'> Travel Date</Label>
                      <Input name='travel_date' type='date'
                      
                      value={this.state.travel_date} onChange={this.handleChange}></Input>
                  </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col lg="4">
                  <FormGroup>
                      <Label for='airLine'>AirLine Name</Label>
                      <SingleSelect  name='airLine' 
                     options={airLine}
                     selectedValue={this.state.airLine}
                      getValuesFn={this.getValuesFn}  ></SingleSelect>
                  </FormGroup>
              </Col>

        <Col lg="4">
                  <FormGroup>
                      <Label for='passenger'>Passenger</Label>
                      <Select isMulti name='passenger_names' 
                     options={options}
                     onChange={this.getpassengers} ></Select>
                  </FormGroup>
              </Col>
             
               
                <Col lg="4">
                  <FormGroup>
                      <Label for='passenger'>Trip Type</Label>
                      <SingleSelect 
                      name='trip_type' 
                      selectedValue={this.state.trip_type}
                      options={tripType}
                      getValuesFn={this.getValuesFn} 
                     ></SingleSelect>
                  </FormGroup>
              </Col>
              
                </Row>
               
             
                
              <Row>
             
                <Col lg="4">
                  <FormGroup>
                      <Label for='route'>Route</Label>
                      <Input name='route' type='text'
                      placeholder='Route'
                      value={this.state.route} onChange={this.handleChange}></Input>
                  </FormGroup>
              </Col>
             
     
    
           
           
             
              </Row>
          <hr></hr>
         
          <br></br>
      
          {/* <Col lg="4">
          </Col> */}
          <div style={{marginLeft:"50%"}}>

          
           <br></br>

           <br/>
             <Row>
              <Col lg="4">    <Label for='total'>Ticket Price</Label></Col>
             <Col lg="6">
              
               
                   <Input name='price' type='number'
                   placeholder='Ticket Price'
                   value={this.state.price}
                   onChange={this.handleChange} ></Input>
             
           </Col>
           <Col lg="2">{this.state.currency}</Col>
           </Row>
           <br/>
           <Row>
           <Col lg="4"><Label for='invoice_amount'>Invoice Amount</Label></Col>
             <Col lg="6">
             
                   
                   <Input name='invoice_amount' type='number'
                   placeholder='Invoice Amount'
                   value={this.state.invoice_amount} onChange={this.handleChange}  readOnly></Input>
            
           </Col>
           <Col lg="2">{this.state.currency}</Col>
           </Row>
           <br/>    
           </div>
           <br/>
        
            
        
             <br></br>
             <div style={{marginLeft:"85%"}}>

        {/* <div style={{display:"flex",justifyContent:"flex-end"}}> */}
        <Row>
       
              <Button  type='submit' value="submit" color='primary mr-2'>Add</Button> 
             </Row>    </div>
              </form>
              </React.Fragment>
    )
  }
}
