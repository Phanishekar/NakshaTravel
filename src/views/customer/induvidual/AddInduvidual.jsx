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
  Input
} from "reactstrap";

import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Plus } from "react-feather"
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
// import Input from "components/common/formBasic/input";
// import File from "components/common/formBasic/file";
import { toast } from "react-toastify";
import axios from "axios";
import Select from 'react-select'
import { validateIndividual } from './validationindividual/ValidationIndividual';

import SingleSelect from 'components/common/formBasic/singleSelect';

import {country,currency,RegistrationType,Terms,gender,bloodgroup} from "./../../country/CountryList"



export default class AddInduvidual extends Component {
  constructor(props) {
    super(props);

    this.state = {
      corparate_name: '',
      // corparate_customer_id: this.props.match.params.id,
      individual_first_name: "",
      individual_last_name: "",
      individual_gender: "",
      individual_dob: "",
      individual_email: "",
      individual_phone_number: "",
      individual_mobile_number: "",
      individual_passport_number: "",
      individual_passport_issue_date: "",
      individual_passport_expiry_date: "",
      individual_passport_attachment: "",
      individual_id_number: "",
      individual_id_issue_date: "",
      individual_id_expiry_date: "",
      individual_id_attachment: "",
      individual_kraORpan_number: "",
      individual_kraORpan_issue_date: "",
      individual_kraORpan_expiry_date: "",
      individual_kraORpan_attachment: "",
      individual_citizenship: "",
      individual_yellowfever_attachment: "",
      individual_covid19_attachment: "",
      individual_othervacination_attachment: "",
      individual_drivinglicense_number: "",
      individual_drivinglicense_issue_date: "",
      individual_drivinglicense_expiry_date: "",
      individual_drivinglicense_attachment: "",
      individual_insurenceCompany_Name: "",
      individual_insurence_number: "",
      
      individual_insurence_issue_date: "",
      individual_insurence_expiry_date: "",
      individual_insurence_attachment: "",
      individual_residential_street: "",
      individual_residential_street_2: "",
      individual_residential_city: "",
      individual_residential_state: "",
      individual_residential_pincode: "",
      individual_residential_country: "",
      individual_emergency_contact_number: "",
      individual_account_number:"",
      individual_bankname:'',
       individual_account_code:'',
      individual_swift_code:'',
      individual_currency:'',
      individual_billing_street: "",
      individual_billing_city: "",
      individual_billing_state: "",
      individual_billing_street_2:'',
      individual_billing_country: "",
      individual_billing_pincode: "",
     
      individual_blood_group: "",
      errorpassport:"",
      erroryellowfever:"",
      errordrivinglicence:"",
      errorid:"",
      errorkraORpan:"",
      errorcovid19:"",
      errorothervacination:"",
      errorinsurence:"",
      filee:true,
      customer: "",
      ledger: [],
      familys: [],
      error:"",
      loading: true,

    };

    this.initialState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChanges = (e) => {  
    let x="";
           x= validateIndividual(e); 
           console.log(x);       
           if(x.for=="individual_passport_attachment")
           {
            this.setState({
              errorpassport:x.errorr,
              filee:x.filee,
                      });
           }
           else if(x.for=="individual_yellowfever_attachment")
           {
            this.setState({
              erroryellowfever:x.errorr,
              filee:x.filee,
                      });
           }
           else if(x.for=="individual_drivinglicence_attachment")
           {
            this.setState({
              errordrivinglicence:x.errorr,
              filee:x.filee,
                      });
           }
           else if(x.for=="individual_id_attachment")
           {
            this.setState({
              errorid:x.errorr,
              filee:x.filee,
                      });
           }
           else if(x.for=="individual_kraORpan_attachment")
           {
            this.setState({
              errorkraORpan:x.errorr,
              filee:x.filee,
                      });
           }
           else if(x.for=="individual_covid19_attachment")
           {
            this.setState({
              errorcovid19:x.errorr,
              filee:x.filee,
                      });
           }
           else if(x.for=="individual_othervacination_attachment")
           {
            this.setState({
              errorothervacination:x.errorr,
              filee:x.filee,
                      });
           }
           else if(x.for=="individual_insurence_attachment")
           {
            this.setState({
              errorinsurence:x.errorr,
              filee:x.filee,
                      });
           }
                    
              } 
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    this.setState(
      {
        btnLoading:true,
      }
      );
    var formData = new FormData(document.querySelector("#individual"));
    let i = 0, Name = [], Data = [];
    for (var pair of formData.entries()) {
      console.log(pair[0], pair[1]);
      Name[i] = pair[0];
      Data[i] = pair[1];
      i++;
    }

    for (var j = 0; j < i; j++) {
      formData.append(Name[i], Data[i]);
    }
    e.preventDefault();
    if(this.state.filee){
    axios
      .post(`/api/individualcustomer/save`, formData)
      .then((response) => {
        if (response.data.status == 200) {
          toast.success(response.data.Result);
          this.props.history.push(`/customer/induvidual`);
        } else {
          this.setState({
            error : response.data.Result,
            btnLoading:false,
          })
          toast.error("please check all the details");
          ;
        }
      })
      .catch((error) => {
        toast.error("Can't add this details");
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
     
    if (data.id == "individual_residential_country") {
      this.setState({
        individual_residential_country:data.value,

      });
    }

    else if (data.id == "individual_billing_country") {
      this.setState({
        individual_billing_country:data.value,
      });
    }
    else if (data.id == "individual_gender") {
      this.setState({
        individual_gender:data.value,
      });
    }
    else if (data.id == "individual_citizenship") {
      this.setState({
        individual_citizenship:data.value,
      });
    }
    else if (data.id == "individual_blood_group") {
      this.setState({
        individual_blood_group:data.value,
      });
    }
    else if (data.id == "individual_currency") {
      this.setState({
        individual_currency:data.value,
      });
    }
   
  }; 


  render() {





    return (<React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Customer"
        breadCrumbParent="Individual"
        breadCrumbActive="Add Individual"
      />
      <Card>
        <CardHeader>
          <CardTitle>
            Add Individual Customer
          </CardTitle>
        </CardHeader>
        <CardBody>


          <form onSubmit={this.handleSubmit} id="individual"  >
            <Input
              type="hidden"
              name="corparate_customer_id"
              value="0"
            />

            <Row>
              <Col lg="4" >
                <FormGroup >
                  <Label for="individual_first_name">First Name<span style={{color:"red"}}> *</span></Label>
                  <Input
                    type="text"
                    name="individual_first_name"
                    placeholder="Enter first Name"
                    value={this.state.individual_first_name}
                    onChange={this.handleChange}
                  />
                  <small style={{color:"red"}}>{this.state.error.individual_name}</small>
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup >
                  <Label for="individual_last_name">Last Name<span style={{color:"red"}}> *</span></Label>
                  <Input
                    type="text"
                    name="individual_last_name"
                    placeholder="Enter Last Name"
                    value={this.state.individual_last_name}
                    onChange={this.handleChange}
                  />
                  <small style={{color:"red"}}>{this.state.error.individual_name}</small>
                </FormGroup>
              </Col>
              
                <Col lg="4"  >
                  <FormGroup >
                    <Label for="gender">Gender<span style={{color:"red"}}> *</span></Label>
                    <SingleSelect
                      name="individual_gender"
                      options={gender}
                      selectedValue={this.state.individual_gender}
                      getValuesFn={this.getValuesFn} >
                        

                    </SingleSelect>
                    <small style={{color:"red"}}>{this.state.error.individual_gender}</small>

                  </FormGroup>
                </Col>

             
              <Col lg="4"  >
                <FormGroup >
                  <Label for="individual_dob">Date of Birth *</Label>
                  <Input type="date"
                    name="individual_dob"
                    value={this.state.individual_dob}
                    onChange={this.handleChange} >
                  </Input>
                  <small style={{color:"red"}}>{this.state.error.individual_dob}</small>
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup >
                  <Label for="individual_email">Email<span style={{color:"red"}}> *</span></Label>
                  <Input
                    type="email"
                    name="individual_email"
                    value={this.state.individual_email}
                    onChange={this.handleChange}
                  />
                  <small style={{color:"red"}}>{this.state.error.individual_email}</small>
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup >
                  <Label for="individual_Phone_number">Phone Number<span style={{color:"red"}}> *</span></Label>
                  <Input
                    type="text"
                    name="individual_phone_number"
                    value={this.state.individual_phone_number}
                    onChange={this.handleChange}
                  />
                  <small style={{color:"red"}}>{this.state.error.individual_phone_number}</small>
                </FormGroup>

              </Col>
             
              <Col lg="4" >
                <FormGroup>
                  <Label for='individual_citizenship' >Citizenship</Label> <SingleSelect name="individual_citizenship"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.individual_citizenship} />
                  
                </FormGroup>
              </Col>

              <Col lg="4">
                <FormGroup>

                  <Label for='individual_emergency_contact_number' >Emergency Contact Number</Label>
                  <Input type="number"
                    name="individual_emergency_contact_number"
                    value={this.state.individual_emergency_contact_number}
                    onChange={this.handleChange} ></Input>
                </FormGroup>
              </Col>
           
              <Col lg="4" >
    <FormGroup>
    <Label for="blood_group" >Blood Group</Label>
    <SingleSelect  name="individual_blood_group" 
          
             options={bloodgroup}             
             getValuesFn={this.getValuesFn}
             selectedValue={this.state.individual_blood_group} />
            </FormGroup>
            </Col>
            </Row>
            <hr />
            
            <h5 ><b>Billing address</b></h5>
            <Row>
            <Col lg="4">
                       <FormGroup>
                       <Label  for='company_addres1' >Address Line 1<span style={{color:"red"}}> *</span></Label>
                       <Input name="individual_residential_street"
                              value={this.state.individual_residential_street}
                              onChange={this.handleChange} >
                        </Input>
                        <small style={{color:"red"}}>{this.state.error.individual_residential_street}</small>
                       </FormGroup>
                    </Col>
                    <Col lg="4">
                       <FormGroup>
                       <Label  for='individual_residential_street2' >Address Line 2<small>(optional)</small></Label>
                       <Input name="individual_residential_street_2"
                              value={this.state.individual_residential_street_2}
                              onChange={this.handleChange} >
                        </Input>

                       </FormGroup>
                    </Col>
                    <Col lg="4">
                <FormGroup>
                  <Label for="individual_residential_city">City/Town<span style={{color:"red"}}> *</span></Label>
                  <Input type='text'
                    name='individual_residential_city'
                    value={this.state.individual_residential_city}
                    onChange={this.handleChange} >
                  </Input>
                  <small style={{color:"red"}}>{this.state.error.individual_residential_city}</small>
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <Label for="individual_residential_state">State<span style={{color:"red"}}> *</span></Label>
                  <Input name='individual_residential_state'
                    value={this.state.individual_residential_state}
                    onChange={this.handleChange} >
                  </Input>
                  <small style={{color:"red"}}>{this.state.error.individual_residential_state}</small>
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup>
                 
                    <Label>Country<span style={{color:"red"}}> *</span></Label>
                      <SingleSelect name="individual_residential_country"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.individual_residential_country} />
                  <small style={{color:"red"}}>{this.state.error.individual_residential_country}</small>
                </FormGroup>
              </Col>
              
              <Col lg="4" >
                <FormGroup>
                  <Label for="individual_residential_pincode">Pincode<span style={{color:"red"}}> *</span></Label>
                  <Input type='text'
                    name='individual_residential_pincode'
                    value={this.state.individual_residential_pincode}
                    onChange={this.handleChange}>
                  </Input>
                  <small style={{color:"red"}}>{this.state.error.individual_residential_pincode}</small>
                </FormGroup>
              </Col>
            </Row>
            <hr/>
            <h5 ><b>Residential address <small>(optional)</small></b></h5>
            <Row>
            <Col lg="4">
                       <FormGroup>
                       <Label  for='individual_billing_street' >Address Line 1 </Label>
                       <Input name="individual_billing_street"
                              value={this.state.individual_billing_street}
                              onChange={this.handleChange} >
                        </Input>
                        
                       </FormGroup>
                    </Col>
                    <Col lg="4">
                       <FormGroup>
                       <Label  for='individual_billing_street_2' >Address Line 2</Label>
                       <Input name="individual_billing_street_2"
                              value={this.state.individual_billing_street_2}
                              onChange={this.handleChange} >
                        </Input>

                       </FormGroup>
                    </Col>
                    <Col lg="4">
                <FormGroup>

                  <Label for="individual_billing_city">City/Town</Label>
                  <Input type='text'
                    name='individual_billing_city'
                    value={this.state.individual_billing_city}
                    onChange={this.handleChange} >
                  </Input>
                  <small style={{color:"red"}}>{this.state.error.individual_billing_city}</small>
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <Label for="individual_billing_state">State</Label>
                  <Input name='individual_billing_state'
                    value={this.state.individual_billing_state}
                    onChange={this.handleChange} >
                  </Input>
                  <small style={{color:"red"}}>{this.state.error.individual_billing_state}</small>
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup>
                 
                    <Label>Country</Label>
                      <SingleSelect name="individual_billing_country"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.individual_billing_country} />
                  <small style={{color:"red"}}>{this.state.error.individual_billing_country}</small>
                </FormGroup>
              </Col>
              
              <Col lg="4" >
                <FormGroup>
                  <Label for="individual_billing_pincode">Pincode</Label>
                  <Input type='text'
                    name='individual_billing_pincode'
                    value={this.state.individual_billing_pincode}
                    onChange={this.handleChange}>
                  </Input>
                  <small style={{color:"red"}}>{this.state.error.individual_billing_pincode}</small>
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <h5><b>Passport Details</b></h5>
            <Row  >
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_passport_number">Passport Number</Label>
                  <Input
                    type="text"
                    name="individual_passport_number"
                    value={this.state.individual_passport_number}
                    onChange={this.handleChange}
                  />
                  
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_passport_issue_date">Issue Date</Label>
                  <Input type="date"
                    name="individual_passport_issue_date"
                    value={this.state.individual_passport_issue_date}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_passport_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_passport_expiry_date"
                    value={this.state.individual_passport_expiry_date}
                    onChange={this.handleChange}>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup >
                  <Label></Label>
                  <Input className="mt-0"
                    type='file'
                    name="individual_passport_attachment"
                    onChange={this.handleChanges}
                  />
<small style={{color:"red"}}>{this.state.errorpassport}</small>
                  {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_passport_attachment}  alt="Card image cap" /> */}
                </FormGroup>
              </Col>

            </Row>
            <hr />
                  <h5><b>Bank Details</b></h5>
                  <Row>
                    <Col>
                        <FormGroup>
                        <Label for="individual_bankname">Bank Name</Label>
                        <Input
                             type="text"
                             name="individual_bankname"
                             value={this.state.individual_bankname}
                             onChange={this.handleChange}
                      />
                        </FormGroup>
                    </Col>  
            
                    <Col>
                    <FormGroup>
                        <Label for="individual_account_number">Account Number</Label>
                        <Input name="individual_account_number"
                               value={this.state.individual_account_number}
                               onChange={this.handleChange} >
                        </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="individual_account_code">Bank Code</Label>
                        <Input name='individual_account_code'
                               value={this.state.individual_account_code}
                               onChange={this.handleChange} >
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>  
                  <Row>
                  <Col lg="4">
                    <FormGroup>
                        <Label for="individual_swift_code">Swift Code</Label>
                        <Input name='individual_swift_code'
                               value={this.state.individual_swift_code}
                               onChange={this.handleChange} >
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                   
                       <FormGroup>
                        <Label for="individual_currency">Currency</Label> <br />
                        <SingleSelect  
                               name="individual_currency"
                               selectedValue={this.state.individual_currency}
                               options={currency}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
                      </FormGroup>
                    </Col> 
                  </Row>   
            <hr />
            <h5 ><b>Driving License</b></h5>
            <Row  >
            <Col lg="3">
                <FormGroup>
                  <Label for="individual_insurence_number4">Driving License</Label>
                  <Input
                    type="text"
                    name="individual_drivinglicence_number"
                    value={this.state.individual_drivinglicence_number}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_drivinglicence_issue_date">Issue Date</Label>
                  <Input type="date"
                    name="individual_drivinglicence_issue_date"
                    value={this.state.individual_drivinglicence_issue_date}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_drivinglicence_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_drivinglicence_expiry_date"
                    value={this.state.individual_drivinglicence_expiry_date}
                    onChange={this.handleChange} >
                  </Input>

                </FormGroup>
              </Col>
              <Col lg="3">
              <FormGroup >
                <Label></Label>
                <Input className="mt-0" type='file'
                  name="individual_drivinglicense_attachment"
                  onChange={this.handleChanges}
                />
<small style={{color:"red"}}>{this.state.errordrivinglicence}</small>
                {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_driving_license_attachment}  alt="Card image cap" /> */}
              </FormGroup>
              </Col>
            </Row>
            <hr />
            
            <h5 ><b>Government ID</b></h5>
            <Row  >
            <Col lg="3">
                <FormGroup>
                  <Label for="individual_id_number">ID Number</Label>
                  <Input
                    type="text"
                    name="individual_id_number"
                    value={this.state.individual_id_number}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_id_issue_date">Issue Date</Label>
                  <Input type="date"
                    name="individual_id_issue_date"
                    value={this.state.individual_id_issue_date}
                    onChange={this.handleChange}>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_id_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_id_expiry_date"
                    value={this.state.individual_id_expiry_date}
                    onChange={this.handleChange}>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup >
                  <Label for='individual_id_attachment' ></Label>
                  <Input className="mt-0" type='file'
                    name="individual_id_attachment"
                    onChange={this.handleChanges}
                  />
<small style={{color:"red"}}>{this.state.errorid}</small>
                  {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_id_attachment}  alt="Card image cap" /> */}
                </FormGroup>
              </Col>

            </Row>
            <hr />
            <h5 ><b>KRA/PAN Details</b></h5>
            <Row  >
            <Col lg="3">
                <FormGroup>
                  <Label for="individual_kraORpan_number">KRA/PAN Number</Label>
                  <Input
                    type="text"
                    name="individual_kraORpan_number"
                    value={this.state.individual_kraORpan_number}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>

                  <Label for="individual_kraORpan_issue_date">Issue Date</Label>
                  <Input
                    type="date"
                    name="individual_kraORpan_issue_date"
                    value={this.state.individual_kraORpan_issue_date}
                    onChange={this.handleChange}>
                  </Input>

                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_kraORpan_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_kraORpan_expiry_date"
                    value={this.state.individual_kraORpan_expiry_date}
                    onChange={this.handleChange} >

                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup >
                  <Label for='individual_kraORpan_attachment' ></Label>
                  <Input className="mt-0" type='file'
                    name="individual_kraORpan_attachment"
                    onChange={this.handleChanges}
                  />
<small style={{color:"red"}}>{this.state.errorkraORpan}</small>
                  {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_kraORpan_attachment}  alt="Card image cap" /> */}
                </FormGroup>
              </Col>

            </Row>
            <hr />
           
            <h5 ><b>Vaccination Details</b></h5>
            <Row className='mt-1' >
              <Col>
                <Label for='individual_yellow_fever_attachment' >Yellow Fever</Label>
              </Col>
              <Col>
                <Input name="individual_yellowfever_attachment"
                  type='file'
                  onChange={this.handleChanges} />
<small style={{color:"red"}}>{this.state.erroryellowfever}</small>
                {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_yellow_fever_attachment}  alt="Card image cap" /> */}
              </Col>

            </Row>
            <Row className='mt-1' >
              <Col>
                <Label for='individual_covid19_attachment' >Covid 19</Label>
              </Col>
              <Col>
                <Input name="individual_covid19_attachment"
                  type='file'
                  onChange={this.handleChanges} />
<small style={{color:"red"}}>{this.state.errorcovid19}</small>
                {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_covid19_attachment}  alt="Card image cap" /> */}
              </Col>

            </Row>
            <Row className='mt-1' >
              <Col>
                <Label for='individual_othervacination_attachment' >Other Vacination</Label>
              </Col>
              <Col>
                <Input type='file'
                  name="individual_othervacination_attachment"
                  onChange={this.handleChanges} />
<small style={{color:"red"}}>{this.state.errorothervacination}</small>
                {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_certificate_attachment}  alt="Card image cap" /> */}
              </Col>

            </Row>
            <hr />
            
            <h5 ><b>Insurence Details</b></h5>
            <Row>
            <Col lg="3">
                <FormGroup>
                  <Label for="individual_insurenceCompany_Name">Company Name</Label>
                  <Input name="individual_insurenceCompany_Name"
                    value={this.state.individual_insurenceCompany_Name}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
              </Col>
            <Col lg="3">
                <FormGroup>
                  <Label for="individual_insurence_number1">Policy Number</Label>
                  <Input name="individual_insurence_number"
                    value={this.state.individual_insurence_number}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_insurence_issue_date">issue date</Label>
                  <Input type="date"
                    name="individual_insurence_issue_date"
                    value={this.state.individual_insurence_issue_date}
                    onChange={this.handleChange}>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_insurence_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_insurence_expiry_date"
                    value={this.state.individual_insurence_expiry_date}
                    onChange={this.handleChange}  >
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup >
                  <Label for='individual_insurence_attachment' ></Label>
                  <Input className="mt-0" type='file'
                    name="individual_insurence_attachment"
                    onChange={this.handleChanges}
                  />
<small style={{color:"red"}}>{this.state.errorinsurence}</small>
                  {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_insurence_attachment}  alt="Card image cap" /> */}
                </FormGroup>
              </Col>

            </Row>
            
          
            
            <hr />
 
            
            <div style={{display:"flex",justifyContent:"flex-end"}}>
            <Link to={"/customer/induvidual"}><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Cancel</Button></Link>
            <div className="d-flex justify-content-between">              
              {this.state.btnLoading ? (
                <Button.Ripple color="primary" type="button">
                  <Spinner color="white" size="sm" />
                  <span className="ml-50">Loading...</span>
                </Button.Ripple>
              ) : (
                <Button.Ripple color="primary" type="submit">Submit</Button.Ripple>
              )}
            </div>
            </div>
          </form>

        </CardBody>
      </Card>

    </React.Fragment>
    );
  }
}
