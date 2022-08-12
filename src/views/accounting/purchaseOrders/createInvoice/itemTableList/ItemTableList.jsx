import React from "react";
import { Table, Button, Row, Col } from "reactstrap";
import { Trash } from "react-feather";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { assignmentExpression } from "@babel/types";

class ItemTableList extends React.Component {
  constructor(props) {
    super(props);
    this.itemTableData = React.createRef();
    this.state = {
      initialValues: {
        items: [this.item],
        final_amount: 0,
        total_amount: 0,
        vat_amount: 0,
      },
      isUpdateForm: false,
    };
  }
  item = {
    name: "",
    vat_rate_percent: 10,
    quantity: 1,
    rate: 1,
    amount: 1,
    vat: 0.1,
    total: 1.1,
    description: "",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.items.length > 0 && !prevState.isUpdateForm) {
      return {
        initialValues: {
          ...prevState.initialValues,
          items: nextProps.items,
          final_amount: nextProps.finalAmount,
          total_amount: nextProps.totalAmount,
          vat_amount: nextProps.vatAmount,
        },
        isUpdateForm: true,
      };
    } else {
      return null;
    }
  }

  componentDidMount = () => {
    this.addItems(this.props.items);
    this.calculateTotal();
  };
  addItems(data) {
    var updatedInitialValues = this.state.initialValues;
    updatedInitialValues.items = data;
    this.setState({ initialValues: updatedInitialValues });
    this.calculateTotal();
  }
  onChangeHandler = async (args) => {
    var itemValue = args.target.value;
    var item = args.target.id.split("-");
    var id = item[0];
    var index = item[1];
    var itemData = this.itemTableData.current.values.items[index];
    var amount = 0;
    var vat = 0;
    var total = 0;
    switch (id) {
      case "quantity":
        if (itemData.rate != "" && itemValue != "") {
          amount = itemData.rate * itemValue;
        }
        if(itemData.vat_rate_percent!=""){
          vat = (amount * itemData.vat_rate_percent)/100;
        }
        await this.itemTableData.current.setFieldValue(
          `items[${index}].amount`,
          amount.toFixed(0)
        );
        await this.itemTableData.current.setFieldValue(
          `items[${index}].vat`,
          vat.toFixed(2)
        );
        break;
      case "rate":
        if (itemValue != "" && itemData.quantity != "") {
          amount = itemValue * itemData.quantity;
        }
        if(itemData.vat_rate_percent!=""){
          vat = (amount * itemData.vat_rate_percent)/100;
        }
        await this.itemTableData.current.setFieldValue(
          `items[${index}].amount`,
          amount.toFixed(0)
        );
        await this.itemTableData.current.setFieldValue(
          `items[${index}].vat`,
          vat.toFixed(2)
        );
        break;
      case "vat_rate_percent":
        if (itemValue != "" && itemData.amount != "") {
          vat = (itemData.amount * itemValue)/100;
        }
        amount = itemData.amount;
        await this.itemTableData.current.setFieldValue(
          `items[${index}].vat`,
          vat.toFixed(2)
        );
        break;
    }
    total = parseFloat(parseFloat(vat).toFixed(2)) + parseFloat(parseFloat(amount).toFixed(2));
    await this.itemTableData.current.setFieldValue(
      `items[${index}].total`,
      parseFloat(total).toFixed(2)
    );
    this.calculateTotal();
  };

  calculateTotal = () => {
    const items = this.itemTableData.current.values.items;
    let totalAmount =
      items.length > 0
        ? items
            .map((item) => item.amount)
            .reduce(
              (prev, curr) =>
                parseFloat(parseFloat(prev).toFixed(2)) + parseFloat(parseFloat(curr).toFixed(2)),
              0
            )
        : 0;
    let totalVat =
      items.length > 0
        ? items
            .map((item) => item.vat)
            .reduce(
              (prev, curr) =>
              parseFloat(parseFloat(prev).toFixed(2)) + parseFloat(parseFloat(curr).toFixed(2)),
              0
            )
        : 0;
    let overAllTotal = totalAmount + totalVat;
    this.setState((prevState) => ({
      initialValues: {
        ...prevState.initialValues,
        items: this.itemTableData.current.values.items,
        final_amount: overAllTotal,
        total_amount: totalAmount,
        vat_amount: totalVat,
      },
    }));
    this.props.calculateAmounts();
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          innerRef={this.itemTableData}
          initialValues={this.state.initialValues}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            items: Yup.array().of(
              Yup.object().shape({
                name: Yup.string().required("Item name is required"),
                quantity: Yup.string().required(
                  "Item quantity must be greater than 0"
                ),
                rate: Yup.string().required("Item rate must be greater than 0"),
                description:Yup.string().required("Item description is required"),
              })
            ),
          })}
        >
          {({ values, errors, handleChange }) => (
            <Form>
              <FieldArray name="items">
                {(arrayHelpers) => (
                  <div className="overflow-auto">
                    <Table className="mt-2" responsive>
                      <thead className="bg-primary text-white col-lg-12">
                        <tr>
                          <th className="fit text-center">Item Details</th>
                          <th className="fit text-center">VAT Rate</th>
                          <th className="fit text-center">Quantity </th>
                          <th className="fit text-center">Rate</th>
                          <th className="fit text-center">Amount</th>
                          <th className="fit text-center">VAT</th>
                          <th className="fit text-center">Total</th>
                          <th className="fit text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.items.length > 0
                          ? values.items.map((item, index) => (
                              <>
                                <tr
                                  className="position-relative p-4"
                                  key={index}
                                >
                                  <td
                                    className="px-1 form-group"
                                    align="center"
                                  >
                                    <Field
                                      type="text"
                                      placeholder="Item name"
                                      name={`items[${index}].name`}
                                      value={item.name || ""}
                                      className={`form-control ${
                                        errors &&
                                        errors.items &&
                                        errors.items[index] &&
                                        errors.items[index].name &&
                                        "is-invalid"
                                      }`}
                                    />
                                    {errors &&
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].name && (
                                      <div className="text-left text-danger">
                                        {errors.items[index].name}
                                      </div>
                                      )}
                                  </td>
                                  <td className="px-1" align="center">
                                    <Field
                                      id={`vat_rate_percent-${index}`}
                                      type="number"
                                      name={`items[${index}].vat_rate_percent`}
                                      value={item.vat_rate_percent || ""}
                                      className="form-control"
                                      onChange={(e) => {
                                        handleChange(e);
                                        this.onChangeHandler(e);
                                      }}
                                    />
                                  </td>
                                  <td className="px-1" align="center">
                                    <Field
                                      id={`quantity-${index}`}
                                      type="number"
                                      index={index}
                                      name={`items[${index}].quantity`}
                                      value={item.quantity || ""}
                                      className="form-control"
                                      onChange={(e) => {
                                        handleChange(e);
                                        this.onChangeHandler(e);
                                      }}
                                    />
                                    {errors &&
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].quantity ? (
                                      <div className="text-left text-danger">
                                        {errors.items[index].quantity}
                                      </div>
                                    ) : null}
                                  </td>

                                  <td className="px-1" align="center">
                                    <Field
                                      id={`rate-${index}`}
                                      type="number"
                                      name={`items[${index}].rate`}
                                      value={item.rate || ""}
                                      className="form-control"
                                      onChange={(e) => {
                                        handleChange(e);
                                        this.onChangeHandler(e);
                                      }}
                                    />
                                    {errors &&
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].rate ? (
                                      <div className="text-left text-danger">
                                        {errors.items[index].rate}
                                      </div>
                                    ) : null}
                                  </td>
                                  <td className="px-1" align="center">
                                    <Field
                                      type="number"
                                      name={`items[${index}].amount`}
                                      value={item.amount || ""}
                                      className="form-control"
                                      disabled={true}
                                    />
                                  </td>
                                  <td className="px-1" align="center">
                                    <Field
                                      type="number"
                                      name={`items[${index}].vat`}
                                      value={item.vat || ""}
                                      className="form-control"
                                      disabled={true}
                                    />
                                  </td>
                                  <td className="px-1" align="center">
                                    <Field
                                      type="number"
                                      name={`items[${index}].total`}
                                      value={item.total || ""}
                                      className="form-control"
                                      disabled={true}
                                    />
                                  </td>
                                  <td className="px-1" align="center">
                                    <Trash
                                      size={15}
                                      onClick={async () => {
                                        await arrayHelpers.remove(index);
                                        this.calculateTotal();
                                      }}
                                    />
                                  </td>
                                </tr>
                                <tr                                   
                                className="position-relative"
                                  key={index}>
                                  <td colspan="7" className="px-1 form-group">
                                    <Field
                                      type="text"
                                      placeholder="Item Description"
                                      name={`items[${index}].description`}
                                      value={item.description || ""}
                                      className={`form-control ${
                                        errors &&
                                        errors.items &&
                                        errors.items[index] &&
                                        errors.items[index].description &&
                                        "is-invalid"
                                      }`}
                                    />
                                    {errors &&
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].description && (
                                      <div className="text-left text-danger">
                                        {errors.items[index].description}
                                      </div>
                                      )}
                                  </td>
                                </tr>
                              </>
                            ))
                          : null}
                      </tbody>
                    </Table>
                    {values.items.length > 0 ? (
                      <div className="container">
                        <Row>
                          <Col md={4} className="detail">
                            <h6 className="fit text-center detail-title detail-total">
                              VAT Amount : {this.state.initialValues.vat_amount}
                            </h6>
                          </Col>

                          <Col md={4} className="detail">
                            <h6 className="fit text-center detail-title detail-total">
                              Sub Amount :{" "}
                              {this.state.initialValues.total_amount}
                            </h6>
                          </Col>
                          {/* <Col md={4} className="detail">
                            <h6 className="fit text-center detail-title detail-total">
                              Final Amount :{" "}
                              {this.state.initialValues.final_amount}
                            </h6>
                          </Col> */}
                        </Row>
                      </div>
                    ) : null}
                    <Button
                      className="mt-2"
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={async () => {
                        await arrayHelpers.push(this.item);
                        this.calculateTotal();
                      }}
                    >
                      + Add New Item
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}
export default ItemTableList;
