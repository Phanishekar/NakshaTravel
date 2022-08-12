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
  addData,
  fetchLeadInfo,
  resetLeadInfo,
} from "redux/actions/leads";
import { toast } from "react-toastify";
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import Input from "components/common/formBasic/input";
import TextArea from "components/common/formBasic/textarea";
import SpinnerComponent from "components/@custom/spinner/Fallback-spinner";

//if you want to pass default values than initial those values in componentDidMount
let formData = {
  org_name: { value: "", isRequired: true },
  contact_name: { value: "", isRequired: true },
  email: { value: "", isRequired: true },
  designation: { value: "", isRequired: true },
  number: { value: "", isRequired: true },
  budget: { value: "", isRequired: true },
  subject: { value: "", isRequired: true },
  message: { value: "", isRequired: true },
  follow_up_date: { value: "", isRequired: false },
  lead_assign_id: { value: "", isRequired: false },
  status: { value: 0, isRequired: false },
};

class CreateLead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      btnClicked: false,
      btnLoading: false,
      formFields: formData,
      isUpdateForm: false,
    };
    let string = JSON.stringify(this.state);
    let string2 = JSON.stringify(formData);
    this.baseState = JSON.parse(string);
    this.baseFormField = JSON.parse(string2);
    this.getValuesFn = this.getValuesFn.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.submitFn = this.submitFn.bind(this);
  }

  componentDidMount() {
    console.log("lead formdata", formData);
    const id = this.props.match.params.id;
    if (id && id != undefined) {
      this.props.fetchLeadInfo(id);
      this.setState({ isUpdateForm: true, loading: true });
    } else {
      this.setState({ isUpdateForm: false });
    }
  }

  componentDidUpdate() {
    if (
      this.state.formFields.org_name.value === "" &&
      this.state.isUpdateForm
    ) {
      if (this.props.leadInfo) {
        if (Object.keys(this.props.leadInfo).length !== 0) {
          for (let item in this.props.leadInfo) {
            if (formData[item] !== undefined) {
              console.log(item, formData[item]);
              formData[item].value = this.props.leadInfo[item];
            }
          }
          this.setState({
            formFields: formData,
            isUpdateForm: true,
            loading: false,
          });
        }
      } else {
        this.props.history.push("/leads");
        toast.info("!Oops no data found for current lead");
      }
    }
  }

  componentWillUnmount = async () => {
    this.resetState();
    await this.props.resetClientInfo();
  };

  resetState = () => {
    formData = this.baseFormField;
    this.setState(this.baseState);
  };

  getValuesFn = (data) => {
    console.log("changing", { data });
    formData[data.id].value = data.value;
    console.log({ formData });
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
      console.log("passed");
      if (this.state.isUpdateForm) {
        formData.append("id", this.props.match.params.id);
        await this.props.updateData(formData);
      } else {
        formData.append("created_by", this.props.logedIn.user.id);
        await this.props.addData(formData);
      }
      this.setState({ btnLoading: false });
      await this.resetState();
      await this.props.resetLeadInfo();
      this.props.history.push("/leads");
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  render() {
    const { loading, formFields, btnClicked, btnLoading } = this.state;
    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle="Add Lead"
          breadCrumbParent="Profile & Leads"
          breadCrumbActive="Add Lead"
        />
        {loading ? (
          <SpinnerComponent />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Add Lead</CardTitle>
            </CardHeader>
            <CardBody>
              <form>
                <Row>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="org_name">Organization Name</Label>
                      <Input
                        type="text"
                        name="org_name"
                        isRequired={formFields.org_name.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.org_name.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="contact_name">Contact Name</Label>
                      <Input
                        type="text"
                        name="contact_name"
                        isRequired={formFields.contact_name.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.contact_name.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="designation">Designation</Label>
                      <Input
                        type="text"
                        name="designation"
                        isRequired={formFields.designation.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.designation.value}
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
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="url">Budget</Label>
                      <Input
                        type="number"
                        name="budget"
                        isRequired={formFields.budget.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.budget.value}
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="subject">Subject</Label>
                      <Input
                        type="text"
                        name="subject"
                        isRequired={formFields.subject.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.subject.value}
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="12" md="12">
                    <FormGroup className="my-1">
                      <TextArea
                        name="message"
                        isRequired={formFields.message.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.message.value}
                        placeholder="message"
                        row={3}
                        limit={30}
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
                    Submit
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
    leadInfo: state.lead.leadInfo,
    logedIn: state.auth.login,
  };
};

export default connect(mapStateToProps, {
  updateData,
  addData,
  fetchLeadInfo,
  resetLeadInfo,
})(CreateLead);
