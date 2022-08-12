import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Media,
  Table,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from "reactstrap";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Breadcrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import logo from "assets/img/logo/logo.png";
import { Mail, Phone, FileText, Download } from "react-feather";
import { fetchInvoiceInfo } from "redux/actions/invoice";
import "assets/scss/pages/invoice.scss";
import { connect } from "react-redux";

class Invoice extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const id = this.props.match.params.id;
    if (id && id != undefined) {
      this.props.fetchInvoiceInfo(id);
    }
  };

  downloadInvoicePdf(elementId) {
    const input = document.getElementById(elementId);
    html2canvas(input, { background: "rgba(0,0,0,0.5)" }).then((canvas) => {
      var imgWidth = 210;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    });
  }

  render() {
    const invoice = this.props.invoiceInfo;
    return (
      <React.Fragment>
        {/* <Breadcrumbs
          breadCrumbTitle="Invoice"
          breadCrumbParent="Pages"
          breadCrumbActive="Invoice"
        /> */}
        <Row>
          <Col className="mb-1 invoice-header" md="5" sm="12">
            {/* <InputGroup>
              <Input placeholder="Email" />
              <InputGroupAddon addonType="append">
                <Button.Ripple color="primary" outline>
                  Send Invoice
                </Button.Ripple>
              </InputGroupAddon>
            </InputGroup> */}
          </Col>
          <Col
            className="d-flex flex-column flex-md-row justify-content-end invoice-header mb-1"
            md="7"
            sm="12"
          >
            <Button
              className="mr-1 mb-md-0 mb-1"
              color="primary"
              onClick={() => window.print()}
            >
              <FileText size="15" />
              <span className="align-middle ml-50">Print</span>
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => this.downloadInvoicePdf("downLoadInvoice")}
            >
              <Download size="15" />
              <span className="align-middle ml-50">Download</span>
            </Button>
          </Col>
          {Object.keys(invoice).length > 0 ? (
            <Col className="invoice-wrapper" sm="12">
              <div id="downLoadInvoice">
                <Card className="invoice-page">
                  <CardBody>
                    <Row>
                      <Col md="6" sm="12" className="pt-1">
                        <Media className="pt-1">
                          <img src={logo} alt="logo" />
                        </Media>
                      </Col>
                      <Col md="6" sm="12" className="text-right">
                        <h1 className="textTransform">{invoice.invoice_type.split("_").join(" ")}</h1>
                        <div className="invoice-details mt-2 textTransform">
                          <h6>{invoice.invoice_type.split("_").join(" ")} No.</h6>
                          <p>{invoice.invoice_no}</p>
                          <h6 className="mt-2 textTransform">{invoice.invoice_type.split("_").join(" ")} Date</h6>
                          <p>{invoice.invoice_date}</p>
                          <h6 className="mt-2 textTransform">{invoice.invoice_type.split("_").join(" ")} Due</h6>
                          <p>{invoice.invoice_due}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row className="pt-2">
                      <Col md="6" sm="12">
                        <h5>Bill To</h5>
                        <div className="recipient-info my-2">
                          <p>{invoice.billed_to.street}</p>
                        </div>
                        <div className="recipient-contact pb-2">
                          {invoice.billed_to.show_email_in_invoice == 1 ? (
                            <p>
                              <Mail size={15} className="mr-50" />
                              {invoice.billed_to.email}
                            </p>
                          ) : (
                            ""
                          )}
                          {invoice.billed_to.show_number_in_invoice == 1 ? (
                            <p>
                              <Mail size={15} className="mr-50" />
                              {invoice.billed_to.number}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </Col>
                      <Col md="6" sm="12" className="text-right">
                        <h5>Bill By</h5>
                        <div className="company-info my-2">
                          <p>{invoice.billed_by.street}</p>
                        </div>
                        <div className="company-contact">
                          {invoice.billed_by.show_email_in_invoice == 1 ? (
                            <p>
                              <Mail size={15} className="mr-50" />
                              {invoice.billed_by.email}
                            </p>
                          ) : (
                            ""
                          )}
                          {invoice.billed_by.show_number_in_invoice == 1 ? (
                            <p>
                              <Mail size={15} className="mr-50" />
                              {invoice.billed_by.number}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </Col>
                    </Row>
                    <div className="invoice-items-table pt-1">
                      <Row>
                        <Col sm="12">
                          <Table responsive borderless>
                            <thead>
                              <tr>
                                <th>Item Details</th>
                                <th>VAT Rate</th>
                                <th>Quantity </th>
                                <th>Rate</th>
                                <th>Amount</th>
                                <th>VAT</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoice.items.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.vat_rate_percent}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.rate}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.vat}</td>
                                    <td>{item.total}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </div>
                    <div className="invoice-total-table">
                      <Row>
                        <Col
                          sm={{ size: 7, offset: 5 }}
                          xs={{ size: 7, offset: 5 }}
                        >
                          <Table responsive borderless>
                            <tbody>
                              <tr>
                                <th>Sub Amount</th>
                                <td>{invoice.total_amount}</td>
                              </tr>
                              <tr>
                                <th>Total VAT</th>
                                <td>{invoice.total_vat}</td>
                              </tr>
                              <tr>
                                <th>Additional Charge</th>
                                <td>{invoice.additional_charges}</td>
                              </tr>
                              <tr>
                                <th>Service Charge</th>
                                <td>{invoice.service_charges}</td>
                              </tr>
                              <tr>
                                <th>Levy Charge</th>
                                <td>{invoice.levy_charges}</td>
                              </tr>
                              <tr>
                                <th>Total</th>
                                <td>{invoice.final_amount}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          ) : null}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    invoiceInfo: state.invoice.invoiceInfo,
  };
};

export default connect(mapStateToProps, {
  fetchInvoiceInfo,
})(Invoice);
