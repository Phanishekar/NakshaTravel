import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import "assets/scss/plugins/extensions/recharts.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

let $primary = "#7367F0",
  $success = "#28C76F",
  $info = "#00cfe8",
  $warning = "#FF9F43",
  $danger = "#EA5455",
  colors = [$primary, $success, $info, $warning, $danger];

const data = [
  {
    name: "Jan 2021",
    Invoice_Amount: 4000,
    Payment_Received: 2400,
    amt: 2400,
  },
  {
    name: "Feb 2021",
    Invoice_Amount: 3000,
    Payment_Received: 1398,
    amt: 2210,
  },
  {
    name: "March 2021",
    Invoice_Amount: 2000,
    Payment_Received: 9800,
    amt: 2290,
  },
  {
    name: "April 2021",
    Invoice_Amount: 2780,
    Payment_Received: 3908,
    amt: 2000,
  },
  {
    name: "May 2021",
    Invoice_Amount: 1890,
    Payment_Received: 4800,
    amt: 2181,
  },
  {
    name: "June 2021",
    Invoice_Amount: 2390,
    Payment_Received: 3800,
    amt: 2500,
  },
  {
    name: "July 2021",
    Invoice_Amount: 3490,
    Payment_Received: 4300,
    amt: 2100,
  },
];

class InvoiceChart extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invoice Graph</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="recharts-wrapper">
            <ResponsiveContainer>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Payment_Received"
                  stroke={$primary}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="Invoice_Amount"
                  stroke={$success}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default InvoiceChart;
