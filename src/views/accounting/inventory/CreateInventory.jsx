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
  fetchInventoryInfo,
  resetInventoryInfo,
} from "redux/actions/inventory";
import File from "components/common/formBasic/file";
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import Input from "components/common/formBasic/input";
import Checkbox from "components/common/formBasic/checkbox";
import SingleSelect from "components/common/formBasic/singleSelect";
import TextArea from "components/common/formBasic/textarea";
import { toast } from "react-toastify";
import SpinnerComponent from "components/@custom/spinner/Fallback-spinner";
import { REACT_APP_API_URL } from "configs/index";

//if you want to pass default values than initial those values in componentDidMount
let formData = {
  image: { value: "", isRequired: true },
  item: { value: "", isRequired: true },
  hsn_or_sac: { value: "", isRequired: true },
  buying_price: { value: "", isRequired: true },
  selling_price: { value: "", isRequired: true },
  tax_rate: { value: "", isRequired: true },
  description: { value: "", isRequired: true },
  currency: { value: "", isRequired: true },
  current_stock: { value: "", isRequired: true },
};

let currency_options = [
  { value: "rupees", label: "Rupees" },
  { value: "doller", label: "Doller" },
];

class CreateInventory extends React.Component {
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

  componentDidUpdate() {
    if (this.state.formFields.item.value === "" && this.state.isUpdateForm) {
      if (this.props.inventoryInfo) {
        if (Object.keys(this.props.inventoryInfo).length !== 0) {
          for (let item in this.props.inventoryInfo) {
            if (formData[item] !== undefined) {
              formData[item].value = this.props.inventoryInfo[item];
            }
          }
          this.setState({
            formFields: formData,
            isUpdateForm: true,
            loading: false,
          });
        }
      } else {
        this.props.history.push("/inventory");
        toast.info("!Oops no data found for current inventory");
      }
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id && id != undefined) {
      this.props.fetchInventoryInfo(id);
      this.setState({ isUpdateForm: true, loading: true });
    } else {
      this.setState({ isUpdateForm: false });
    }
  }

  componentWillUnmount = async () => {
    this.resetState();
    await this.props.resetInventoryInfo();
  };

  getValuesFn = (data) => {
    formData[data.id].value = data.value;
    this.checkAll();
    this.setState({ formFields: formData });
  };

  resetState = () => {
    formData = this.baseFormField;
    this.setState(this.baseState);
  };

  checkAll = () => {
    const isComplete = [];
    console.log(this.state.formFields);
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
      await this.props.resetInventoryInfo();
      this.props.history.push("/inventory");
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  render() {
    const { loading, formFields, btnClicked, btnLoading, isUpdateForm } =
      this.state;
    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle={isUpdateForm ? "Update Inventory" : "Add Inventory"}
          breadCrumbParent="Accounting"
          breadCrumbActive={isUpdateForm ? "Update Inventory" : "Add Inventory"}
        />
        {loading ? (
          <SpinnerComponent />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                {isUpdateForm ? "Update Inventory" : "Add Inventory"}
              </CardTitle>
            </CardHeader>

            <CardBody>
              <form>
                <Row>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="item">Item</Label>
                      <Input
                        type="text"
                        name="item"
                        isRequired={formFields.item.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.item.value}
                        placeholder="Item"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="hsn_or_sac">HST/SAC</Label>
                      <Input
                        type="text"
                        name="hsn_or_sac"
                        isRequired={formFields.hsn_or_sac.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.hsn_or_sac.value}
                        placeholder="HSN/SAC"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="image">Image</Label>
                      <File
                        name="image"
                        isRequired={formFields.image.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.image.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="currency">Select Currency</Label>
                      <SingleSelect
                        name="currency"
                        isRequired={formFields.currency.isRequired}
                        options={currency_options}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        selectedValue={formFields.currency.value}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="url">Buying Price</Label>
                      <Input
                        type="number"
                        name="buying_price"
                        isRequired={formFields.buying_price.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.buying_price.value}
                        placeholder="Buying Price"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="url">Selling Price</Label>
                      <Input
                        type="number"
                        name="selling_price"
                        isRequired={formFields.selling_price.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.selling_price.value}
                        placeholder="Selling Price"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="tax_rate">Tax Rate</Label>
                      <Input
                        type="number"
                        name="tax_rate"
                        isRequired={formFields.tax_rate.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.tax_rate.value}
                        placeholder="Tax Rate"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup className="my-1">
                      <Label for="current_stock">Current Stock</Label>
                      <Input
                        type="number"
                        name="current_stock"
                        isRequired={formFields.current_stock.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.current_stock.value}
                        placeholder="Current Stock"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12">
                    <FormGroup className="my-1">
                      <Label for="description">Description</Label>
                      <TextArea
                        name="description"
                        isRequired={formFields.description.isRequired}
                        getValuesFn={this.getValuesFn}
                        btnClicked={btnClicked}
                        value={formFields.description.value || ""}
                        limit={100}
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
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    inventoryInfo: state.inventory.inventoryInfo,
    logedIn: state.auth.login,
  };
};

export default connect(mapStateToProps, {
  updateData,
  addData,
  fetchInventoryInfo,
  resetInventoryInfo,
})(CreateInventory);
