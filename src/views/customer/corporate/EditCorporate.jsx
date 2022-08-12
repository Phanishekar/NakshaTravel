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
  import Pagination from 'react-js-pagination';
  import * as Icon from "react-feather";
import EmployeeList from './EmployeeList';
import {country,currency,RegistrationType,Terms} from "./../../country/CountryList"
import {validateCorporate} from "./validatefiles/CorporateValidation"



export default class EditCorporate extends Component {
   
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
            company_shipping_addres_2 :"",
            company_shipping_city_pincode:"",
            company_country:"", 
            company_state:"", 
            company_city:"", 
            company_addres:"",
            company_addres_2:"",
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
            company_id:'',
          ledger:[],
          customer:"",
          loading:true,
          users:'',
          loading:true,
          user:[],
          total:'',
          error:'',
          errortax:'',
          errorkra:'',
          errorother:'',
          filee:true,
          btnLoading:false,

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
                  filee:false,
                          });
               }
               else if(x.for=="company_pan_num_attachment")
               {
                this.setState({
                  errorkra:x.errorr,
                  filee:false,
                          });
               }
               else if(x.for=="company_tax_reg_num_attachment")
               {
                this.setState({
                  errortax:x.errorr,
                  filee:false,
                          });
               }
                        
                  } 
        
    
      handleChange = (e) => {    
        const { name, value,} = e.target;
        this.setState({ [name]: value });
    } 

    toggleActice= async(e)=>{
      let id=this.props.match.params.id;
      const resp= await axios.get(`/api/corporatecustomer/toggleActive/${id}`);
      if(resp.data.status==200)
      {
        toast.warning(resp.data.Result);
            
            this.props.history.push(`/customer/corporate/`);
      }
      else{
        toast.error("Oops! Something went Wrong");
      }

      }


    handleSubmit = (e) => {

      this.setState(
        {
          btnLoading:true,
        }
        );
      
      var formData = new FormData(document.querySelector("#corporatedetails2"));
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
        let id=this.props.match.params.id;
        axios
        .post(`/api/corporatecustomer/update/${id}`, formData)
        .then((response) => {
          if (response.data.status == 200) {
            toast.success(response.data.Result);
            console.log(id);
            this.props.history.push(`/customer/corporate/`);
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
              }
              );
          }
        })
        .catch((error) => {
          toast.error("Cant Update Record");
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
   else if (data.id == "company_currency") {
      this.setState({
        company_currency:data.value,
      });
    }
   else if (data.id == "company_bank_currency") {
      this.setState({
        company_bank_currency:data.value,
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
  
  async componentDidMount() {
    let id=this.props.match.params.id;
    const res= await axios.get(`/api/corporatecustomer/getById/${id}`);
  
    console.log(res.data);

   
    if(res.data.status==200)
    {
      this.setState(
        {
            company_id:res.data.customer.corparate_customer_id,
            company_name:res.data.customer.company_name,
            company_alias_name:res.data.customer.company_alias_name, 
            company_email:res.data.customer.company_email, 
            company_website_link:res.data.customer.company_website_link,
            company_phone_number:res.data.customer.company_phone_number,
            company_mobile_number:res.data.customer.company_mobile_number, 
            company_other:res.data.customer.company_other, 
            company_registration_type:res.data.customer.company_registration_type,
            company_registration_number:res.data.customer.company_registration_number,
            company_shipping_country:res.data.customer.company_shipping_country, 
            company_shipping_state:res.data.customer.company_shipping_state, 
            company_shipping_city :res.data.customer.company_shipping_city,
            company_shipping_addres :res.data.customer.company_shipping_addres,
            company_shipping_addres_2 :res.data.customer.company_shipping_addres_2,
            company_shipping_city_pincode:res.data.customer.company_shipping_city_pincode,
            company_country:res.data.customer.company_country, 
            company_state:res.data.customer.company_state, 
            company_city:res.data.customer.company_city, 
            company_addres:res.data.customer.company_addres,
            company_addres_2:res.data.customer.company_addres_2,
            company_city_pincode:res.data.customer.company_city_pincode,
            company_prefered_payment_method:res.data.customer.company_prefered_payment_method, 
            company_terms:res.data.customer.company_terms, 
            company_creditlimit:res.data.customer.company_creditlimit, 
            company_currency:res.data.customer.company_currency, 
            company_bankname:res.data.customer.company_bankname, 
            company_bank_accountnumber:res.data.customer.company_bank_accountnumber, 
            company_bank_ifscnumber:res.data.customer.company_bank_ifscnumber,
            company_bank_swiftcode:res.data.customer.company_bank_swiftcode, 
            company_bank_currency:res.data.customer.company_bank_currency,
            company_tax_reg_num:res.data.customer.company_tax_reg_num, 
            company_tax_reg_num_attachment:res.data.customer.company_tax_reg_num_attachment, 
            company_pan_num:res.data.customer.company_pan_num, 
            company_pan_num_attachment:res.data.customer.company_pan_num_attachment,
            company_other_doc:res.data.customer.company_other_doc,
             company_other_attachment:res.data.customer.company_other_attachment, 
            company_approved:res.data.customer.company_approved,
            company_active:res.data.customer.company_active,
        }
      )
    }
  } 


  render() {
   
 
     
    
    
    return (<React.Fragment>
        <BreadCrumbs
          breadCrumbTitle= "Customer"
          breadCrumbParent="Corporate"
          breadCrumbActive= "Edit Corporate"
        />
          <Card>
            <CardHeader>
              <CardTitle>
                Edit Corporate
              </CardTitle>
              <div style={{display:"flex",justifyContent:"flex-end"}}>
                  {this.state.company_active=="Active"?<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-success mr-2'>{this.state.company_active}</Button>:<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-danger mr-2'>{this.state.company_active}</Button>} </div>
            </CardHeader>
            <CardBody>
            <form onSubmit={this.handleSubmit} id="corporatedetails2" >
            <Input
              type="hidden"
              name="corparate_customer_id"
              value="0"
            />
                <hr/>
              <h5><b>Basic Details</b></h5>
                <Row>
                  <Col lg="4" >
                    <FormGroup >
                      <Label for="company_name">Company Name </Label>
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
                      <Label for="company_alias_name">Display Name</Label>
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
                      <Label for="company_email">Email </Label>
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
                      <Label for="company_phone_number">Phone </Label>
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
                      <Label for="company_mobile_number">Mobile </Label>
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
                      <Label for="company_website_link">Website</Label>
                      <Input name="company_website_link"
                             value={this.state.company_website_link}
                             onChange={this.handleChange} >
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="4" >
                    <FormGroup >
                      <Label for="company_registration_type">Registration Type</Label>
                      <SingleSelect    name="company_registration_type"
                          
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
                      <Label for="company_registration_number">Registration Number </Label>
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
                       <Label  for='company_addres1' >Address Line 1 </Label>
                       <Input name="company_addres"
                              value={this.state.company_addres}
                              onChange={this.handleChange} >
                        </Input>
                        <small style={{color:"red"}}>{this.state.error.company_addres}</small>
                       </FormGroup>
                    </Col>
                    <Col lg="4">
                       <FormGroup>
                       <Label  for='company_addres2' >Address Line 2</Label>
                       <Input name="company_addres_2"
                              value={this.state.company_addres_2}
                              onChange={this.handleChange} >
                        </Input>
                       </FormGroup>
                    </Col>
                    <Col lg="4" >
                 <FormGroup>
                 <Label for='company_city'>City/Town </Label>
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
                            <Label for='company_state' >State </Label>
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
              <Label for='company_country' >Country </Label> <br />
              <SingleSelect name="company_country"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.company_country} />
                               <small style={{color:"red"}}>{this.state.error.company_country}</small>
              </FormGroup>     
              </Col>
                <Col lg="4" >
                 <FormGroup>
                 <Label for='company_city_pincode' >Pincode </Label>
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
               <h5><b>Office Address</b></h5>
               <Row>
                       <Col lg="4" >
                           <FormGroup>
                                 <Label for='company_shipping_addres' >Address Line 1</Label>
                                 <Input 
                                           name="company_shipping_addres"
                                           value={this.state.company_shipping_addres}
                                           onChange={this.handleChange} >
                                   </Input>
                           </FormGroup>
                       </Col>
                       <Col lg="4" >
                           <FormGroup>
                                 <Label for='company_shipping_addres_2' >Address Line 2</Label>
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
                        <Label for="company_tax_reg_num">Tax Registration Number </Label>
                        <Input name='company_tax_reg_num'
                               value={this.state.company_tax_reg_num}
                               onChange={this.handleChange} >
                        </Input>
                        
                      </FormGroup>
                    </Col>
                    <Col lg="6" >
                    <FormGroup>
                        <Label for="company_tax_reg_num_attachment"></Label>
                        <Input name='company_tax_reg_num_attachment' 
                               type='file'
                               onChange={this.handleChanges}
                                 >
                        </Input>
                        {this.state.errortax?<small style={{color:"red"}}>{this.state.errortax}</small> :<a href={"https://wellniverse.in/Naksha/api/" + this.state.company_tax_reg_num_attachment} target='blank'>{this.state.company_tax_reg_num_attachment}</a>
                          }        
                      </FormGroup>
                    </Col>
                 
                    </Row>
                    <Row>
                    <Col lg="6">
                    <FormGroup>
                        <Label for="company_pan_num">Tax Number </Label>
                        <Input  type="text"
                        
                                name='company_pan_num' 
                                value={this.state.company_pan_num}
                                onChange={this.handleChange}  >
                        </Input>
                       
                      </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="company_pan_num_attachment"></Label>
                        <Input name='company_pan_num_attachment'
                               type='file'
                               onChange={this.handleChanges}  >
                        </Input>
                        {this.state.errorkra?<small style={{color:"red"}}>{this.state.errorkra}</small> :<a href={"https://wellniverse.in/Naksha/api/" + this.state.company_pan_num_attachment} target='blank'>{this.state.company_pan_num_attachment}</a>
  }
                      </FormGroup>
                    </Col>
                  
                  </Row>  
                  <Row> 
                       <Col lg="6" >
                                  <FormGroup>
                                        <Label>Other Documents</Label>
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
                                               onChange={this.handleChanges}/> 
                   {this.state.errorother?<small style={{color:"red"}}>{this.state.errorother}</small>:<a href={"https://wellniverse.in/Naksha/api/" + this.state.company_other_attachment} target='blank'>{this.state.company_other_attachment}</a>
  }
                        
                                  </FormGroup>   
                       </Col>
                      
                    
                  </Row> 
                  <hr/>
                  <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <Link to="/customer/corporate" ><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Back</Button> </Link>
{/* <Button id='corporatesubmitbtn' type='submit' value="submit" color='primary mr-2'>Update</Button>  */}
<div className="d-flex justify-content-between">              
              {this.state.btnLoading ? (
                <Button.Ripple color="primary" type="button">
                  <Spinner color="white" size="sm" />
                  <span className="ml-50">Loading...</span>
                </Button.Ripple>
              ) : (
                <Button.Ripple color="primary" type="submit">Update</Button.Ripple>
              )}
            </div>
</div>
              </form>
            </CardBody>
          </Card>
       <EmployeeList id={this.props.match.params.id}  faname={this.state.company_name}  />
      
      </React.Fragment>
      );
  }
}
