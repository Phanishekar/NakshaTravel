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
import SingleSelect from "components/common/formBasic/singleSelect";
import axios from "axios";
import {tax,asset,categaroy,unit,income} from "./../../country/CountryList"
import {validateFeild,validate} from "./inventoryValidation/Validation"


var xfeild=[];
export default class AddInventory extends Component {
constructor(props) {
super(props);
this.state = {
  inventory_id : '',
  inventory_name:"",
  inventory_sku:"",
  inventory_hsn_code:"",
  inventory_image:"",
  inventory_unit:"",
  inventory_categaroy:"",
  inventory_quantity_on_hand:"",
  inventory_asof_date:"",
  inventory_asset_account:"",
  inventory_description_sales_form:"",
  inventory_sales_price:"",
  inventory_income_account:"",
  inventory_tax:"",
  error:"",
  btnLoading: false,
  filee: "true",
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
  this.setState({
      btnLoading:true,
    })
var formData = new FormData(document.querySelector("#inventory"));
let i=0,Name=[],Data=[];
for(var pair of formData.entries())
{
console.log(pair[0],pair[1]);
Name[i]=pair[0];
Data[i]=pair[1];
i++;
}
xfeild =   validateFeild(this.state);
for(var j=0;j<i;j++ ){
formData.append(Name[i],Data[i]);
}
e.preventDefault();
this.setState(
  {
        allfeilds:xfeild.Result,
    }
    ); 
if(this.state.filee && xfeild.Result)
{
axios
.post(`/api/productandservices/inventory/save`, formData)
.then((response) => {
if (response.data.status == 200) {
toast.success(response.data.Result);
this.props.history.push("/productservices/inventory/");
} else {
  this.setState(
    {
      btnLoading:false,
    }
    )
toast.error("Please check all the fields");
console.log(response.data.Result);
this.setState(
  {
    error:response.data.Result,
    btnLoading:false,
  }
  );

}
})
.catch((error) => {
// toast.error(error.Result);
toast.error("Cant Add this iventory");
this.setState({ btnLoading: false });
});
}
else {
  toast.error("Please check all fields");
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
   
  if (data.id == "inventory_tax") {
    this.setState({
      inventory_tax:data.value,
    });
  }
  else if(data.id == "inventory_asset_account"){
    this.setState({
      inventory_asset_account:data.value
    })
  }
  else if(data.id == "inventory_categaroy"){
    this.setState({
      inventory_categaroy:data.value
    })
  }
  else if(data.id == "inventory_unit"){
    this.setState({
      inventory_unit:data.value
    })
  }
  else if(data.id == "inventory_income_account"){
    this.setState({
      inventory_income_account:data.value
    })
  }
};
render() {
return (
<React.Fragment>
<BreadCrumbs
          breadCrumbTitle="Products & Services"
          breadCrumbParent="Inventory"
          breadCrumbActive="Add"
        />
<Card>
<CardHeader>
<CardTitle>
<u><b>Inventory Details</b></u>
</CardTitle>
</CardHeader>
<CardBody>
<form onSubmit={this.handleSubmit} id="inventory" >
<Row>
  
<Col lg="6" >
<FormGroup >
<Label for="item">Item Name</Label>
<Label style={{color:"red"}}>*</Label>
<Input
type="text"
name="inventory_name"
placeholder='Enter the Inventory Name'
value={this.state.inventory_name}
onChange={this.handleChange}
/>
<small style={{color:"red"}}>{xfeild.inventory_name}</small>
</FormGroup>
</Col>


<Col lg="6" >
<FormGroup >
<Label for="HSN">HSN Code</Label>
<Input
type="text"
name="inventory_hsn_code"
placeholder='Enter the HSN Code'
value={this.state.inventory_hsn_code}
onChange={this.handleChange}
/>
</FormGroup>
</Col>


<Col lg="6" >
<FormGroup >
<Label for="SKUs">SKU</Label>
<Input
type="text"
name="inventory_sku"
placeholder='Enter the SKU'
value={this.state.inventory_sku}
onChange={this.handleChange}
/>
</FormGroup>
</Col>


<Col lg="6" >
<FormGroup >
<Label for="Categories">Category</Label>
<Label style={{color:"red"}}>*</Label>
<SingleSelect 
name="inventory_categaroy"
options={categaroy}
selectedValue={this.state.inventory_categaroy} 
getValuesFn={this.getValuesFn}/>
<small style={{color:"red"}}>{xfeild.inventory_categaroy}</small>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="Categories">Income Amount</Label>
<Label style={{color:"red"}}>*</Label>
<SingleSelect 
name="inventory_income_account"
options={income}
selectedValue={this.state.inventory_income_account} 
getValuesFn={this.getValuesFn}/>
<small style={{color:"red"}}>{xfeild.inventory_income_account}</small>
</FormGroup>
</Col>

<Col lg="6" >
<FormGroup >
<Label for="units">Unit</Label>
<SingleSelect 
name="inventory_unit"
options={unit}
selectedValue={this.state.inventory_unit} 
getValuesFn={this.getValuesFn}/>
</FormGroup>
</Col>


<Col lg="6">
<FormGroup >
<Label for="initial">Initial Quantity in Hands As of date</Label>
<Label style={{color:"red"}}>*</Label>
<Input name="inventory_quantity_on_hand"
type='number'
placeholder='Enter the Initial Quantity'
value={this.state.inventory_quantity_on_hand}
onChange={this.handleChange}
>
 </Input>
<small style={{color:"red"}}>{xfeild.inventory_quantity_on_hand}</small>
<Input type="date"
name="inventory_asof_date"
value={this.state.inventory_asof_date}
onChange={this.handleChange}
></Input>
<small style={{color:"red"}}>{xfeild.inventory_asof_date}</small>
</FormGroup>
</Col>


<Col lg="6" >
<FormGroup >
<Label for="inventory">Inventory Assest Account</Label>
<SingleSelect 
name="inventory_asset_account"
options={asset}
selectedValue={this.state.inventory_asset_account} 
getValuesFn={this.getValuesFn}/>
</FormGroup>
</Col>


<Col lg="6" >
<FormGroup >
<Label for="salepriceperrate">Sales Price/Rate</Label>
<Input 
name="inventory_sales_price"
placeholder='Enter the Price'
type='text'
value={this.state.inventory_sales_price}
onChange={this.handleChange}
 >
</Input>
</FormGroup>
</Col>


<Col lg="6">
  <FormGroup>
<Label>Tax</Label>
<Label style={{color:"red"}}>*</Label>
<SingleSelect 
name="inventory_tax"
options={tax}
selectedValue={this.state.inventory_tax} 
getValuesFn={this.getValuesFn}/>
<small style={{color:"red"}}>{xfeild.inventory_tax}</small>
</FormGroup>
</Col>


<Col lg="6" >
<FormGroup >
<Label for="descriptions">Description</Label>
<Input name="inventory_description_sales_form"
type='textarea'
value={this.state.inventory_description_sales_form}
onChange={this.handleChange}
 >
</Input>

</FormGroup>
</Col>
</Row>

<div style={{display:"flex",justifyContent:"flex-end"}}>
<Link to="/productservices/inventory"><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Cancel</Button></Link>
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