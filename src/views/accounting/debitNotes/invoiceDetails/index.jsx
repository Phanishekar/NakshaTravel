import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Collapse } from "reactstrap";
import classnames from "classnames";
import Breadcrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import InvoiceList from "./InvoiceList";
import queryString from "query-string";
import InvoiceFilter from "./InvoiceFilter";
import { ChevronDown } from "react-feather";
import InvoiceLiFeTimeData from "./InvoiceLifeTimeData";
import InvoiceSummary from "./InvoiceSummary";

const collapseItems = [
  {
    id: 1,
    title: "Summary  (Showing summary for All Debit Notes)",
  },
  {
    id: 2,
    title: "Debit Notes",
  },
];

class Invoice extends React.Component {
  state = { collapseID: "2", status: "Opened" };
  toggleCollapse = (collapseID) => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };

  onEntered = (id) => {
    if (id === this.state.collapseID) this.setState({ status: "Opened" });
  };
  onEntering = (id) => {
    if (id === this.state.collapseID) this.setState({ status: "Opening..." });
  };

  onExited = (id) => {
    if (id === this.state.collapseID) this.setState({ status: "Closed" });
  };

  onExiting = (id) => {
    if (id === this.state.collapseID) this.setState({ status: "Closing..." });
  };

  render() {
    const accordionMarginItems = collapseItems.map((collapseItem) => {
      return (
        <div className="collapse-margin" key={collapseItem.id}>
          <Card>
            <CardHeader
              onClick={() => this.toggleCollapse(collapseItem.id)}
              className={classnames({
                "collapse-collapsed":
                  this.state.status === "Closed" &&
                  this.state.collapseID === collapseItem.id,
                "collapse-shown":
                  this.state.status === "Opened" &&
                  this.state.collapseID === collapseItem.id,
                closing:
                  this.state.status === "Closing..." &&
                  this.state.collapseID === collapseItem.id,
                opening:
                  this.state.status === "Opening..." &&
                  this.state.collapseID === collapseItem.id,
              })}
            >
              <CardTitle className="lead collapse-title collapsed">
                {collapseItem.title}
              </CardTitle>
              <ChevronDown size={15} className="collapse-icon" />
            </CardHeader>
            <Collapse
              isOpen={collapseItem.id == this.state.collapseID}
              onEntering={() => this.onEntering(collapseItem.id)}
              onEntered={() => this.onEntered(collapseItem.id)}
              onExiting={() => this.onExiting(collapseItem.id)}
              onExited={() => this.onExited(collapseItem.id)}
            >
              <CardBody>
                {this.state.collapseID == "1" && (
                  <InvoiceSummary
                    parsedFilter={queryString.parse(this.props.location.search)}
                    key={this.props.location.search}
                  />
                )}
                {this.state.collapseID == "2" && (
                  <InvoiceList
                    parsedFilter={queryString.parse(this.props.location.search)}
                    key={this.props.location.search}
                  />
                )}
              </CardBody>
            </Collapse>
          </Card>
        </div>
      );
    });

    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Debit Notes"
          breadCrumbParent="Accounting"
          breadCrumbActive="Debit Notes"
          link="/debitNotes/create"
          label="Create New Debit Notes"
          color="danger"
        />
        <InvoiceLiFeTimeData />
        <Card>
          <CardHeader>
            <CardTitle>Select Filters to see Debit Notes and Summary</CardTitle>
          </CardHeader>
          <CardBody>
            <InvoiceFilter
              parsedFilter={queryString.parse(this.props.location.search)}
            />
            <div className="vx-collapse">{accordionMarginItems}</div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Invoice;
