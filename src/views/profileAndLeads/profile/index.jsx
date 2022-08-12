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
import { Edit, Trash, Lock, Check } from "react-feather";
import { Link } from "react-router-dom";
import Checkbox from "components/@custom/checkbox/CheckboxesAdvance";
import userImg from "assets/img/portrait/small/avatar-s-18.jpg";
import BusinessList from "./business/businessList";
import { connect } from "react-redux";
import "assets/scss/pages/users.scss";
class Profile extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <React.Fragment>
        {user ? (
          <React.Fragment>
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                  </CardHeader>
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
                                      Name
                                    </div>
                                    <div>{user.name}</div>
                                  </div>
                                  <div className="d-flex user-info">
                                    <div className="user-info-title font-weight-bold">
                                      Email
                                    </div>
                                    <div className="text-truncate">
                                      <span>{user.email}</span>
                                    </div>
                                  </div>
                                  <div className="d-flex user-info">
                                    <div className="user-info-title font-weight-bold">
                                      Phone
                                    </div>
                                    <div>{user.number}</div>
                                  </div>
                                </div>
                              </Col>
                              <Col md="12" lg="5">
                                <div className="users-page-view-table">
                                  <div className="d-flex user-info">
                                    <div className="user-info-title font-weight-bold">
                                      Address
                                    </div>
                                    <div>{user.address}</div>
                                  </div>
                                  <div className="d-flex user-info">
                                    <div className="user-info-title font-weight-bold">
                                      Date Of Birth
                                    </div>
                                    <div>{user.dob}</div>
                                  </div>
                                  <div className="d-flex user-info">
                                    <div className="user-info-title font-weight-bold">
                                      Date of Joining
                                    </div>
                                    <div>
                                      <span>{user.doj}</span>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Media>
                        </Media>
                      </Col>
                      <Col className="mt-1 pl-0" sm="12">
                        <Button.Ripple className="mr-1" color="primary" outline>
                          <Link to={`/editProfile/${user.id}`}>
                            <Edit size={15} />
                            <span className="align-middle ml-50">Edit</span>
                          </Link>
                        </Button.Ripple>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col sm="12" md="6">
                <Card>
                  <CardHeader>
                    <CardTitle>Information</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="users-page-view-table">
                      <div className="d-flex user-info">
                        <div className="user-info-title font-weight-bold">
                          Business GSTIN
                        </div>
                        <div>{user.business_gstin}</div>
                      </div>
                      <div className="d-flex user-info">
                        <div className="user-info-title font-weight-bold">
                          City
                        </div>
                        <div>{user.city}</div>
                      </div>
                      <div className="d-flex user-info">
                        <div className="user-info-title font-weight-bold">
                          Postal Code
                        </div>
                        <div className="text-truncate">
                          <span>{user.postal_code}</span>
                        </div>
                      </div>
                      <div className="d-flex user-info">
                        <div className="user-info-title font-weight-bold">
                          Street
                        </div>
                        <div className="text-truncate">
                          <span>{user.street}</span>
                        </div>
                      </div>
                      <div className="d-flex user-info">
                        <div className="user-info-title font-weight-bold">
                          GST State
                        </div>
                        <div className="text-truncate">
                          <span>{user.gst_state}</span>
                        </div>
                      </div>
                      <div className="d-flex user-info">
                        <div className="user-info-title font-weight-bold">
                          Business PAN
                        </div>
                        <div className="text-truncate">
                          <span>{user.business_pan}</span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" md="6">
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="users-page-view-table">
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Twitter
                      </div>
                      <div className="text-truncate">
                        <span>https://twitter.com/crystal</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Facebook
                      </div>
                      <div className="text-truncate">
                        <span>https://www.facebook.com/crystal</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Instagram
                      </div>
                      <div className="text-truncate">
                        <span>https://www.instagram.com/crystal</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Github
                      </div>
                      <div className="text-truncate">
                        <span>https://github.com/crystal</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        CodePen
                      </div>
                      <div className="text-truncate">
                        <span>https://codepen.io/crystal</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Slack
                      </div>
                      <div className="text-truncate">
                        <span>@crystal</span>
                      </div>
                    </div>
                  </div> 
                  </CardBody>
                </Card>
              </Col> */}
            </Row>
            <BusinessList />
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.login.user,
  };
};

export default connect(mapStateToProps)(Profile);
