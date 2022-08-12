import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label,Col,Row } from 'reactstrap'
import Select from 'react-select'
import axios from 'axios';
import SingleSelect from "components/common/formBasic/singleSelect";
import { toast } from 'react-toastify';
var option=[];
export default class ADDPackage extends Component {
  constructor(props) {
    super(props);
  this.state = {
    dsr_type:"MICE",
    family_id:this.props.fId,
    passenger:[],
    dsr_number:this.props.id,
    supplier_name:'',
    total:"",
    invoice_amount:"",
    packages:[],
    selectPassenger:[], 
    selectsupplier:[],
    invoice_total :0,
    package_price :0,
    supplier_service_charge:0,
    package_type:"",
     destination:"",
      passengers:"",
       start_date :"",
       end_date :"",
       number_adult :"",
       number_children :"",
      
      
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.setPassengers=this.setPassengers.bind(this);
}

async handleChange(event) {
  let n = event.target.name
  if(event.target.name=="supplier_service_charge"|| event.target.name=="package_price")

  {
    await this.setState({[n]: event.target.value});  
this.total();
  }
  else{
    await this.setState({[n]: event.target.value});  
  }

}
handleSubmit(e) 
{
  console.log(this.state);
    e.preventDefault();
    let dataPackage=this.state;
    this.props.submitPackage(dataPackage)
} 

async setPassengers(e)
{
await this.setState({
  passengers:(Array.isArray(e)?e.map(x=>x.value):[]),
})
}
async componentDidMount() {
  let id=this.props.id;
  const res= await axios.get(`/api/mice/getById/${id}`);
  console.log(res.data); 
  if(res.data.status==200)
  {
  this.setState({
     currency:res.data.mice.dsr_currency,
      
  }); 

  console.log('')
  }
  const res2 = await axios.get(`api/mice/getAllPassengers/${this.props.id}/${this.props.fId}`);
  console.log(this.props.id);
  this.setState({
      selectPassenger:res2.data.mice,
     
  })
  const res3 = await axios.get(`api/purchases/supplier/selectSupplier`);

  this.setState({
      selectsupplier:res3.data.supplier,
     
  })
  const res4 = await axios.get(`api/productandservices/services/selectpackage`);

  this.setState({
    packages:res4.data.tourpackage,
     
  })
  console.log(this.state.hotel)
  
  
 }

 async total()
 {
   //target.name=='invoice_amount'
    let x= parseFloat(this.state.package_price)+parseFloat(this.state.supplier_service_charge);
  await this.setState({
   invoice_total:x.toFixed(2)
})

 }

 getValuesFn = async(data) => {
     
  if(data.id == "package_type")
{
  
  this.setState({

    package_type:data.value,
    destination:data.destination
  });
 

}

else if(data.id == "supplier_name")
{
  
  this.setState({

    supplier_id:data.value,
      supplier_name:data.value

  });
}
}; 

  render() {
    let  options='';
    options  = this.state.selectPassenger.map(function (passenger) {
     
        return {label:passenger.passenger_name,value:passenger.passenger_name}
        
})
let  supplier='';
supplier  = this.state.selectsupplier.map(function (supplier) {
 
  return {label:supplier.supplier_company_name,value:supplier.supplier_id,idValue:supplier.supplier_id}
    
})

let  Package='';

Package  = this.state.packages.map(function (packages) {
 
    return {label:packages.tour_package_name+"  ["+packages.tour_package_destination+"]",value:packages.tour_package_name,destination:packages.tour_package_destination}
    
})

    return (
<React.Fragment>
        <br></br>
       
      
      
        <form onSubmit={this.handleSubmit}>
               <h1>Package Details</h1>
               <br></br>
               <Row>
                <Col lg="4">
                  <Label for="package_type">Package Type</Label>
                  <SingleSelect name="package_type"
                  options={Package}
                  selectedValue={this.state.hotel_name}
                      getValuesFn={this.getValuesFn} >

                  </SingleSelect>
                </Col>
                <Col lg="4">
                  <FormGroup>
                      <Label for='destination'>Destination</Label>
                      <Input name='destination' type='text'
                      placeholder='Destination'
                      value={this.state.destination}
                      onChange={this.handleChange}  ></Input>
                  </FormGroup>
              </Col>
             
           <Col lg="4">
             
             <Label for='passenger'>Select Passenger</Label>
              
                 <Select  isMulti name="passengers"
                 options={options}
                 onChange={this.setPassengers}
                     >
                 
                 </Select>
          
             </Col>
              <Col lg="4">
                  <FormGroup>
                      <Label for='start_date'>Start Date</Label>
                      <Input name='start_date' type='date'
                      
                      value={this.state.start_date}
                      onChange={this.handleChange}  ></Input>
                  </FormGroup>
              </Col>
              <Col lg="4">
                  <FormGroup>
                      <Label for='end_date'>End Date</Label>
                      <Input name='end_date' type='date'
                    
                      value={this.state.end_date}
                      onChange={this.handleChange}  ></Input>
                  </FormGroup>
              </Col>
              <Col lg="4">
                  <FormGroup>
                      <Label for='adult'>Adult</Label>
                      <Input name='number_adult' type='number'
                      placeholder='Adult'
                      value={this.state.adult}
                      onChange={this.handleChange}  ></Input>
                         </FormGroup>
              </Col>
                      <Col lg="4">
                  <FormGroup>
                       <Label for='children'>Children</Label>
                      <Input name='number_children' type='number'
                      placeholder='Children'
                      value={this.state.children}
                      onChange={this.handleChange}  ></Input>
                  </FormGroup>
              </Col>
             
                         <Col lg="4">
             
             <Label for='supplier_name'>Supplier Name</Label>
              
                 <SingleSelect name="supplier_name"
                 options={supplier}
                 selectedValue={this.state.supplier_name}
                 getValuesFn={this.getValuesFn}

                         >
                 
                 </SingleSelect >
          
             
              </Col>
               </Row>
               <br></br>
                
              
               <hr></hr>
               <div style={{marginLeft:"50%"}}>
               <Row>
             <Col lg="4"><Label for='supplier_service_charge'>Supplier Service Charge</Label>     </Col>
             <Col lg="6">
        
               <Input  name="supplier_service_charge" type='number'
                       placeholder="Supplier" onChange={this.handleChange} value={this.state.supplier_service_charge}>
               
               </Input>
        
           </Col>
           <Col lg="2">{this.state.currency}</Col>
             </Row><br></br>
               {/* <Row>
             <Col lg="4"><Label for='hotel_total_charge'>Hotel Total Charge</Label>     </Col>
             <Col lg="6">
        
               <Input  name="hotel_total_charge"
                       placeholder="Hotel Total Charge">
               
               </Input>
        
           </Col>
             </Row><br></br> */}
               <Row>
             <Col lg="4"><Label for='package_price'>Package Price</Label>     </Col>
             <Col lg="6">
             

            
               <Input  name="package_price" type='number'
                       placeholder="Package Total Charge" onChange={this.handleChange} value={this.state.package_price}>
               
               </Input>
        
           </Col>
           <Col lg="2">{this.state.currency}</Col>
             </Row>
             <br></br>
               <Row>
             <Col lg="4"><Label for='invoice_total'><b>Invoice Total</b></Label>     </Col>
             <Col lg="6">
             
           
            
               <Input  name="invoice_total" type='number'
                       placeholder="Invoice Total"  value={this.state.invoice_total} readOnly>
               
               </Input>
        
           </Col>
           <Col lg="2">{this.state.currency}</Col>
             </Row>
            </div>
              
<br></br>
<br></br>

            <div style={{marginLeft:"85%"}}>

<Row>

      <Button  type='submit' value="submit" color='primary mr-2'>Add</Button> 
     </Row>    </div>
              </form>
              </React.Fragment>
    )
  }
}