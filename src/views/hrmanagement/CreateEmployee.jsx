// import React, { Component} from 'react';
// import {
// Card,
// CardHeader,
// CardTitle,
// CardBody,
// FormGroup,
// Button,
// Label,
// Row,
// Col,
// Spinner,
// Input
// } from "reactstrap";
// import { Link, NavLink } from "react-router-dom";
// import  BreadCrumbs  from "components/@custom/breadCrumbs/BreadCrumb";
// import { toast } from "react-toastify";
// import axios from "axios";
// import Select from 'react-select'
// import CountryList from"../country/CountryList"
// import SingleSelect from "components/common/formBasic/singleSelect";

// const gender =[
//   {value:'Male',label:'Male'},
//   {value:'FeMale',label:'FeMale'},
//   {value:'Others',label:'Others'}
// ];

// const country =[
//   {value:'Afganistan', label:'Afghanistan'},
// {value:'Albania', label:'Albania'},
// {value:'Algeria', label:'Algeria'},
// {value:'American Samoa', label:'American Samoa'},
// {value:'Andorra', label:'Andorra'},
// {value:'Angola', label:'Angola'},
// {value:'Anguilla', label:'Anguilla'},
// {value:'Antigua & Barbuda', label:'Antigua & Barbuda'},
// {value:'Argentina', label:'Argentina'},
// {value:'Armenia', label:'Armenia'},
// {value:'Aruba', label:'Aruba'},
// {value:'Australia', label:'Australia'},
// {value:'Austria', label:'Austria'},
// {value:'Azerbaijan', label:'Azerbaijan'},
// {value:'Bahamas', label:'Bahamas'},
// {value:'Bahrain', label:'Bahrain'},
// {value:'Bangladesh', label:'Bangladesh'},
// {value:'Barbados', label:'Barbados'},
// {value:'Belarus', label:'Belarus'},
// {value:'Belgium', label:'Belgium'},
// {value:'Belize', label:'Belize'},
// {value:'Benin', label:'Benin'},
// {value:'Bermuda', label:'Bermuda'},
// {value:'Bhutan', label:'Bhutan'},
// {value:'Bolivia', label:'Bolivia'},
// {value:'Bonaire', label:'Bonaire'},
// {value:'Bosnia & Herzegovina', label:'Bosnia & Herzegovina'},
// {value:'Botswana', label:'Botswana'},
// {value:'Brazil', label:'Brazil'},
// {value:'British Indian Ocean Ter', label:'British Indian Ocean Ter'},
// {value:'Brunei', label:'Brunei'},
// {value:'Bulgaria', label:'Bulgaria'},
// {value:'Burkina Faso', label:'Burkina Faso'},
// {value:'Burundi', label:'Burundi'},
// {value:'Cambodia', label:'Cambodia'},
// {value:'Cameroon', label:'Cameroon'},
// {value:'Canada', label:'Canada'},
// {value:'Canary Islands', label:'Canary Islands'},
// {value:'Cape Verde', label:'Cape Verde'},
// {value:'Cayman Islands', label:'Cayman Islands'},
// {value:'Central African Republic', label:'Central African Republic'},
// {value:'Chad', label:'Chad'},
// {value:'Channel Islands', label:'Channel Islands'},
// {value:'Chile', label:'Chile'},
// {value:'China', label:'China'},
// {value:'Christmas Island', label:'Christmas Island'},
// {value:'Cocos Island', label:'Cocos Island'},
// {value:'Colombia', label:'Colombia'},
// {value:'Comoros', label:'Comoros'},
// {value:'Congo', label:'Congo'},
// {value:'Cook Islands', label:'Cook Islands'},
// {value:'Costa Rica', label:'Costa Rica'},
// {value:'Cote DIvoire', label:'Cote DIvoire'},
// {value:'Croatia', label:'Croatia'},
// {value:'Cuba', label:'Cuba'},
// {value:'Curaco', label:'Curacao'},
// {value:'Cyprus', label:'Cyprus'},
// {value:'Czech Republic', label:'Czech Republic'},
// {value:'Denmark', label:'Denmark'},
// {value:'Djibouti', label:'Djibouti'},
// {value:'Dominica', label:'Dominica'},
// {value:'Dominican Republic', label:'Dominican Republic'},
// {value:'East Timor', label:'East Timor'},
// {value:'Ecuador', label:'Ecuador'},
// {value:'Egypt', label:'Egypt'},
// {value:'El Salvador', label:'El Salvador'},
// {value:'Equatorial Guinea', label:'Equatorial Guinea'},
// {value:'Eritrea', label:'Eritrea'},
// {value:'Estonia', label:'Estonia'},
// {value:'Ethiopia', label:'Ethiopia'},
// {value:'Falkland Islands', label:'Falkland Islands'},
// {value:'Faroe Islands', label:'Faroe Islands'},
// {value:'Fiji', label:'Fiji'},
// {value:'Finland', label:'Finland'},
// {value:'France', label:'France'},
// {value:'French Guiana', label:'French Guiana'},
// {value:'French Polynesia', label:'French Polynesia'},
// {value:'French Southern Ter', label:'French Southern Ter'},
// {value:'Gabon', label:'Gabon'},
// {value:'Gambia', label:'Gambia'},
// {value:'Georgia', label:'Georgia'},
// {value:'Germany', label:'Germany'},
// {value:'Ghana', label:'Ghana'},
// {value:'Gibraltar', label:'Gibraltar'},
// {value:'Great Britain', label:'Great Britain'},
// {value:'Greece', label:'Greece'},
// {value:'Greenland', label:'Greenland'},
// {value:'Grenada', label:'Grenada'},
// {value:'Guadeloupe', label:'Guadeloupe'},
// {value:'Guam', label:'Guam'},
// {value:'Guatemala', label:'Guatemala'},
// {value:'Guinea', label:'Guinea'},
// {value:'Guyana', label:'Guyana'},
// {value:'Haiti', label:'Haiti'},
// {value:'Hawaii', label:'Hawaii'},
// {value:'Honduras', label:'Honduras'},
// {value:'Hong Kong', label:'Hong Kong'},
// {value:'Hungary', label:'Hungary'},
// {value:'Iceland', label:'Iceland'},
// {value:'Indonesia', label:'Indonesia'},
// {value:'India', label:'India'},
// {value:'Iran', label:'Iran'},
// {value:'Iraq', label:'Iraq'},
// {value:'Ireland', label:'Ireland'},
// {value:'Isle of Man', label:'Isle of Man'},
// {value:'Israel', label:'Israel'},
// {value:'Italy', label:'Italy'},
// {value:'Jamaica', label:'Jamaica'},
// {value:'Japan', label:'Japan'},
// {value:'Jordan', label:'Jordan'},
// {value:'Kazakhstan', label:'Kazakhstan'},
// {value:'Kenya', label:'Kenya'},
// {value:'Kiribati', label:'Kiribati'},
// {value:'Korea North', label:'Korea North'},
// {value:'Korea Sout', label:'Korea South'},
// {value:'Kuwait', label:'Kuwait'},
// {value:'Kyrgyzstan', label:'Kyrgyzstan'},
// {value:'Laos', label:'Laos'},
// {value:'Latvia', label:'Latvia'},
// {value:'Lebanon', label:'Lebanon'},
// {value:'Lesotho', label:'Lesotho'},
// {value:'Liberia', label:'Liberia'},
// {value:'Libya', label:'Libya'},
// {value:'Liechtenstein', label:'Liechtenstein'},
// {value:'Lithuania', label:'Lithuania'},
// {value:'Luxembourg', label:'Luxembourg'},
// {value:'Macau', label:'Macau'},
// {value:'Macedonia', label:'Macedonia'},
// {value:'Madagascar', label:'Madagascar'},
// {value:'Malaysia', label:'Malaysia'},
// {value:'Malawi', label:'Malawi'},
// {value:'Maldives', label:'Maldives'},
// {value:'Mali', label:'Mali'},
// {value:'Malta', label:'Malta'},
// {value:'Marshall Islands', label:'Marshall Islands'},
// {value:'Martinique', label:'Martinique'},
// {value:'Mauritania', label:'Mauritania'},
// {value:'Mauritius', label:'Mauritius'},
// {value:'Mayotte', label:'Mayotte'},
// {value:'Mexico', label:'Mexico'},
// {value:'Midway Islands', label:'Midway Islands'},
// {value:'Moldova', label:'Moldova'},
// {value:'Monaco', label:'Monaco'},
// {value:'Mongolia', label:'Mongolia'},
// {value:'Montserrat', label:'Montserrat'},
// {value:'Morocco', label:'Morocco'},
// {value:'Mozambique', label:'Mozambique'},
// {value:'Myanmar', label:'Myanmar'},
// {value:'Nambia', label:'Nambia'},
// {value:'Nauru', label:'Nauru'},
// {value:'Nepal', label:'Nepal'},
// {value:'Netherland Antilles', label:'Netherland Antilles'},
// {value:'Netherlands', label:'Netherlands (Holland, Europe)'},
// {value:'Nevis', label:'Nevis'},
// {value:'New Caledonia', label:'New Caledonia'},
// {value:'New Zealand', label:'New Zealand'},
// {value:'Nicaragua', label:'Nicaragua'},
// {value:'Niger', label:'Niger'},
// {value:'Nigeria', label:'Nigeria'},
// {value:'Niue', label:'Niue'},
// {value:'Norfolk Island', label:'Norfolk Island'},
// {value:'Norway', label:'Norway'},
// {value:'Oman', label:'Oman'},
// {value:'Pakistan', label:'Pakistan'},
// {value:'Palau Island', label:'Palau Island'},
// {value:'Palestine', label:'Palestine'},
// {value:'Panama', label:'Panama'},
// {value:'Papua New Guinea', label:'Papua New Guinea'},
// {value:'Paraguay', label:'Paraguay'},
// {value:'Peru', label:'Peru'},
// {value:'Phillipines', label:'Philippines'},
// {value:'Pitcairn Island', label:'Pitcairn Island'},
// {value:'Poland', label:'Poland'},
// {value:'Portugal', label:'Portugal'},
// {value:'Puerto Rico', label:'Puerto Rico'},
// {value:'Qatar', label:'Qatar'},
// {value:'Republic of Montenegro', label:'Republic of Montenegro'},
// {value:'Republic of Serbia', label:'Republic of Serbia'},
// {value:'Reunion', label:'Reunion'},
// {value:'Romania', label:'Romania'},
// {value:'Russia', label:'Russia'},
// {value:'Rwanda', label:'Rwanda'},
// {value:'St Barthelemy', label:'St Barthelemy'},
// {value:'St Eustatius', label:'St Eustatius'},
// {value:'St Helena', label:'St Helena'},
// {value:'St Kitts-Nevis', label:'St Kitts-Nevis'},
// {value:'St Lucia', label:'St Lucia'},
// {value:'St Maarten', label:'St Maarten'},
// {value:'St Pierre & Miquelon', label:'St Pierre & Miquelon'},
// {value:'St Vincent & Grenadines', label:'St Vincent & Grenadines'},
// {value:'Saipan', label:'Saipan'},
// {value:'Samoa', label:'Samoa'},
// {value:'Samoa American', label:'Samoa American'},
// {value:'San Marino', label:'San Marino'},
// {value:'Sao Tome & Principe', label:'Sao Tome & Principe'},
// {value:'Saudi Arabia', label:'Saudi Arabia'},
// {value:'Senegal', label:'Senegal'},
// {value:'Seychelles', label:'Seychelles'},
// {value:'Sierra Leone', label:'Sierra Leone'},
// {value:'Singapore', label:'Singapore'},
// {value:'Slovakia', label:'Slovakia'},
// {value:'Slovenia', label:'Slovenia'},
// {value:'Solomon Islands', label:'Solomon Islands'},
// {value:'Somalia', label:'Somalia'},
// {value:'South Africa', label:'South Africa'},
// {value:'Spain', label:'Spain'},
// {value:'Sri Lanka', label:'Sri Lanka'},
// {value:'Sudan', label:'Sudan'},
// {value:'Suriname', label:'Suriname'},
// {value:'Swaziland', label:'Swaziland'},
// {value:'Sweden', label:'Sweden'},
// {value:'Switzerland', label:'Switzerland'},
// {value:'Syria', label:'Syria'},
// {value:'Tahiti', label:'Tahiti'},
// {value:'Taiwan', label:'Taiwan'},
// {value:'Tajikistan', label:'Tajikistan'},
// {value:'Tanzania', label:'Tanzania'},
// {value:'Thailand', label:'Thailand'},
// {value:'Togo', label:'Togo'},
// {value:'Tokelau', label:'Tokelau'},
// {value:'Tonga', label:'Tonga'},
// {value:'Trinidad & Tobago', label:'Trinidad & Tobago'},
// {value:'Tunisia', label:'Tunisia'},
// {value:'Turkey', label:'Turkey'},
// {value:'Turkmenistan', label:'Turkmenistan'},
// {value:'Turks & Caicos Is', label:'Turks & Caicos Is'},
// {value:'Tuvalu', label:'Tuvalu'},
// {value:'Uganda', label:'Uganda'},
// {value:'United Kingdom', label:'United Kingdom'},
// {value:'Ukraine', label:'Ukraine'},
// {value:'United Arab Erimates', label:'United Arab Emirates'},
// {value:'United States of America', label:'United States of America'},
// {value:'Uraguay', label:'Uruguay'},
// {value:'Uzbekistan', label:'Uzbekistan'},
// {value:'Vanuatu', label:'Vanuatu'},
// {value:'Vatican City State', label:'Vatican City State'},
// {value:'Venezuela', label:'Venezuela'},
// {value:'Vietnam', label:'Vietnam'},
// {value:'Virgin Islands (Brit)', label:'Virgin Islands (Brit)'},
// {value:'Virgin Islands (USA)', label:'Virgin Islands (USA)'},
// {value:'Wake Island', label:'Wake Island'},
// {value:'Wallis & Futana Is', label:'Wallis & Futana Is'},
// {value:'Yemen', label:'Yemen'},
// {value:'Zaire', label:'Zaire'},
// {value:'Zambia', label:'Zambia'},
// {value:'Zimbabwe', label:'Zimbabwe'},
// ]
 


// export default class EmployeesList extends Component {
// constructor(props) {
// super(props);
// this.state = {
//   error:'',
//   uploading:false,
// };
// this.initialState = this.state;
// this.handleChange=this.handleChange.bind(this);
// this.handleSubmit=this.handleSubmit.bind(this);
// }
// handleChange = (e) => {
// const { name, value,} = e.target;
// this.setState({ [name]: value });
// }
// handleSubmit = (e) => {
//   this.setState(
//     {
//       uploading:true,
//     }
//     )
// var formData = new FormData(document.querySelector("#employee"));
// let i=0,Name=[],Data=[];
// for(var pair of formData.entries())
// {
// console.log(pair[0],pair[1]);
// Name[i]=pair[0];
// Data[i]=pair[1];
// i++;
// }
// for(var j=0;j<i;j++ )
// {
// formData.append(Name[i],Data[i]);
// }
// e.preventDefault();

// axios
// .post(`/api/employee/save`, formData)
// .then((response) => {
// if (response.data.status == 200) {
// toast.success(response.data.Result);
// this.props.history.push("/employee");
// } else {
//   this.setState(
//     {
//       uploading:false,
//     }
//     )
 
// toast.error(response.data.Result);
// console.log(response.data.Result);
// this.setState(
//   {
//     error:response.data.Result,
//   }
//   );
// }
// })
// .catch((error) => {
// toast.error(error.Result);
// });

// }
// async componentDidMount() {

// }

// getValuesFn = (data) => {
   
//   if (data.id == "country") {
//     this.setState({
//       country:data.value,
//     });
//   }
 
// };

// render() {
//   var Loading_HTML="";
//   if (this.state.uploading == true) {
//     Loading_HTML =

//     <Card>
//       <CardBody>
//       <h4 style={{color:"#7367f0",textAlign:"center",fontSize:"20px"}} colSpan="6"><Spinner animation="border" variant="primary" /> Uploading.....</h4>
//       </CardBody>
//     </Card>
//   }else{
//     Loading_HTML=
//     <Card>
// <CardHeader>
// <CardTitle>
// Add Employee
// </CardTitle>
// </CardHeader>
// <CardBody>
// <form onSubmit={this.handleSubmit} id="employee" >
//   <Row></Row>
// <Row>
// <Col lg="4" >
// <FormGroup >
// <Label for="name">Employee Name</Label>
// <Input
// type="text"
// name="name"
// placeholder='Enter Your Full Name'
// />
// <span style={{color:"red"}}>{this.state.error.name}</span>
// </FormGroup>
// </Col>

              
// <Col lg="4" >
// <FormGroup >
// <Label for="email">Email</Label>
// <Input
// type="email"
// name="email"
// placeholder='Enter your Emai Id'
// />
// <span style={{color:"red"}}>{this.state.error.email}</span>
// </FormGroup>
// </Col>

// <Col lg="4" >
// <FormGroup >
// <Label for="DateOfBirth">Date Of Birth</Label>
// <Input 
// name="dob"
// type='date' >
// </Input>
// </FormGroup>
// </Col>

// <Col lg="4"  >
// <FormGroup >
// <Label for="gender">Gender</Label>
// <Select 
// name="gender"
//  options={gender} >
                       
//  </Select>

// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup >
// <Label for="phone_number">Mobile Number</Label>
// <Input
// type="number"
// name="phone_number"
// placeholder="Enter Your Phone Number"
// />
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup >
// <Label for="phone_number">Emergency Contact Number</Label>
// <Input
// type="number"
// name="emergency_contact_number"
// placeholder="Enter Your Phone Number"
// />
// </FormGroup>
// </Col>


// <Col lg="4" >
// <FormGroup >
// <Label for="DateOfJoining">Date Of Joining</Label>
// <Input 
// name="joining_date"
// type='date' >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup >
// <Label for="Designation">Designation</Label>
// <Input name="designation"
// type='text'
// placeholder="Your Designation in the Company" 
// >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
//                   <FormGroup>
//                         <Label for="blood_group" >Blood Group</Label>
//                         <Input type="text"
//                             name="blood_group" 
//                             placeholder='Blood Group'
//                             value={this.state.induvidual_blood_group} 
//                              onChange={this.handleChange} >
//                         </Input>

//                   </FormGroup>
//              </Col>
// </Row>
// <hr />
// <h3 > Address</h3>
// <Row>
// <Col lg="6">
// <FormGroup>
// <Label for='street' >Addres Line </Label>
// <Input type="textarea" name="street"
// placeholder='Enter Your Complete Adress'>
// </Input>
// </FormGroup>
// </Col>
// <Col lg="6">
// <FormGroup>
// <Label for='street2' >Addres Line2 </Label>
// <Input type="textarea" name="street2"
// placeholder='Enter Your Complete Adress'>
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Label for='city'>City/Town</Label>
// <Input type="text"
// name="city" 
// placeholder='City'>
// </Input>
// </FormGroup>
// </Col>


// <Col lg="4" >
// <FormGroup>
// <Label for='state' >State</Label>
// <Input type="text"
// name="state" 
// placeholder='State'>
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4">
// <Label>Country</Label>
// <SingleSelect name="country"
//                                options={country}
//                                getValuesFn={this.getValuesFn}
//                                selectedValue={this.state.country} />
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Label for='pincode' >PIN Code</Label>
// <Input type="number"
// name="pincode" 
// placeholder='Pincode'>
// </Input>
// </FormGroup>
// </Col>
// </Row>
// <hr />
// <h3>Bank Details</h3>
// <Row>
// <Col lg="4" >
// <FormGroup>
// <Label for="bank_name">Bank Name</Label>
// <Input
// type="text"
// name="bank_name"
// placeholder='Enter Your Bank Name'
// />
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Label for="account_number">Account Number</Label>
// <Input 
// type='number'
// name="account_number"
// placeholder='Enter Your Account Number'
// value={this.state.account_number}
//  >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Label for="ifsc_code">Bank Unique Code</Label>
// <Input name='IFSC_code'
// placeholder='Enter IFSC Code'
// value={this.state.ifsc_code}
//  >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Label for="bank_branch">Bank Branch</Label>
// <Input name='bank_branch'
// placeholder='Enter Branch'
// value={this.state.ifsc_code}
//  >
// </Input>
// </FormGroup>
// </Col>
// </Row>
// <Row>
// </Row>
// <hr />
// <h3>Documents</h3>
// <Row>
// <Col lg="4" >
// <FormGroup>
// <Label for="resume">Resume</Label>
// <Input name='resume'
// type='file'
//  >
// </Input>
// <span style={{color:"red"}}>{this.state.error.resume}</span>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Label for="gov_id">Governament ID</Label>
// <Input name='gov_id'
// type='file'
//  >
// </Input>
// <span style={{color:"red"}}>{this.state.error.gov_id}</span>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Label for='Passport' >Passport</Label>
// <Input name="passport"
// type='file'
//  >
// </Input>
// <span style={{color:"red"}}>{this.state.error.passport}</span>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Label for='other_documents' >Other Certificates</Label>
// <Input name="other_documents"
// type='file'
//  >
// </Input>
// <span style={{color:"red"}}>{this.state.error.other_documents}</span>
// </FormGroup>
// </Col>
// </Row>
// <hr />
// <h3>Medical Hitory</h3>
// <Row>
// <Col lg="12" >
// <FormGroup>
// <Label for="medical_history">Medical History</Label>
// <Input name='medical_history'
// type='textarea'
// placeholder='Medical History'
//  >
// </Input>
// </FormGroup>
// </Col>
// </Row>
// <hr />
// <h3>Password</h3>
// <Row>

// <Col lg="6" >
// <FormGroup>
// <Label for='password' >Password</Label>
// <Input name="password"
// type='password'
// placeholder='Create New Password'
//  >
// </Input>
// <span style={{color:"red"}}>{this.state.error.password}</span>
// </FormGroup>
// </Col>
// <Col lg="6" >
// <FormGroup>
// <Label for='confirm_password' >Confirm Password</Label>
// <Input name="confirm_password"
// type='password'
// placeholder='Confirm Password'
//  >
// </Input>
// <span style={{color:"red"}}>{this.state.error.password}</span>
// </FormGroup>
// </Col>
// </Row>
// <div style={{display:"flex",justifyContent:"flex-end"}}>
//   <Link to="/employee">
// <Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Cancel</Button> </Link>
// <Button id='corporatesubmitbtn' type='submit' value="submit" color='primary mr-2' >Submit</Button> 
// </div>
// </form>
// </CardBody>
// </Card>
//   }

// return (
// <React.Fragment>
// <BreadCrumbs
//           breadCrumbTitle="Employees"
//           breadCrumbParent="Profile & Employees"
//           breadCrumbActive="Add employees"
//         />

// {Loading_HTML}
// </React.Fragment>
// );
// }
// }

import React, { Component} from 'react';
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
import { Link, NavLink } from "react-router-dom";
import  BreadCrumbs  from "components/@custom/breadCrumbs/BreadCrumb";
import { toast } from "react-toastify";
import axios from "axios";
import Select from 'react-select'
import {country,gender,bloodgroup} from"./../country/CountryList"
import * as Icon from "react-feather";
import SingleSelect from "components/common/formBasic/singleSelect";


export default class EmployeesList extends Component {
constructor(props) {
super(props);
this.state = {
  error:'',
  uploading:false,
  isPasswordShown1:false,
  isPasswordShown2:false,
  employeedetails:"",
     user_id:'',
     name:'',
     email:'',
     gender:'',
     blood_group:'',
     phone_number:'',
     emergency_contact_number:"",
     dob:'',
     joining_date:'',
     designation:'',
    street:'',
    street2:"",
    city:'',
    state:'',
    country:'',
    pincode:'',
    bank_name:'',
    account_number:'',
    account_code:'',
    bank_branch:"",
    swift_code:"",
    gov_id:'',
    resume:'',
    passport:"",
    other_document:'',
    medical_history:"",
    password:'',
    btnLoading: false,


};
this.initialState = this.state;
this.handleChange=this.handleChange.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
}


togglePasswordVisibity1 = () =>{
  const {isPasswordShown1} = this.state;
  this.setState({isPasswordShown1: !isPasswordShown1})
}

togglePasswordVisibity2 = () =>{
  const {isPasswordShown2} = this.state;
  this.setState({isPasswordShown2: !isPasswordShown2})
}

handleChange = (e) => {
const { name, value} = e.target;
this.setState({ [name]: value });
}

formValidation = () =>{
  const {resume} = this.state;
  let isValid = true;
  const error = {};
  if (resume.size > 10){
    error.resume = 'resume size should be less than 1MB'
    isValid = false;
  }

  this.setState({error});
  return isValid;

}

handleSubmit = (e) => {

  const isValid = this.formValidation();


  this.setState(
    {
      uploading:true, 
    }
    )
var formData = new FormData(document.querySelector("#employee"));
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
console.log(j ,Name[j],Data[j]);

}
console.log(Data[23].size);
e.preventDefault();
this.setState({ btnLoading: true});

// if (this.state.resume < 1000){
// this.setState({ resume: true});
// }
// else{
//   alert ("Resume size should be less than 1 mb")
// }
// if (this.state.gov_id < 1000){
//   this.setState({ gov_id: true});
//   }
//   else{
//     alert ("gov_id size should be less than 1 mb")
//   }
//   if (this.state.passport < 1000){
//     this.setState({ passport: true});
//     }
//     else{
//       alert ("passport size should be less than 1 mb")
//     }
//     if (this.state.other_document < 1000){
//       this.setState({ other_document: true});
//       }
//       else{
//         alert ("other_document size should be less than 1 mb")
//       }
axios
.post(`/api/employee/save`, formData)
.then((response) => {
if (response.data.status == 200) {
toast.success(response.data.Result); 
this.props.history.push("/employee");
} else {
  this.setState(
    {
      uploading:false,
    }
    )
 
toast.error("Please Check All feilds");
console.log(response.data.Result);
this.setState(
  {
    error:response.data.Result,
  }
  );
}
})
.catch((error) => {
toast.error("Cant Add this employee");
this.setState({ btnLoading: false });
});

}
async componentDidMount() {
}

getValuesFn = (data) => {
   
  if (data.id == "country") {
    this.setState({
      country:data.value,
    });
  }
  else if (data.id == "gender") {
    this.setState({
      gender:data.value,
    });
  }
    else{
  this.setState({
    blood_group:data.value,
  });
}
};

render() {  
const {isPasswordShown1,isPasswordShown2,error} = this.state;

return (
<React.Fragment>
<BreadCrumbs
          breadCrumbTitle="Employees"
          breadCrumbParent="Profile & Employees"
          breadCrumbActive="Add employees"
        />
<Card>
<CardHeader>
<CardTitle>
Add Employee
</CardTitle>
</CardHeader>
<CardBody>
<form onSubmit={this.handleSubmit} id="employee" >

<Row>
<Col lg="4" >
<FormGroup >
<Label for="name">Employee Name</Label>
<Label style={{color:"red"}}>*</Label>
<Input     
  value={this.state.name} 
  onChange={this.handleChange}
  type="text"
  name="name"
  placeholder='Enter Your Full Name'

/>
<small style={{color:"red"}}>{this.state.error.name}</small>
</FormGroup>
</Col>

              
<Col lg="4" >
<FormGroup >
<Label for="email">Email</Label>
<Label style={{color:"red"}}>*</Label>

<Input     value={this.state.email} onChange={this.handleChange}
type="email"
name="email"
placeholder='Enter your Emai Id'

/>
<small style={{color:"red"}}>{this.state.error.email}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup >
<Label for="DateOfBirth">Date Of Birth</Label>
<Label style={{color:"red"}}>*</Label>
<Input     
value={this.state.dob} 
onChange={this.handleChange} 
name="dob"
type='date' 

/>
<small style={{color:"red"}}>{this.state.error.dob}</small>
</FormGroup>
</Col>

<Col lg="4"  >
<FormGroup >
<Label for="gender">Gender</Label>
<Label style={{color:"red"}}>*</Label>
<SingleSelect
 name="gender"
 options={gender}
 getValuesFn={this.getValuesFn}
 selectedValue={this.state.gender} 
 
  />                     
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup >
<Label for="phone_number">Mobile Number</Label>
<Label style={{color:"red"}}>*</Label>

<Input     value={this.state.phone_number} onChange={this.handleChange}
type='tel'
name="phone_number"
placeholder="Enter Your Phone Number"

/>
<small style={{color:"red"}}>{this.state.error.phone_number}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup >
<Label for="phone_number">Emergency Contact Number</Label>
<Label> <small>(optional)</small></Label>
<Input     value={this.state.emergency_contact_number} onChange={this.handleChange}
type='tel'
name="emergency_contact_number"
placeholder="Enter Your Phone Number"
/>
<small style={{color:"red"}}>{this.state.error.emergency_contact_number}</small>
</FormGroup>
</Col>


<Col lg="4" >
<FormGroup >
<Label for="DateOfJoining">Date Of Joining</Label>
<Label style={{color:"red"}}>*</Label>
<Input     value={this.state.joining_date} onChange={this.handleChange} 
name="joining_date"
type='date'

 />
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup >
<Label for="Designation">Designation</Label>
<Label style={{color:"red"}}>*</Label>
<Input    
value={this.state.designation} 
onChange={this.handleChange} 
name="designation"
type='text'
placeholder="Your Designation in the Company" 

 />
<small style={{color:"red"}}>{this.state.error.designation}</small>
</FormGroup>
</Col>

<Col lg="4" >
    <FormGroup>
    <Label for="blood_group" >Blood Group</Label>
<Label style={{color:"red"}}>*</Label>

    <SingleSelect  name="blood_group" 
        
             options={bloodgroup}             
             getValuesFn={this.getValuesFn}
             selectedValue={this.state.blood_group} />
            </FormGroup>
            </Col>
</Row>
<hr />
<h3 > Address</h3>

<Row>
<Col lg="6">
<FormGroup>
<Label for='street' >Address Line 1 </Label>
<Label style={{color:"red"}}>*</Label>

<Input     value={this.state.street}  onChange={this.handleChange} type="text" name="street"
placeholder='Enter Your Complete Adress'
/>
<small style={{color:"red"}}>{this.state.error.street}</small>
</FormGroup>
</Col>

<Col lg="6">
<FormGroup>
<Label for='street2' >Address Line 2 </Label>
<Label> <small>(optional)</small></Label>
<Input     value={this.state.street2} onChange={this.handleChange} type="text" name="street2"
placeholder='Enter Your Complete Adress' />
<small style={{color:"red"}}>{this.state.error.street2}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup>
<Label for='city'>City/Town</Label>
<Label style={{color:"red"}}>*</Label>

<Input     value={this.state.city}  onChange={this.handleChange} type="text"
name="city" 
placeholder='City'

/>
<small style={{color:"red"}}>{this.state.error.city}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup>
<Label for='state'>State</Label>
<Label style={{color:"red"}}>*</Label>

<Input     value={this.state.state} onChange={this.handleChange} type="text"
name="state" 
placeholder='State'

/>
<small style={{color:"red"}}>{this.state.error.state}</small>
</FormGroup>
</Col>

<Col lg="4">
<Label>Country</Label>
<Label style={{color:"red"}}>*</Label>

<SingleSelect name="country"
options={country}
getValuesFn={this.getValuesFn}
selectedValue={this.state.country} 
/>
</Col>                                     
       
<Col lg="4" >
<FormGroup>
<Label for='pincode' >PIN Code</Label>
<Label style={{color:"red"}}>*</Label>

<Input     value={this.state.pincode} onChange={this.handleChange} type="number"
name="pincode" 
placeholder='Pincode'
/>
<small style={{color:"red"}}>{this.state.error.pincode}</small>
</FormGroup>
</Col>

</Row>
<hr />

<h3>Bank Details <small> <small>(optional)</small></small></h3>

<Row>
<Col lg="4" >
<FormGroup>
<Label for="bank_name">Bank Name</Label>

<Input    
type="text"
name="bank_name"
placeholder='Enter Your Bank Name'
value={this.state.bank_name} 
onChange={this.handleChange}
/>
<small style={{color:"red"}}>{this.state.error.bank_name}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup>
<Label for="account_number">Account Number</Label>

<Input     value={this.state.account_number}  onChange={this.handleChange}
type='number'
name="account_number"
placeholder='Enter Your Account Number'
 />
<small style={{color:"red"}}>{this.state.error.account_number}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup>
<Label for="ifsc_code">Bank Unique Code</Label>

<Input     
type='text'
value={this.state.account_code}
onChange={this.handleChange} 
name= "account_code"
placeholder='Enter IFSC Code' />
<small style={{color:"red"}}>{this.state.error.account_code}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup>
<Label for="bank_branch">Bank Branch</Label>
<Input     
type='text' 
value={this.state.bank_branch} onChange={this.handleChange} 
name='bank_branch'
placeholder='Enter Branch' />
<small style={{color:"red"}}>{this.state.error.bank_branch}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup>
<Label for="swift_code">Bank Swift Code</Label>
<Input     
type='text'
value={this.state.swift_code} onChange={this.handleChange} 
name='swift_code'
placeholder='Enter Swift Code'/>
<small style={{color:"red"}}>{this.state.error.swift_code}</small>
</FormGroup>
</Col>
</Row>

<hr />

<h3>Documents</h3>
<small>(uploading documents format)<small style={{color:"red"}}>(pdf,jpeg,docx)</small></small> <br />
<small>(Maximum Size)<small style={{color:"red"}}>(up to 1 mb)</small></small>


<Row>
<Col lg="4" >
<FormGroup>
<Label for="resume">Resume</Label>
<Input name='resume'
type="file"
 />
<small style={{color:"red"}}>{this.state.error.resume}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup>
<Label for="gov_id">Governament ID</Label>
<Input     name='gov_id'
type='file'/>
<small style={{color:"red"}}>{this.state.error.gov_id}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup>
<Label for='Passport' >Passport</Label>
<Input name="passport"
type='file'/>
<small style={{color:"red"}}>{this.state.error.passport}</small>
</FormGroup>
</Col>

<Col lg="4" >
<FormGroup>
<Label for='other_document' >Other Certificates</Label>
<Input   name="other_document"
type='file'/>
<small style={{color:"red"}}>{this.state.error.other_document}</small>
</FormGroup>
</Col>
</Row>

<hr />
<h3>Medical Hitory <small> <small>(optional)</small></small></h3>
<Row>
<Col lg="12" >
<FormGroup>
<Label for="medical_history">Medical History</Label>
<Input     value={this.state.medical_history} onChange={this.handleChange} name='medical_history'
type='textarea'
placeholder='Medical History' />
<small style={{color:"red"}}>{this.state.error.medical_history}</small>

</FormGroup>
</Col>
</Row>
<hr />
<h3>Password</h3>
<Row>

<Col  lg="6">
<FormGroup>
<Label for='password' >Password</Label>
<Label style={{color:"red"}}>* </Label>

<div className="form-label-group position-relative has-icon-right">
  <Input      
    name="password"
    type= {(isPasswordShown1) ? "text" : "password"} 
    placeholder='Create New Password'
  
    value={this.state.password} onChange={this.handleChange}
      />

  <div className="form-control-position">
  <i 
    onClick={this.togglePasswordVisibity1} >
    {this.state.isPasswordShown1 ? <Icon.EyeOff size={20}/> : <Icon.Eye size={20}/>} 
    </i>
  </div>

</div>
<small style={{color:"red"}}>{this.state.error.password}</small>
</FormGroup>
</Col>
 

<Col lg="6" >
<FormGroup>
<Label for='password' >Confirm Password</Label>
<Label style={{color:"red"}}>*</Label>


<div className="form-label-group position-relative has-icon-right">
  <Input      
    name="confirm_password"
    type= {(isPasswordShown2) ? "text" : "password"} 
    placeholder='Confirm Password'
  
    value={this.state.confirm_password} onChange={this.handleChange}
      />

  <div className="form-control-position">
  <i 
    onClick={this.togglePasswordVisibity2} >
    {this.state.isPasswordShown2 ? <Icon.EyeOff size={20}/> : <Icon.Eye size={20}/>} 
    </i>
  </div>

</div>
<small style={{color:"red"}}>{this.state.error.confirm_password}</small>
</FormGroup>
</Col>

</Row>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<Link to="/employee"><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Cancel</Button></Link>
<div className="d-flex justify-content-between">              
              {this.state.btnLoading ? (
                <Button.Ripple color="primary" type="button">
                  <Spinner color="white" size="sm" />
                  <small className="ml-50">Loading...</small>
                </Button.Ripple>
              ) : (
                <Button.Ripple color="primary" type="submit">Submit</Button.Ripple>
              )}
            </div>
</div>
{/* {Object.keys(error).map((key)=>{
    return <div style={{color: "red"}} key={key}>{error[key]}</div>
})} */}
</form>
</CardBody>
</Card>
</React.Fragment>
);
}
}