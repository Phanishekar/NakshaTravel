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
  Table,
} from "reactstrap";

import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Plus } from "react-feather"
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";

import { toast } from "react-toastify";
import axios from "axios";
import Select from 'react-select'
import SingleSelect from "components/common/formBasic/singleSelect";
import { validateEmployee } from './validatefiles/EmployeeValidation';
import * as Icon from "react-feather";
import EmployeeFamilyList from './EmployeeFamilyList';

import {country,currency,RegistrationType,Terms,gender,bloodgroup} from "./../../country/CountryList"


export default class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      corparate_name: '',
      corparate_id: '',
      individual_id: this.props.match.params.id,
      individual_first_name: "",
      individual_last_name: "",
      individual_gender: "",
      individual_dob: "",
      individual_email: "",
      individual_phone_number: "",
      individual_citizenship: "",
      individual_emergency_contact_number: "",
      individual_blood_group: "",
      individual_residential_street: "",
      individual_residential_street_2: "",
      individual_residential_city: "",
      individual_residential_state: "",
      individual_residential_pincode: "",
      individual_residential_country: "",
      individual_billing_street: "",
      individual_billing_city: "",
      individual_billing_state: "",
      individual_billing_pincode: "",
      individual_billing_country: "",
      individual_permanent_street: "",
      individual_permanent_city: "",
      individual_permanent_state: "",
      individual_permanent_pincode: "",
      individual_permanent_country: "",
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
      individual_yellowfever_attachment: "",
      individual_covid19_attachment: "",
      individual_othervacination_attachment: "",
      individual_drivinglicence_number: "",
      individual_drivinglicence_issue_date: "",
      individual_drivinglicence_expiry_date: "",
      individual_drivinglicence_attachment: "",
      individual_insurenceCompany_Name: "",
      individual_insurence_number: "",
      individual_insurence_issue_date: "",
      individual_insurence_expiry_date: "",
      individual_insurence_attachment: "",
      customer: "",
      individual_blood_group: "",
      familys: [],
      ledger: [],
      customer: "",
      loading: true,
      users: '',
      error:"",
      errorpassport:"",
      erroryellowfever:"",
      errordrivinglicence:"",
      errorid:"",
      errorkraORpan:"",
      errorcovid19:"",
      errorothervacination:"",
      errorinsurence:"",
      filee:true,
 
      user: [],
      total: '',
      btnLoading:false,


    };

    this.initialState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChanges = (e) => {  
    let x="";
           x= validateEmployee(e); 
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
    var formData = new FormData(document.querySelector("#employee"));
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
      .post(`/api/individualcustomer/update/${this.state.individual_id}`, formData)
      .then((response) => {
        if (response.data.status == 200) {
          toast.success(response.data.Result);
          this.props.history.push(`/customer/corporate/edit/${this.state.corparate_id}`);
          this.setState(
            {
              btnLoading:false,
            }
            );
        } else {
          toast.error("Please check the all details");
          this.setState({
            error : response.data.Result,
            btnLoading:false,
          })
        }
       
      })
      .catch((error) => {
        toast.error("Can't Update this details");
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
    let id = this.props.match.params.id;

    const res = await axios.get(`/api/individualcustomer/getById/${id}`);
    const str=res.data.customer.individual_name;
       const names=str.split(" ");
    if (res.data.status == 200) {
      this.setState(
        {
          corparate_name: res.data.customer.company_name,
          corparate_id: res.data.customer.corparate_customer_id,
          individual_first_name:names[0],
          individual_last_name: names[2],
          individual_gender: res.data.customer.individual_gender,
          individual_dob: res.data.customer.individual_dob,
          individual_email: res.data.customer.individual_email,
          individual_phone_number: res.data.customer.individual_phone_number,
          individual_citizenship: res.data.customer.individual_citizenship,
          individual_emergency_contact_number: res.data.customer.individual_emergency_contact_number,
          individual_blood_group: res.data.customer.individual_blood_group,
          individual_residential_street_2: res.data.customer.individual_residential_street_2,
          individual_residential_street: res.data.customer.individual_residential_street,
          individual_residential_city: res.data.customer.individual_residential_city,
          individual_residential_state: res.data.customer.individual_residential_state,
          individual_residential_pincode: res.data.customer.individual_residential_pincode,
          individual_residential_country: res.data.customer.individual_residential_country,
          individual_billing_street: res.data.customer.individual_billing_street,
          individual_billing_city: res.data.customer.individual_billing_city,
          individual_billing_state: res.data.customer.individual_billing_state,
          individual_billing_pincode: res.data.customer.individual_billing_pincod,
          individual_billing_country: res.data.customer.individual_billing_country,
          individual_permanent_street: res.data.customer.nduvidual_permanent_street,
          individual_permanent_city: res.data.customer.individual_permanent_city,
          individual_permanent_state: res.data.customer.individual_permanent_state,
          individual_permanent_pincode: res.data.customer.individual_permanent_pincode,
          individual_permanent_country: res.data.customer.individual_permanent_country,
          individual_passport_number: res.data.customer.individual_passport_number,
          individual_passport_issue_date: res.data.customer.individual_passport_issue_date,
          individual_passport_expiry_date: res.data.customer.individual_passport_expiry_date,
          individual_passport_attachment: res.data.customer.individual_passport_attachment,
          individual_id_number: res.data.customer.individual_id_number,
          individual_id_issue_date: res.data.customer.individual_id_issue_date,
          individual_id_expiry_date: res.data.customer.individual_id_expiry_date,
          individual_id_attachment: res.data.customer.individual_id_attachment,
          individual_kraORpan_number: res.data.customer.individual_kraORpan_number,
          individual_kraORpan_issue_date: res.data.customer.individual_kraORpan_issue_date,
          individual_kraORpan_expiry_date: res.data.customer.individual_kraORpan_expiry_date,
          individual_kraORpan_attachment: res.data.customer.individual_kraORpan_attachment,
          individual_yellowfever_attachment: res.data.customer.individual_yellowfever_attachment,
          individual_covid19_attachment: res.data.customer.individual_covid19_attachment,
          individual_othervacination_attachment: res.data.customer.individual_othervacination_attachment,
          individual_drivinglicence_number: res.data.customer.individual_drivinglicence_number,
          individual_drivinglicence_issue_date: res.data.customer.individual_drivinglicence_issue_date,
          individual_drivinglicence_expiry_date: res.data.customer.individual_drivinglicence_expiry_date,
          individual_drivinglicence_attachment: res.data.customer.individual_drivinglicence_attachment,
          individual_insurenceCompany_Name: res.data.customer.individual_insurenceCompany_Name,
          individual_insurence_number: res.data.customer.individual_insurence_number,
          individual_insurence_issue_date: res.data.customer.individual_insurence_issue_date,
          individual_insurence_expiry_date: res.data.customer.individual_insurence_expiry_date,
          individual_insurence_attachment: res.data.customer.individual_insurence_attachment,
        }
      );
    }
  }
  getValuesFn = (data) => {
     
    if (data.id == "individual_residential_country") {
      this.setState({
        individual_residential_country:data.value,

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
   
  }; 


  render() {
    






    return (<React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Customer"
        breadCrumbParent="Corporate"
        breadCrumbActive="Edit Employee"
      />
      <Card>
        <CardHeader>
          <CardTitle>
            Edit {this.state.corparate_name} Employee
          </CardTitle>
        </CardHeader>
        <CardBody>


          <form onSubmit={this.handleSubmit} id="employee"  >
            <Input
              type="hidden"
              name="corparate_customer_id"
              value={this.state.corparate_id}
            />


            <Row>
              <Col lg="4" >
                <FormGroup >
                  <Label for="individual_first_name">First Name </Label>
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
                  <Label for="individual_last_name">Last Name </Label>
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
                    <Label for="gender">Gender </Label>
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
                  <Label for="individual_dob">Date of Birth </Label>
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
                  <Label for="individual_email">Email </Label>
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
                  <Label for="individual_Phone_number">Phone Number </Label>
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
            
            <h5 ><b>Residential address</b></h5>
            <Row>
            <Col lg="4">
                       <FormGroup>
                       <Label  for='company_addres1' >Address Line 1 </Label>
                       <Input name="individual_residential_street"
                              value={this.state.individual_residential_street}
                              onChange={this.handleChange} >
                        </Input>
                        <small style={{color:"red"}}>{this.state.error.individual_residential_street}</small>
                       </FormGroup>
                    </Col>
                    <Col lg="4">
                       <FormGroup>
                       <Label  for='individual_residential_street2' >Address Line 2</Label>
                       <Input name="individual_residential_street_2"
                              value={this.state.individual_residential_street_2}
                              onChange={this.handleChange} >
                        </Input>

                       </FormGroup>
                    </Col>
                    <Col lg="4">
                <FormGroup>
                  <Label for="individual_residential_city">City/Town</Label>
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
                  <Label for="individual_residential_state">State</Label>
                  <Input name='individual_residential_state'
                    value={this.state.individual_residential_state}
                    onChange={this.handleChange} >
                  </Input>
                  <small style={{color:"red"}}>{this.state.error.individual_residential_state}</small>
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup>
                 
                    <Label>Country</Label>
                      <SingleSelect name="individual_residential_country"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.individual_residential_country} />
                  <small style={{color:"red"}}>{this.state.error.individual_residential_country}</small>
                </FormGroup>
              </Col>
              
              <Col lg="4" >
                <FormGroup>
                  <Label for="individual_residential_pincode">Pincode</Label>
                  <Input type='text'
                    name='individual_residential_pincode'
                    value={this.state.individual_residential_pincode}
                    onChange={this.handleChange}>
                  </Input>
                  <small style={{color:"red"}}>{this.state.error.individual_residential_pincode}</small>
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
{this.state.errorpassport?<small style={{color:"red"}}>{this.state.errorpassport}</small>:
<a href={"https://wellniverse.in/Naksha/api/" + this.state.individual_passport_attachment} target='blank'>{this.state.individual_passport_attachment}</a>
                }  
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
                  name="individual_drivinglicence_attachment"
                  onChange={this.handleChanges}
                />
                {this.state.errordrivinglicence?<small style={{color:"red"}}>{this.state.errordrivinglicence}</small>:
                 <a href={"https://wellniverse.in/Naksha/api/" + this.state.individual_drivinglicence_attachment} target='blank'>{this.state.individual_drivinglicence_attachment}</a>
              }
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
                  {this.state.errorid?<small style={{color:"red"}}>{this.state.errorid}</small>:
                   <a href={"https://wellniverse.in/Naksha/api/" + this.state.individual_id_attachment} target='blank'>{this.state.individual_id_attachment}</a>
              }
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
                {this.state.errorkraORpan?<small style={{color:"red"}}>{this.state.errorkraORpan}</small>:
                   <a href={"https://wellniverse.in/Naksha/api/" + this.state.individual_kraORpan_attachment} target='blank'>{this.state.individual_kraORpan_attachment}</a>
              }
                  
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

{this.state.erroryellowfever?<small style={{color:"red"}}>{this.state.erroryellowfever}</small>:
                   <a href={"https://wellniverse.in/Naksha/api/" + this.state.individual_yellowfever_attachment} target='blank'>{this.state.individual_yellowfever_attachment}</a>
            }
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
                  {this.state.errorcovid19?<small style={{color:"red"}}>{this.state.errorcovid19}</small>:
                   <a href={"https://wellniverse.in/Naksha/api/" + this.state.individual_covid19_attachment} target='blank'>{this.state.individual_covid19_attachment}</a>
            }
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
                 {this.state.errorothervacination? <small style={{color:"red"}}>{this.state.errorothervacination}</small>:
                   <a href={"https://wellniverse.in/Naksha/api/" + this.state.individual_othervacination_attachment} target='blank'>{this.state.individual_othervacination_attachment}</a>
            }
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
                  {this.state.errorinsurence?<small style={{color:"red"}}>{this.state.errorinsurence}</small>:
                   <a href={"https://wellniverse.in/Naksha/api/" + this.state.individual_insurence_attachment} target='blank'>{this.state.individual_insurence_attachment}</a>
            }
                  {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_insurence_attachment}  alt="Card image cap" /> */}
                </FormGroup>
              </Col>

            </Row>
           
           
            
            <hr />
            <div style={{display:"flex",justifyContent:"flex-end"}}>
            <Link to={`/customer/corporate/edit/${this.state.corparate_id}`}><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Back</Button></Link>
            <div className="d-flex justify-content-between">              
              {this.state.btnLoading ? (
                <Button.Ripple color="primary" type="button">
                  <Spinner color="white" size="sm" />
                  <span className="ml-50">Loading...</span>
                </Button.Ripple>
              ) : (
                <Button.Ripple color="primary" type="submit">Update</Button.Ripple>
              )}
            </div></div>
          </form>

        </CardBody>
      </Card>
      <EmployeeFamilyList id={this.props.match.params.id} fname={this.state.individual_first_name} lname={this.state.individual_last_name} />

    </React.Fragment>
    );
  }
}
