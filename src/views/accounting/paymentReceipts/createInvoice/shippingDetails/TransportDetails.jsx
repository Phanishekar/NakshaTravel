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

import Input from "components/common/formBasic/input";
import Date from "components/common/formBasic/date";
import TextArea from "components/common/formBasic/textarea";
import { REACT_APP_API_URL } from "configs/index";

//if you want to pass default values than initial those values in componentDidMount
let formData = {
  challan_no: { value: "", isRequired: true },
  challan_date: { value: "", isRequired: true },
  transport_name: { value: "", isRequired: true },
  shipping_note: { value: "", isRequired: true },
};

class TransportDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnClicked: false,
      btnLoading: false,
      errorOccured: false,
      formFields: formData,
      isUpdated: false,
    };
    this.getValuesFn = this.getValuesFn.bind(this);
  }

  resetState = () => {
    for (let item in formData) {
      formData[item].value = "";
    }
    this.setState({
      btnClicked: false,
      btnLoading: false,
      errorOccured: false,
      formFields: formData,
      isUpdated: false,
    });
  };
  componentDidMount = () => {
    this.resetState();
  };

  componentDidUpdate = () => {
    if (this.state.formFields.challan_no.value == "" && !this.state.isUpdated) {
      if (
        this.props.transportDetails_data != null &&
        Object.keys(this.props.transportDetails_data).length != 0
      ) {
        formData.challan_no.value =
          this.props.transportDetails_data.transport_challan_number;
        formData.transport_name.value =
          this.props.transportDetails_data.transport_challan_name;
        formData.challan_date.value =
          this.props.transportDetails_data.transport_challan_date;
        formData.shipping_note.value =
          this.props.transportDetails_data.transport_challan_shipping_note;
        this.setState({ formFields: formData });
        this.setState({ isUpdated: true });
        Object.keys(formData).forEach((key) => {
          this.props.getTransportValuesFn({
            id: key,
            value: formData[key].value,
          });
        });
      }
    }
  };

  getValuesFn = (data) => {
    formData[data.id].value = data.value;
    this.setState({ formFields: formData });
    this.props.getTransportValuesFn({ id: data.id, value: data.value });
  };
  render() {
    const { formFields, btnClicked } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Transport Details</CardTitle>
          </CardHeader>
          <CardBody className="borderSolid mt-1">
            <form>
              <Row>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Label for="challan_no">Challan Number</Label>
                    <Input
                      type="text"
                      name="challan_no"
                      isRequired={formFields.challan_no.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.challan_no.value || ""}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Label for="challan Date">Challan Date</Label>
                    <Date
                      name="challan_date"
                      isRequired={formFields.challan_date.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.challan_date.value || ""}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Label for="transport_name">Transport Name</Label>
                    <Input
                      type="text"
                      name="transport_name"
                      isRequired={formFields.transport_name.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.transport_name.value || ""}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Label for="shipping_note">Shipping Note</Label>
                    <TextArea
                      name="shipping_note"
                      isRequired={formFields.shipping_note.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.shipping_note.value || ""}
                      limit={100}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default TransportDetails;
