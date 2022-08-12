import React from "react";
import {
  Table,
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
import { Plus, Trash } from "react-feather";
import { connect } from "react-redux";
import {
  updateData,
  addData,
  fetchInvoiceInfo,
  getClientData,
  getBusinessData,
} from "redux/actions/debitNotes";
import moment from "moment";
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import Input from "components/common/formBasic/input";
import Checkbox from "components/common/formBasic/checkbox";
import SingleSelect from "components/common/formBasic/singleSelect";
import Date from "components/common/formBasic/date";
import BillTo from "./BillToAndBy/BillTo";
import BillBy from "./BillToAndBy/BillBy";
import ShipFrom from "./shippingDetails/ShipFrom";
import ShipTo from "./shippingDetails/ShipTo";
import TransportDetails from "./shippingDetails/TransportDetails";
import ItemTableList from "./itemTableList/ItemTableList";
import TextArea from "components/common/formBasic/textarea";
import { REACT_APP_API_URL } from "configs/index";
import { toast } from "react-toastify";
import queryString from "query-string";
import "assets/scss/pages/app-ecommerce-shop.scss";
import "react-toastify/dist/ReactToastify.css";
import "assets/scss/plugins/extensions/toastr.scss";

//if you want to pass default values than initial those values in componentDidMount
let formFields = {
  invoice_date: { value: moment().format("YYYY-MM-DD"), isRequired: true },
  invoice_due: { value: "", isRequired: true },
  invoice_no: { value: "", isRequired: false },
  billed_to: { value: "", isRequired: true },
  billed_by: { value: "", isRequired: true },
  add_shipping_details: { value: 0, isRequired: false },
  ship_from: { value: {}, isRequired: false },
  ship_to: { value: {}, isRequired: false },
  transport_details: { value: {}, isRequired: false },
  items: { value: [], isRequired: false },
  additional_note: { value: "", isRequired: false },
  additional_charges: { value: "0", isRequired: false },
  additional_charges_type: { value: "percentage", isRequired: false },
  service_charges: { value: "0", isRequired: false },
  service_charges_type: { value: "percentage", isRequired: false },
  levy_charges: { value: "0", isRequired: false },
  levy_charges_type: { value: "percentage", isRequired: false },
  vat_amount: { value: "0", isRequired: false },
  total_amount: { value: "0", isRequired: false },
  final_amount: { value: "0", isRequired: false },
};

class CreateInvoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnClicked: false,
      btnLoading: false,
      showNoteField: false,
      isUpdateForm: false,
      showAdditionalChargeField: false,
      showServiceChargeField: false,
      showLevyChargeField: false,
      serviceAmount: 0,
      additionalAmount: 0,
      levyAmount: 0,
      createInvoiceForClient: false,
      shipDetailsVisible: "display-hidden",
      shipping_details: {},
      formData: formFields,
    };
    this.getValuesFn = this.getValuesFn.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.submitFn = this.submitFn.bind(this);
  }

  resetState = () => {
    for (let item in formFields) {
      if (
        item == "add_shipping_details" ||
        item == "service_charges" ||
        item == "additional_charges" ||
        item == "levy_charges" ||
        item == "vat_amount" ||
        item == "total_amount" ||
        item == "final_amount"
      ) {
        formFields[item].value = "0";
      } else if (
        item == "ship_from" ||
        item == "ship_to" ||
        item == "transport_details"
      ) {
        formFields[item].value = {};
      } else if (item == "invoice_date") {
        formFields[item].value = moment().format("YYYY-MM-DD");
      } else if (item == "items") {
        formFields[item].value = [];
      } else if (
        item == "additional_charges_type" ||
        item == "service_charges_type" ||
        item == "levy_charges_type"
      ) {
        formFields[item].value = "percentage";
      } else {
        formFields[item].value = "";
      }
    }
    this.setState({
      btnClicked: false,
      btnLoading: false,
      showNoteField: false,
      isUpdateForm: false,
      showAdditionalChargeField: false,
      showServiceChargeField: false,
      showLevyChargeField: false,
      serviceAmount: 0,
      additionalAmount: 0,
      levyAmount: 0,
      createInvoiceForClient: false,
      shipDetailsVisible: "display-hidden",
      shipping_details: {},
      formData: formFields,
    });
  };

  componentDidMount = async () => {
    this.resetState();
    const id = this.props.match.params.id;
    await this.props.getClientData();
    await this.props.getBusinessData();
    if (id && id != undefined) {
      await this.props.fetchInvoiceInfo(id);
      this.setState({ isUpdateForm: true });
    } else {
      this.setState({ isUpdateForm: false });
    }
    let params = queryString.parse(this.props.location.search);
    if (params.client) {
      formFields["billed_to"].value = params.client;
      this.setState({ createInvoiceForClient: true });
      this.setState({ formData: formFields });
    }
  };
  componentDidUpdate = () => {
    if (
      this.state.formData.invoice_no.value === "" &&
      this.state.isUpdateForm
    ) {
      if (this.props.invoiceInfo) {
        if (Object.keys(this.props.invoiceInfo).length != 0) {
          for (let item in this.props.invoiceInfo) {
            if (
              item == "add_shipping_details" &&
              this.props.invoiceInfo[item] == 1
            ) {
              this.setState({ shipDetailsVisible: "display-block" });
            }
            if (item == "billed_by") {
              formFields[item].value = this.props.invoiceInfo[item].id;
            } else if (item == "billed_to") {
              formFields[item].value = this.props.invoiceInfo[item].id;
            } else if (
              item == "service_charges" &&
              this.props.invoiceInfo[item] > 0
            ) {
              formFields[item].value = this.props.invoiceInfo[item];
              this.setState({ showServiceChargeField: true });
            } else if (
              item == "additional_charges" &&
              this.props.invoiceInfo[item] > 0
            ) {
              formFields[item].value = this.props.invoiceInfo[item];
              this.setState({ showAdditionalChargeField: true });
            } else if (
              item == "levy_charges" &&
              this.props.invoiceInfo[item] > 0
            ) {
              formFields[item].value = this.props.invoiceInfo[item];
              this.setState({ showLevyChargeField: true });
            } else {
              if (formFields[item] !== undefined) {
                formFields[item].value = this.props.invoiceInfo[item];
              }
            }
          }
          this.setState({ formData: formFields }, this.calculateAmounts);
          this.setState({
            shipping_details: this.props.invoiceInfo.shipping_details,
          });
          this.setState({ isUpdateForm: true });
        }
      } else {
        this.props.history.push("/invoice");
        toast.info("!Oops no data found for current invoice");
      }
    }
  };

  getValuesFn = (data) => {
    if (data.id === "add_shipping_details") {
      if (data.value.length == 1) {
        this.setState({ shipDetailsVisible: "display-block" });
        formFields["add_shipping_details"].value = 1;
      } else {
        this.setState({ shipDetailsVisible: "display-hidden" });
        formFields["add_shipping_details"].value = 0;
      }
    } else {
      formFields[data.id].value = data.value;
    }

    this.checkAll();
    this.setState({ formData: formFields }, this.calculateAmounts);
  };

  getShipToValuesFn = (data) => {
    formFields["ship_to"]["value"][data.id] = data.value;
    this.setState({ formData: formFields });
  };

  getShipFromValuesFn = (data) => {
    formFields["ship_from"]["value"][data.id] = data.value;
    this.setState({ formData: formFields });
  };

  getTransportValuesFn = (data) => {
    formFields["transport_details"]["value"][data.id] = data.value;
    this.setState({ formData: formFields });
  };

  checkAll = () => {
    const isComplete = [];
    Object.keys(this.state.formData).forEach((key) => {
      if (
        this.state.formData[key].value === "" &&
        this.state.formData[key].isRequired
      ) {
        isComplete.push(false);
      } else {
        isComplete.push(true);
      }
    });
    if (this.callItemTableGetDataFn.itemTableData.current.errors.items) {
      return true;
    }
    if (isComplete.includes(false)) {
      return false;
    } else {
      return true;
    }
  };

  getAndSetBillToId = (id) => {
    formFields["billed_to"].value = id;
    this.setState({ formData: formFields });
  };
  getAndSetBillById = (id) => {
    formFields["billed_by"].value = id;
    this.setState({ formData: formFields });
  };

  submitFn = async (e) => {
    e.preventDefault();
    this.setState({ btnClicked: true });
    let tableItemData =
      this.callItemTableGetDataFn.itemTableData.current.values;
    // var form_data = new FormData();
    var form_data = {};
    console.log(this.state.formData);
    for (var key in this.state.formData) {
      if (
        key != "ship_to" ||
        key != "ship_from" ||
        key != "items" ||
        key != "transport_details"
      ) {
        form_data[key] = this.state.formData[key].value;
      }
    }

    if (form_data["add_shipping_details"] == 1) {
      form_data["ship_from"] = this.state.formData["ship_from"].value;
      form_data["ship_to"] = this.state.formData["ship_to"].value;
      form_data["transport_details"] =
        this.state.formData["transport_details"].value;
    } else {
      form_data["ship_from"] = {};
      form_data["ship_to"] = {};
      form_data["transport_details"] = {};
    }
    form_data["items"] = tableItemData.items;
    form_data["total_amount"] = tableItemData.total_amount;
    //form_data["final_amount"] = tableItemData.final_amount;
    form_data["vat_amount"] = tableItemData.vat_amount;
    console.log(form_data);
    const pass = this.checkAll();

    if (pass) {
      this.setState({ btnLoading: true });
      if (this.state.isUpdateForm) {
        this.props.updateData({
          ...form_data,
          id: parseInt(this.props.match.params.id),
        });
      } else {
        form_data["created_by"] = this.props.logedIn.user.id;
        this.props.addData(form_data);
      }
      this.setState({ btnLoading: false });
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  showNoteFieldFn = () => {
    this.setState({ showNoteField: true });
  };
  hideNoteFieldFn = () => {
    this.setState({ showNoteField: false });
    this.setState({
      formData: { ...this.state.formData, additional_note: "" },
    });
  };

  showAdditionalChargeFieldFn = () => {
    this.setState({ showAdditionalChargeField: true });
    formFields["additional_charges"].isRequired = true;
    this.setState({ formData: formFields });
  };
  hideAdditionalChargeFieldFn = () => {
    this.setState({ showAdditionalChargeField: false });
    formFields["additional_charges"].isRequired = false;
    formFields["additional_charges"].value = 0;
  };
  showServiceChargeFieldFn = () => {
    this.setState({ showServiceChargeField: true });
    formFields["service_charges"].isRequired = true;
    this.setState({ formData: formFields });
  };
  hideServiceChargeFieldFn = () => {
    this.setState({ showServiceChargeField: false });
    formFields["service_charges"].isRequired = true;
    formFields["service_charges"].value = 0;
    this.setState({ formData: formFields });
  };
  showLevyChargeFieldFn = () => {
    this.setState({ showLevyChargeField: true });
    formFields["levy_charges"].isRequired = true;
    this.setState({ formData: formFields });
  };
  hideLevyChargeFieldFn = () => {
    this.setState({ showLevyChargeField: false });
    formFields["levy_charges"].isRequired = true;
    formFields["levy_charges"].value = 0;
    this.setState({ formData: formFields });
  };

  calculateAmountFn = (amount, type, charge) => {
    let parsedAmount = parseFloat(amount);
    let parsedCharge = parseFloat(charge);
    if (type == "amount") {
      return parsedCharge;
    } else if (type == "percentage") {
      return parsedAmount * (parsedCharge / 100);
    } else {
      return parsedCharge;
    }
  };

  calculateAmounts = () => {
    if (this.callItemTableGetDataFn) {
      const items =
        this.callItemTableGetDataFn.itemTableData.current.values.items;
      const totalAmount =
        items.length > 0
          ? items
              .map((item) => item.amount)
              .reduce(
                (prev, curr) =>
                  parseFloat(parseFloat(prev).toFixed(2)) +
                  parseFloat(parseFloat(curr).toFixed(2)),
                0
              )
          : 0;
      const vatAmount =
        items.length > 0
          ? items
              .map((item) => item.vat)
              .reduce(
                (prev, curr) =>
                  parseFloat(parseFloat(prev).toFixed(2)) +
                  parseFloat(parseFloat(curr).toFixed(2)),
                0
              )
          : 0;
      const finalAmount = totalAmount + vatAmount;
      formFields["total_amount"].value = totalAmount;
      formFields["vat_amount"].value = vatAmount;

      const serviceAmount = this.calculateAmountFn(
        finalAmount,
        this.state.formData.service_charges_type.value,
        this.state.formData.service_charges.value
      );
      const levyAmount = this.calculateAmountFn(
        finalAmount,
        this.state.formData.levy_charges_type.value,
        this.state.formData.levy_charges.value
      );
      const additionalAmount = this.calculateAmountFn(
        finalAmount,
        this.state.formData.additional_charges_type.value,
        this.state.formData.additional_charges.value
      );
      formFields["final_amount"].value =
        finalAmount + additionalAmount + serviceAmount + levyAmount;
      this.setState({
        serviceAmount: serviceAmount,
        additionalAmount: additionalAmount,
        levyAmount: levyAmount,
        formData: formFields,
      });
    }
  };

  render() {
    const {
      btnClicked,
      btnLoading,
      showNoteField,
      isUpdateForm,
      showAdditionalChargeField,
      showServiceChargeField,
      showLevyChargeField,
      shipDetailsVisible,
      serviceAmount,
      additionalAmount,
      levyAmount,
      createInvoiceForClient,
      shipping_details,
      formData,
    } = this.state;
    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle="Debit Notes"
          breadCrumbParent="Accounting"
          breadCrumbActive="Debit Notes"
        />
        <Card>
          <CardHeader>
            <CardTitle>Debit Note</CardTitle>
          </CardHeader>
          <CardBody>
            <form>
              <Row>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="Due Date">Debit Note Date</Label>
                    <Date
                      name="invoice_date"
                      isRequired={formData.invoice_date.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      value={formData.invoice_date.value}
                      readOnly={true}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12"></Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="Invoice Due">Due Date</Label>
                    <Date
                      name="invoice_due"
                      isRequired={formData.invoice_due.isRequired}
                      getValuesFn={this.getValuesFn}
                      btnClicked={btnClicked}
                      min={formData.invoice_date.value!=""?formData.invoice_date.value:moment().format("YYYY-MM-DD")}
                      value={formData.invoice_due.value}
                    />
                  </FormGroup>
                </Col>
                {isUpdateForm ? (
                  <>
                    <Col lg="6" md="12"></Col>
                    <Col lg="6" md="12">
                      <FormGroup className="my-1">
                        <Label for="Invoice No">Debit Note No.</Label>
                        <Input
                          name="invoice_no"
                          isRequired={formData.invoice_no.isRequired}
                          getValuesFn={this.getValuesFn}
                          btnClicked={btnClicked}
                          value={formData.invoice_no.value}
                          readOnly={true}
                        />
                      </FormGroup>
                    </Col>
                  </>
                ) : null}
                <Col lg="6" md="12"></Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="Billed By">Issued By (Yours Details)</Label>
                    <BillBy
                      BillById={this.getAndSetBillById}
                      BillBy={formData.billed_by.value}
                      key={formData.billed_by.value}
                      btnClicked={btnClicked}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <FormGroup className="my-1">
                    <Label for="Billed To">issued To (Clients Details)</Label>
                    <BillTo
                      createInvoiceForClient={createInvoiceForClient}
                      BillToId={this.getAndSetBillToId}
                      BillTo={formData.billed_to.value}
                      key={formData.billed_to.value}
                      btnClicked={btnClicked}
                      location={queryString.parse(this.props.location.search)}
                    />
                  </FormGroup>
                </Col>
                {/* <Col lg="12" md="12">
                  <FormGroup className="my-1">
                    <Checkbox
                      name="add_shipping_details"
                      btnClicked={btnClicked}
                      getValuesFn={this.getValuesFn}
                      options={[
                        {
                          value: "add_shipping_details",
                          label: "Add Shipping Details",
                          id: "add_shipping_details",
                          isChecked:
                            formData.add_shipping_details.value == 1
                              ? true
                              : false,
                        },
                      ]}
                    />
                  </FormGroup>
                </Col> */}
                <Col lg="6" md="12" className={shipDetailsVisible}>
                  <ShipFrom
                    shipFrom_data={formData.ship_from.value}
                    key={formData.ship_from.value}
                    BillBy={formData.billed_by.value}
                    getShipFromValuesFn={this.getShipFromValuesFn}
                  />
                </Col>
                <Col lg="6" md="12" className={shipDetailsVisible}>
                  <ShipTo
                    shipTo_data={formData.ship_to.value}
                    key={formData.ship_to.value}
                    BillTo={formData.billed_to.value}
                    getShipToValuesFn={this.getShipToValuesFn}
                  />
                </Col>
                <Col lg="6" md="12" className={shipDetailsVisible}>
                  <TransportDetails
                    transportDetails_data={shipping_details}
                    key={formData.transport_details.value}
                    getTransportValuesFn={this.getTransportValuesFn}
                  />
                </Col>
                <Col lg="12" md="12">
                  <ItemTableList
                    ref={(ref) => (this.callItemTableGetDataFn = ref)}
                    items={formData.items.value}
                    vatAmount={formData.vat_amount.value}
                    finalAmount={formData.final_amount.value}
                    totalAmount={formData.total_amount.value}
                    key={formData.items.value}
                    calculateAmounts={this.calculateAmounts}
                  />
                </Col>
                {showNoteField ? (
                  <>
                    <Col lg="4" md="10">
                      <FormGroup className="my-3">
                        <TextArea
                          name="additional_note"
                          isRequired={formData.additional_note.isRequired}
                          getValuesFn={this.getValuesFn}
                          btnClicked={btnClicked}
                          value={formData.additional_note.value}
                          placeholder="Additional Notes"
                          row={3}
                          limit={30}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="2" md="2" className="mt-2 pt-2">
                      <Trash
                        size={15}
                        type="button"
                        onClick={this.hideNoteFieldFn}
                      />
                    </Col>
                  </>
                ) : (
                  <Col lg="6" md="6">
                    <Button
                      className="add-new-btn mt-2"
                      color="primary"
                      type="button"
                      outline
                      onClick={this.showNoteFieldFn}
                    >
                      <Plus size={15} />
                      <span className="align-middle">Add Note</span>
                    </Button>
                  </Col>
                )}
                {showAdditionalChargeField ? (
                  <>
                    <Col lg="3" md="3">
                      <FormGroup className="my-2">
                        <Label for="additional_charges">
                          Additional Charges
                        </Label>
                        <Input
                          name="additional_charges"
                          type="number"
                          isRequired={formData.additional_charges.isRequired}
                          getValuesFn={this.getValuesFn}
                          btnClicked={btnClicked}
                          value={formData.additional_charges.value}
                          placeholder="Additional Charges"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="2" md="2">
                      <FormGroup className="my-2">
                        <Label for="additional_charges_type">Type</Label>
                        <SingleSelect
                          name="additional_charges_type"
                          isRequired={
                            formData.additional_charges_type.isRequired
                          }
                          options={[
                            { value: "percentage", label: "Percentage" },
                            { value: "amount", label: "Amount" },
                          ]}
                          getValuesFn={this.getValuesFn}
                          btnClicked={btnClicked}
                          selectedValue={{
                            value: "percentage",
                            label: "Percentage",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="1" md="1" className="mt-2 pt-2">
                      <Trash
                        size={15}
                        type="button"
                        onClick={this.hideAdditionalChargeFieldFn}
                      />
                    </Col>
                  </>
                ) : (
                  <Col lg="6" md="6" className="text-right pl-2">
                    <Button
                      className="add-new-btn mt-2"
                      color="primary"
                      type="button"
                      outline
                      onClick={this.showAdditionalChargeFieldFn}
                    >
                      <Plus size={15} />
                      <span className="align-middle">
                        Add Additional Charges
                      </span>
                    </Button>
                  </Col>
                )}
                {showServiceChargeField ? (
                  <>
                    <Col lg="6" md="6"></Col>
                    <Col lg="3" md="3">
                      <FormGroup className="my-2">
                        <Label for="service_charges">Service Charges</Label>
                        <Input
                          name="service_charges"
                          type="number"
                          isRequired={formData.service_charges.isRequired}
                          getValuesFn={this.getValuesFn}
                          btnClicked={btnClicked}
                          value={formData.service_charges.value}
                          placeholder="Service Charges"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="2" md="2">
                      <FormGroup className="my-2">
                        <Label for="service_charges_type">Type</Label>
                        <SingleSelect
                          name="service_charges_type"
                          isRequired={formData.service_charges_type.isRequired}
                          options={[
                            { value: "percentage", label: "Percentage" },
                            { value: "amount", label: "Amount" },
                          ]}
                          getValuesFn={this.getValuesFn}
                          btnClicked={btnClicked}
                          selectedValue={{
                            value: "percentage",
                            label: "Percentage",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="1" md="1" className="mt-2 pt-2">
                      <Trash
                        size={15}
                        type="button"
                        onClick={this.hideServiceChargeFieldFn}
                      />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col lg="6" md="6"></Col>
                    <Col lg="6" md="6" className="text-right pl-2">
                      <Button
                        className="add-new-btn mt-2"
                        color="primary"
                        type="button"
                        outline
                        onClick={this.showServiceChargeFieldFn}
                      >
                        <Plus size={15} />
                        <span className="align-middle">
                          Add Service Charges
                        </span>
                      </Button>
                    </Col>
                  </>
                )}
                {showLevyChargeField ? (
                  <>
                    <Col lg="6" md="6"></Col>
                    <Col lg="3" md="3">
                      <FormGroup className="my-2">
                        <Label for="levy_charges">Levy Charges</Label>
                        <Input
                          name="levy_charges"
                          type="number"
                          isRequired={formData.levy_charges.isRequired}
                          getValuesFn={this.getValuesFn}
                          btnClicked={btnClicked}
                          value={formData.levy_charges.value}
                          placeholder="Levy Charges"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="2" md="2">
                      <FormGroup className="my-2">
                        <Label for="levy_charges_type">Type</Label>
                        <SingleSelect
                          name="levy_charges_type"
                          isRequired={formData.levy_charges_type.isRequired}
                          options={[
                            { value: "percentage", label: "Percentage" },
                            { value: "amount", label: "Amount" },
                          ]}
                          getValuesFn={this.getValuesFn}
                          btnClicked={btnClicked}
                          selectedValue={{
                            value: "percentage",
                            label: "Percentage",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="1" md="1" className="mt-2 pt-2">
                      <Trash
                        size={15}
                        type="button"
                        onClick={this.hideLevyChargeFieldFn}
                      />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col lg="6" md="6"></Col>
                    <Col lg="6" md="6" className="text-right pl-2">
                      <Button
                        className="add-new-btn mt-2"
                        color="primary"
                        type="button"
                        outline
                        onClick={this.showLevyChargeFieldFn}
                      >
                        <Plus size={15} />
                        <span className="align-middle">Add Levy Charges</span>
                      </Button>
                    </Col>
                  </>
                )}
                <div className="container mt-3">
                  <Row>
                    <Col md={6}></Col>
                    <Col md={6}>
                      <div className="ecommerce-application">
                        <div className="checkout-options">
                          <Card>
                            <CardBody>
                              <div className="coupons">
                                <div className="coupons-title">
                                  <p>Debit Amount Details</p>
                                </div>
                              </div>
                              <hr />
                              <div className="detail">
                                <div className="detail-title">Sub Amount</div>
                                <div className="detail-amt">
                                  {parseFloat(
                                    formData.total_amount.value
                                  ).toFixed(2)}
                                </div>
                              </div>
                              <div className="detail">
                                <div className="detail-title">VAT Amount</div>
                                <div className="detail-amt">
                                  {parseFloat(
                                    formData.vat_amount.value
                                  ).toFixed(2)}
                                </div>
                              </div>

                              <div className="detail">
                                <div className="detail-title">
                                  Service Change
                                </div>
                                <div className="detail-amt">
                                  {parseFloat(serviceAmount).toFixed(2)}
                                </div>
                              </div>
                              <div className="detail">
                                <div className="detail-title">Levy Change</div>
                                <div className="detail-amt">
                                  {parseFloat(levyAmount).toFixed(2)}
                                </div>
                              </div>
                              <div className="detail">
                                <div className="detail-title">
                                  Additional Charge
                                </div>
                                <div className="detail-amt">
                                  {parseFloat(additionalAmount).toFixed(2)}
                                </div>
                              </div>

                              <hr />
                              <div className="detail">
                                <div className="detail-title detail-total">
                                  Total
                                </div>
                                <div className="detail-amt total-amt">
                                  {parseFloat(
                                    formData.final_amount.value
                                  ).toFixed(2)}
                                </div>
                              </div>

                              {btnLoading ? (
                                <Button.Ripple
                                  type="button"
                                  block
                                  color="primary"
                                  className="btn-block"
                                >
                                  <Spinner color="white" size="sm" />
                                  <span className="ml-50">Loading...</span>
                                </Button.Ripple>
                              ) : (
                                <Button.Ripple
                                  type="button"
                                  block
                                  color="primary"
                                  className="btn-block"
                                  onClick={this.submitFn}
                                >
                                  {isUpdateForm ? "Update" : "Submit"}
                                </Button.Ripple>
                              )}
                            </CardBody>
                          </Card>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Row>
            </form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    invoiceInfo: state.debitNotes.invoiceInfo,
    logedIn: state.auth.login,
  };
};

export default connect(mapStateToProps, {
  updateData,
  addData,
  getClientData,
  getBusinessData,
  fetchInvoiceInfo,
})(CreateInvoice);
