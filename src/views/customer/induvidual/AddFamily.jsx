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
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import SpinnerComponent from "components/@custom/spinner/Fallback-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import Select from 'react-select'

import SingleSelect from 'components/common/formBasic/singleSelect';

import {country,gender,bloodgroup,Relationship} from "./../../country/CountryList"
import { Link } from 'react-router-dom';
import { validateIndividualFamily } from './validationindividual/ValidationIndividualFamily';


export default class AddFamily extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
    individual_customer_id:this.props.match.params.id,
    corporate_id:'',
    error:'',
    relationship_name:"",
    individual_family_first_name: "",
    individual_family_last_name: "",
    individual_family_gender: "",
    individual_family_dob: "",
    individual_family_email: "",
    individual_family_phone_number: "",
    individual_family_mobile_number: "",
    individual_family_passport_number: "",
    individual_family_passport_issue_date: "",
    individual_family_passport_expiry_date: "",
    individual_family_passport_attachment: "",
    individual_family_id_number: "",
    individual_family_id_issue_date: "",
    individual_family_id_expiry_date: "",
    individual_family_id_attachment: "",
    individual_family_kraORpan_number: "",
    individual_family_kraORpan_issue_date: "",
    individual_family_kraORpan_expiry_date: "",
    individual_family_kraORpan_attachment: "",
    individual_family_citizenship: "",
    individual_family_yellowfever_attachment: "",
    individual_family_covid19_attachment: "",
    individual_family_othervacination_attachment: "",
    individual_family_drivinglicence_number: "",
    individual_family_drivinglicence_issue_date: "",
    individual_family_drivinglicence_expiry_date: "",
    individual_family_drivinglicence_attachment: "",
    individual_family_insurenceCompany_Name: "",
    individual_family_insurence_number: "",
    individual_family_insurence_issue_date: "",
    individual_family_insurence_expiry_date: "",
    individual_family_insurence_attachment: "",
    individual_family_residential_street: "",
    individual_family_residential_street_2: "",
    individual_family_residential_city: "",
    individual_family_residential_state: "",
    individual_family_residential_pincode: "",
    individual_family_residential_country: "",
    individual_family_emergency_contact_number: "",
    individual_family_billing_street: "",
    individual_family_billing_city: "",
    individual_family_billing_state: "",
    individual_family_billing_country: "",
    individual_family_billing_pincode: "",
    individual_family_emergency_contact_number: "",
    individual_family_blood_group: "",
    errorpassport:"",
      erroryellowfever:"",
      errordrivinglicence:"",
      errorid:"",
      errorkraORpan:"",
      errorcovid19:"",
      errorothervacination:"",
      errorinsurence:"",
      filee:true,
    
        };
        // let string = JSON.stringify(this.state);
        // let string2 = JSON.stringify(formData);
        // this.baseState = JSON.parse(string);
        // this.baseFormField = JSON.parse(string2);
        // this.getValuesFn = this.getValuesFn.bind(this);
        // this.checkAll = this.checkAll.bind(this);
        // this.submitFn = this.submitFn.bind(this);
        this.initialState = this.state;
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
      }


      handleChanges = (e) => {  
        let x="";
               x= validateIndividualFamily(e); 
               console.log(x);       
               if(x.for=="individual_family_passport_attachment")
               {
                this.setState({
                  errorpassport:x.errorr,
                  filee:x.filee,
                          });
               }
               else if(x.for=="individual_family_yellowfever_attachment")
               {
                this.setState({
                  erroryellowfever:x.errorr,
                  filee:x.filee,
                          });
               }
               else if(x.for=="individual_family_drivinglicence_attachment")
               {
                this.setState({
                  errordrivinglicence:x.errorr,
                  filee:x.filee,
                          });
               }
               else if(x.for=="individual_family_id_attachment")
               {
                this.setState({
                  errorid:x.errorr,
                  filee:x.filee,
                          });
               }
               else if(x.for=="individual_family_kraORpan_attachment")
               {
                this.setState({
                  errorkraORpan:x.errorr,
                  filee:x.filee,
                          });
               }
               else if(x.for=="individual_family_covid19_attachment")
               {
                this.setState({
                  errorcovid19:x.errorr,
                  filee:x.filee,
                          });
               }
               else if(x.for=="individual_family_othervacination_attachment")
               {
                this.setState({
                  errorothervacination:x.errorr,
                  filee:x.filee,
                          });
               }
               else if(x.for=="individual_family_insurence_attachment")
               {
                this.setState({
                  errorinsurence:x.errorr,
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
      var formData = new FormData(document.querySelector("#family1"));
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
        .post("/api/individualfamily/save", formData)
        .then((response) => {
          if (response.data.status == 200) {
            toast.success(response.data.Result);
            
            this.props.history.push(`/customer/induvidual/edit/${id}`);
          } else {

            toast.error("Please check all the details");
            
            this.setState({
              error : response.data.Result,
              btnLoading:false,
            })
          }
        })
        .catch((error) => {
          toast.error("Please check all the details");
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
  
  async    componentDidMount() {
    let id=this.props.match.params.id;
    const induidual= await axios.get(`/api/individualcustomer/getInduvidualById/${id}`);
    
   
    if(induidual.data.status==200)
    {
      this.setState(
        {
            individual_name:induidual.data.customer.individual_name,
            // induvidual_name:induidual.data.customer.induvidual_last_name,
            corporate_id:induidual.data.customer.corparate_customer_id
        })
    }
    
}
getValuesFn = (data) => {
     
  if (data.id == "individual_family_residential_country") {
    this.setState({
      individual_family_residential_country:data.value,

    });
  }

  else if (data.id == "individual_family_gender") {
    this.setState({
      individual_family_gender:data.value,
    });
  }
  else if (data.id == "individual_family_citizenship") {
    this.setState({
      individual_family_citizenship:data.value,
    });
  }
  else if (data.id == "relationship_name") {
    this.setState({
      relationship_name:data.value,
    });
  }
  else if (data.id == "individual_family_blood_group") {
    this.setState({
      individual_family_blood_group:data.value,
    });
  }
 
}; 


  render() {
    
   
    return (<React.Fragment>
    <BreadCrumbs
      breadCrumbTitle= "Customer"
      breadCrumbParent="Corparate"
      breadCrumbActive=  "Add Family"
    />

      <Card>
        <CardHeader>
          <CardTitle>
            Add {this.state.individual_name}  Family
          </CardTitle>
        </CardHeader>

        <CardBody>
        <form onSubmit={this.handleSubmit} id="family1" >
          <Input
                    type="hidden"
                    name="individual_customer_id"
                    value={this.state.individual_customer_id}
                  />
                  <Row>
          <Col lg="6">
                  <FormGroup>
                    <Label for='relationship_name' >Relationship<span style={{color:"red"}}> *</span></Label>
                   
                    <SingleSelect name="relationship_name"
                               options={Relationship}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.relationship_name} />
                               <small style={{color:"red"}}>{this.state.error.relationship_name}</small>
                  </FormGroup>
                </Col>
                </Row>
                
            <Row>
              <Col lg="4" >
                <FormGroup >
                  <Label for="individual_family_first_name">First Name<span style={{color:"red"}}> *</span></Label>
                  <Input
                    type="text"
                    name="individual_family_first_name"
                    placeholder="Enter first Name"
                    value={this.state.individual_family_first_name}
                    onChange={this.handleChange}
                  />
                  <small style={{color:"red"}}>{this.state.error.individual_family_first_name}</small>
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup >
                  <Label for="individual_family_last_name">Last Name<span style={{color:"red"}}> *</span></Label>
                  <Input
                    type="text"
                    name="individual_family_last_name"
                    placeholder="Enter Last Name"
                    value={this.state.individual_family_last_name}
                    onChange={this.handleChange}
                  />
                  <small style={{color:"red"}}>{this.state.error.individual_family_last_name}</small>
                </FormGroup>
              </Col>
              
                <Col lg="4"  >
                  <FormGroup >
                    <Label for="gender2">Gender<span style={{color:"red"}}> *</span></Label>
                    <SingleSelect
                      name="individual_family_gender"
                      options={gender}
                      selectedValue={this.state.individual_family_gender}
                      getValuesFn={this.getValuesFn} >
                        

                    </SingleSelect>
                    <small style={{color:"red"}}>{this.state.error.individual_family_gender}</small>
                  </FormGroup>
                </Col>

             
              <Col lg="4"  >
                <FormGroup >
                  <Label for="individual_family_dob">Date of Birth</Label>
                  <Input type="date"
                    name="individual_family_dob"
                    value={this.state.individual_family_dob}
                    onChange={this.handleChange} >
                      
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup >
                  <Label for="individual_family_email">Email</Label>
                  <Input
                    type="email"
                    name="individual_family_email"
                    value={this.state.individual_family_email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup >
                  <Label for="individual_family_Phone_number">Phone Number</Label>
                  <Input
                    type="text"
                    name="individual_family_phone_number"
                    value={this.state.individual_family_phone_number}
                    onChange={this.handleChange}
                  />
                </FormGroup>

              </Col>
              
              <Col lg="4" >
                <FormGroup>
                  <Label for='individual_family_citizenship' >Citizenship</Label> 
                  <SingleSelect name="individual_family_citizenship"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.individual_family_citizenship} />
                  
                </FormGroup>
              </Col>

              <Col lg="4">
                <FormGroup>

                  <Label for='individual_family_emergency_contact_number' >Emergency Contact Number</Label>
                  <Input type="number"
                    name="individual_family_emergency_contact_number"
                    value={this.state.individual_family_emergency_contact_number}
                    onChange={this.handleChange} ></Input>
                </FormGroup>
              </Col>
              
                      <Col lg="4" >
    <FormGroup>
    <Label for="blood_group" >Blood Group</Label>
    <SingleSelect  name="individual_family_blood_group" 
          
             options={bloodgroup}             
             getValuesFn={this.getValuesFn}
             selectedValue={this.state.individual_family_blood_group} />
            </FormGroup>
            </Col>
            </Row>
            <hr />
            
            <h5 ><b>Residential address</b></h5>
            <Row>
            <Col lg="4">
                       <FormGroup>
                       <Label  for='company_addres1' >Address Line 1<span style={{color:"red"}}> *</span></Label>
                       <Input name="individual_family_residential_street"
                              value={this.state.individual_family_residential_street}
                              onChange={this.handleChange} >
                            
                        </Input>
                        <small style={{color:"red"}}>{this.state.error.individual_family_residential_street}</small>
                       </FormGroup>
                    </Col>
                    <Col lg="4">
                       <FormGroup>
                       <Label  for='individual_family_residential_street2' >Address Line 2<small>(optional)</small></Label>
                       <Input name="individual_family_residential_street_2"
                              value={this.state.individual_family_residential_street_2}
                              onChange={this.handleChange} >
                        </Input>
                       </FormGroup>
                    </Col>
                    <Col lg="4">
                <FormGroup>
                  <Label for="individual_family_residential_city">City/Town<span style={{color:"red"}}> *</span></Label>
                  <Input type='text'
                    name='individual_family_residential_city'
                    value={this.state.individual_family_residential_city}
                    onChange={this.handleChange} >
                  </Input>
                      <small style={{color:"red"}}>{this.state.error.individual_family_residential_city}</small>
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <Label for="individual_family_residential_state">State<span style={{color:"red"}}> *</span></Label>
                  <Input name='individual_family_residential_state'
                    value={this.state.individual_family_residential_state}
                    onChange={this.handleChange} >
                  </Input>
                      <small style={{color:"red"}}>{this.state.error.individual_family_residential_state}</small>
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup>
                 
                    <Label>Country<span style={{color:"red"}}> *</span></Label>
                      <SingleSelect name="individual_family_residential_country"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.individual_family_residential_country} />
                               <small style={{color:"red"}}>{this.state.error.individual_family_residential_country}</small>
                  
                </FormGroup>
              </Col>
              <Col lg="4" >
                <FormGroup>
                  <Label for="individual_family_residential_pincode">Pincode<span style={{color:"red"}}> *</span></Label>
                  <Input type='text'
                    name='individual_family_residential_pincode'
                    value={this.state.individual_family_residential_pincode}
                    onChange={this.handleChange}>
                  </Input>
                      <small style={{color:"red"}}>{this.state.error.individual_family_residential_pincode}</small>
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <h5><b>Passport Details</b></h5>
            <Row  >
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_passport_number">Passport Number</Label>
                  <Input
                    type="text"
                    name="individual_family_passport_number"
                    value={this.state.individual_family_passport_number}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_passport_issue_date">Issue Date</Label>
                  <Input type="date"
                    name="individual_family_passport_issue_date"
                    value={this.state.individual_family_passport_issue_date}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_passport_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_family_passport_expiry_date"
                    value={this.state.individual_family_passport_expiry_date}
                    onChange={this.handleChange}>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup >
                  <Label></Label>
                  <Input className="mt-0"
                    type='file'
                    name="individual_family_passport_attachment"
                    onChange={this.handleChanges}
                  />
                 <small style={{color:"red"}}>{this.state.errorpassport}</small>

                  {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_family_passport_attachment}  alt="Card image cap" /> */}
                </FormGroup>
              </Col>

            </Row>
            <hr />
            <h5 ><b>Driving License</b></h5>
            <Row  >
            <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_insurence_number4">Driving License</Label>
                  <Input
                    type="text"
                    name="individual_family_drivinglicence_number"
                    value={this.state.individual_family_drivinglicence_number}
                    onChange={this.handleChange}
                  />
                  
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_drivinglicence_issue_date">Issue Date</Label>
                  <Input type="date"
                    name="individual_family_drivinglicence_issue_date"
                    value={this.state.individual_family_drivinglicence_issue_date}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_drivinglicence_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_family_drivinglicence_expiry_date"
                    value={this.state.individual_family_drivinglicence_expiry_date}
                    onChange={this.handleChange} >
                  </Input>
                 
                </FormGroup>
              </Col>
              <Col lg="3">
              <FormGroup >
                <Label></Label>
                <Input className="mt-0" type='file'
                  name="individual_family_drivinglicence_attachment"
                  onChange={this.handleChanges}
                />
              <small style={{color:"red"}}>{this.state.errordrivinglicence}</small>

                {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_family_driving_license_attachment}  alt="Card image cap" /> */}
              </FormGroup>
              </Col>
            </Row>
            <hr />
            
            <h5 ><b>Government ID</b></h5>
            <Row  >
            <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_id_number">ID Number</Label>
                  <Input
                    type="text"
                    name="individual_family_id_number"
                    value={this.state.individual_family_id_number}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_id_issue_date">Issue Date</Label>
                  <Input type="date"
                    name="individual_family_id_issue_date"
                    value={this.state.individual_family_id_issue_date}
                    onChange={this.handleChange}>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_id_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_family_id_expiry_date"
                    value={this.state.individual_family_id_expiry_date}
                    onChange={this.handleChange}>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup >
                  <Label for='individual_family_id_attachment' ></Label>
                  <Input className="mt-0" type='file'
                    name="individual_family_id_attachment"
                    onChange={this.handleChanges}
                  />  <small style={{color:"red"}}>{this.state.errorid}</small>

                  {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_family_id_attachment}  alt="Card image cap" /> */}
                </FormGroup>
              </Col>

            </Row>
            <hr />
            <h5 ><b>KRA/PAN Details</b></h5>
            <Row  >
            <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_kraORpan_number">KRA/PAN Number</Label>
                  <Input
                    type="text"
                    name="individual_family_kraORpan_number"
                    value={this.state.individual_family_kraORpan_number}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>

                  <Label for="individual_family_kraORpan_issue_date">Issue Date</Label>
                  <Input
                    type="date"
                    name="individual_family_kraORpan_issue_date"
                    value={this.state.individual_family_kraORpan_issue_date}
                    onChange={this.handleChange}>
                  </Input>

                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_kraORpan_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_family_kraORpan_expiry_date"
                    value={this.state.individual_family_kraORpan_expiry_date}
                    onChange={this.handleChange} >

                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup >
                  <Label for='individual_family_kraORpan_attachment' ></Label>
                  <Input className="mt-0" type='file'
                    name="individual_family_kraORpan_attachment"
                    onChange={this.handleChanges}
                  /> <small style={{color:"red"}}>{this.state.errorkraORpan}</small>

                  {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_family_kraORpan_attachment}  alt="Card image cap" /> */}
                </FormGroup>
              </Col>

            </Row>
            <hr />
           
            <h5 ><b>Vaccination Details</b></h5>
            <Row className='mt-1' >
              <Col>
                <Label for='individual_family_yellowfever_attachment' >Yellow Fever</Label>
              </Col>
              <Col>
                <Input name="individual_family_yellowfever_attachment"
                  type='file'
                  onChange={this.handleChanges} /> 
                    <small style={{color:"red"}}>{this.state.erroryellowfever}</small>

                {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_family_yellow_fever_attachment}  alt="Card image cap" /> */}
              </Col>

            </Row>
            <Row className='mt-1' >
              <Col>
                <Label for='individual_family_covid19_attachment' >Covid 19</Label>
              </Col>
              <Col>
                <Input name="individual_family_covid19_attachment"
                  type='file'
                  onChange={this.handleChanges} /> 
                  <small style={{color:"red"}}>{this.state.errorcovid19}</small> 

                {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_family_covid19_attachment}  alt="Card image cap" /> */}
              </Col>

            </Row>
            <Row className='mt-1' >
              <Col>
                <Label for='individual_family_othervacination_attachment' >Other Vacination</Label>
              </Col>
              <Col>
                <Input type='file'
                  name="individual_family_othervacination_attachment"
                  onChange={this.handleChanges} /> 
                  <small style={{color:"red"}}>{this.state.errorothervacination}</small>

                {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_family_certificate_attachment}  alt="Card image cap" /> */}
              </Col>

            </Row>
            <hr />
            
            <h5 ><b>Insurence Details</b></h5>
            <Row>
            <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_insurenceCompany_Name">Company Name</Label>
                  <Input name="individual_family_insurenceCompany_Name"
                    value={this.state.individual_family_insurenceCompany_Name}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_insurence_number1">Policy Number</Label>
                  <Input name="individual_family_insurence_number"
                    value={this.state.individual_family_insurence_number}
                    onChange={this.handleChange} >
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_insurence_issue_date">issue date</Label>
                  <Input type="date"
                    name="individual_family_insurence_issue_date"
                    value={this.state.individual_family_insurence_issue_date}
                    onChange={this.handleChange}>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="individual_family_insurence_expiry_date">Expiry Date</Label>
                  <Input type="date"
                    name="individual_family_insurence_expiry_date"
                    value={this.state.individual_family_insurence_expiry_date}
                    onChange={this.handleChange}  >
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup >
                  <Label for='individual_family_insurence_attachment' ></Label>
                  <Input className="mt-0" type='file'
                    name="individual_family_insurence_attachment"
                    onChange={this.handleChanges}
                  />
<small style={{color:"red"}}>{this.state.errorinsurence}</small>
                  {/* <img class="card-img-top" src={"https://nakshatravels.com/api/" + this.state.individual_family_insurence_attachment}  alt="Card image cap" /> */}
                </FormGroup>
              </Col>

            </Row><hr/>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
            
            <Link to={`/customer/induvidual/edit/${this.state.individual_customer_id}`}><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Cancel</Button></Link>
            <div className="d-flex justify-content-between">              
              {this.state.btnLoading ? (
                <Button.Ripple color="primary" type="button">
                  <Spinner color="white" size="sm" />
                  <span className="ml-50">Loading...</span>
                </Button.Ripple>
              ) : (
                <Button.Ripple color="primary" type="submit">Submit</Button.Ripple>
              )}
            </div> </div>
           
          
          </form>
        </CardBody>
      </Card>
  </React.Fragment>
    )
  }
}

