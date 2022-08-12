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
import { connect } from "react-redux";
import Input from "components/common/formBasic/input";
import Checkbox from "components/common/formBasic/checkbox";
import { REACT_APP_API_URL } from "configs/index";

//if you want to pass default values than initial those values in componentDidMount
let formData = {
  business_name: { value: "", isRequired: true },
  address: { value: "", isRequired: true },
  city: { value: "", isRequired: true },
  state: { value: "", isRequired: true },
  postal_code: { value: "", isRequired: true },
  country: { value: "", isRequired: true },
  business_gstin: { value: "", isRequired: true },
};

class ShipTo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnClicked: false,
      btnLoading: false,
      errorOccured: false,
      formFields: formData,
      isUpdated: false,
      billedToId: null,
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
      billedToId: null,
      formFields: formData,
    });
  };
  componentDidMount = () => {
    this.resetState();
  };

  shouldComponentUpdate = (prevProps, nextState) => {
    if (prevProps.BillTo != this.state.billedToId) {
      return true;
    } else {
      return false;
    }
  };

  componentDidUpdate = () => {
    if (
      this.state.formFields.business_name.value == "" &&
      !this.state.isUpdated
    ) {
      if (Object.keys(this.props.shipTo_data).length != 0) {
        for (let item in this.props.shipTo_data) {
          if (formData[item] !== undefined) {
            formData[item].value = this.props.shipTo_data[item];
          }
        }
        this.setState({ formFields: formData });
        this.setState({ isUpdated: true });
      }
    }
    if (this.props.BillTo != "" && this.props.BillTo != undefined) {
      let client = this.props.clientList.find(
        (item) => item.id == this.props.BillTo
      );
      if (client) {
        formData["business_name"].value = client["business_name"];
        formData["address"].value = client["street"];
        formData["city"].value = client["city"];
        formData["state"].value = client["gst_state"].name;
        formData["postal_code"].value = client["postal_code"];
        formData["country"].value = client["country"].name;
        Object.keys(formData).forEach((key) => {
          this.props.getShipToValuesFn({ id: key, value: formData[key].value });
        });
      }
      this.setState({ billedToId: this.props.BillTo });
      this.setState({ formFields: formData });
    }
  };

  getValuesFn = (data) => {
    formData[data.id] = data.value;
    this.setState({ formFields: formData });
    this.props.getShipToValuesFn({ id: data.id, value: data.value });
  };

  render() {
    const { formFields, btnClicked } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Shipped To</CardTitle>
          </CardHeader>
          <CardBody className="borderSolid mt-1">
            <form>
              <Row>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Label for="business_name">
                      Bussiness / Freelancer Name
                    </Label>
                    <Input
                      type="text"
                      name="business_name"
                      isRequired={formFields.business_name.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.business_name.value || ""}
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
                      value={formFields.address.value || ""}
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
                      value={formFields.city.value || ""}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="postal_code">Postal Code / Zip Code</Label>
                    <Input
                      type="text"
                      name="postal_code"
                      isRequired={formFields.postal_code.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.postal_code.value || ""}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Label for="state">State</Label>
                    <Input
                      type="text"
                      name="state"
                      isRequired={formFields.state.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.state.value || ""}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Label for="country">Country</Label>
                    <Input
                      type="text"
                      name="country"
                      isRequired={formFields.country.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.country.value || ""}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Label for="business_gstin">
                      Enter Your GSTIN here (Optional)
                    </Label>
                    <Input
                      type="text"
                      name="business_gstin"
                      isRequired={formFields.business_gstin.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formFields.business_gstin.value || ""}
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

const mapStateToProps = (state) => {
  return {
    clientList: state.invoice.allClients,
  };
};
export default connect(mapStateToProps)(ShipTo);
