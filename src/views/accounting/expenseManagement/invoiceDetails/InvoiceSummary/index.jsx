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
import { getData } from "redux/actions/expenseManagement";

class InvoiceSummary extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getData(this.props.parsedFilter);
  }
  render() {
    let data = this.props.InvoiceSummary.data_summary;
    return (
      <React.Fragment>
        {data ? (
          <Row>
            <Col md={2}>
              <StatisticsCard
                hideChart
                iconBg="primary"
                icon={<FileText className="primary" size={22} />}
                stat={data.total_invoices}
                statTitle="Expenditures"
              />
            </Col>
            <Col md={2}>
              <StatisticsCard
                hideChart
                iconBg="success"
                icon={<FilePlus className="success" size={22} />}
                stat={data.paid_invoices}
                statTitle="Expense Amount"
              />
            </Col>
            {/* <Col md={2}>
              <StatisticsCard
                hideChart
                iconBg="warning"
                icon={<FileMinus className="warning" size={22} />}
                stat={data.pending_invoices}
                statTitle="Pending Invoices"
              />
            </Col>
            <Col md={2}>
              <StatisticsCard
                hideChart
                iconBg="danger"
                icon={<Heart className="danger" size={22} />}
                stat={data.overdue_invoices}
                statTitle="Overdue Invoices"
              />
            </Col>
            <Col md={2}>
              <StatisticsCard
                hideChart
                iconBg="success"
                icon={<Smile className="success" size={22} />}
                stat={data.cancelled_invoices}
                statTitle="Cancelled Invoices"
              />
            </Col>

            <Col md={2}>
              <StatisticsCard
                hideChart
                iconBg="warning"
                icon={<Truck className="warning" size={22} />}
                stat={data.payment_due}
                statTitle="Payment Due"
              />
            </Col>
            <Col md={2} className="mt-1">
              <StatisticsCard
                hideChart
                iconBg="warning"
                icon={<FileText className="success" size={22} />}
                stat={data.payment_received}
                statTitle="Payment Recieved"
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
    InvoiceSummary: state.expenseManagement,
  };
};

export default connect(mapStateToProps, {
  getData,
})(InvoiceSummary);
