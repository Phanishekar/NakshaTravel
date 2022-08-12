

import "assets/scss/pages/data-list.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as Icon from "react-feather";
import { NavLink, Link, useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';

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

export function EmployeeList(props) {
  const [compnanys, setCompnanys] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercontries, setFiltercontries] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getContry = async (pageNumber) => {
    try {
      
      const res = await axios.get(`/api/corporatecustomer/getEmployee/${props.id}?page=${pageNumber}`);

      setCompnanys(res.data.customer.data);
      setFiltercontries(res.data.customer.data);
      setAllResponse(res.data.customer);
      console.log(res.data.customer.data)
     
    } catch (error) {
      console.log(error);
    }
  };
  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
      name: <b>Employee Name</b>,
      selector: (row) => row.individual_name,
      width: "200px",
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.individual_email,
      width: "300px",
    },
    {
      name: <b>Phone</b>,
      selector: (row) => row.individual_phone_number,
      width: "200px",
    },
    {
      name: <b>City</b>,
      selector: (row) => row.individual_residential_city,
      width: "150px",
    },
    {
      name: <b>Country</b>,
      selector: (row) => row.individual_residential_country,
      width: "150px",
    },
    
    {
      name:<b>Edit</b>,
      cell: (row) => (
        <Link to={`/customer/corporate/editemployee/${row.individual_customer_id}`}>
          <Icon.Edit size={20}></Icon.Edit>
        </Link>
      ),
    },
  ];
  useEffect(() => {
    getContry(1);
  }, []);

  useEffect(() => {
    const result = compnanys.filter((company) => {
      
      return company.individual_name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercontries(result);
  }, [search]);

  return (
           <React.Fragment>
             <Card>
               <CardHeader><CardTitle> {props.faname} Employee List</CardTitle></CardHeader>
               <CardBody>
               
                 <Row>

                   <Col lg="6">
               <Input
              type="text"
              placeholder="Search here"
             
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            </Col>
            <Col lg="4" >
<FormGroup>
<Link to={`/customer/corporate/addemployee/${props.id}`}><Button  color='primary mr-2'>+ Add Employee</Button> </Link>
</FormGroup>
</Col>
            </Row>
    <div className="data-list list-view">  

        <DataTable
          noHeader
          // title="Country List"
          columns={columns}
          data={filtercontries}
          pagination
                  paginationServer
              
                  paginationComponent={() => (
                   
                    <div style={{padding:"20px", display: "flex", justifyContent: "flex-end" }}>
                       
            
                  <Pagination 
          activePage={current_page}
          totalItemsCount={total}
          itemsCountPerPage={per_page}
          onChange={(pageNumber)=>getContry(pageNumber)}
          className="pagination"
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"
          
          /></div>)}
            responsive
          fixedHeader
          fixedHeaderScrollHeight="500px"
          highlightOnHover
  
        />
      </div>
      </CardBody>
      </Card>
      </React.Fragment>
  );
}

export default EmployeeList;
