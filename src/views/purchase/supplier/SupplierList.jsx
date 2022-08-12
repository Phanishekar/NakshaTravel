// import React, { Component } from 'react';
// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardBody,
//     FormGroup,
//     Button,
//     Label,
//     Row,
//     Col,
//     Spinner,
//     Input,
//     Table
//   } from "reactstrap";
//   import { NavLink,Link,useParams } from "react-router-dom";
//   import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
//   import { toast } from "react-toastify";
//   import axios from "axios";
//   import { Select } from 'evergreen-ui'
//   import Pagination from 'react-js-pagination';
//   import * as Icon from "react-feather";

// export default class SupplierList extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {

//           ledger:[],
//           customer:"",
//           loading:true,
//           users:'',
//           loading:true,
//           user:[],
//           total:'',
//         };

//       }

//       async componentDidMount() {
//         this.getUserData(1)
//       }

//       async getUserData(pageNumber) {
//         let id=0;
//         const suppliers= await axios.get(`/api/purchases/supplier/getAll?page=${pageNumber}`);

//         console.log(suppliers.data);

//         if(suppliers.data.status==200)
//         {
//           this.setState(
//             {
//               ledger:suppliers.data.supplier,
//               users:suppliers.data.supplier,
//               user:suppliers.data.supplier.data,
//               loading:false,
//               total:suppliers.data.supplier.total,
//             })
//         }

//         console.log(suppliers.data.supplier.data);
//       }

//       render() {
//         const {current_page,per_page,total} = this.state.users;
//         console.log(current_page,per_page,total);
//           var user_HTML_TABLE="";
//         if(this.state.loading)
//         {
//           user_HTML_TABLE= <tr><td colSpan="5"><h2>Loading....</h2></td></tr>;
//         }

//         else if(this.state.total==0)
//         {
//             user_HTML_TABLE= <tr><td colSpan="6"><h4>No Record Found</h4></td></tr>;
//         }

//         else
//         {
//           user_HTML_TABLE=
//           this.state.user.map( (item) =>{
//             return(
//     <tr className='mt-5 mb-5' key={item.supplier_id}>
//                         <td>{item.supplier_company_name}</td>
//                 <td>{item.supplier_email}</td>
//                 <td>{item.supplier_phone_number}</td>
//                 <td>{item.supplier_city}</td>
//                 <td>{item.supplier_country}</td>

//                 <td>
//                     <Link to={`/purchase/supplier/edit/${item.supplier_id}`}>
//                     <Icon.Edit size={20} ></Icon.Edit>
//                     </Link>

//                 </td>
//               </tr>

//             )
//           })
//         }

//     return (<React.Fragment>
//         <BreadCrumbs
//           breadCrumbTitle= "Purchases"
//           breadCrumbParent="Supplier"
//           breadCrumbActive= "Supplier List"
//         />
//     <Row>
// <Col lg="6" >
// <FormGroup>
// <Input name="name"
// type='text'
// placeholder='Search By Supplier Name'
//  >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Link to={`/purchase/supplier/add`}><Button  color='primary mr-2'>+ ADD Supplier</Button> </Link>
// </FormGroup>
// </Col>
// </Row>
//           <Card>
//           <CardHeader>{this.state.company_name} Suppliers List</CardHeader>
//           <CardBody>

//                     <Table striped >
//               <thead>
//                 <tr id='tablelist' >
//                       <th>Supplier Name</th>
//                       <th>Email</th>
//                       <th>Phone</th>
//                       <th>City</th>
//                       <th>Country</th>
//                       <th>Edit</th>
//                   </tr>
//               </thead>
//               <tbody className='mt-5' >
//                 {user_HTML_TABLE}
//                 <br></br><br></br>
//                 <Pagination
// activePage={current_page}
// totalItemsCount={total}
// itemsCountPerPage={per_page}
// onChange={(pageNumber)=>this.getUserData(pageNumber)}
// className="pagination"
// itemClass="page-item"
// linkClass="page-link"
// firstPageText="First"
// lastPageText="Last"
// />
//               </tbody>

//           </Table>
//           </CardBody>
//         </Card>

//       </React.Fragment>
//       );
//   }
// }


/*
import "assets/scss/pages/data-list.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as Icon from "react-feather";
import { NavLink, Link, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import {
  Button,
  Progress,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Col,
  Table,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  FormGroup,
} from "reactstrap";

export function SupplierList(props) {
  const [suppliercompany, setsuplliercompany] = useState([]);
  const [search, setSearch] = useState("");
  const [filtersupplier, setFilterSupplier] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getContry = async (pageNumber) => {
    try {
      const res = await axios.get(
        `/api/purchases/supplier/getAll?page=${pageNumber}`
      );

      setsuplliercompany(res.data.supplier.data);
      setFilterSupplier(res.data.supplier.data);
      setAllResponse(res.data.supplier);
      console.log(res.data.supplier.data);
    } catch (error) {
      console.log(error);
    }
  };
  const { data, current_page, per_page, total } = allResponse;
  const columns = [
    {
      name: <b>supplier Company</b>,
      selector: (row) => row.supplier_company_name,
      sortable: false,
      width: "200px",
    },
    {
      name: <b>Supplier Name</b>,
      selector: (row) => row.supplier_alias_name,
      sortable: true,
      width: "200px",
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.supplier_email,
      sortable: true,
      width: "350px",
    },
    {
      name: <b>Phone</b>,
      selector: (row) => row.supplier_phone_number,
      sortable: true,
      width: "200px",
    },
    {
      name: <b>City</b>,
      selector: (row) => row.supplier_city,
      sortable: false,
      width: "200px",
    },
    {
      name: <b>Country</b>,
      selector: (row) => row.supplier_country,
      sortable: false,
      width: "200px",
    },

    {
      name: <b>Edit</b>,
      sortable: false,
      width: "200px",
      cell: (row) => (
        <Link to={`/purchase/supplier/edit/${row.supplier_id}`}>
          <Icon.Edit size={20}></Icon.Edit>
        </Link>
      ),
    },
  ];
  useEffect(() => {
    getContry(1);
  }, []);

  useEffect(() => {
    const result = suppliercompany.filter((company) => {
      return company.supplier_company_name
        .toLowerCase()
        .match(search.toLowerCase());
    });
    setFilterSupplier(result);
  }, [search]);

  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Purchase"
        breadCrumbParent="supplier "
        breadCrumbActive="Supplier List"
      />

      <Row>
        <Col lg="6">
          <Input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col lg="4">
          <FormGroup>
            <Link to={`/purchase/supplier/add`}>
              <Button color="primary mr-2">+ ADD Supplier</Button>
            </Link>
          </FormGroup>
        </Col>
      </Row>
      <Card>
        <CardBody>
          <CardHeader>
            <CardTitle>
              <h4>Supplier List</h4>
            </CardTitle>
          </CardHeader>

          <div className="data-list list-view">
            <DataTable
              noHeader
              // title="Country List"
              columns={columns}
              data={filtersupplier}
              breakLabel="..."
              breakClassName="break-me"
              pagination
              paginationServer
              paginationComponent={() => (
                <div
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Pagination
                    activePage={current_page}
                    totalItemsCount={total}
                    itemsCountPerPage={per_page}
                    onChange={(pageNumber) => getContry(pageNumber)}
                    className="pagination"
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                  />
                </div>
              )}
              responsive
              fixedHeader
              fixedHeaderScrollHeight="100px"
            />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}
export default SupplierList;
*/


import "assets/scss/pages/data-list.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as Icon from "react-feather";
import { NavLink, Link, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import {
  Button,
  Progress,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Col,
  Table,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  FormGroup,
} from "reactstrap";

export function SupplierList(props) {
  const [suppliercompany, setsuplliercompany] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSupplier, setFilterSupplier] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getContry = async (pageNumber) => {
    try {
      const res = await axios.get(
        `/api/purchases/supplier/getAll?page=${pageNumber}`
      );

      setsuplliercompany(res.data.supplier.data);           
      setFilterSupplier(res.data.supplier.data);
      setAllResponse(res.data.supplier);
      console.log(res.data.supplier.data);
    } catch (error) {
      console.log(error);
    }
  };
  const { data, current_page, per_page, total } = allResponse;
  const columns = [
    {
      name: <b>supplier</b>,
      selector: (row) => row.supplier_company_name,
      sortable: true,
      width: "250px",
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.supplier_email,
      sortable: true,
      width: "300px",
    },
    {
      name: <b>Phone</b>,
      selector: (row) => row.supplier_phone_number,
      width: "250px",
    },
    {
      name: <b>City</b>,
      selector: (row) => row.supplier_city,
      width: "250px",
    },
 
    {
      name: <b>Edit</b>,
      width: "250px",
      cell: (row) => (
        <Link to={`/purchase/supplier/edit/${row.supplier_id}`}>
          <Icon.Edit size={20}></Icon.Edit>
        </Link>
      ),
    },
  ];
  useEffect(() => {
    getContry(1);
  },[]);

  useEffect(() => {
    const result = suppliercompany.filter((company) => {
      console.log(company.supplier_company_name);
      return company.supplier_company_name.toLowerCase().match(search.toLowerCase());
    })
    setFilterSupplier(result);
  }, [search]);

  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Purchase"
        breadCrumbParent="supplier "
        breadCrumbActive="Supplier List"
      />

<Row>
            <Col lg="6">
              <Input
                type="text"
                placeholder="Search here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col lg="4">
              <FormGroup>
                <Link to={`/purchase/supplier/add`}>
                  <Button color="primary mr-2">+ ADD Supplier</Button>
                </Link>
              </FormGroup>
            </Col>
          </Row>
      <Card>
        {/* <CardHeader>
          <CardTitle>
            <h4>Supplier List</h4>
          </CardTitle>
        </CardHeader> */}
        <CardBody>

          <div className="data-list list-view">
            <DataTable
              // noHeader
              title="Supplier List"
              columns={columns}
              data={filterSupplier}
              pagination
              paginationServer
              paginationComponent={() => (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "40px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Pagination
                    activePage={current_page}
                    totalItemsCount={total}
                    itemsCountPerPage={per_page}
                    onChange={(pageNumber) => getContry(pageNumber)}
                    className="pagination"
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                  />
                </div>
              )}
              responsive
              fixedHeader
              fixedHeaderScrollHeight="440px"
              highlightOnHover
              // subHeader
              // subHeaderComponent={
              //   <Input
              //     type="text"
              //     placeholder="Search here"
              //     value={search}
              //     onChange={(e) => setSearch(e.target.value)}
              //   />
              // }
            />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default SupplierList;