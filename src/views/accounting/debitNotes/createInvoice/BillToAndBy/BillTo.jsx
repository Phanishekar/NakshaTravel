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
import EditAndCreateClients from "../../../commonBilledToBilledBy/client/EditAndCreateClients";
import { connect } from "react-redux";
import { getClientData } from "redux/actions/invoice";

class BillTo extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalOpen: false,
    showClientDetails: {},
    newFormOpen: false,
  };
  componentDidMount = () => {
    if (
      (this.props.BillTo != "" && this.props.BillTo != undefined) ||
      this.props.location.client
    ) {
      let showClientDetails = this.props.clientList.find((item) =>
        item.id == this.props.BillTo
          ? this.props.BillTo
          : this.props.location.client
      );
      if (showClientDetails != undefined) {
        this.setState({ showClientDetails });
      }
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.clientList !== this.props.clientList) {
      if (this.props.BillTo != undefined && this.props.BillTo != "") {
        let business = this.props.clientList.find(
          (item) => item.id == this.props.BillTo
        );
        this.setState({ showClientDetails: business });
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
    if (this.props.clientList.length > 0) {
      let client = this.props.clientList.find(
        (item) => item.id == args.target.value
      );
      this.setState({ showClientDetails: client });
      this.props.BillToId(args.target.value);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="width-100">
          <UncontrolledButtonDropdown
            className={
              this.props.BillTo.length == 0 &&
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
                  {this.state.showClientDetails.business_name
                    ? this.state.showClientDetails.business_name
                    : "Select Issued To Client"}
                </Col>
                <Col md={6} className="text-right">
                  <ChevronDown size={15} />
                </Col>
              </Row>
            </DropdownToggle>
            <DropdownMenu className="width-450">
              {this.props.clientList.map((business, key) => (
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
                  Add New Client
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          {this.props.BillTo.length == 0 && this.props.btnClicked && (
            <p className="invalid-tooltip">Please Select Client</p>
          )}
          <EditAndCreateClients
            openClose={this.openAndCloseModal}
            editClientData={this.state.showClientDetails}
            createNewFormOpen={this.state.newFormOpen}
            open={this.state.modalOpen}
            key={this.state.modalOpen}
          />
          <Card className="width-450 borderSolid mt-2">
            <CardBody>
              {Object.keys(this.state.showClientDetails).length != 0 ? (
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
                      {this.state.showClientDetails.business_name}
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col lg={6} className="text-left">
                      Address
                    </Col>
                    <Col lg={6} className="text-left">
                      {this.state.showClientDetails.street}
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    {this.state.showClientDetails.show_email_in_invoice == 1 ? (
                      <>
                        <Col lg={6} className="text-left">
                          Email
                        </Col>
                        <Col lg={6} className="text-left">
                          {this.state.showClientDetails.email}
                        </Col>
                      </>
                    ) : (
                      ""
                    )}
                  </Row>
                  <Row className="mt-1">
                    {this.state.showClientDetails.show_phone_in_invoice == 1 ? (
                      <>
                        <Col lg={6} className="text-left">
                          Phone
                        </Col>
                        <Col lg={6} className="text-left">
                          {this.state.showClientDetails.number}
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
                      Add New Client
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
    clientList: state.debitNotes.allClients,
  };
};

export default connect(mapStateToProps)(BillTo);
