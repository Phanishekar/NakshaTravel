import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import LeadsList from "./LeadsList";
import queryString from "query-string";
class Leads extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Leads"
          breadCrumbParent="Profile & Leads"
          breadCrumbActive="Leads"
        />
        <Row>
          <Col sm="12">
            <LeadsList
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Leads;
