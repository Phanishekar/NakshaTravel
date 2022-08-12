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
import { Link, NavLink } from "react-router-dom";
import  BreadCrumbs  from "components/@custom/breadCrumbs/BreadCrumb";
import { toast } from "react-toastify";
import axios from "axios";
import SingleSelect from "components/common/formBasic/singleSelect";
import {tax,asset,unit,categaroy,income} from "views/country/CountryList"
import {validateFeild} from "./noninventoryValidation/Validation"
var xfeild=[];
export default class EditNonInventory extends Component {
constructor(props) {
super(props);
this.state = {
  non_inventory_id: '',
non_inventory_name: '',
non_inventory_sku: '',
non_inventory_hsn_code: '',
non_inventory_image: '',
non_inventory_unit: '',
non_inventory_categaroy: '',
non_inventory_quantity_on_hand: '',
non_inventory_asof_date: '',
non_inventory_asset_account: '',
non_inventory_description_sales_form: '',
non_inventory_sales_price: '',
non_inventory_income_account: '',
non_inventory_tax: '',
non_inventory_descrption: '',
non_inventory_cost: '',
non_inventory_expence_account: '',
non_inventory_purchase_tax: '',
non_inventory_reserve_charge: '',
non_inventory_prefered_supplier: '',
btnLoading: false,
error:"",
allfeilds:"true",

};
this.initialState = this.state;
this.handleChange=this.handleChange.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
}
handleChange = (e) => {
const { name, value,} = e.target;
this.setState({ [name]: value });
}
handleSubmit = (e) => {
var formData = new FormData(document.querySelector("#noninventory"));
let i=0,Name=[],Data=[];
for(var pair of formData.entries())
{
console.log(pair[0],pair[1]);
Name[i]=pair[0];
Data[i]=pair[1];
i++;
}
xfeild =   validateFeild(this.state);
for(var j=0;j<i;j++ )
{
formData.append(Name[i],Data[i]);
}
e.preventDefault();
this.setState({ btnLoading: true }); 
let id=this.props.match.params.id;
if(xfeild.Result){

axios
.post(`/api/productandservices/noninventory/update/${id}`, formData)
.then((response) => {
if (response.data.status == 200) {
toast.success(response.data.Result);
this.props.history.push("/productservices/noninventory");
} 
else {
toast.error("Please check all fields");
}
})
.catch((error) => {
toast.error(error.Result);
});
}
else{
  toast.error("Please check all fields");
  this.setState(
    {
      btnLoading:false,
    }
    );
}
}

getValuesFn = (data) => {
   
  if (data.id == "non_inventory_tax") {
    this.setState({
      non_inventory_tax:data.value,
    });
  }
  else if(data.id == "non_inventory_asset_account"){
    this.setState({
      non_inventory_asset_account:data.value
    })
  }
  else if(data.id == "non_inventory_categaroy"){
    this.setState({
      non_inventory_categaroy:data.value
    })
  }
  else if(data.id == "non_inventory_unit"){
    this.setState({
      non_inventory_unit:data.value
    })
  }
  else if(data.id == "non_inventory_income_account"){
    this.setState({
      non_inventory_income_account:data.value
    })
  }
};

async componentDidMount() {
 
  let ids=this.props.match.params.id;
  const res = await axios.get(`/api/productandservices/noninventory/getById/${ids}`)
  console.log(res.data);
 
  if(res.data.status==200)
  {
    this.setState({
        loading:false,
 
        non_inventory_id:res.data.NonInventory.non_inventory_id,                                                    
        non_inventory_name:res.data.NonInventory.non_inventory_name,
        non_inventory_sku:res.data.NonInventory.non_inventory_sku,
        non_inventory_hsn_code:res.data.NonInventory.non_inventory_hsn_code,
        non_inventory_image:res.data.NonInventory.non_inventory_image,
        non_inventory_unit:res.data.NonInventory.non_inventory_unit,
        non_inventory_categaroy:res.data.NonInventory.non_inventory_categaroy,
        non_inventory_quantity_on_hand :res.data.NonInventory.  non_inventory_quantity_on_hand,
        non_inventory_asof_date:res.data.NonInventory.non_inventory_asof_date,
        non_inventory_asset_account:res.data.NonInventory.non_inventory_asset_account,
        non_inventory_description_sales_form :res.data.NonInventory.non_inventory_description_sales_form,
        non_inventory_sales_price:res.data.NonInventory.non_inventory_sales_price,
        non_inventory_income_account:res.data.NonInventory.non_inventory_income_account,
        non_inventory_tax:res.data.NonInventory.non_inventory_tax,
        non_inventory_descrption:res.data.NonInventory.non_inventory_descrption,
        non_inventory_cost:res.data.NonInventory.non_inventory_cost,
        non_inventory_expence_account:res.data.NonInventory.non_inventory_expence_account,
        non_inventory_purchase_tax:res.data.NonInventory.non_inventory_purchase_tax,
        non_inventory_reserve_charge:res.data.NonInventory.non_inventory_reserve_charge,
        non_inventory_prefered_supplier:res.data.NonInventory.non_inventory_prefered_supplier,
    })
  }
}
render() {
return (
<React.Fragment>
<BreadCrumbs
          breadCrumbTitle="Products & Services"
          breadCrumbParent="Non - Inventory"
          breadCrumbActive="Edit"
        />
 
<Card>
<CardHeader>
<CardTitle>
<h2>Non-Inventory Details</h2>
</CardTitle>
</CardHeader>
<CardBody>
<form onSubmit={this.handleSubmit} id="noninventory"  >
<Row>
<Col lg="12" >
<FormGroup >
<Label for="item">Item Name</Label>
<Label style={{color:"red"}}>*</Label>
<Input
type="text"
name="non_inventory_name"
value={this.state.non_inventory_name}
onChange={this.handleChange}
/>
<small style={{color:"red"}}>{xfeild.non_inventory_name}</small>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="HSN">HSN Code</Label>
<Input
type="text"
name="non_inventory_hsn_code"
value={this.state.non_inventory_hsn_code}
onChange={this.handleChange}
/>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="SKUs">SKU</Label>
<Input
type="text"
name="non_inventory_sku"
value={this.state.non_inventory_sku}
onChange={this.handleChange}
/>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="Categories">Category</Label>
<Label style={{color:"red"}}>*</Label>
<SingleSelect 
name="non_inventory_categaroy"
options={categaroy}
selectedValue={this.state.non_inventory_categaroy} 
getValuesFn={this.getValuesFn}/>
<small style={{color:"red"}}>{xfeild.non_inventory_categaroy}</small>
</FormGroup>
</Col>


<Col lg="6" >
<FormGroup >
<Label for="units">Unit</Label>
<SingleSelect 
name="non_inventory_unit"
options={unit}
selectedValue={this.state.non_inventory_unit} 
getValuesFn={this.getValuesFn}/>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="initial">Initial Quality in Hands As of date</Label>
<Label style={{color:"red"}}>*</Label>
<Input name="non_inventory_quantity_on_hand"
value={this.state.non_inventory_quantity_on_hand}
onChange={this.handleChange}
type='text'
></Input>
<small style={{color:"red"}}>{xfeild.non_inventory_quantity_on_hand}</small>
 <Input type="date"
name='non_inventory_asof_date'
value={this.state.non_inventory_asof_date}
onChange={this.handleChange}
></Input>
<small style={{color:"red"}}>{xfeild.non_inventory_asof_date}</small>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="inventory">Non-Inventory Assest Account</Label>
<SingleSelect 
name="non_inventory_asset_account"
options={asset}
selectedValue={this.state.non_inventory_asset_account} 
getValuesFn={this.getValuesFn}/>
</FormGroup>
</Col>
<Col lg="6" >
<FormGroup >
<Label for="salepriceperrate">Sales Price/Rate</Label>
<Label style={{color:"red"}}>*</Label>
<Input name="non_inventory_sales_price"
type='text'
value={this.state.non_inventory_sales_price}
onChange={this.handleChange}>
</Input>
</FormGroup>
</Col>
 
 
<Col lg="6" >
<FormGroup >
<Label for="taxes">Tax</Label>
<Label style={{color:"red"}}>*</Label>
<SingleSelect 
name="non_inventory_tax"
options={tax}
selectedValue={this.state.non_inventory_tax} 
getValuesFn={this.getValuesFn}/>
<small style={{color:"red"}}>{xfeild.non_inventory_tax}</small>
</FormGroup>
</Col>
 
<Col lg="6" >
<FormGroup >
<Label for="descriptions">Description</Label>
<Input name="non_inventory_descrption"
type='textarea'
value={this.state.non_inventory_descrption}
onChange={this.handleChange}>
</Input>
</FormGroup>
</Col>
</Row>
 


 <hr></hr>
 <h2>Purchase details</h2>


<Row>
<Col lg="6" >
<FormGroup >
<Label for="cost">Cost</Label>
<Label style={{color:"red"}}>*</Label>
<Input name="non_inventory_cost"
type='number'
value={this.state.non_inventory_cost}
onChange={this.handleChange}>
</Input>
<small style={{color:"red"}}>{xfeild.non_inventory_cost}</small>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="cost">Expense Amount</Label>
<Label style={{color:"red"}}>*</Label>
<Input name="non_inventory_expence_account"
type='number'
value={this.state.non_inventory_expence_account}
onChange={this.handleChange}>
</Input>
<small style={{color:"red"}}>{xfeild.non_inventory_expence_account}</small>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="cost">Purchase Tax</Label>
<Label style={{color:"red"}}>*</Label>
<Input name="non_inventory_purchase_tax"
type='number'
value={this.state.non_inventory_purchase_tax}
onChange={this.handleChange} >
</Input>
<small style={{color:"red"}}>{xfeild.non_inventory_purchase_tax}</small>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="cost">Reserve Charge</Label>
<Label style={{color:"red"}}>*</Label>
<Input name="non_inventory_reserve_charge"
type='number'
value={this.state.non_inventory_reserve_charge}
onChange={this.handleChange} >
</Input>
<small style={{color:"red"}}>{xfeild.non_inventory_reserve_charge}</small>
</FormGroup>
</Col>
</Row>

<div style={{display:"flex",justifyContent:"flex-end"}}>
<Link to="/productservices/nonInventory"><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Cancel</Button></Link>
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
 
</React.Fragment>
);
}
}
