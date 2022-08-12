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
} from "reactstrap";

import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import Input from "components/common/formBasic/input";
import File from "components/common/formBasic/file";
import Date from "components/common/formBasic/date";
import Time from "components/common/formBasic/time";
import Radio from "components/common/formBasic/radio";
import TextArea from "components/common/formBasic/textarea";
import Checkbox from "components/common/formBasic/checkbox";
import SingleSelect from "components/common/formBasic/singleSelect";
import MultipleSelect from "components/common/formBasic/multipleSelect";
import { REACT_APP_API_URL } from "configs/index";
import { toast } from "react-toastify";
//if you want to pass default values than initial those values in componentDidMount
let formData = {
  name: "",
  phone: "",
  email: "",
  file: "",
  url: "",
  date: "",
  time: "",
  gender: "",
  skills: [],
  color: "",
  multi: [],
  message: "",
};

let color_options = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
];

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnClicked: false,
      btnLoading: false,
      errorOccured: false,
      formFields: formData,
    };
    this.getValuesFn = this.getValuesFn.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.submitFn = this.submitFn.bind(this);
  }

  getValuesFn = (data) => {
    console.log("changing", { data });
    formData[data.id] = data.value;
    console.log({ formData });
    this.checkAll();
    this.setState({ formFields: formData });
  };

  checkAll = () => {
    const isComplete = [];

    Object.keys(this.state.formFields).forEach((key) => {
      if (this.state.formFields[key] === "") {
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
    var form_data = new FormData();

    for (var key in this.state.formFields) {
      form_data.append(key, this.state.formFields[key]);
    }
    console.log("formFields", this.state.formFields);
    const pass = this.checkAll();

    if (pass) {
      console.log("passed");
      this.setState({ btnLoading: true });
      try {
        await fetch(`${REACT_APP_API_URL}/<<api-end-point>>`, {
          method: "post",
          headers: { processData: false, contentType: false },
          body: form_data,
        });
        this.setState({ btnLoading: false });
      } catch (err) {
        this.setState({ btnLoading: false });
        this.setState({ errorOccured: true });
        console.log("err", err);
      }
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  render() {
    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle="Add User"
          breadCrumbParent="Profile & Leads"
          breadCrumbActive="Add User"
        />
        <Card>
          <CardHeader>
            <CardTitle>Add Client</CardTitle>
          </CardHeader>
          <CardBody>
            <form>
              <Row>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      isRequired={true}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      value={this.state.formFields.name}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      isRequired={true}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      value={this.state.formFields.email}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="email">Upload File</Label>
                    <File
                      name="file"
                      isRequired={true}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      value={this.state.formFields.email}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="email">Website Url</Label>
                    <Input
                      type="url"
                      name="url"
                      isRequired={true}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      value={this.state.formFields.email}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="url">Phone</Label>
                    <Input
                      type="tel"
                      name="phone"
                      isRequired={true}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      value={this.state.formFields.phone}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="url">Select Color</Label>
                    <SingleSelect
                      name="color"
                      isRequired={true}
                      options={color_options}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      // selectedValue={color_options[0]}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="url">Select Colors</Label>
                    <MultipleSelect
                      name="multi"
                      isRequired={true}
                      options={color_options}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      // selectedValue={[color_options[0], color_options[1]]}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="url">Date</Label>
                    <Date
                      name="date"
                      isRequired={true}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      value={this.state.formFields.date}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="url">Time</Label>
                    <Time
                      name="time"
                      isRequired={true}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      value={this.state.formFields.time}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label className="d-block" for="url">
                      Skills
                    </Label>

                    <Checkbox
                      name="skills"
                      btnClicked={this.state.btnClicked}
                      getValuesFn={this.getValuesFn}
                      isRequired={true}
                      options={[
                        {
                          value: "html",
                          label: "HTML",
                          id: "html",
                          isChecked: false,
                        },
                        {
                          value: "css",
                          label: "CSS",
                          id: "css",
                          isChecked: false,
                        },
                        {
                          value: "javascript",
                          label: "JavaScript",
                          id: "javascript",
                          isChecked: false,
                        },
                      ]}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label className="d-block" for="url">
                      Phone
                    </Label>

                    <Radio
                      name="gender"
                      btnClicked={this.state.btnClicked}
                      getValuesFn={this.getValuesFn}
                      isRequired={true}
                      options={[
                        {
                          value: "male",
                          label: "Male",
                          id: "male",
                          isChecked: false,
                        },
                        {
                          value: "female",
                          label: "Female",
                          id: "female",
                          isChecked: false,
                        },
                        {
                          value: "other",
                          label: "Other",
                          id: "other",
                          isChecked: false,
                        },
                      ]}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <TextArea
                      name="message"
                      isRequired={true}
                      getValuesFn={this.getValuesFn}
                      btnClicked={this.state.btnClicked}
                      value={this.state.formFields.message}
                      placeholder="message"
                      row={3}
                      limit={30}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button.Ripple
                color="primary mt-1"
                type="submit"
                onClick={this.submitFn}
              >
                Submit
              </Button.Ripple>
            </form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default CreateUser;
