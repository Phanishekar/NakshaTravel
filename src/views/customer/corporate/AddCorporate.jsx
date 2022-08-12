import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Button,
    Label,
    Row,
    Col,
    Spinner,
    Input,
    Table
  } from "reactstrap";
  import { NavLink,Link,useParams } from "react-router-dom";
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import { toast } from "react-toastify";
  import axios from "axios";
  import Select from 'react-select'
  import SingleSelect from "components/common/formBasic/singleSelect";
  import {country,currency,RegistrationType,Terms} from "./../../country/CountryList"
 import {validateCorporate} from "./validatefiles/CorporateValidation"


  
export default class AddCorporate extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            //corparate_customer_id
            company_name:"",
            company_alias_name:"", 
            company_email:"", 
            company_website_link:"",
            company_phone_number:"",
            company_mobile_number:"", 
            company_other:"", 
            company_registration_type:"",
            company_registration_number:"",
            company_shipping_country:"", 
            company_shipping_state:"", 
            company_shipping_city :"",
            company_shipping_addres :"",
            company_shipping_addres_2:'',
            company_shipping_city_pincode:"",
            company_country:"", 
            company_state:"", 
            company_city:"", 
            company_addres:"",
            company_addres_2:'',
            company_city_pincode:"",
            company_prefered_payment_method:"", 
            company_terms:"", 
            company_creditlimit:"",
            company_currency:"", 
            company_bankname:"", 
            company_bank_accountnumber:"", 
            company_bank_ifscnumber:"",
            company_bank_swiftcode:"", 
            company_bank_currency:"",
            company_tax_reg_num:"", 
            company_tax_reg_num_attachment:"", 
            company_pan_num:"", 
            company_pan_num_attachment:"",
            company_other_doc:"",
             company_other_attachment:"", 
            company_approved:"",
            company_active:"",
          ledger:[],
          customer:"",
          btnLoading:false,
          error:'',
          errortax:'', 
          errorkra:'',
          errorother:'',
          filee:true,
        };
        this.initialState = this.state;
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
      }

      handleChanges = (e) => {  
let x="";
       x= validateCorporate(e);
       console.log(x);
       if(x.for=="company_other_attachment")
       {
        this.setState({
          errorother:x.errorr,
          filee:x.filee,
                  });
       }
       else if(x.for=="company_pan_num_attachment")
       {
        this.setState({
          errorkra:x.errorr,
          filee:x.filee,
                  });
       }
       else if(x.for=="company_tax_reg_num_attachment")
       {
        this.setState({
          errortax:x.errorr,
          filee:x.filee,
                  });
       }
                
          } 

      handleChange = (e) => {    
        const { name, value,} = e.target;
        this.setState({ [name]: value });
    } 
    handleSubmit = (e) => {
      this.setState(
        {
          btnLoading:true,
        }
        );
      var formData = new FormData(document.querySelector("#corporatedetails"));
      let i=0,Name=[],Data=[];
      for(var pair of formData.entries())
      {
        console.log(pair[0],pair[1]);
        Name[i]=pair[0];
        Data[i]=pair[1];
        i++;
      }
  
      for(var j=0;j<i;j++ )
      {
        formData.append(Name[i],Data[i]);
      }
        e.preventDefault();
      

        if(this.state.filee){  
        axios
        .post(`/api/corporatecustomer/save`, formData)
        .then((response) => {
          if (response.data.status == 200) {
            toast.success(response.data.Result);
          
            this.props.history.push(`/customer/corporate`);
          } else {
            toast.error("Please Upload Valid Details");
            this.setState(
              {
                error:response.data.Result,
                btnLoading:false,
              }
              );
          }
        })
        .catch((error) => {
          toast.error(error.Result);
          this.setState(
            {
              btnLoading:false,
            }
            );
          
        });
      }
      else {
        this.setState(
          {
            btnLoading:false,
          }
          );

      }
      
  }   
  async componentDidMount() {

  }
  
  getValuesFn = (data) => {
     
    if (data.id == "company_country") {
      this.setState({
        company_country:data.value,

      });
    }
   
   else if (data.id == "company_shipping_country") {
      this.setState({
        company_shipping_country:data.value,
      });
    }
   else if (data.id == "company_bank_currency") {
      this.setState({
        company_bank_currency:data.value,
      });
    }
   else if (data.id == "company_currency") {
      this.setState({
        company_currency:data.value,
      });
    }
   else if (data.id == "company_terms") {
      this.setState({
        company_terms:data.value,
      });
    }

    else if (data.id == "company_registration_type") {
      this.setState({
        company_registration_type:data.value,
      });
    }

  }; 
  
  render() {
   
    
    return (<React.Fragment>
        <BreadCrumbs
          breadCrumbTitle= "Customer"
          breadCrumbParent="Corporate"
          breadCrumbActive= "Add Corporate"
        />
          <Card>
            <CardHeader>
              <CardTitle>
                Add Corporate
              </CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.handleSubmit} id="corporatedetails" >
                <hr/>
              <h5><b>Basic Details</b></h5>
                <Row>
                  <Col lg="4" >
                    <FormGroup >
                      <Label for="company_name">Company Name<span style={{color:"red"}}> *</span></Label>
                      <Input
                        type="text"
                        name="company_name"
                        value={this.state.company_name}
                        onChange={this.handleChange}
                      
                      /> 
                      <small style={{color:"red"}}>{this.state.error.company_name}</small>
                    </FormGroup>
                  </Col>
                  <Col lg="4" >
                    <FormGroup >
                      <Label for="company_alias_name">Display Name <small>(optional)</small></Label>
                      <Input 
                        type="text"
                        name="company_alias_name"
                        value={this.state.company_alias_name}
                        onChange={this.handleChange}
                      />

                    </FormGroup>
                  </Col>
                   <Col lg="4" >
                    <FormGroup >
                      <Label for="company_email">Email<span style={{color:"red"}}> *</span></Label>
                      <Input 
                        type="email"
                        name="company_email"
                        value={this.state.company_email}
                        onChange={this.handleChange}
                      />
                      <small style={{color:"red"}}>{this.state.error.company_email}</small>
                    </FormGroup>
                   
                  </Col>
                  
                  <Col lg="4" >
                    
                    <FormGroup  >
                      <Label for="company_phone_number">Phone<span style={{color:"red"}}> *</span></Label>
                      <Input
                        type="number"
                        name="company_phone_number" 
                        value={this.state.company_phone_number}
                        onChange={this.handleChange}
                      />
                       <small style={{color:"red"}}>{this.state.error.company_phone_number}</small>
                    </FormGroup>
                  </Col>
                  <Col lg="4" >
                    <FormGroup >
                      <Label for="company_mobile_number">Mobile<span style={{color:"red"}}> *</span></Label>
                      <Input name="company_mobile_number" 
                      type='number'
                             value={this.state.company_mobile_number}
                             onChange={this.handleChange} >
                      </Input>
                      <small style={{color:"red"}}>{this.state.error.company_mobile_number}</small>
                    </FormGroup>
                  </Col>
                  <Col lg="4" >
                      
                    <FormGroup >
                      <Label for="company_other">Other</Label>
                     <Input name='company_other'
                            value={this.state.company_other}
                            onChange={this.handleChange} >
                     </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="4" >
                    <FormGroup >
                      <Label for="company_website_link">Website </Label>
                      <Input name="company_website_link"
                             value={this.state.company_website_link}
                             onChange={this.handleChange} >
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="4" >
                    <FormGroup >
                      <Label for="company_registration_type">Registration Type<span style={{color:"red"}}> *</span></Label>
                      <SingleSelect   name="company_registration_type"
                          
                              selectedValue={this.state.company_registration_type}
                              options={RegistrationType}
                              getValuesFn={this.getValuesFn}
                              >
                                
                      </SingleSelect>
                      <small style={{color:"red"}}>{this.state.error.company_registration_type}</small>
                    </FormGroup>
                  </Col>
                  <Col lg="4" >
                    <FormGroup >
                      <Label for="company_registration_number">Registration Number<span style={{color:"red"}}> *</span></Label>
                      <Input name="company_registration_number" 
                             type='text'
                              value={this.state.company_registration_number}
                              onChange={this.handleChange} >
                      </Input>
                      {/* <small style={{color:"red"}}>{this.state.error.company_registration_number}</small> */}
                      <small  style={{color:"red"}}>{this.state.error.company_registration_number}</small>
                    </FormGroup>
                  </Col>
                </Row>
                <hr />    
          
            
               <h5 ><b>Billing Address</b></h5>
              
               <Row>
                    <Col lg="4">
                       <FormGroup>
                       <Label  for='company_addres1' >Address Line 1<span style={{color:"red"}}> *</span></Label>
                       <Input name="company_addres"
                              value={this.state.company_addres}
                              onChange={this.handleChange} >
                        </Input>
                        <small style={{color:"red"}}>{this.state.error.company_addres}</small>
                       </FormGroup>
                    </Col>
                    <Col lg="4">
                       <FormGroup>
                       <Label  for='company_addres2' >Address Line 2 <small>(optional)</small></Label>
                       <Input name="company_addres_2"
                              value={this.state.company_addres_2}
                              onChange={this.handleChange} >
                        </Input>
                       </FormGroup>
                    </Col>
                    <Col lg="4" >
                 <FormGroup>
                 <Label for='company_city'>City/Town<span style={{color:"red"}}> *</span></Label>
                 <Input type="text" 
                            name="company_city"
                            value={this.state.company_city}
                            onChange={this.handleChange}  >
                       
                       </Input>
                       <small style={{color:"red"}}>{this.state.error.company_city}</small>
                 </FormGroup>
                 </Col>
                 <Col lg="4" >
                          <FormGroup>
                            <Label for='company_state' >State<span style={{color:"red"}}> *</span></Label>
                            <Input type="text" 
                                   name="company_state"
                                   value={this.state.company_state}
                                   onChange={this.handleChange}  >
                            </Input>
                            <small style={{color:"red"}}>{this.state.error.company_state}</small>
                          </FormGroup>       
                </Col>
                 <Col lg="4" >
              <FormGroup>
              <Label for='company_country' >Country<span style={{color:"red"}}> *</span></Label> <br />
              <SingleSelect name="company_country"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.company_country} />
                               <small style={{color:"red"}}>{this.state.error.company_country}</small>
              </FormGroup>     
              </Col>
                <Col lg="4" >
                 <FormGroup>
                 <Label for='company_city_pincode' >Pincode<span style={{color:"red"}}> *</span></Label>
                 <Input type="text" 
                            name="company_city_pincode"
                            value={this.state.company_city_pincode}
                            onChange={this.handleChange}  >
                       
                       </Input>
                       <small style={{color:"red"}}>{this.state.error.company_city_pincode}</small>
                 </FormGroup>
                 </Col>
               </Row>
               <hr />  
               <h5><b>Office Address <small>(optional)</small></b></h5>
               <Row>
                       <Col lg="4" >
                           <FormGroup>
                                 <Label for='company_shipping_addres' >Address Line 1 </Label>
                                 <Input 
                                           name="company_shipping_addres"
                                           value={this.state.company_shipping_addres}
                                           onChange={this.handleChange} >
                                   </Input>
                           </FormGroup>
                       </Col>
                       <Col lg="4" >
                           <FormGroup>
                                 <Label for='company_shipping_addres_2' >Address Line 2 </Label>
                                 <Input 
                                           name="company_shipping_addres_2"
                                           value={this.state.company_shipping_addres_2}
                                           onChange={this.handleChange} >
                                   </Input>
                           </FormGroup>
                       </Col>
                       <Col lg="4" >
                 <FormGroup>
                 <Label for='company_shipping_city' >City/Town</Label>
                 <Input type="text" 
                            name="company_shipping_city"
                            value={this.state.company_shipping_city}
                            onChange={this.handleChange}  >
                       
                       </Input>
                 </FormGroup>
                 </Col>
                 <Col lg="4" >
              <FormGroup>
              <Label for='company_shipping_state' >State</Label>
              
              <Input type="text" 
                     name="company_shipping_state"
                     value={this.state.company_shipping_state}
                     onChange={this.handleChange}  >
                </Input>
              </FormGroup>      
              </Col>
                 <Col lg="4" >
              <FormGroup>
              <Label for='company_shipping_country' >Country</Label> <br />
              
              <SingleSelect name="company_shipping_country"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.company_shipping_country} />
              </FormGroup>
              </Col>
              <Col lg="4" >
            
            
                 <FormGroup>
                 <Label for='company_shipping_city_pincode' >Pincode</Label>
                 <Input type="text" 
                            name="company_shipping_city_pincode"
                            value={this.state.company_shipping_city_pincode}
                            onChange={this.handleChange}  >
                       
                       </Input>
                 </FormGroup>
                 </Col>
               </Row>
          
                  
                  <hr /> 
                  <h5><b>Payment Details</b></h5>
                  <Row>
                  <Col lg="3">
                        <FormGroup>
                        <Label for="company_prefered_payment_method">Preferred Payment Method</Label>
                        <Input
                             type="text"
                             name="company_prefered_payment_method"
                             value={this.state.company_prefered_payment_method}
                             onChange={this.handleChange}
                      />
                        </FormGroup>
                    </Col>
                    <Col lg="3">
                    <FormGroup>
                        <Label for="company_terms">Terms</Label>
                      
                        <SingleSelect    name="company_terms"
                          
                          selectedValue={this.state.company_terms}
                          options={Terms}
                          getValuesFn={this.getValuesFn}
                          >
                            
                  </SingleSelect>
                        </FormGroup>
                    </Col>
                    <Col lg="3">
                    <FormGroup>
                        <Label for="company_creditlimit">Credit Limit</Label>
                        <Input name='company_creditlimit' 
                               value={this.state.company_creditlimit}
                               onChange={this.handleChange} >
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                    <FormGroup>
                        <Label for="company_currency">Currency</Label> <br />
                        <SingleSelect  
                               name="company_currency"
                               selectedValue={this.state.company_currency}
                               options={currency}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
                      </FormGroup>
                    </Col>
                  </Row>  

                  <hr />
                  <h5><b>Bank Details</b></h5>
                  <Row>
                    <Col>
                        <FormGroup>
                        <Label for="company_bankname">Bank Name</Label>
                        <Input
                             type="text"
                             name="company_bankname"
                             value={this.state.company_bankname}
                             onChange={this.handleChange}
                      />
                        </FormGroup>
                    </Col>  
            
                    <Col>
                    <FormGroup>
                        <Label for="company_bank_accountnumber">Account Number</Label>
                        <Input name="company_bank_accountnumber"
                               value={this.state.company_bank_accountnumber}
                               onChange={this.handleChange} >
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="company_bank_ifscnumber">Bank Code</Label>
                        <Input name='company_bank_ifscnumber'
                               value={this.state.company_bank_ifscnumber}
                               onChange={this.handleChange} >
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>  
                  <Row>
                  <Col lg="4">
                    <FormGroup>
                        <Label for="company_bank_swiftcode">Swift Code</Label>
                        <Input name='company_bank_swiftcode'
                               value={this.state.company_bank_swiftcode}
                               onChange={this.handleChange} >
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                   
                       <FormGroup>
                        <Label for="company_bank_currency">Currency</Label> <br />
                        <SingleSelect  
                               name="company_bank_currency"
                               selectedValue={this.state.company_bank_currency}
                               options={currency}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
                      </FormGroup>
                    </Col> 
                  </Row>   
                  <hr />
                  
           
                  <h5><b>Tax Details</b></h5>
                  <Row>
                  <Col lg="6" >
                    <FormGroup>
                        <Label for="company_tax_reg_num">Tax Registration Number<span style={{color:"red"}}> *</span></Label>
                        <Input name='company_tax_reg_num'
                               value={this.state.company_tax_reg_num}
                               onChange={this.handleChange} >
                        </Input>
                        <small style={{color:"red"}}>{this.state.error.company_tax_reg_num}</small>
                      </FormGroup>
                    </Col>
                    <Col lg="6" >
                    <FormGroup>
                        <Label for="company_tax_reg_num_attachment"></Label>
                        <Input name='company_tax_reg_num_attachment' 
                               type='file'
                               onChange={this.handleChanges}  >

                              
                        </Input>
                        <small style={{color:"red"}}>{this.state.errortax}</small>
                      </FormGroup>
                      
                    </Col>
                 
                    </Row>
                    <Row>
                    <Col lg="6">
                    <FormGroup>
                        <Label for="company_pan_num">KRA Number<span style={{color:"red"}}> *</span></Label>
                        <Input  type="text"
                        
                                name='company_pan_num' 
                                value={this.state.company_pan_num}
                                onChange={this.handleChange}  >
                        </Input>
                        <small style={{color:"red"}}>{this.state.error.company_pan_num}</small> 
                      </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="company_pan_num_attachment"></Label>
                        <Input name='company_pan_num_attachment'
                               type='file'
                               onChange={this.handleChanges}  >
                        </Input>
                        
                      </FormGroup>
                      <small style={{color:"red"}}>{this.state.errorkra}</small> 
                    </Col>
                  
                  </Row> 
                  <Row> 
                       <Col lg="6" >
                                  <FormGroup>
                                        <Label>Other Documents <small>(optional)</small></Label>
                                        <Input 
                                         type="text"
                                        name="company_other_doc"
                                               value={this.state.company_other_doc}
                                               onChange={this.handleChange} >
                                        </Input>
                                  </FormGroup>   
                       </Col>
                       <Col lg="6" >
                                  <FormGroup>
          
                                        <Label></Label>
                                        <Input name='company_other_attachment'
                                               type='file'
                                               onChange={this.handleChanges}>
                   </Input>
                   <small style={{color:"red"}}>{this.state.errorother}</small>
                        
                                  </FormGroup>   
                       </Col>
                      
                    
                  </Row> 
                  <hr/>
      
                  <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <Link to="/customer/corporate" ><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Cancel</Button> </Link>
{/* <Button id='corporatesubmitbtn' type='submit' value="submit" color='primary mr-2'>Submit</Button>  */}
{this.state.btnLoading ? (
                <Button.Ripple color="primary" type="button">
                  <Spinner color="white" size="sm" />
                  <span className="ml-50">Loading...</span>
                </Button.Ripple>
              ) : (
                <Button.Ripple color="primary" type="submit">
                 Submit
                </Button.Ripple>
              )}
</div>
              </form>
            </CardBody>
          </Card>
         
      </React.Fragment>
      );
  }
}

