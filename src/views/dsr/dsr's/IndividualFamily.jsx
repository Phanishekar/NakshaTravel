import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Label,
    Input,
    Button,
    Spinner

  } from "reactstrap";
  import {country,currency,RegistrationType,Terms} from "./../../country/CountryList"
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import "assets/scss/pages/data-list.scss";
  import SingleSelect from "components/common/formBasic/singleSelect";
  import axios from "axios";
  import getall from "./details/InduvidualFamily";
  import {Link,Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';

  // let TripType=[
  //   {label:"One Way",value:"One Way"},
  //   {label:"Round Trip",value:"Round Trip"},
  //   {label:"Multi City",value:"Multi City"},];
    
  //   let BillingType=[
  //   {label:"Primary",value:"Primary"},
  //   {label:"Normal",value:"Normal"}
  //   ];

export default class CorporateEmployee extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      individual:[],
      customer_options:[],
      billing_type:'',
      trip_type:'',
      valueSet:false,
      IndividualDetails:[],
      FamilyDetails:[],
      PassengersValues: [{ name: "", id : "" }],
      individualPassport:'',
      individulPassport:'',
      redirect:false
     } 
   }
    
   async getDetailsTwo(id)
   {
    const all= await getall(id)
this.setState({
      valueSet:true,
      IndividualDetails:all.Individual[0].Details,
      individualPassport:all.Individual[2].Passport,
      individulPassport:all.Individual[1].Insurance,
      FamilyDetails:all
});

    console.log(this.state.FamilyDetails);
    this.setState({
     
    })
   }
  
   handleSubmit = (e) => {

    this.setState(
      {
        btnLoading:true,
      }
      );
    
    var formData = new FormData(document.querySelector("#dsr"));
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
      
    
      axios
      .post(`/api/dsr/save`, formData)
      .then((response) => {
      if (response.data.status == 200) {
      toast.success(response.data.Result); 
      this.setState(
        {
          
          redirect:true
        }
        )

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
      toast.error("oops!..  someething wet Wrong");
      this.setState({ btnLoading: false });
      });
    
}  
   getValuesFn = (data) => {
     
    if (data.id == "customer_options") {

        
      this.setState({
        customer_options:data.value,

      });
      this.getDetailsTwo(data.value)
    }
    else if (data.id == "dsr_currency") {
      this.setState({
        dsr_currency:data.value,
      });
    }
    // else if (data.id == "billing_type") {

        
    //   this.setState({
    //     billing_type:data.value,

    //   });
    // }
    // else if (data.id == "trip_type") {

        
    //   this.setState({
    //     trip_type:data.value,

    //   });
    // }
  }
  async componentDidMount() {
    const res2 = await axios.get(`api/individualcustomer/getselect`);
    console.log(res2)
    this.setState({
      individual:res2.data.customer,
       
    })

   }
 render(){
let  options='';
options  = this.state.individual.map(function (corporate) {
     
  return {label:corporate.individual_name,value:corporate.individual_customer_id}
  
})
 let RedirctPage="";       
let emplist="";
let details="";
let indidetails='';
if(this.state.valueSet)
{
    details=  
    <div style={{padding:'5px'}}>
     
       <h3>Individual Details </h3>
      
      
    <Row>
    <Col lg="6">

    <Label>Individual Name</Label>
        <h5>{this.state.IndividualDetails.individual_name}</h5>  
       
    </Col>
    
    </Row>
    <br /><hr />
    <Row>
    <Col lg="4">
        <Label>Email</Label>
        <h5>{this.state.IndividualDetails.individual_email}</h5>
    </Col>
    <Col lg="4">
        <Label>Phone Number</Label>
        <h5>{this.state.IndividualDetails.individual_phone_number}</h5>
    </Col>
    <Col lg="4">
        <Label>Emergency Contact Number</Label>
        <h5>{this.state.IndividualDetails.individual_mobile_number}</h5>
    </Col>
    </Row>

    <br /><hr />
    <Row>
    <Col lg="6">
        <Label>Company Addres</Label>
        <h5>{this.state.IndividualDetails.individual_residential_addres}<br />
        {this.state.IndividualDetails.individual_residential_city},{this.state.IndividualDetails.individual_residential_state} <br />
        {this.state.IndividualDetails.individual_residential_country},{this.state.IndividualDetails.individual_residential_city_pincode}
        </h5>

    </Col>
    <Col lg="4">
        <Label>Billing Addres</Label>
        <h5>{this.state.IndividualDetails.individual_billing_addres}<br />
        {this.state.IndividualDetails.individual_billing_city},{this.state.IndividualDetails.individual_billing_state} <br />
        {this.state.IndividualDetails.individual_billing_country},{this.state.IndividualDetails.individual_billing_city_pincode}
        </h5>
    </Col>
   
    </Row>
    <br />
  
    
    <h3> Individual & FamilyList</h3><hr />
    
    </div>;

    //  
    //
    indidetails= <div>
      <Row>
    <Col lg="6">
      <Input type="checkbox"  name='passenger_individual' value={this.state.IndividualDetails.individual_customer_id}></Input>
       <Label ><h5>{this.state.IndividualDetails.individual_name}</h5> </Label> <span><small style={{color:'red'}} >{this.state.individulPassport}   {this.state.individualPassport} </small></span><br></br>
       </Col>
       </Row>
    </div>;
    var i=0;
    emplist=
    this.state.FamilyDetails.family.map((item,i) =>{
      i++;
        return(
            
     <div key={item.id} >
      <Row>
    <Col lg="6">
       <Input type="checkbox"  name={'passenger'+i}  value={item.id}></Input>
       <Label ><h5>{item.FamilyName}</h5> </Label> <span><small style={{color:item.color}} >{item.FamilyPassport}   {item.FamilyInsurance} </small></span><br></br>
       </Col>
       </Row>
       
       </div>
        )
      
       }
    );
      }

      if(this.state.redirect)
{
  RedirctPage=<Redirect to='/dsr' />;
}

 return (
    

    <React.Fragment>
{RedirctPage}

<Card>
            <CardHeader>
              <CardTitle>
                Add Individual and Family
              </CardTitle>
            </CardHeader>
            <CardBody>
            <form onSubmit={this.handleSubmit} id="dsr" >
              <Input name="customer_type" value="Individual"
hidden />           

<Input name="type" value="DSR"
hidden />
   <Row>
           
         {/* <Col lg="6" >
                    <Label>Trip Type</Label>
                  <SingleSelect
     name="trip_type"
       options={TripType}    
       getValuesFn={this.getValuesFn}  
       selectedValue={this.state.trip_type}                 
/>

         </Col>
         <Col lg="6" >
                    <Label>Billing Type</Label>
                  <SingleSelect
     name="billing_type"
       options={BillingType}    
       getValuesFn={this.getValuesFn}  
       selectedValue={this.state.billing_type}                 
/>

         </Col> */}
         </Row>
         <br />
<Row>

                  <Col lg="6" >
                  <Label>Select by Individual Name</Label>
                  <SingleSelect
     name="customer_options"
       options={options}    
       getValuesFn={this.getValuesFn}  
       selectedValue={this.state.customer_options}                 
/>

         </Col>
                  <Col lg="6" >
                  <Label>Currency</Label>
                  <SingleSelect  
                               name="dsr_currency"
                               selectedValue={this.state.dsr_currency}
                               options={currency}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
         </Col>
           
         </Row>
         <br /><br />
         {details}
         
         <div style={{marginLeft:'20px'}}>
          {indidetails}
         {emplist}
         </div>
          <br /><br />
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
                <Button.Ripple color="primary" type="submit">Submit</Button.Ripple>
              )}
            </div>
</div>
</form>
         </CardBody>
         </Card>
         <br /><br />   <br /><br />
          </React.Fragment>
 )
 }
  }


