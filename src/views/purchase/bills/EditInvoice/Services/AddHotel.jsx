import Select from 'react-select'
import React, { Component } from 'react'
import { Col, FormGroup, Label,Card,CardBody,CardHeader,CardTitle,Row, Input, Button } from 'reactstrap'
import axios from 'axios';
import SingleSelect from "components/common/formBasic/singleSelect";
import { toast } from 'react-toastify';
const tax= [
    { value: '18%', label: '18% GST' },
    { value: '20%', label: '20% GST' },
  ]

 
  

export default class AddHotel extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dsr_type:'DSR',
            dsr_number:this.props.id,
            booking_date: "",
            hotel_id:'',
            hotel_name: "",
            room_number: "",
            room_type: "",
            service_type: "",
            bed: "",
            meal_plan: "",
            total_nights: "",
            price: "",
            isSubmitted: false,
            guest_names:[],
            selectsupplier:[],
            selectPassenger:[],
            hotelService:[],
            hotel:[],
            hotel_total_charge:0,
            supplier_service_charge:0,
            tax:0,
            invoice_total:0,
            guest_names: "",
            start_date: "",
            end_date: "",
            total_days: "",
            supplier_id:'',
            supplier_name: "",
            selectFamily:[]
            
            
          };

        this.changeHandler = this.changeHandler.bind(this);
        this.submitFormHandler = this.submitFormHandler.bind(this);
        this.setGuest = this.setGuest.bind(this);
    }
 
    async net()
  {
    //target.name=='invoice_amount'
     let x= parseFloat(this.state.hotel_total_charge)+parseFloat(this.state.supplier_service_charge);

  let total=(parseFloat(this.state.tax)/100)*parseFloat(x);
 let all=parseFloat(x)+parseFloat(total)
   await this.setState({
    invoice_total:all.toFixed(2)
 })
 
  }
  setGuest(e){
    this.setState({

      guest_names:(Array.isArray(e)?e.map(x=>x.value):[]),
    
    });
    
  }
  changeHandler = async (e) => {
    console.log(12)
    if(e.target.name=='hotel_total_charge'||e.target.name=='supplier_service_charge')
    {
    
      await this.setState({ [e.target.name]: e.target.value });

      this.net();
    }
    else
    {
      this.setState({ [e.target.name]: e.target.value });
    }
   
  };

  submitFormHandler = (e) => {
    
    console.log(this.state);
    e.preventDefault();
    let data=this.state;
    this.props.submit(data)


  };
  async componentDidMount() {
    const res2 = await axios.get(`api/corporatecustomer/getselect`);
    console.log(res2)
    this.setState({
        corporate:res2.data.customer,
       
    })

   }
   getValuesFn = async(data) => {
     
    if(data.id == "hotel_name")
  {
    
    this.setState({
 
      hotel_name:data.value,
      hotel_id:data.value
  
    });
 this.getService(data.value)
  }
  
  else if(data.id == "room_number")
  {

    await this.setState({
 
      room_number:data.value,
      meal_plan:data.meal,
      bed:data.bed
  
    });
  }
  else if(data.id == "supplier_name")
  {

    await this.setState({
 
      supplier_id:data.value,
      supplier_name:data.value
  
    });
  }
  else if(data.id == "tax")
  {

    await this.setState({
 
      tax:data.value,
  
    });
  }
  this.net();
 }; 
 async getService(ids)
 {
  const res5 = await axios.get(`api/productandservices/services/selecthotelservice/${ids}`);
  
  this.setState({
      hotelService:res5.data.Hotel,
     
  })
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
    const res4 = await axios.get(`api/productandservices/services/selecthotel`);
  
    this.setState({
        hotel:res4.data.Hotel,
       
    })
    console.log(this.state.hotel)
    
    
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
 
    return {label:supplier.supplier_company_name,value:supplier.supplier_id,idValue:supplier.supplier_id}
    
})

let  hotel='';
hotel  = this.state.hotel.map(function (hotels) {
 
    return {label:hotels.hotel_name,value:hotels.hotel_id}
    
})
let  hotelService='';
hotelService  = this.state.hotelService.map(function (room) {

return {label:room.hotel_room_name,value:room.hotel_room_name,meal:room.hotel_meal,bed:room.hotel_bed}

})
    return (
      <React.Fragment>
      <br></br>
          
           <h1> Hotel </h1>
           <br></br>
           <form onSubmit={this.submitFormHandler}>
            <h5>Hotel Details</h5>
            <hr></hr>
          <Row>
          <Col lg="4">
                  <FormGroup>
                      <Label for='hotel_name'>Hotel Name</Label>
                  
                      <SingleSelect  name='hotel_name' 
                     options={hotel}
                     selectedValue={this.state.hotel_name}
                      getValuesFn={this.getValuesFn}  ></SingleSelect>
                  </FormGroup>
              </Col>
              
              <Col lg="4">
                  <FormGroup>
                      <Label for='room_number'>Room Numbers/Name</Label>
                      {/* <Input name='room_number' type='text'
                      placeholder='Room Number/Name'  
                      value={this.state.room_number}
                      onChange={this.changeHandler}  ></Input> */}
                        <SingleSelect  name='room_number' 
                     options={hotelService}
                     selectedValue={this.state.room_number}
                      getValuesFn={this.getValuesFn}  ></SingleSelect>
                  </FormGroup>
              </Col>
          <Col lg="4" >
                    <FormGroup >
                      <Label for="booking_date">Booking Date</Label>
                      <Input name="booking_date" 
                             type='date'
                              value={this.state.booking_date}
                            onChange={this.changeHandler}  >
                      </Input>
                    </FormGroup>
                  </Col>
          <Col lg="4" >
                    <FormGroup >
                      <Label for="guest_name">Guest Name</Label>
                     
                      <Select isMulti
                      name="guest_names" 
                      options={options}
                      onChange={this.setGuest}>

                      </Select>
                    </FormGroup>
                  </Col>
            
             
              <Col lg="4">
                  <FormGroup>
                      <Label for='meal_plan'>Meal Plan</Label>
                      <Input name='meal_plan' type='text'
                      placeholder='Meal Plan'
                      value={this.state.meal_plan}
                      onChange={this.changeHandler}  ></Input>
                  </FormGroup>
              </Col>
              <Col lg="4">
                  <FormGroup>
                      <Label for='bed'>Bed</Label>
                      <Input name='bed' type='text'
                      placeholder='Bed'
                      value={this.state.bed}
                      onChange={this.changeHandler}  ></Input>
                  </FormGroup>
              </Col>
              <Col lg="4">
                  <FormGroup>
                      <Label for='start date'>Start Date</Label>
                      <Input name='start_date' type='date'
                    
                      value={this.state.start_date}
                      onChange={this.changeHandler}  ></Input>
                  </FormGroup>
              </Col>
              <Col lg="4">
                  <FormGroup>
                      <Label for='end date'>End Date</Label>
                      <Input name='end_date' type='date'
                     
                      value={this.state.end_date
                      }
                      onChange={this.changeHandler}  ></Input>
                  </FormGroup>
              </Col>
              <Col lg="4">
                  <FormGroup>
                      <Label for='total_nights'>Total Night</Label>
                      <Input name='total_nights' type='number'
                      placeholder='Total Night'
                      value={this.state.total_nights}
                      onChange={this.changeHandler}  ></Input>
                  </FormGroup>
              </Col>
              <Col lg="4">
                  <FormGroup>
                      <Label for='total_days'>Total Days</Label>
                      <Input name='total_days' type='number'
                      placeholder='Total Days'
                      value={this.state.total_days}
                      onChange={this.changeHandler}  ></Input>
                  </FormGroup>
              </Col>
              {/* <Col lg="4">
                  <FormGroup>
                      <Label for='price'>Price</Label>
                      <Input name='price' type='text'
                      placeholder='Hotel Name'
                      value={this.state.price}
                      onChange={this.changeHandler}  ></Input>
                  </FormGroup>
              </Col>
              */}
             
                
           <Col lg="4">
             
             <Label for='supplier'>Supplier</Label>
              
                 <SingleSelect  name="supplier_name"
                         options={supplier}
                         getValuesFn={this.getValuesFn}
                         selectedValue={this.state.supplier_name}>
                 
                 </SingleSelect>
          
             </Col>
           
             
                </Row> 
               
               <br></br>
               
               <hr></hr>
               <div style={{marginLeft:"50%"}}>
               <Row>
             <Col lg="4"><Label for='supplier_service_charge'>Supplier Service Charge</Label>     </Col>
             <Col lg="6">
        
               <Input  name="supplier_service_charge" type='number'
                       placeholder="Supplier Service Charge" value={this.state.supplier_service_charge} onChange={this.changeHandler}>
               
               </Input>
        
           </Col>

             </Row><br></br>
               <Row>
             <Col lg="4"><Label for='hotel_total_charge'> Hotel Price</Label>     </Col>
             <Col lg="6">
        
               <Input  name="hotel_total_charge" type='number'
                       placeholder="Hotel Price" value={this.state.hotel_total_charge} onChange={this.changeHandler} >
               
               </Input>
        
           </Col>
             </Row><br></br>
             <Row>
             <Col lg="4"> <Label for="tax">Tax</Label>   </Col>
             <Col lg="6">
               <FormGroup >
                  
                  <SingleSelect  name='tax' 
                    options={tax}
                     selectedValue={this.state.tax}
                      getValuesFn={this.getValuesFn}  ></SingleSelect>
                </FormGroup>
                </Col>
                </Row><br></br>
               {/* <Row>
             <Col lg="4"><Label for='package_total_charge'>Package Total Charge</Label>     </Col>
             <Col lg="6">
             
           
            
               <Input  name="package_total_charge"
                       placeholder="Package Total Charge">
               
               </Input>
        
           </Col>
             </Row>
             <br></br> */}
               <Row>
             <Col lg="4"><Label for='invoice_total'><b>Invoice Total</b></Label>     </Col>
             <Col lg="6">
             
           
            
               <Input  name="invoice_total" type='number'
                       placeholder="Invoice Total" value={this.state.invoice_total} readOnly>
               
               </Input>
        
           </Col>
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
