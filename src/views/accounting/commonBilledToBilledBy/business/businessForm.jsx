import React from "react";
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
} from "reactstrap";
import { connect } from "react-redux";
import EmailModal from "components/common/modals/emailModal";
import PhoneModal from "components/common/modals/phoneModal";
import { toast } from "react-toastify";
import { updateData, addData, fetchClientInfo } from "redux/actions/clients";
import { getBusinessData } from "redux/actions/invoice";
import Input from "components/common/formBasic/input";
import File from "components/common/formBasic/file";
import SingleSelect from "components/common/formBasic/singleSelect";
import Checkbox from "components/common/formBasic/checkbox";
import { REACT_APP_API_URL } from "configs/index";
import axios from "axios";
//if you want to pass default values than initial those values in componentDidMount
let formData = {
  country_id: { value: "", isRequired: true },
  business_name: { value: "", isRequired: true },
  business_alias: { value: "", isRequired: true },
  email: { value: "", isRequired: true },
  business_gstin: { value: "", isRequired: true },
  business_pan: { value: "", isRequired: true },
  number: { value: "", isRequired: true },
  business_name_attachment: { value: "", isRequired: false },
  business_pan_attachment: { value: "", isRequired: false },
  business_gstin_attachment: { value: "", isRequired: false },
  street: { value: "", isRequired: true },
  city: { value: "", isRequired: true },
  gst_state_id: { value: "", isRequired: true },
  postal_code: { value: "", isRequired: true },
  extra_emails: { value: [], isRequired: false },
  extra_phones: { value: [], isRequired: false },
  show_email_in_invoice: { value: 0, isRequired: false },
  show_number_in_invoice: { value: 0, isRequired: false },
  type: { value: 1, isRequired: true },
};

class BusinessForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnClicked: false,
      btnLoading: false,
      errorOccured: false,
      formFields: formData,
      isUpdateForm: false,
      showEmailModal: false,
      showPhoneModal: false,
      countryOptions: [],
      stateOptions: [],
    };
    this.getValuesFn = this.getValuesFn.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.submitFn = this.submitFn.bind(this);
  }

  resetState = () => {
    for (let item in formData) {
      if (item == "show_email_in_invoice" || item == "show_number_in_invoice") {
        formData[item].value = 0;
      } else if (item == "extra_emails" || item == "extra_phones") {
        formData[item].value = [];
      } else if (item == "type") {
        return;
      } else {
        formData[item].value = "";
      }
    }
    this.setState({
      btnClicked: false,
      btnLoading: false,
      errorOccured: false,
      formFields: formData,
      isUpdateForm: false,
      showEmailModal: false,
      showPhoneModal: false,
      countryOptions: [],
      stateOptions: [],
    });
  };

  componentDidUpdate = () => {
    if (
      this.state.formFields.business_name.value === "" &&
      this.state.isUpdateForm
    ) {
      if (Object.keys(this.props.editBusinessData).length != 0) {
        for (let item in this.props.editBusinessData) {
          if (formData[item] !== undefined) {
            formData[item].value = this.props.editBusinessData[item];
          }
        }
        this.fetchStateData(this.state.formFields.gst_state_id.value);
        this.setState({ formFields: formData });
        this.setState({ isUpdateForm: true });
      }
    }
  };

  filterCountryData(countryData) {
    const formatCountryData = countryData.map((data) => {
      return { label: data.name, value: data.id };
    });

    this.setState({ countryOptions: formatCountryData });
  }

  filterStateData(stateData) {
    const formatStateData = stateData.map((data) => {
      return { label: data.name, value: data.id };
    });

    this.setState({ stateOptions: formatStateData });
  }

  fetchStateData = async (country_id) => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/common/getStates`, {
        params: {
          country_id,
        },
      });

      this.filterStateData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchCountryData = async () => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/common/getCountries`);

      this.filterCountryData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.resetState();
    this.fetchCountryData();
    const id = this.props.editBusinessData.id;
    if (id && id != undefined && !this.props.createNewFormOpen) {
      this.props.fetchClientInfo(id);
      this.setState({ isUpdateForm: true });
    } else {
      this.setState({ isUpdateForm: false });
    }
  }

  getValuesFn = (data) => {
    if (data.id == "country_id") {
      this.fetchStateData(data.value);
    }
    if (data.id == "show_email_in_invoice" && data.value.length == 1) {
      formData["show_email_in_invoice"].value = 1;
    } else if (data.id == "show_email_in_invoice" && data.value.length == 0) {
      formData["show_email_in_invoice"].value = 0;
    } else if (data.id == "show_number_in_invoice" && data.value.length == 1) {
      formData["show_number_in_invoice"].value = 1;
    } else if (data.id == "show_number_in_invoice" && data.value.length == 0) {
      formData["show_number_in_invoice"].value = 0;
    } else {
      formData[data.id].value = data.value;
    }
    this.checkAll();
    this.setState({ formFields: formData });
  };

  checkAll = () => {
    const isComplete = [];

    Object.keys(this.state.formFields).forEach((key) => {
      if (
        this.state.formFields[key].value === "" &&
        this.state.formFields[key].isRequired
      ) {
        isComplete.push(false);
      } else {
        isComplete.push(true);
      }
    });

    if (isComplete.includes(false)) {
      return false;
    } else {
      return true;
    }
  };

  submitFn = async (e) => {
    e.preventDefault();
    this.setState({ btnClicked: true });
    this.setState({ errorOccured: false });
    var formData = new FormData();

    for (var key in this.state.formFields) {
      formData.append(key, this.state.formFields[key].value);
    }
    const pass = this.checkAll();

    if (pass) {
      this.setState({ btnLoading: true });
      if (this.state.isUpdateForm) {
        formData.append("id", this.props.editBusinessData.id);
        await this.props.updateData(formData);
      } else {
        await this.props.addData(formData);
      }
      this.setState({ btnLoading: false });
      this.props.getBusinessData();
      this.props.modal();
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  toggleEmailModal = () => {
    this.setState({ showEmailModal: !this.state.showEmailModal });
  };

  togglePhoneModal = () => {
    this.setState({ showPhoneModal: !this.state.showPhoneModal });
  };

  addMoreEmails = (email) => {
    if (email.length) {
      formData["extra_emails"].value.push(email);
      this.checkAll();
      this.setState({ formFields: formData });
    }
  };

  addMorePhones = (phone) => {
    if (phone.length) {
      formData["extra_phones"].value.push(phone);
      this.checkAll();
      this.setState({ formFields: formData });
    }
  };

  removeExtraEmails = () => {
    formData["extra_emails"].value = [];
    this.checkAll();
    this.setState({ formFields: formData });
  };

  removeExtraPhones = () => {
    formData["extra_phones"].value = [];
    this.checkAll();
    this.setState({ formFields: formData });
  };
  render() {
    const {
      formFields,
      btnClicked,
      errorOccured,
      btnLoading,
      isUpdateForm,
      countryOptions,
      stateOptions,
    } = this.state;

    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Basic Informations</CardTitle>
          </CardHeader>
          <CardBody>
            <EmailModal
              toggleModal={this.toggleEmailModal}
              showEmailModal={this.state.showEmailModal}
              addMoreEmails={this.addMoreEmails}
            />

            <PhoneModal
              toggleModal={this.togglePhoneModal}
              showPhoneModal={this.state.showPhoneModal}
              addMorePhones={this.addMorePhones}
            />
            <form>
              <Row>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Label for="country_id">Select Country</Label>
                    <SingleSelect
                      name="country_id"
                      isRequired={formFields.country_id.isRequired}
                      options={countryOptions}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      selectedValue={formFields.country_id.value}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="business_name">Business Name</Label>
                    <Input
                      type="text"
                      name="business_name"
                      isRequired={formFields.business_name.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.business_name.value}
                      placeholder="Business Name"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="business_alias">
                      Business Alias (Nick Name)
                    </Label>
                    <Input
                      type="text"
                      name="business_alias"
                      isRequired={formFields.business_alias.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.business_alias.value}
                      placeholder="Business Alias (Optional)"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      isRequired={formFields.email.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.email.value}
                      placeholder="Email"
                    />
                  </FormGroup>

                  {formFields.email.value.length > 0 &&
                    formFields.extra_emails.value.length > 0 &&
                    formFields.extra_emails.value.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  {formFields.email.value.length > 0 && (
                    <Button.Ripple
                      color="primary my-1 mr-2"
                      onClick={() => {
                        this.setState({ showEmailModal: true });
                      }}
                      size="sm"
                    >
                      Add More Emails
                    </Button.Ripple>
                  )}
                  {formFields.email.value.length > 0 &&
                    formFields.extra_emails.value.length > 0 && (
                      <Button.Ripple
                        color="danger"
                        onClick={this.removeExtraEmails}
                        size="sm"
                      >
                        Remove Emails
                      </Button.Ripple>
                    )}
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="number">Phone Number</Label>
                    <Input
                      type="number"
                      name="number"
                      isRequired={formFields.number.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.number.value}
                      placeholder="Phone Number"
                    />
                  </FormGroup>
                  {formFields.number.value.length > 0 &&
                    formFields.extra_phones.value.length > 0 &&
                    formFields.extra_phones.value.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  {formFields.number.value.length > 0 && (
                    <Button.Ripple
                      color="primary my-1 mr-2"
                      onClick={() => {
                        this.setState({ showPhoneModal: true });
                      }}
                      size="sm"
                    >
                      Add More Phones
                    </Button.Ripple>
                  )}
                  {formFields.number.value.length > 0 &&
                    formFields.extra_phones.value.length > 0 && (
                      <Button.Ripple
                        color="danger"
                        onClick={this.removeExtraPhones}
                        size="sm"
                      >
                        Remove Phones
                      </Button.Ripple>
                    )}
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Checkbox
                      name="show_email_in_invoice"
                      btnClicked={btnClicked}
                      getValuesFn={this.getValuesFn}
                      options={[
                        {
                          value: "true",
                          label: "Show Email in Invoice",
                          id: "show_email_in_invoice",
                          isChecked:
                            formFields.show_email_in_invoice.value == 1
                              ? true
                              : false,
                        },
                      ]}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Checkbox
                      name="show_number_in_invoice"
                      btnClicked={this.state.btnClicked}
                      getValuesFn={this.getValuesFn}
                      options={[
                        {
                          value: "true",
                          label: "Show Phone in Invoice",
                          id: "show_number_in_invoice",
                          isChecked:
                            formFields.show_number_in_invoice.value == 1
                              ? true
                              : false,
                        },
                      ]}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="business_gstin">Business GSTIN</Label>
                    <Input
                      type="text"
                      name="business_gstin"
                      isRequired={formFields.business_gstin.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.business_gstin.value}
                      placeholder="Business GSTIN"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="business_pan">Business PAN Number</Label>
                    <Input
                      type="text"
                      name="business_pan"
                      isRequired={formFields.business_pan.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.business_pan.value}
                      placeholder="Business PAN Number"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="business_name_attachment">
                      Business Name Attachement
                    </Label>
                    <File
                      name="business_name_attachment"
                      isRequired={
                        formFields.business_name_attachment.isRequired
                      }
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.business_name_attachment.value}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="business_pan_attachment">
                      Business PAN Attachement
                    </Label>
                    <File
                      name="business_pan_attachment"
                      isRequired={formFields.business_pan_attachment.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.business_pan_attachment.value}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="business_gstin_attachment">
                      Business GSTIN Attachement
                    </Label>
                    <File
                      name="business_gstin_attachment"
                      isRequired={
                        formFields.business_gstin_attachment.isRequired
                      }
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.business_gstin_attachment.value}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="street">Street Address</Label>
                    <Input
                      type="text"
                      name="street"
                      isRequired={formFields.street.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.street.value}
                      placeholder="Street Address"
                    />
                  </FormGroup>
                </Col>

                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="city">City</Label>
                    <Input
                      type="text"
                      name="city"
                      isRequired={formFields.city.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.city.value}
                      placeholder="City"
                    />
                  </FormGroup>
                </Col>

                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="gst_state_id">GST State</Label>
                    <SingleSelect
                      name="gst_state_id"
                      isRequired={formFields.gst_state_id.isRequired}
                      options={stateOptions}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      selectedValue={formFields.gst_state_id.value}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="postal_code">Postal Code / Zip Code</Label>
                    <Input
                      type="number"
                      name="postal_code"
                      isRequired={formFields.postal_code.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.postal_code.value}
                      placeholder="Postal Code / Zip Code"
                    />
                  </FormGroup>
                </Col>
              </Row>
              {btnLoading ? (
                <div className="d-inline-block mr-1 mb-1">
                  <Button.Ripple color="primary" type="button">
                    <Spinner color="white" size="sm" />
                    <span className="ml-50">Loading...</span>
                  </Button.Ripple>
                </div>
              ) : (
                <Button.Ripple
                  color="primary mt-1"
                  type="submit"
                  onClick={this.submitFn}
                >
                  {isUpdateForm ? "Update" : "Submit"}
                </Button.Ripple>
              )}
            </form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    businessInfo: state.business.businessInfo,
  };
};

export default connect(mapStateToProps, {
  updateData,
  addData,
  fetchClientInfo,
  getBusinessData,
})(BusinessForm);
