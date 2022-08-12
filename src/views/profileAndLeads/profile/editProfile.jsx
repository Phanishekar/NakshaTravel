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
import {
  updateData,
  fetchEmployeeInfo,
  resetEmployeeInfo,
} from "redux/actions/employees";

import { getUser } from "redux/actions/auth/loginActions";

import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import Input from "components/common/formBasic/input";
import File from "components/common/formBasic/file";
import Date from "components/common/formBasic/date";
import SingleSelect from "components/common/formBasic/singleSelect";
import { toast } from "react-toastify";
import SpinnerComponent from "components/@custom/spinner/Fallback-spinner";
import axios from "axios";
import { REACT_APP_API_URL } from "configs/index";

//if you want to pass default values than initial those values in componentDidMount
let formData = {
  name: { value: "", isRequired: true },
  designation_id: { value: "", isRequired: true },
  role_id: { value: "", isRequired: true },
  email: { value: "", isRequired: true },
  number: { value: "", isRequired: true },
  doj: { value: "", isRequired: true },
  gender: { value: "", isRequired: true },
  dob: { value: "", isRequired: true },
  blood_group: { value: "", isRequired: true },
  address: { value: "", isRequired: true },
  emergency_contact_number: { value: "", isRequired: true },
  medical_history: { value: "", isRequired: true },
  aadhar_doc: { value: "", isRequired: false },
  pan_doc: { value: "", isRequired: false },
  resume_doc: { value: "", isRequired: false },
  cert_doc: { value: "", isRequired: false },
  passport_doc: { value: "", isRequired: false },
  password: { value: "", isRequired: true },
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnClicked: false,
      btnLoading: false,
      formFields: formData,
      roleOptions: [],
      designationOptions: [],
    };
    let string = JSON.stringify(this.state);
    let string2 = JSON.stringify(formData);
    this.baseState = JSON.parse(string);
    this.baseFormField = JSON.parse(string2);
    this.getValuesFn = this.getValuesFn.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.submitFn = this.submitFn.bind(this);
  }

  componentDidUpdate() {
    if (this.state.formFields.name.value === "") {
      if (this.props.employeeInfo) {
        if (Object.keys(this.props.employeeInfo).length !== 0) {
          for (let item in this.props.employeeInfo) {
            if (formData[item] !== undefined) {
              formData[item].value = this.props.employeeInfo[item];
            }
          }
          this.setState({
            formFields: formData,
            loading: false,
          });
        }
      } else {
        this.props.history.push("/profile");
        toast.info("!Oops no data found for your profile");
      }
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchRoleData();
    this.fetchDesignationData();
    if (id && id != undefined) {
      this.props.fetchEmployeeInfo(id);
      this.setState({ loading: true });
    } else {
      toast.info("!Oops no data found for your profile");
    }
  }

  componentWillUnmount = async () => {
    this.resetState();
    await this.props.resetEmployeeInfo();
  };

  resetState = () => {
    formData = this.baseFormField;
    this.setState(this.baseState);
  };

  filterRoleData(roleData) {
    const formatRoleData = roleData.map((data) => {
      return { label: data.name, value: data.id };
    });
    this.setState({ roleOptions: formatRoleData });
  }

  filterDesignationData(designationData) {
    const formatDesignationDataData = designationData.map((data) => {
      return { label: data.name, value: data.id };
    });
    this.setState({ designationOptions: formatDesignationDataData });
  }

  fetchDesignationData = async (designation_id) => {
    try {
      const res = await axios.get(
        `${REACT_APP_API_URL}/common/getDesignations`,
        {
          params: {
            designation_id,
          },
        }
      );

      this.filterDesignationData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchRoleData = async (role_id) => {
    try {
      const res = await axios.get(`${REACT_APP_API_URL}/common/getRoles`, {
        params: {
          role_id,
        },
      });
      this.filterRoleData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  getValuesFn = (data) => {
    formData[data.id].value = data.value;
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
    var formData = new FormData();
    // var form_data = {};

    for (var key in this.state.formFields) {
      formData.append(key, this.state.formFields[key].value);
    }

    const pass = this.checkAll();
    if (pass) {
      formData.append("id", this.props.match.params.id);
      await this.props.updateData(formData);

      this.setState({ btnLoading: false });
      await this.resetState();
      await this.props.resetEmployeeInfo();
      this.props.getUser();
      this.props.history.push("/profile");
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  render() {
    const {
      loading,
      formFields,
      btnClicked,
      btnLoading,
      roleOptions,
      designationOptions,
    } = this.state;
    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle={"Update Profile"}
          breadCrumbParent="Profile & Employees"
          breadCrumbActive={"Update Profile"}
        />
        {loading ? (
          <SpinnerComponent />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Update Profile</CardTitle>
            </CardHeader>
            <CardBody>
              <form>
                <Row>
                  <Col lg="12" md="12">
                    <FormGroup className="my-1">
                      <Label for="role">Select Role</Label>
                      <SingleSelect
                        name="role_id"
                        isRequired={formFields.role_id.isRequired}
                        options={roleOptions}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        selectedValue={formFields.role_id.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        isRequired={formFields.name.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.name.value}
                        placeholder="name"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="designation_id">Select Designation</Label>

                      <SingleSelect
                        name="designation_id"
                        isRequired={formFields.designation_id.isRequired}
                        options={designationOptions}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        selectedValue={formFields.designation_id.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="doj">Joining Date</Label>
                      <Date
                        name="doj"
                        isRequired={formFields.doj.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.doj.value}
                        placeholder="Joining Date"
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
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="email">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        isRequired={formFields.password.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.password.value}
                        placeholder="Password"
                      />
                    </FormGroup>
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
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="dob">Date of Birth</Label>
                      <Date
                        name="dob"
                        isRequired={formFields.dob.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.dob.value}
                        placeholder="Date of Birth"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12">
                    <FormGroup className="my-1">
                      <Label for="gender">Select Gender</Label>
                      <SingleSelect
                        name="gender"
                        isRequired={formFields.gender.isRequired}
                        options={[
                          { value: "M", label: "Male" },
                          { value: "F", label: "Female" },
                          { value: "O", label: "Other" },
                        ]}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        selectedValue={formFields.gender.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="blood_group">Blood Group</Label>
                      <Input
                        type="text"
                        name="blood_group"
                        isRequired={formFields.blood_group.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.blood_group.value}
                        placeholder="Blood Group"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="aadhar_doc">Upload Aadhar</Label>
                      <File
                        name="aadhar_doc"
                        isRequired={formFields.aadhar_doc.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.aadhar_doc.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="pan_doc">Upload PAN</Label>
                      <File
                        name="pan_doc"
                        isRequired={formFields.pan_doc.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.pan_doc.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="resume_doc">Upload Resume</Label>
                      <File
                        name="resume_doc"
                        isRequired={formFields.resume_doc.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.resume_doc.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="cert_doc">Upload Certificate</Label>
                      <File
                        name="cert_doc"
                        isRequired={formFields.cert_doc.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.cert_doc.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="passport_doc">Upload Passport</Label>
                      <File
                        name="passport_doc"
                        isRequired={formFields.passport_doc.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.passport_doc.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="emergency_contact_number">
                        Emergency Contact
                      </Label>
                      <Input
                        type="text"
                        name="emergency_contact_number"
                        isRequired={
                          formFields.emergency_contact_number.isRequired
                        }
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.emergency_contact_number.value}
                        placeholder="Emergency Contact"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="medical_history">Medical History</Label>
                      <Input
                        type="text"
                        name="medical_history"
                        isRequired={formFields.medical_history.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.medical_history.value}
                        placeholder="Medical History"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12">
                    <FormGroup className="my-1">
                      <Label for="address">Address</Label>
                      <Input
                        type="text"
                        name="address"
                        isRequired={formFields.address.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.address.value}
                        placeholder="Address"
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
                    Update
                  </Button.Ripple>
                )}
              </form>
            </CardBody>
          </Card>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    employeeInfo: state.employee.employeeInfo,
    logedIn: state.auth.login,
  };
};

export default connect(mapStateToProps, {
  getUser,
  updateData,
  fetchEmployeeInfo,
  resetEmployeeInfo,
})(EditProfile);
