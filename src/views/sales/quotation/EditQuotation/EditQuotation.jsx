import React, { Component } from 'react';
import {
  Button,
  Progress,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Spinner,
  Col,
  Table,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  FormGroup,
} from "reactstrap";
import { NavLink, Link, useParams } from "react-router-dom";
import SingleSelect from "components/common/formBasic/singleSelect";
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import "assets/scss/pages/data-list.scss";
  import { toast } from "react-toastify";
  import {currency,tax} from "./../../../country/CountryList"
 import Services from "./Services"
import axios from 'axios';

export default class EditQuotation extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      type:'Quotation',
      currency:'',
      email:'',
      phone_number:'',
      addres:'',
      addres2:'',
      city:'',
      state:'',
      country:'',
      pincode:'',
      customer_name:'',
      estimate_date:'',
      expiry_date:'',
      message:'',
      terms_and_condition:'',
      DSR:[],
      passengers:[],
      individual:[],
      customer_options:'',
      customer_name:'',
      customer_id:'',
      grand_total:'0.00',
      sub_total:'0.00',
      adjustment:'0.00',
      tax:15,
     } 
   }
   async componentDidMount() {

    this.getDetails();
this.setState({
  loading:false
})


   }
   

   async hangelAddDelete()
   {
    await this.getDetails();
   }
   async getDetails()
   {

    let id=this.props.match.params.id;
    const res= await axios.get(`/api/dsr/getById/${id}`);
    console.log(res.data); 
    if(res.data.status==200)
    {
     
    await this.setState({
   
      DSR:res.data.dsr[0],
      currency:res.data.dsr[0].dsr_currency,
      customer_id:res.data.dsr[0].customer_id,
      customer_name:res.data.dsr[0].customer_name,
      email:res.data.dsr[0].email,
      phone_number:res.data.dsr[0].phone_number,
      addres:res.data.dsr[0].addres1,
      addres2:res.data.dsr[0].addres2,
      city:res.data.dsr[0].city,
      state:res.data.dsr[0].state,
      country:res.data.dsr[0].country,
      pincode:res.data.dsr[0].pincode,
      estimate_date:res.data.dsr[0].estimated_date,
      expiry_date:res.data.dsr[0].expiry_date,
      message:res.data.dsr[0].message,
      terms_and_condition:res.data.dsr[0].terms,
      adjustment:res.data.dsr[0].adjustment,
      sub_total:res.data.total
      
    });

    console.log(this.state.passengers)
    let x = parseFloat(this.state.sub_total)+parseFloat(this.state.adjustment)
  this.setState({ 
    grand_total:x
  });
    }
    if(res.data.passenger)
    {
      this.setState({
        passengers:res.data.passenger,
       
      });
    }
    if(res.data.dsr[0].customer_type=="Individual")
    {
      const res2=await axios.get(`api/individualcustomer/getselect`);
      this.setState({
       
        individual:res2.data.customer,
       
    });
    console.log(res.data.dsr[0].customer_id)
    }
    else if(res.data.dsr[0].customer_type=="Corporate")
    {
      const res2=await axios.get(`api/corporatecustomer/getselect`);
      this.setState({
       
        individual:res2.data.customer,
        
    });
    }
   }
   
   handleSubmit = (e) => {
    this.setState(
      {
        btnLoading:true,
        
      }
      );
      
      let id=this.props.match.params.id;
    
      e.preventDefault();
      
    console.log(this.state)
      axios
      .post(`/api/sales/quotation/update/${id}`, this.state)
      .then((response) => {
        console.log(response.data)
        if (response.data.status ==200) {
           toast.success(response.data.Result);
          this.getDetails()
          this.setState(
            {
              btnLoading:false,
              
            }
            );
            
        } else {
          toast.error("Please Upload Valid Details");
          this.setState(
            {
              error:response.data.Result,
              btnLoading:false,
                loading:false
            
            }
            );
        }
      })
      .catch((error) => {
        // toast.error(error.data.Result);
        this.setState(
          {
            btnLoading:false,
          }
          );
        
      });
   
}   



 handleChange = async(e) => {

  const { name, value, } = e.target;
  await this.setState({ [name]: value });

  if(name=='adjustment')
  {
    if(!value)
    {
      let z=0;
      let x = parseFloat(this.state.sub_total)+parseFloat(z);
      await this.setState({ 
        grand_total:x.toFixed(2)
      });
    }
   let y = parseFloat(this.state.sub_total)+parseFloat(this.state.adjustment)
  await this.setState({ 
    grand_total:y.toFixed(2)
  });


  }

}


getValuesFn = (data) =>
  {
     
    if (data.id == "customer_id") {
      this.setState({
        customer_id:data.value,
        customer_name:data.cname,
      
      });
      this.setAddres(data.value)
    }
    else if (data.id == "currency") {
      this.setState({
        currency:data.value,
      });
    }


  }; 

  async setAddres(id)
  {
    if(this.state.DSR.customer_type=="Individual")
    {
      const res= await axios.get(`/api/individualcustomer/getInduvidualById/${id}`);
      this.setState({
        email:res.data.customer.individual_email,
        phone_number:res.data.customer.individual_phone_number,
        country:res.data.customer.individual_billing_country, 
        state:res.data.customer.individual_billing_state, 
        city:res.data.customer.individual_billing_city,
        addres :res.data.customer.individual_billing_street,
        addres2 :res.data.customer.individual_billing_street_2,
        pincode:res.data.customer.individual_billing_pincode,
      })
     
    }
    else if(this.state.DSR.customer_type=="Corporate")
    {
      const res= await axios.get(`/api/corporatecustomer/getById/${id}`);
      this.setState({
        email:res.data.customer.company_email,
        phone_number:res.data.customer.company_phone_number,
        country:res.data.customer.company_shipping_country, 
        state:res.data.customer.company_shipping_state, 
        city:res.data.customer.company_shipping_city,
        addres :res.data.customer.company_shipping_addres,
        addres2 :res.data.customer.company_shipping_addres_2,
        pincode:res.data.customer.company_shipping_city_pincode,
      })
    }
   
   
  }
 
 render(){

  let  options=[];

  if(this.state.DSR.customer_type=="Individual")
  {
   
options  = this.state.individual.map(function (corporate) {
     
  return {label:corporate.individual_name,value:corporate.individual_customer_id,cname:corporate.individual_name}
  
})
  }
 else if(this.state.DSR.customer_type=="Corporate")
  {
    
options  = this.state.individual.map(function (corporate) {
     
  return {label:corporate.company_name,value:corporate.corparate_customer_id,cname:corporate.company_name}
  
})
  }
  let stateofProForma='';
  if(this.state.DSR.saved=='YES') {
    stateofProForma="Edit";
  } 
  else
  {
    stateofProForma="Add";
  }
 return (
    

    <React.Fragment>
         <BreadCrumbs
        breadCrumbTitle="Quotation"
        breadCrumbParent="Quotation"
        breadCrumbActive={stateofProForma +" Quotation"}
      />
          <Card>
    <CardHeader><CardTitle>{stateofProForma} Quotation</CardTitle></CardHeader>
    <CardBody>
    <Row>
        <Col lg='12'>
                <b>Quotation Number:</b> Q-{this.state.DSR.dsr_number}
            </Col>
           
        </Row>
        <br></br>
        <Row>
       
            <Col lg='6'>
                {/* <b>Customer Name:</b> {this.state.DSR.customer_name} */}
                <FormGroup>
                <Label for="customer_id">Customer Name</Label> <br />
                        <SingleSelect  
                               name="customer_id"
                               options={options}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.customer_id}
                               >
                             
                        </SingleSelect >
                      </FormGroup>
            </Col>
            <Col lg="6">
                    <FormGroup>
                        <Label for="currency">Currency</Label> <br />
                        <SingleSelect  
                               name="currency"
                               selectedValue={this.state.currency}
                               options={currency}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
                      </FormGroup>
                    </Col>
        </Row>
        <br></br>
        <Row>
        <Col lg='6'>
                <b>Email:</b> {this.state.email}<br/>
                <br/>
                <b>Phone Number:</b> {this.state.phone_number}
            </Col>
            <Col lg='6'>
                <b>Billing Addres:</b>  {this.state.addres},{this.state.addres2}<br/>
                {this.state.city},{this.state.state},{this.state.country}<br/>
                pincode-{this.state.pincode}
            </Col>
        </Row>
        <br /><br />
        
        <Row>
                <Col lg="6" >
                  <FormGroup >
                    <Label for="estimate_date">Estimate Date</Label>
                    <Input 
                      name="estimate_date"
                      type='date'
                      value={this.state.estimate_date}
                      onChange={this.handleChange} />
                  </FormGroup>
                </Col>

                <Col lg="6" >
                  <FormGroup >
                    <Label for="expiry_date">Expiry Date</Label>
                    <Input name="expiry_date"
                      type='date'
                      value={this.state.expiry_date}
                      onChange={this.handleChange} >
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

       <Services id={this.props.match.params.id} currency={this.state.currency} cID={this.state.customer_id} Ctype={this.state.DSR.customer_type} AddDelete={this.hangelAddDelete} />
       <hr/>
       <Row>
        <Col lg="6">
        <Col lg="12">
                <FormGroup>
                  <Label for="message">Message Need to Display</Label>
                  <Input name='message'
                    type='textarea'
                    placeholder="Looking forward for your business."
                    value={this.state.message}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
                </Col>

                <Col lg="12">
                <FormGroup>
                  <Label for="terms_and_condition">Terms & Conditions</Label>
                  <Input name='terms_and_condition'
                    type='textarea'
                    placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
                    value={this.state.terms_and_condition}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
                </Col>

        </Col>
        <Col lg="6">
       
                <Card>
                  <CardBody>
                  <h4>Invoice Amount Details</h4>

                  <br />
                <Row>
                  <Col lg="4">
                  <Label>Sub Total</Label>
                  </Col>
                  <Col lg="6">
                  <Input type='text' value={this.state.sub_total} />
                </Col>

                  <Col lg="2">
                 {this.state.currency}
                </Col>
                </Row>
                <br />
              <Row>
                  <Col lg="4">
                 
                  <Label>Adjustment</Label>
                  </Col>
                  <Col lg="6">
                  <Input type='text' name="adjustment" value={this.state.adjustment} onChange={this.handleChange}/>
                 
                </Col>
                <Col lg="2">
                 {this.state.currency}
                </Col>
                </Row>
                <br />
                <hr />
                <Row>
                  <Col lg="6">
                
                  <span><b>Grand Total:</b></span>
                  
                 
                </Col>
                  <Col lg="6">
             
                  <span><b>{this.state.grand_total} {this.state.currency}
                </b></span>
                  
                 
                </Col>
                </Row>
               
                  </CardBody>
                  
                </Card>
        </Col>
        
       </Row>
       <hr/>
       <div style={{display:"flex",justifyContent:"flex-end"}}>
              <Link to="/sales/quotation"><Button type='reset' value="Cancel" color='warning mr-2'>Back</Button></Link>
            <div className="d-flex justify-content-between">              
              {this.state.btnLoading ?  (
                <Button.Ripple color="success" type="button">
                  <Spinner color="white" size="sm" />
                  <small className="ml-50">Loading...</small>
                </Button.Ripple>
              ): 
              (
                <Button.Ripple color="success" type="button" onClick={this.handleSubmit}>Save</Button.Ripple>
              )}
            </div>
 
            </div>
            
       </CardBody>
   </Card>

    </React.Fragment>
 )
 }
  }