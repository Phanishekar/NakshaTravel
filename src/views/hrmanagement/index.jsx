// import React from "react";
// import { Row, Col } from "reactstrap";
// import Breadcrumbs from "components/@custom/breadCrumbs/BreadCrumb";
// import EmployeesList from "./EmployeesList";
// import queryString from "query-string";
// class Employees extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <Breadcrumbs
//           breadCrumbTitle="Employees"
//           breadCrumbParent="Profile & Employees"
//           breadCrumbActive="Employees"
//         />
//         <Row>
//           <Col sm="12">
//             <EmployeesList
//               parsedFilter={queryString.parse(this.props.location.search)}
//             />
//           </Col>
//         </Row>
//       </React.Fragment>
//     );
//   }
// }

// export default Employees;
import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import EmployeesList from "./EmployeesList";
import queryString from "query-string";
class Employees extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Employees"
          breadCrumbParent="Profile & Employees"
          breadCrumbActive="Employees"
        />
        <Row>
          <Col sm="12">
            <EmployeesList
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Employees;