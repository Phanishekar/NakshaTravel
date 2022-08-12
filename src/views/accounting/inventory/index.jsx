import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import InventoryList from "./InventoryList";
import queryString from "query-string";
class Inventory extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Inventory"
          breadCrumbParent="Accounting"
          breadCrumbActive="Inventory"
        />
        <Row>
          <Col sm="12">
            <InventoryList
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Inventory;
