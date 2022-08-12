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
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import "assets/scss/pages/data-list.scss";
  import {Link,Redirect} from 'react-router-dom';
  import SingleSelect from "components/common/formBasic/singleSelect";
  import axios from "axios";
import getall from "../dsr's/details/corporateDetails"
import { toast } from 'react-toastify';
import {country,currency,RegistrationType,Terms} from "./../../country/CountryList"

let TripType=[
{label:"One Way",value:"One Way"},
{label:"Round Trip",value:"Round Trip"},
{label:"Multi City",value:"Multi City"},];

let BillingType=[
{label:"Primary",value:"Primary"},
{label:"Normal",value:"Normal"}
];
export default class AddMICE extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      corporate:[],
      customer_options:[],
      billing_type:'',
      trip_type:'',
      corporateDetails:[],
      employes:[],
      redirect:'',
      setemp:false,
      search:''
     } 
   }
   async getDetails(id)
   {
   const all= await getall(id)

   console.log(all);
   this.setState({
    corporateDetails:all.companyDetails,
    employes:all,
    setemp:true
   })
   }
   
  
   getValuesFn = (data) => {
    if (data.id == "customer_options") {
        this.setState({
            customer_options:data.value,
    
          });
          this.getDetails(data.value)
        }
        else if (data.id == "dsr_currency") {
          this.setState({
            dsr_currency:data.value,
          });
        }
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
      .post(`/api/mice/save`, formData)
      .then((response) => {
      if (response.data.status == 200) {
        this.setState(
          {
            uploading:false,
            redirect:true
          }
          )
      toast.success(response.data.Result); 
      // this.props.history.push("/dsr");
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
    const res2 = await axios.get(`api/corporatecustomer/getselect`);
    console.log(res2)
    this.setState({
        corporate:res2.data.customer,
       
    })

   }
 render(){
let  options='';
let passenger=[],i=0;
    options  = this.state.corporate.map(function (corporate) {
     
        return {label:corporate.company_name,value:corporate.corparate_customer_id}
        
})
let emplist="";
let details="";
let redto="";
if(this.state.redirect)
{
  redto=<Redirect to='/mice' />
}

if(this.state.setemp)
{
    details=  
    <div style={{padding:'5px'}}>
<h5> <b>Company Details</b></h5>
<hr />
<Row>
<Col lg="2">
 <h6>Company Name :</h6>
 <p>{this.state.corporateDetails.company_name}</p>
</Col>
<Col lg="2">
 <h6>Alias Name :</h6>
 <p>{this.state.corporateDetails.company_alias_name}</p>
</Col>

<Col lg="3">
 <h6>Email :</h6>
 <p>{this.state.corporateDetails.company_email}</p>
</Col>
<Col lg="2">
 <h6>Phone Number :</h6>
 <p>{this.state.corporateDetails.company_phone_number}</p>
</Col>

<Col lg="3">
 <h6>Emergency Contact Number :</h6>
 <p>{this.state.corporateDetails.company_mobile_number}</p>
</Col>
</Row>

<hr />
<Row>
<Col lg="3">
 <h6>Company Addres :</h6>
 <p>{this.state.corporateDetails.company_shipping_addres}, 
 {this.state.corporateDetails.company_shipping_city}<br></br>{this.state.corporateDetails.company_shipping_state},  
 {this.state.corporateDetails.company_shipping_country}<br></br>{this.state.corporateDetails.company_shipping_city_pincode}
 </p>

</Col>
<Col lg="3">
 <h6>Billing Addres :</h6>
 <p>{this.state.corporateDetails.company_addres} ,
 {this.state.corporateDetails.company_city}<br></br>{this.state.corporateDetails.company_state},  
 {this.state.corporateDetails.company_country}<br></br>{this.state.corporateDetails.company_city_pincode}
 </p>
</Col>


<Col lg="2"> 
 <h6>Registration Type :</h6>
 <p>{this.state.corporateDetails.company_registration_type}</p>
</Col>

<Col lg="2">
 <h6>Registration Number :</h6>
 <p>{this.state.corporateDetails.company_tax_reg_num}</p>
</Col>
</Row>
<br />
<h5><b>Employee List</b>   </h5>
<hr />
</div>;
    
    emplist=
    
    this.state.employes.employes.map((item,i) =>{
      i++;
        return(
            
     <div key={item.id} >
      
      <Row>
    <Col lg="6">
    <div class="form-check">
       <Input type="checkbox"  name={'passenger'+i} value={item.id} id="flexCheckDefault"></Input>
       <Label ><h5>{item.employeeName}</h5> </Label> <span><small style={{color:item.color}} >{item.passportExpiry}   {item.insuranceExpiry} </small></span><br></br>
       </div>
       </Col>
       </Row>
       </div>
       
        )
        i++;
       }
    );
}


 return (
    

    <React.Fragment>
{redto}
<BreadCrumbs
        breadCrumbTitle="MICE"
        breadCrumbParent="Edit MICE"
        breadCrumbActive="Add MICE"
      />
<Card>
            <CardHeader>
              <CardTitle>
                Add Corporate and Employee
              </CardTitle>
            </CardHeader>
            <CardBody>
            <form onSubmit={this.handleSubmit} id="dsr" >
            <Input name="customer_type" value="Corporate"
hidden />
            
         <br />
<Row>

         <Col lg="4" >
                    <Label>MICE Name</Label>
                  <Input
     name="mice_name"
       type="text"             
/>

         </Col>

         <Col lg="4" >
                    <Label>Select by Company Name</Label>
                  <SingleSelect
     name="customer_options"
       options={options}    
       getValuesFn={this.getValuesFn}  
       selectedValue={this.state.customer_options}                 
/>

         </Col>

                  <Col lg="4" >
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
       {emplist}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <Link to="/mice" ><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Back</Button> </Link>
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