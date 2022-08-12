import React from "react";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import { ChevronDown, Edit } from "react-feather";
import EditAndCreateBusiness from "../../../commonBilledToBilledBy/business/EditAndCreateBusiness";
import { connect } from "react-redux";
import { ThemeConsumer } from "styled-components";
import { getBusinessData } from "redux/actions/invoice";

class BillBy extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalOpen: false,
    showBusinessDetails: {},
    newFormOpen: false,
  };
  componentDidMount = () => {
    if (this.props.BillBy != "" && this.props.BillBy != undefined) {
      let showBusinessDetails = this.props.businessList.find(
        (item) => item.id == this.props.BillBy
      );
      if (showBusinessDetails != undefined) {
        this.setState({ showBusinessDetails });
      }
    }
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.businessList !== this.props.businessList) {
      if (this.props.BillBy != undefined && this.props.BillBy != "") {
        let business = this.props.businessList.find(
          (item) => item.id == this.props.BillBy
        );
        this.setState({ showBusinessDetails: business });
      }
    }
  };

  openAndCloseModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen, newFormOpen: false });
  };
  openAndCloseModalNew = () => {
    this.setState({ modalOpen: !this.state.modalOpen, newFormOpen: true });
  };
  handleChange = (args) => {
    if (this.props.businessList.length > 0) {
      let business = this.props.businessList.find(
        (item) => item.id == args.target.value
      );
      this.setState({ showBusinessDetails: business });
      this.props.BillById(args.target.value);
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="width-100">
          <UncontrolledButtonDropdown
            className={
              this.props.BillBy.length == 0 &&
              this.props.btnClicked &&
              "is-invalid"
            }
          >
            <DropdownToggle
              outline
              color="primary"
              size="md"
              caret
              className="width-450"
            >
              <Row>
                <Col md={6} className="text-left">
                  {this.state.showBusinessDetails.business_name
                    ? this.state.showBusinessDetails.business_name
                    : "Select Billed By Bussiness"}
                </Col>
                <Col md={6} className="text-right">
                  <ChevronDown size={15} />
                </Col>
              </Row>
            </DropdownToggle>

            <DropdownMenu className="width-450">
              {this.props.businessList.map((business, key) => (
                <DropdownItem
                  value={business.id}
                  key={key}
                  onClick={this.handleChange}
                >
                  {business.business_name}
                </DropdownItem>
              ))}
              <div className="text-center my-2">
                <Button
                  color="primary mt-1"
                  onClick={this.openAndCloseModalNew}
                >
                  Add New Business
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          {this.props.BillBy.length == 0 && this.props.btnClicked && (
            <p className="invalid-tooltip">Please Select Bussiness</p>
          )}
          <EditAndCreateBusiness
            openClose={this.openAndCloseModal}
            editBusinessData={this.state.showBusinessDetails}
            open={this.state.modalOpen}
            createNewFormOpen={this.state.newFormOpen}
            key={this.state.modalOpen}
          />
          <Card className="width-450 borderSolid mt-2">
            <CardBody>
              {Object.keys(this.state.showBusinessDetails).length != 0 ? (
                <>
                  <Row>
                    <Col lg={6} className="text-left">
                      Business details
                    </Col>
                    <Col lg={6} className="text-right text-primary">
                      <span
                        onClick={this.openAndCloseModal}
                        className="cursor-pointer"
                      >
                        <Edit size={15} /> Edit
                      </span>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col lg={6} className="text-left">
                      Bussiness Name
                    </Col>
                    <Col lg={6} className="text-left">
                      {this.state.showBusinessDetails.business_name}
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col lg={6} className="text-left">
                      Address
                    </Col>
                    <Col lg={6} className="text-left">
                      {this.state.showBusinessDetails.street}
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    {this.state.showBusinessDetails.show_email_in_invoice ==
                    1 ? (
                      <>
                        <Col lg={6} className="text-left">
                          Email
                        </Col>
                        <Col lg={6} className="text-left">
                          {this.state.showBusinessDetails.email}
                        </Col>
                      </>
                    ) : (
                      ""
                    )}
                  </Row>
                  <Row className="mt-1">
                    {this.state.showBusinessDetails.show_number_in_invoice ==
                    1 ? (
                      <>
                        <Col lg={6} className="text-left">
                          Phone
                        </Col>
                        <Col lg={6} className="text-left">
                          {this.state.showBusinessDetails.number}
                        </Col>
                      </>
                    ) : (
                      ""
                    )}
                  </Row>
                </>
              ) : (
                <>
                  <div className="text-center my-2">
                    Select a Client/Business from list
                  </div>
                  <div className="text-center my-1">or</div>
                  <div className="text-center my-1">
                    <Button
                      color="primary mt-1"
                      onClick={this.openAndCloseModalNew}
                    >
                      Add New Business
                    </Button>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    businessList: state.purchaseOrders.allBusinesses,
  };
};

export default connect(mapStateToProps)(BillBy);
