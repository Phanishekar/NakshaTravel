import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Label,
  Row,
  Col,
  Spinner,
  Alert,
} from "reactstrap";
import Select from "react-select";
import { Plus, AlertCircle, Check } from "react-feather";
import Avatar from "components/@custom/avatar/AvatarComponent";
import { connect } from "react-redux";
import { updateData, addData, fetchLeadInfo } from "redux/actions/leads";
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import Input from "components/common/formBasic/input";
import TextArea from "components/common/formBasic/textarea";
import reactRouter from "react-router";
import { REACT_APP_API_URL } from "configs/index";
import avatarImg from "./../../../../assets/img/portrait/small/avatar-s-20.jpg";
import { toast } from "react-toastify";
import SpinnerComponent from "components/@custom/spinner/Fallback-spinner";

import axios from "axios";
import moment from "moment";

class LeadDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      btnLoading: false,
      inputComment: "",
      inputNote: "",
      lead: this.props.leadInfo,
      leadStatus: [],
      currentStatus: "",
    };
  }

  getValuesFn = (data) => {
    if (data.id == "comment") {
      this.setState({ inputComment: data.value });
    } else if (data.id == "note") {
      this.setState({ inputNote: data.value });
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id && id != undefined) {
      this.props.fetchLeadInfo(id);
      this.getAllLeadStatus();
    }
  }

  getAllLeadStatus() {
    axios
      .get(`${REACT_APP_API_URL}/leads/getLeadStatuses`)
      .then((response) => {
        if (response.data.status == 1) {
          let formatLeadStatus = response.data.data.map((item) => ({
            label: item.name,
            value: item.value,
          }));
          this.setState({ leadStatus: formatLeadStatus });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.leadInfo).length) {
      if (
        props.leadInfo !== state.lead ||
        props.leadInfo.lead_comments.length !==
          state.lead.lead_comments.length ||
        props.leadInfo.lead_notes.length !== state.lead.lead_notes.length
      ) {
        return {
          lead: props.leadInfo,
          currentStatus: props.leadInfo.status,
        };
      }
    }

    // Return null if the state hasn't changed
    return null;
  }

  handleStatusChange = (e) => {
    this.setState({ loading: true });
    const id = this.props.match.params.id;
    if (id && id != undefined) {
      let data = { id: id, status: e.value };
      axios
        .post(`${REACT_APP_API_URL}/leads/changeLeadStatus`, data)
        .then((response) => {
          if (response.data.status == 1) {
            this.props.fetchLeadInfo(id);
            this.setState({ currentStatus: e.value });
            this.setState({ loading: false });
            toast.success("Status changed successfully");
          } else {
            toast.error(response.data.message);
            this.setState({ loading: false });
          }
        })
        .catch((error) => {
          toast.error("something went wrong");
          this.setState({ loading: false });
        });
    }
  };

  submitFn = (type) => {
    let id = this.props.match.params.id;
    if (type == "comment") {
      if (this.state.inputComment.length > 0) {
        let data = {
          lead_id: id,
          comment: this.state.inputComment,
        };
        axios
          .post(`${REACT_APP_API_URL}/leads/comment/save`, data)
          .then((response) => {
            if (response.data.status == 1) {
              this.props.fetchLeadInfo(id);
              this.setState({ inputComment: "" });
              toast.success("Comment added successfully");
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            toast.error("something went wrong");
          });
      } else {
        toast.error("Please add some comment!");
      }
    } else if (type == "note") {
      if (this.state.inputNote.length > 0) {
        let data = {
          lead_id: id,
          note: this.state.inputNote,
        };
        axios
          .post(`${REACT_APP_API_URL}/leads/note/save`, data)
          .then((response) => {
            if (response.data.status == 1) {
              this.props.fetchLeadInfo(id);
              this.setState({ inputNote: "" });
              toast.success("Note added successfully");
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            toast.error("something went wrong");
          });
      } else {
        toast.error("Please add some note!");
      }
    } else {
      return;
    }
  };

  render() {
    console.log(this.state.currentStatus);
    const { loading, lead, btnLoading, leadStatus, currentStatus } = this.state;
    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle="My Business"
          breadCrumbParent="Profile & Leads"
          breadCrumbActive="Leads"
        />
        {Object.keys(lead).length > 0 ? (
          <Row>
            <Col lg={6} md={6}>
              <Card>
                <CardHeader>
                  <CardTitle>Lead Status</CardTitle>
                  <CardTitle>
                    <FormGroup className="width-150 mr-2">
                      <Label for="country_id" className="font-small-3">
                        Change Status
                      </Label>
                      <Select
                        className="React font-small-2"
                        classNamePrefix="select"
                        defaultValue={leadStatus.find(
                          (status) => status.value == lead.status
                        )}
                        name="color"
                        onChange={(e) => this.handleStatusChange(e)}
                        options={leadStatus}
                      />
                    </FormGroup>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <ul className="activity-timeline timeline-left list-unstyled">
                      <li>
                        {currentStatus == 1 ? (
                          <div className="timeline-icon bg-success">
                            <Check size={16} />
                          </div>
                        ) : (
                          <div className="timeline-icon bg-primary">
                            <AlertCircle size={16} />
                          </div>
                        )}
                        <div className="timeline-info">
                          <p className="font-weight-bold mb-0">Open</p>
                        </div>
                        <small className="text-muted">Lead has Created</small>
                      </li>
                      <li>
                        {currentStatus == 2 ? (
                          <div className="timeline-icon bg-success">
                            <Check size={16} />
                          </div>
                        ) : (
                          <div className="timeline-icon bg-primary">
                            <AlertCircle size={16} />
                          </div>
                        )}
                        <div className="timeline-info">
                          <p className="font-weight-bold mb-0">Done</p>
                        </div>
                        <small className="text-muted">Lead has Processed</small>
                      </li>
                      <li>
                        {currentStatus == 3 ? (
                          <div className="timeline-icon bg-success">
                            <Check size={16} />
                          </div>
                        ) : (
                          <div className="timeline-icon bg-primary">
                            <AlertCircle size={16} />
                          </div>
                        )}
                        <div className="timeline-info">
                          <p className="font-weight-bold mb-0">Lost</p>
                        </div>
                        <small className="text-muted">Lead has Losted</small>
                      </li>
                      <li>
                        {currentStatus == 4 ? (
                          <div className="timeline-icon bg-success">
                            <Check size={16} />
                          </div>
                        ) : (
                          <div className="timeline-icon bg-primary">
                            <AlertCircle size={16} />
                          </div>
                        )}
                        <div className="timeline-info">
                          <p className="font-weight-bold mb-0">
                            Not Serviceable
                          </p>
                        </div>
                        <small className="text-muted">
                          Lead has missing data
                        </small>
                      </li>
                    </ul>
                  )}
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Row className="full-width">
                    <Col lg={6} md={6}>
                      <div className="text-left h3">Lead Information</div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="text-right font-small-2">
                        Created on{" "}
                        {moment(lead.created_at).format(
                          "ddd, MMM Do YYYY, h:mm a"
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="full-width mt-4">
                    <Col lg={6} md={6}>
                      <div className="text-left h4">Subject</div>
                      <div className="text-left">{lead.subject}</div>
                    </Col>
                  </Row>
                  <Row className="full-width mt-4">
                    <Col lg={6} md={6}>
                      <div className="text-left h4">Description</div>
                      <div className="text-left">{lead.message}</div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} md={6}>
              <Card>
                <CardBody>
                  <Row className="full-width">
                    <Col lg={6} md={6}>
                      <div className="text-left h3">Lead Comments</div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="text-right font-small-2">
                        Last Comment on:{" "}
                        {moment(lead.created_at).format(
                          "ddd, MMM Do YYYY, h:mm a"
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="full-width height-300 mt-2 overflow-auto">
                    <Col lg={6} md={6}></Col>
                    <Col lg={6} md={6}>
                      {lead.lead_comments.map((comment) => (
                        <>
                          <div className="text-left h6" key={comment.id}>
                            {lead.contact_name} (You)
                          </div>
                          <Alert color="primary" className="text-left">
                            {comment.comment}
                          </Alert>
                        </>
                      ))}
                    </Col>
                  </Row>
                  <Row className="full-width mt-4">
                    <form className="full-width">
                      <Row className="full-width">
                        <Col lg="10" md="10">
                          <FormGroup className="my-1">
                            <TextArea
                              name="comment"
                              value={this.state.inputComment}
                              placeholder="Send a reply"
                              row={3}
                              limit={30}
                              getValuesFn={this.getValuesFn}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2" md="2">
                          {btnLoading ? (
                            <div className="d-inline-block mr-1 mb-1">
                              <Button.Ripple color="primary" type="button">
                                <Spinner color="white" size="sm" />
                                <span className="ml-50">Loading...</span>
                              </Button.Ripple>
                            </div>
                          ) : (
                            <Button.Ripple
                              color="primary mt-1"
                              type="button"
                              onClick={() => this.submitFn("comment")}
                            >
                              Send
                            </Button.Ripple>
                          )}
                        </Col>
                      </Row>
                    </form>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} md={6}>
              <Card>
                <CardBody>
                  <Row className="full-width">
                    <Col lg={6} md={6}>
                      <div className="text-left h3">Lead Details</div>
                    </Col>
                  </Row>
                  <Row className="full-width mt-4">
                    <Col lg={2} md={2}>
                      <Avatar className="mr-1" img={avatarImg} size="xl" />
                    </Col>
                    <Col lg={6} md={6} className="pt-1 ml-2">
                      <div className="text-left h4">{lead.contact_name}</div>
                      <div className="text-left">{lead.designation}</div>
                    </Col>
                  </Row>
                  <Row className="full-width mt-4">
                    <Col lg={4} md={4}>
                      <div className="text-left h4">Organisation Name</div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="text-left">{lead.org_name}</div>
                    </Col>
                  </Row>
                  <Row className="full-width mt-2">
                    <Col lg={4} md={4}>
                      <div className="text-left h4">Designation</div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="text-left">{lead.designation}</div>
                    </Col>
                  </Row>
                  <Row className="full-width mt-2">
                    <Col lg={4} md={4}>
                      <div className="text-left h4">Email</div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="text-left">{lead.email}</div>
                    </Col>
                  </Row>
                  <Row className="full-width mt-2">
                    <Col lg={4} md={4}>
                      <div className="text-left h4">Phone</div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="text-left">{lead.number}</div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} md={6}>
              <Card>
                <CardBody>
                  <Row className="full-width">
                    <Col lg={6} md={6}>
                      <div className="text-left h3">Lead Notes</div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="text-right font-small-2">
                        Last Note on:{" "}
                        {moment(lead.created_at).format(
                          "ddd, MMM Do YYYY, h:mm a"
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="full-width height-300 mt-2 overflow-auto">
                    <Col lg={6} md={6}></Col>
                    <Col lg={6} md={6}>
                      {lead.lead_notes.map((note) => (
                        <>
                          <div className="text-left h6" key={note.id}>
                            {lead.contact_name} (You)
                          </div>
                          <Alert color="primary" className="text-left">
                            {note.note}
                          </Alert>
                        </>
                      ))}
                    </Col>
                  </Row>
                  <Row className="full-width mt-4">
                    <form className="full-width">
                      <Row className="full-width">
                        <Col lg="10" md="10">
                          <FormGroup className="my-1">
                            <TextArea
                              name="note"
                              value={this.state.inputNote}
                              placeholder="Send a reply"
                              row={3}
                              limit={30}
                              getValuesFn={this.getValuesFn}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2" md="2">
                          {btnLoading ? (
                            <div className="d-inline-block mr-1 mb-1">
                              <Button.Ripple color="primary" type="button">
                                <Spinner color="white" size="sm" />
                                <span className="ml-50">Loading...</span>
                              </Button.Ripple>
                            </div>
                          ) : (
                            <Button.Ripple
                              color="primary mt-1"
                              type="button"
                              onClick={() => this.submitFn("note")}
                            >
                              Send
                            </Button.Ripple>
                          )}
                        </Col>
                      </Row>
                    </form>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <SpinnerComponent />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    leadInfo: state.lead.leadInfo,
  };
};

export default connect(mapStateToProps, {
  updateData,
  addData,
  fetchLeadInfo,
})(LeadDetail);
