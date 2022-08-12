import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import ClientsList from "./ClientsList";
import queryString from "query-string";
class Clients extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Clients"
          breadCrumbParent="Profile & Clients"
          breadCrumbActive="Clients"
        />
        <Row>
          <Col sm="12">
            <ClientsList
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Clients;
