import React, { Component } from "react";
import { Link } from "react-router-dom";
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
} from "reactstrap";
import { NavLink } from "react-router-dom";
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import { toast } from "react-toastify";
import SingleSelect from "components/common/formBasic/singleSelect";
import { country,currency, } from "../../country/CountryList";
import axios from "axios";
import {validate,validateFeild} from "./SupplierValidation/Validation";

const Registrationtype = [
  {value: "1" , label: "1"},
  {value: "2" , label: "2"},
]

const Terms = [
  {value: "1" , label: "1"},
  {value: "2" , label: "2"},
]

var xfeild=[];
export default class AddSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier_id: "",
      supplier_name: "",
      supplier_company_name: "",
      supplier_alias_name: "",
      supplier_email: "",
      supplier_phone_number: "",
      supplier_mobile_number: "",
      supplier_website_link: "",
      supplier_other: "",
      supplier_registration_type: "",
      supplier_registration_number: "",
      supplier_addres: "",
      supplier_country: "",
      supplier_state: "",
      supplier_city: "",
      supplier_city_pincode: "",
      supplier_prefered_payment_method: "",
      supplier_terms: "",
      supplier_creditlimit: "",
      supplier_bank_name: "",
      supplier_bank_accountnumber: "",
      supplier_bank_ifscnumber: "",
      supplier_bank_swiftcode: "",
      supplier_bank_currency: "",
      supplier_tax_reg_num: "",
      supplier_tax_reg_num_attachment: "",
      supplier_pan_num: "",
      supplier_pan_num_attachment: "",
      supplier_other_document: "",
      supplier_other_document_attachment: "",
      supplier_notes: "",
      supplier_approved: "",
      btnLoading: false,
      loading: true,
      loadingDetails: true,
      error:'',
      errorsupplier_tax_reg_num_attachment:'',
      errorsupplier_pan_num_attachment: "",
      errorsupplier_other_document_attachment: "",
      filee: "true",
      allfeilds:"true",
    };
    this.initialState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChanges = (e) => {  
    let x="";
           x= validate(e);
           console.log(x);
           if(x.for=="supplier_tax_reg_num_attachment")
           {
            this.setState({
              errorsupplier_tax_reg_num_attachment:x.errorr,
              filee:x.filee,
                      });
           }
           else if(x.for=="supplier_pan_num_attachment")
           {
            this.setState({
              errorsupplier_pan_num_attachment:x.errorr,
              filee:x.filee,
                      });
           }
           else if(x.for=="supplier_other_document_attachment")
           {
            this.setState({
              errorsupplier_other_document_attachment:x.errorr,
              filee:x.filee,
                      });
           }                   
              } 

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  
  handleSubmit = (e) => {
    this.setState({
        btnLoading:true,
      });
    var formData = new FormData(document.querySelector("#Supplier"));
    let i = 0,
      Name = [],
      Data = [];
    for (var pair of formData.entries()) {
      console.log(pair[0], pair[1]);
      Name[i] = pair[0];
      Data[i] = pair[1];
      i++;
    }
    xfeild =   validateFeild(this.state);
    for (var j = 0; j < i; j++) {
      formData.append(Name[i], Data[i]);
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
      .post(`/api/purchases/supplier/save`, formData)
      .then((response) => {
        if (response.data.status == 200) {
          toast.success(response.data.Result);
          this.props.history.push("/purchase/supplier");
          this.setState(
            {
              btnLoading:false,
            }
            );
        } else {
        toast.error("Please Check All feilds");
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
      toast.error("Cant Add this Supplier");
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
  };
  async componentDidMount() {}
  
  getValuesFn = (data) => {
    if (data.id == "country") {
      this.setState({
        country: data.value,
      });
    }
    else if(data.id == "supplier_registration_type"){
      this.setState({
        supplier_registration_type:data.value
      })
    }
    else if(data.id == "supplier_bank_currency"){
      this.setState({
        supplier_bank_currency:data.value
      })
    }
    else if(data.id == "supplier_terms"){
      this.setState({
        supplier_terms:data.value
      })
    }
  };

  render() {
    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle="Purchases"
          breadCrumbParent=" Supplier"
          breadCrumbActive=" Add Supplier"/>
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Supplier Basic Details</h2>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.handleSubmit} id="Supplier">
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_company_name">Company Name</Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input
                      type="text"
                     
                      name="supplier_company_name"
                      placeholder="Company Name"
                      value={this.state.supplier_company_name}
                      onChange={this.handleChange}
                    />
                    <small style={{color:"red"}}>{xfeild.supplier_company_name}</small>
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_alias_name">Alias Name</Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input
                      type="text "
                      name="supplier_alias_name"
                      placeholder="Alias Name"
                      value={this.state.supplier_alias_name}
                      onChange={this.handleChange}
                    />
                     <small style={{color:"red"}}>{xfeild.supplier_alias_name}</small>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_email">E-mail</Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input
                      type="email"
                      name="supplier_email"
                      placeholder="E-mail"
                      value={this.state.supplier_email}
                      onChange={this.handleChange}
                    />
                    <small style={{color:"red"}}>{xfeild.supplier_email}</small>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_phone_number">Phone Number</Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input
                      name="supplier_phone_number"
                      type="tel"
                      placeholder="Phone Number"
                      value={this.state.supplier_phone_number}
                      onChange={this.handleChange}/>
                    <small style={{color:"red"}}>{xfeild.supplier_phone_number}</small>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_mobile_number">Mobile</Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input
                      name="supplier_mobile_number"
                      type="tel"
                      placeholder="Mobile"
                      value={this.state.supplier_mobile_number}
                      onChange={this.handleChange}
                    ></Input>
                    <small style={{color:"red"}}>{xfeild.supplier_mobile_number}</small>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_website_link">Website</Label>
                    <Input
                      name="supplier_website_link"
                      type="text"
                      placeholder="Website"
                      value={this.state.supplier_website_link}
                      onChange={this.handleChange}

                    ></Input>
                  </FormGroup>
                </Col>

                <Col lg="4" >
                <FormGroup >
                <Label for="supplier_registration_type">Registration Type</Label>
                <Label style={{color:"red"}}>*</Label>
                <SingleSelect 
                  name="supplier_registration_type"
                  options={Registrationtype}
                  selectedValue={this.state.supplier_registration_type} 
                  getValuesFn={this.getValuesFn}/>
                    <small style={{color:"red"}}>{xfeild.supplier_registration_type}</small>

                  </FormGroup>
                  </Col>


                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_registration_number">Registration Number</Label>
                    <Input
                      type="number"
                      name="supplier_registration_number"
                      placeholder="Registration Number"
                      value={this.state.supplier_registration_number}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>


              <hr />
              <h2 > Billing Addres</h2>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_addres">Adress Line 1</Label>
                    <Input name="supplier_addres" placeholder="Enter the Adress"
                      value={this.state.supplier_addres}
                      onChange={this.handleChange}

                      ></Input>
                  </FormGroup>
                </Col>
{/* 
                <Col lg="6">
                  <FormGroup>
                    <Label for="supplier_addres">Adress Line 2</Label>
                    <Input name="supplier_addres" placeholder=" Enter the Adress"
                      value={this.state.supplier_addres}
                      ></Input>
                  </FormGroup>
                </Col> */}

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_city">City</Label>
                    <Input
                      type="text"
                      name="supplier_city"
                      placeholder="City"
                      value={this.state.supplier_city}
                      onChange={this.handleChange}

                    ></Input>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_city_pincode">Pincode</Label>
                    <Input
                      type="number"
                      name="supplier_city_pincode"
                      placeholder="Pincode"
                      value={this.state.supplier_city_pincode}
                      onChange={this.handleChange}

                    ></Input>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_state">State</Label>
                    <Input
                      type="text"
                      name="supplier_state"
                      placeholder="State"
                      value={this.state.supplier_state}
                      onChange={this.handleChange}

                    ></Input>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <Label>Country</Label>
                  <SingleSelect
                    name="country"
                    options={country}
                    getValuesFn={this.getValuesFn}
                    selectedValue={this.state.country}
                  />
                </Col>
              </Row>
<hr />
              <h2 >Payment Details</h2>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_prefered_payment_method">
                      Preferred Payment Method
                    </Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input
                      name="supplier_prefered_payment_method"
                      type="text"
                      onChange={this.handleChange}
                      placeholder="Payment Method"
                      value={this.state.supplier_prefered_payment_method}
                    ></Input>
                    <small style={{color:"red"}}>{xfeild.supplier_prefered_payment_method}</small>

                  </FormGroup>
                </Col>
         

                <Col lg="4">
  <FormGroup>
<Label>Terms</Label>
<Label style={{color:"red"}}>*</Label>
<SingleSelect name="supplier_terms"
options={Terms}
getValuesFn={this.getValuesFn}
selectedValue={this.state.supplier_terms} 
/>
<small style={{color:"red"}}>{xfeild.supplier_terms}</small>

</FormGroup>
</Col>   


                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_creditlimit">Credit Limit</Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input
                      name="supplier_creditlimit"
                      type="number"
                      placeholder="Credit limit"
                      onChange={this.handleChange}
                      value={this.state.supplier_creditlimit}
                    ></Input>
                      <small style={{color:"red"}}>{xfeild.supplier_creditlimit}</small>
                  </FormGroup>
                </Col>

             

<Col lg="4">
  <FormGroup>
<Label>Currency</Label>
<Label style={{color:"red"}}>*</Label>
<SingleSelect name="supplier_bank_currency"
options={currency}
getValuesFn={this.getValuesFn}
selectedValue={this.state.supplier_bank_currency} 
/>
<small style={{color:"red"}}>{xfeild.supplier_bank_currency}</small>
</FormGroup>
</Col> 
              </Row>

              <hr />
              <h2 >Bank Details</h2>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_bank_name">Bank Name</Label>
                    <Input
                      name="supplier_bank_name"
                      type="text"
                      placeholder="Enter Bank Name"
                      value={this.state.supplier_bank_name}
                      onChange={this.handleChange}

                    ></Input>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_bank_accountnumber">Account Number</Label>
                    <Input
                      name="supplier_bank_accountnumber"
                      type="number"
                      placeholder="Enter Bank Account Number"
                      value={this.state.supplier_bank_accountnumber}
                      onChange={this.handleChange}

                    ></Input>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_bank_ifscnumber">IFSC Code</Label>
                    <Input
                      name="supplier_bank_ifscnumber"
                      type="text"
                      placeholder="Enter Bank IFSC Code"
                      value={this.state.supplier_bank_ifscnumber}
                      onChange={this.handleChange}

                    ></Input>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <Label for="supplier_bank_swiftcode">Swift Code</Label>
                    <Input
                      name="supplier_bank_swiftcode"
                      type="text"
                      placeholder="Enter Bank Swift Code"
                      value={this.state.supplier_bank_swiftcode}
                      onChange={this.handleChange}

                    ></Input>
                  </FormGroup>
                </Col>
              </Row>


              <hr />
              <h2>Tax Details</h2>

              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Label for="supplier_tax_reg_num">Registration Number</Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input
                      name="supplier_tax_reg_num"
                      type="text"
                      placeholder="Registration Number"
                      value={this.state.supplier_tax_reg_num}
                      onChange={this.handleChange}
                    ></Input>
<small style={{color:"red"}}>{xfeild.supplier_tax_reg_num}</small>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="supplier_tax_reg_num_attachment">
                      Attachment
                    </Label>
                    <Input
                      name="supplier_tax_reg_num_attachment"
                      type="file"
                      onChange={this.handleChanges}/>
                      <small style={{color:"red"}}>{this.state.errorsupplier_tax_reg_num_attachment}</small>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <Label for="supplier_pan_num">Kra Number</Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input name="supplier_pan_num"
                     type="text"
                     placeholder="Pan/Kra Number"
                     value={this.state.supplier_pan_num}
                     onChange={this.handleChange}
                     ></Input>
<small style={{color:"red"}}>{xfeild.supplier_pan_num}</small>
                  </FormGroup>
                </Col>


                <Col lg="6">
                  <FormGroup>
                    <Label for="supplier_pan_num_attachment">Attachment</Label>
                    <Input
                      name="supplier_pan_num_attachment"
                      type="file"
                      onChange={this.handleChanges}/>
                      <small style={{color:"red"}}>{this.state.errorsupplier_pan_num_attachment}</small>
                    </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <Label for="supplier_other_document">Other Document</Label>
                    <Input
                      name="supplier_other_document"
                      type="text"
                     placeholder="Other Documents Number"
                      onChange={this.handleChanges}
                     value={this.state.supplier_other_document}
                    ></Input>
                    <small style={{color:"red"}}>{xfeild.supplier_other_document}</small>

                  </FormGroup>
                </Col>


                <Col lg="6">
                  <FormGroup>
                    <Label for="supplier_other_document_attachment">
                      Attachment
                    </Label>
                    <Label style={{ color: "red" }}>*</Label>
                    <Input
                      name="supplier_other_document_attachment"
                      type="file"
                      onChange={this.handleChanges}/>
                      <small style={{color:"red"}}>{this.state.errorsupplier_other_document_attachment}</small>

                  </FormGroup>
                </Col>

              </Row>
              <hr />
              <Row>

                <Col lg="6">
                  <Label for="notes">Notes</Label>
                  <Input
                    type="textarea"
                    name="supplier_notes"
                    placeholder="Enter Notes"
                      onChange={this.handleChange}
                    value={this.state.supplier_notes}
                  ></Input>
                </Col>
              </Row>

              <hr />

              <div style={{display:"flex",justifyContent:"flex-end"}}>
              <Link to="/purchase/supplier"><Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Cancel</Button></Link>
              <div className="d-flex justify-content-between">              
              {this.state.btnLoading ?  (
                <Button.Ripple color="primary" type="button">
                  <Spinner color="white" size="sm" />
                  <small className="ml-50">Loading...</small>
                </Button.Ripple>
              ): 
              (
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
