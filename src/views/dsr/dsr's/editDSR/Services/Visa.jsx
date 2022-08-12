import React, { Component } from 'react'

import Select from 'react-select'
import { Button, Form, FormGroup, Input, Label, Col, Row } from 'reactstrap'
import axios from 'axios';
import SingleSelect from "components/common/formBasic/singleSelect";
import {country} from "../../../../country/CountryList"
import { toast } from 'react-toastify';

const VisaTour = [
  { value: 'Visit/Tourist', label: 'Visit/Tourist' },
  { value: 'Business', label: 'Business' },
  { value: 'Transit', label: 'Transit' },
  { value: 'Other', label: 'Other' },
 
];
const tax= [
  { value: '18%', label: '18% GST' },
  { value: '20%', label: '20% GST' },
]

export default class Visa extends Component {
  constructor(props) {
    super(props);
  this.state = {
    dsr_type:'DSR',
    dsr_number:this.props.id,
    passenger_names :'',
    passport_number :"",
    date_of_birth :"",
    email :"",
    visa_number :"",
    visa_type :"",
    country :"",
    issue_date :"",
    expiry_date :"",
    supplier :"",
    supplier_service_charge :0,
    price:0,
    tax:0,
    invoice_total:0,
    selectPassenger:[],
    selectsupplier:[],

 supplier_name:"",
  };

  this.handleSubmitVisa = this.handleSubmitVisa.bind(this);

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
  const res2 = await axios.get(`api/dsr/selectPassenger/${this.props.id}`);
  console.log(this.props.id);
  this.setState({
      selectPassenger:res2.data.passenger,
     
  })
  const res3 = await axios.get(`api/purchases/supplier/selectSupplier`);

  this.setState({
      selectsupplier:res3.data.supplier,
     
  })
 
  
  
 }

 async total()
 {
   //target.name=='invoice_amount'
    let x= parseFloat(this.state.supplier_service_charge)+parseFloat(this.state.price);
    let all = (parseFloat(this.state.tax)/100)*x
    let total= parseFloat(all)+parseFloat(x)
  await this.setState({
   invoice_total:total.toFixed(2)
})

 }

 getValuesFn = async(data) => {
     console.log(data)
  if(data.id == "package_type")
{
  
  this.setState({

    package_type:data.value

  });
 

}


else if(data.id == "supplier_name")
{
  
  this.setState({

    supplier_name:data.value

  });
}
else if(data.id == "visa_type")
{
  
  this.setState({

    visa_type:data.value

  });
}
else if(data.id == "country")
{
  
  this.setState({

    country:data.value

  });
}
else if(data.id == "tax")
{
  
  await this.setState({

    tax:data.value

  });
  this.total();
}
else if(data.id == "passenger_names")
{
  
  await this.setState({

    passenger_names:data.value,
    passport_number :data.passport,
    email :data.email,
    date_of_birth :data.dob
  });
  console.log(data)
}
}; 

handleChange = async (e)  => {    

  if(e.target.name=='tax'||e.target.name=='supplier_service_charge'||e.target.name=='invoice_amount'||e.target.name=='price')
  {
    
    const { name, value,} = e.target;
    await this.setState({ [name]: value });

    this.total();
  }
  else 
   {
    const { name, value,} = e.target;
  this.setState({ [name]: value });
  }
  
}

handleSubmitVisa(e) {
  console.log(this.state);
    e.preventDefault();

    let dataVisa=this.state;
    this.props.submitVisa(dataVisa)
}


  render() {
    let  options='';
    options  = this.state.selectPassenger.map(function (passenger) {
     
        return {label:passenger.passenger_name,value:passenger.passenger_name,email:passenger.passenger_email,passport:passenger.passenger_passport,dob:passenger.passenger_dob}
        
})
let  supplier='';
supplier  = this.state.selectsupplier.map(function (supplier) {
 
    return {label:supplier.supplier_company_name,value:supplier.supplier_company_name,idValue:supplier.supplier_id}
    
})


    return (
      <React.Fragment>
        <br></br>
         <h1>Visa</h1>
          <br></br>
          <form onSubmit={this.handleSubmitVisa}>
          <Row>
            <Col lg="4">
              <FormGroup >
                <Label for="passenger_name">Passenger Name</Label>
                <SingleSelect 
                name="passenger_names"
                  options={options}
                  selectedValue={this.state.passenger_name}
                  getValuesFn={this.getValuesFn} 
                >

                </SingleSelect>

              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Label for='passport_number'>Passport Number</Label>
                <Input name='passport_number' type='text'
                  placeholder='Passport Number' value={this.state.passport_number} readOnly></Input>
              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Label for='date_of_birth'>Date Of Birth </Label>
                <Input name='date_of_birth' type='date'
                  value={this.state.date_of_birth} onChange={this.handleChange} readOnly></Input>
              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Label for=''>Email</Label>
                <Input name='email' type='email'
                  placeholder='Email' value={this.state.email} readOnly></Input>
              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Label for='visa_number'>Visa Number</Label>
                <Input name='visa_number' type='text' placeholder='Visa Number'
                value={this.state.visa_number} onChange={this.handleChange}></Input>
              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup >
                <Label for="visa_type">Visa Type</Label>
                <SingleSelect name="visa_type"
                       options={VisaTour}
                       selectedValue={this.state.visa_type}
                       getValuesFn={this.getValuesFn}
                >

                </SingleSelect>

              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup >
                <Label for="country">Country</Label>
                <SingleSelect name="country"
                options={country}
                selectedValue={this.state.country}
                getValuesFn={this.getValuesFn}

                >

                </SingleSelect>

              </FormGroup>
            </Col>

            <Col lg="4">
              <FormGroup>
                <Label for='issue_date'>issue Date</Label>
                <Input name='issue_date' type='date'
                value={this.state.issue_date} onChange={this.handleChange}></Input>
              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Label for='expiry_date'>Expiry Date</Label>
                <Input name='expiry_date' type='date'
                value={this.state.expiry_date} onChange={this.handleChange}></Input>
              </FormGroup>
            </Col>
            <Col lg="4">
           
             <Label for='supplier'>Supplier</Label>
              
                 <SingleSelect  name="supplier_name"
                         options={supplier}
                         selectedValue={this.state.supplier_name}
                         getValuesFn={this.getValuesFn}>
                 
                 </SingleSelect>
          
             </Col>
          
          </Row>
     
          
          <hr></hr>
          <br />
          <div style={{ marginLeft: "50%" }}>
            <Row>
              <Col lg="4"><Label for='supplier_service_charge'>Supplier Service Charge</Label>     </Col>
              <Col lg="6">

                <Input name="supplier_service_charge" type='number'
                  placeholder="Supplier" value={this.state.supplier_service_charge} onChange={this.handleChange}>

                </Input>

              </Col>
            </Row><br></br>
            <Row>
              <Col lg="4"><Label for='price'>Visa Price</Label>     </Col>
              <Col lg="6">

                <Input name="price" type='number'
                  placeholder="Supplier" value={this.state.price} onChange={this.handleChange}>

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
    </Row>
            <Row>
              <Col lg="4"><Label for='invoice_total'><b>Invoice Total</b></Label>     </Col>
              <Col lg="6">



                <Input name="invoice_total" type='number'
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
