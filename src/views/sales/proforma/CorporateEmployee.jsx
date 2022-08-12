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
  import {Link,Route} from 'react-router-dom';
  import SingleSelect from "components/common/formBasic/singleSelect";
  import axios from "axios";
import getall from "./details/corporateDetails"
import { toast } from 'react-toastify';
import {country,currency,RegistrationType,Terms} from "./../../country/CountryList"
import * as Icon from "react-feather";

let TripType=[
{label:"One Way",value:"One Way"},
{label:"Round Trip",value:"Round Trip"},
{label:"Multi City",value:"Multi City"},];

let BillingType=[
{label:"Primary",value:"Primary"},
{label:"Normal",value:"Normal"}
];
export default class CorporateEmployee extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      Route:false,
      corporate:[],
      customer_options:[],
      billing_type:'',
      trip_type:'',
      corporateDetails:[],
      employes:[],
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

let x='';
if(Route)
{
  x=<Route to='/' />;
}


 return (
<div>
{x}
            
                    <Label>Select by Company Name</Label>
                  <SingleSelect
     name="customer_options"
       options={options}    
       getValuesFn={this.getValuesFn}  
       selectedValue={this.state.customer_options}                 
/>

         <br /><br />  
        
         <div style={{display:"flex",justifyContent:"flex-end"}}>
                <Button.Ripple  color="info" type="submit"><b>Next</b>  <Icon.ArrowRight /></Button.Ripple>
           </div>
           
    
 </div>
 )
 }
  }