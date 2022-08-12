import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  Row,
  Col,
  Button,
  Table,
} from "reactstrap";
import { Edit, Trash, Lock, Check, Plus } from "react-feather";
import { Link } from "react-router-dom";
import Checkbox from "components/@custom/checkbox/CheckboxesAdvance";
import userImg from "assets/img/portrait/small/avatar-s-18.jpg";
import { getBusinessData } from "redux/actions/business";
import { connect } from "react-redux";
import "assets/scss/pages/users.scss";
import AddUpdateBusiness from "./addUpdateBusiness";

class BusinessList extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalOpen: false,
    newFormOpen: false,
    editId: null,
  };

  openAndCloseModal = (id) => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      newFormOpen: false,
      editId: id,
    });
  };
  openAndCloseModalNew = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      newFormOpen: true,
      editId: null,
    });
  };

  componentDidMount() {
    this.props.getBusinessData();
  }
  render() {
    const businesses = this.props.business;
    return (
      <React.Fragment>
        <AddUpdateBusiness
          openClose={this.openAndCloseModal}
          open={this.state.modalOpen}
          createNewFormOpen={this.state.newFormOpen}
          key={this.state.modalOpen}
          id={this.state.editId}
        />
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle className="mb-2">Business List</CardTitle>
                <CardTitle className="mb-2">
                  <Button
                    className="add-new-btn"
                    color="primary"
                    outline
                    onClick={this.openAndCloseModalNew}
                  >
                    <Plus size={15} />
                    <span className="align-middle">Add New</span>
                  </Button>
                </CardTitle>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        {businesses.length > 0
          ? businesses.map((business) => (
              <Row key={business.id}>
                <Col sm="12">
                  <Card>
                    <CardBody>
                      <Row className="mx-0" col="12">
                        <Col className="pl-0" sm="12">
                          <Media className="d-sm-flex d-block">
                            <Media className="mt-md-1 mt-0" left>
                              {/* <Media
                                className="rounded mr-2"
                                object
                                src={userImg}
                                alt="Generic placeholder image"
                                height="112"
                                width="112"
                              /> */}
                            </Media>
                            <Media body>
                              <Row>
                                <Col sm="9" md="6" lg="5">
                                  <div className="users-page-view-table">
                                    <div className="d-flex user-info">
                                      <div className="user-info-title font-weight-bold">
                                        Business Name
                                      </div>
                                      <div>{business.business_name}</div>
                                    </div>
                                    <div className="d-flex user-info">
                                      <div className="user-info-title font-weight-bold">
                                        Business Email
                                      </div>
                                      <div className="text-truncate">
                                        <span>{business.email}</span>
                                      </div>
                                    </div>
                                    <div className="d-flex user-info">
                                      <div className="user-info-title font-weight-bold">
                                        Phone
                                      </div>
                                      <div>{business.number}</div>
                                    </div>
                                    <div className="d-flex user-info">
                                      <div className="user-info-title font-weight-bold">
                                        Business PAN
                                      </div>
                                      <div>{business.business_pan}</div>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="12" lg="5">
                                  <div className="users-page-view-table">
                                    <div className="d-flex user-info">
                                      <div className="user-info-title font-weight-bold">
                                        Business Alias
                                      </div>
                                      <div>{business.business_alias}</div>
                                    </div>
                                    <div className="d-flex user-info">
                                      <div className="user-info-title font-weight-bold">
                                        Address
                                      </div>
                                      <div>
                                        {business.street +
                                          " " +
                                          business.city +
                                          " " +
                                          business.postal_code +
                                          " " +
                                          business.country.name}
                                      </div>
                                    </div>
                                    <div className="d-flex user-info">
                                      <div className="user-info-title font-weight-bold">
                                        Business GSTIN
                                      </div>
                                      <div>
                                        <span>{business.business_gstin}</span>
                                      </div>
                                    </div>
                                    <div className="d-flex user-info">
                                      <div className="user-info-title font-weight-bold">
                                        GST State
                                      </div>
                                      <div>
                                        <span>{business.gst_state.name}</span>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Media>
                          </Media>
                        </Col>
                        <Col className="mt-1 pl-0" sm="12">
                          <Button.Ripple
                            className="mr-1"
                            color="primary"
                            outline
                            onClick={() => {
                              this.openAndCloseModal(business.id);
                            }}
                          >
                            <Edit size={15} />
                            <span className="align-middle ml-50">Edit</span>
                          </Button.Ripple>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ))
          : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    business: state.business.data,
  };
};

export default connect(mapStateToProps, { getBusinessData })(BusinessList);
