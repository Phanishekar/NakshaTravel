import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Label,
  ButtonGroup,
  Button,
} from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { getClientData } from "redux/actions/proformaInvoice";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { history } from "history.js";
import SingleSelect from "components/common/formBasic/singleSelect";
import "flatpickr/dist/themes/light.css";
import "assets/scss/plugins/forms/flatpickr/flatpickr.scss";
class InvoiceFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.getClientData();
  };

  onApplyFilter = (key, value) => {
    let newValue = value;
    let filterObject = this.props.parsedFilter;
    let searchFilter = "";
    if (key == "dates") {
      if (value.length == 2) {
        newValue = value.map((date) => moment(date).format("YYYY-MM-DD"));
      } else {
        return;
      }
    }
    if (value == "all") {
      filterObject[key] = "";
    } else {
      filterObject[key] = newValue;
    }

    const queryString = new URLSearchParams(filterObject).toString();
    if (queryString.length) {
      searchFilter = queryString;
    }
    history.push(`/proformaInvoice?${searchFilter}`);
  };

  render() {
    return (
      <Row>
        <Col md="6" sm="12">
          <h6 className="text-bold-500">Select Date Range</h6>
          <Flatpickr
            className="form-control"
            options={{
              mode: "range",
              dateFormat: "Y-m-d",
              defaultDate: ["2021-09-01", "2021-09-15"],
            }}
            onChange={(date) => {
              this.onApplyFilter("dates", date);
            }}
          />
        </Col>
        <Col md="6" sm="12">
          <FormGroup>
            <h6 className="text-bold-500">Select Client</h6>
            <Select
              className="React"
              classNamePrefix="select"
              defaultValue={this.props.clientList[0]}
              name="color"
              onChange={(e) => this.onApplyFilter("client", e.value)}
              options={this.props.clientList}
            />
          </FormGroup>
        </Col>

        <Col md={12} sm={12}>
          <h6 className="text-bold-500">Select Invoice Status</h6>
          <ButtonGroup className="mb-1">
            <Button.Ripple
              outline
              color="primary"
              onClick={() => {
                this.onApplyFilter("status", "all");
              }}
            >
              All
            </Button.Ripple>
            <Button.Ripple
              outline
              color="primary"
              onClick={() => {
                this.onApplyFilter("status", "paid");
              }}
            >
              Paid
            </Button.Ripple>
            <Button.Ripple
              outline
              color="primary"
              onClick={() => {
                this.onApplyFilter("status", "unpaid");
              }}
            >
              Unpaid
            </Button.Ripple>
            <Button.Ripple
              outline
              color="primary"
              onClick={() => {
                this.onApplyFilter("status", "overdue");
              }}
            >
              Overdue
            </Button.Ripple>
            <Button.Ripple
              outline
              color="primary"
              onClick={() => {
                this.onApplyFilter("status", "canceled");
              }}
            >
              Canceled
            </Button.Ripple>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clientList: state.proformaInvoice.allClientsForFilter,
  };
};

export default connect(mapStateToProps, {
  getClientData,
})(InvoiceFilter);
