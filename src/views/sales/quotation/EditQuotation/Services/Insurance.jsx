import React, { Component } from 'react'

import Select from 'react-select'
import { Button, Form, FormGroup, Input, Label,Col,Row } from 'reactstrap'
import axios from 'axios';
import SingleSelect from "components/common/formBasic/singleSelect";
import { toast } from 'react-toastify';

const taxes= [
  { value: '18%', label: '18% GST' },
  { value: '20%', label: '20% GST' },
]

export default class Insurance extends Component {
  constructor(props) {
    super(props);
  this.state = {
    dsr_type:"Quotation",
    dsr_number:this.props.id,
    passenger_names:'',
    insurance_company_name :'',
    policy_number  :'', 
    issue_date :'',
    expiry_date :'',
    supplier_service_charge :0,
    price :0,
    tax :0,
    invoice_total:0,
    selectPassenger:[],
    selectsupplier:[],
    company:[],
    selectFamily:[]

   
  };

  this.getValuesFn = this.getValuesFn.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

async getValuesFn(data)
{
  
  if(data.id=="passenger_names")
  {

    this.setState({
      passenger_names:data.value 
    })
  }
  
  else if(data.id=="tax")
  {

   await this.setState({
      tax:data.value
    })
    this.sum()
  }

else if(data.id=="incsurance_company_name")
{
 
  this.setState({
    insurance_company_name:data.value
  })
}


}
async sum()
  {
     let x= parseFloat(this.state.supplier_service_charge)+parseFloat(this.state.price);

  let total=(parseFloat(this.state.tax)/100)*parseFloat(x);
 let all=parseFloat(x)+parseFloat(total)
   await this.setState({
    invoice_total:all.toFixed(2)
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
 
  const res4 = await axios.get(`api/productandservices/services/selectInsuranceCompany`);

  this.setState({
    company:res4.data.insurance,
     
  })
  
 }

 handleSubmit(e) 
 {
  console.log(this.state);
    e.preventDefault();
    let dataVisa=this.state;
    this.props.submitInsurance(dataVisa)
}

 handleChange = async (e)  => {    

  if(e.target.name=='supplier_service_charge'||e.target.name=='price')
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
    let  insurance='';
    insurance = this.state.company.map(function (insurence) {
     
        return {label:insurence.insurence_company_name,value:insurence.insurence_company_name}
        
})
    return (
      <React.Fragment>
        <br></br>
          
          
         
       
              <h1>Insurance</h1>
              <br/>
              <form onSubmit={this.handleSubmit}>
             <Row>
              <Col lg="6">
              <FormGroup >
                <Label for="passenger_name">Passenger Name</Label>
                <SingleSelect name="passenger_names"
                  placeholder="Passenger Name"
                  options={options}
                  selectedValue={this.state.passenger_names}
                  getValuesFn={this.getValuesFn}
                >

                </SingleSelect>

              </FormGroup>
            </Col>
            
              <Col lg="6">
                <FormGroup >
                  <Label for="company_name">Company Name</Label>
                 <SingleSelect    name="incsurance_company_name"
                 options={insurance}
                 selectedValues={this.state.incsurance_company_name}
                 getValuesFn={this.getValuesFn}

                         
                          >
                         
                  </SingleSelect> 
                  
                </FormGroup>
                </Col>
             
             

             
           
            </Row>
   
   <hr></hr>
   <br></br>
   <div style={{ marginLeft: "50%" }}>
    
     
     <Row>
     <Col lg="4"><Label for='price'>Price</Label>    </Col>
     <Col lg="6">
                  
                      
                      <Input name='price' type='number'
                      placeholder='Price' value={this.state.price} onChange={this.handleChange}></Input>
                
              </Col>
              </Row>
              <br></br>
              <Row>
              <Col lg="4">  <Label for="tax">Tax</Label>     </Col>
              <Col lg="6">
    
                  <SingleSelect 
                  name="tax"
                  placeholder="tax"
                  options={taxes}
                  selectedValue={this.state.tax}
                  getValuesFn={this.getValuesFn}
                ></SingleSelect>
               
                </Col>
                </Row>
                <br></br>
     <Row>
       <Col lg="4"><Label for='invoice_total'><b>Invoice Total</b></Label>     </Col>
       <Col lg="6">



         <Input name="invoice_total"
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
