import React from "react";
import { Row, Col } from "reactstrap";
import StatisticsCard from "components/@custom/statisticsCard/StatisticsCard";
import {
  FileText,
  FilePlus,
  FileMinus,
  Heart,
  Smile,
  Truck,
} from "react-feather";
import { connect } from "react-redux";
import { getInvoiceDashboardData } from "redux/actions/paymentReceipts";

class InvoiceLiFeTimeData extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.props.getInvoiceDashboardData();
  };
  render() {
    let data = this.props.InvoiceLiFeTimeData.invoiceDashboardData;
    return (
      <React.Fragment>
        {data ? (
          <Row>
            <Col lg="3" sm="6">
              <StatisticsCard
                hideChart
                iconRight
                iconBg="primary"
                icon={<FileText className="primary" size={22} />}
                stat={data.total_invoices}
                statTitle="Total Payment Receipt"
              />
            </Col>
            {/* <Col lg="3" sm="6">
              <StatisticsCard
                hideChart
                iconRight
                iconBg="success"
                icon={<FilePlus className="success" size={22} />}
                stat={data.payment_due}
                statTitle="Payment Due"
              />
            </Col>
            <Col lg="3" sm="6">
              <StatisticsCard
                hideChart
                iconRight
                iconBg="danger"
                icon={<FileMinus className="danger" size={22} />}
                stat={data.overdue_invoices}
                statTitle="Overdue Invoices"
              />
            </Col>
            <Col lg="3" sm="6">
              <StatisticsCard
                hideChart
                iconRight
                iconBg="warning"
                icon={<Truck className="warning" size={22} />}
                stat={data.payment_received}
                statTitle="Payment Recieved"
              />
            </Col>
            <Col lg="3" sm="6">
              <StatisticsCard
                hideChart
                iconRight
                iconBg="warning"
                icon={<Heart className="warning" size={22} />}
                stat={data.pending_invoices}
                statTitle="Pending Invoices"
              />
            </Col>
            <Col lg="3" sm="6">
              <StatisticsCard
                hideChart
                iconRight
                iconBg="warning"
                icon={<Smile className="warning" size={22} />}
                stat={data.paid_invoices}
                statTitle="Paid Invoices"
              />
            </Col>
            <Col lg="3" sm="6">
              <StatisticsCard
                hideChart
                iconRight
                iconBg="warning"
                icon={<FileText className="success" size={22} />}
                stat={data.cancelled_invoices}
                statTitle="Cancelled Invoices"
              />
            </Col> */}
          </Row>
        ) : null}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    InvoiceLiFeTimeData: state.paymentReceipts,
  };
};
export default connect(mapStateToProps, {
  getInvoiceDashboardData,
})(InvoiceLiFeTimeData);
