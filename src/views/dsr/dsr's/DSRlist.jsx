
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
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";

export function DSRlist(props) {
  const [compnanys, setCompnanys] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercontries, setFiltercontries] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getContry = async (pageNumber) => {
    try {
     
      const res = await axios.get(`/api/dsr/getAll?page=${pageNumber}`);

      setCompnanys(res.data.dsr.data);
      setFiltercontries(res.data.dsr.data);
      setAllResponse(res.data.dsr);
      console.log(res.data.dsr.data)
     
    } catch (error) {
      console.log(error);
    }
  };
  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
      
      name: <b>DSR Number</b>,
      selector: (row) => "DSR- " +row.dsr_number,
      width: "200px",
    },
    {
      
      name: <b>Customer Type</b>,
      selector: (row) => row.customer_type,
      width: "200px",
    },
    {
      name: <b>Customer Name</b>,
      selector: (row) => row.customer_name,
      width: "190px",
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.email,
      width: "300px",
    },
    {
      name: <b>Phone</b>,
      selector: (row) => row.phone_number,
      width: "150px",
    },
  
    {
      name: <b>Currency</b>,
      selector: (row) => row.dsr_currency,
      width: "190px",
    },
    
    // {
    //   name: <b>Status</b>,
    //   selector: (row) => row.induvidual_permanent_country,
    //   width: "130px",
    // },
    
    {
      name:<b>Edit</b>,
      cell: (row) => (
        <Link to={`/dsr/edit/${row.dsr_number}`}>
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
      
      return company.customer_name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercontries(result);
  }, [search]);

  return (
           <React.Fragment>
            
         <BreadCrumbs
        breadCrumbTitle="DSR"
        breadCrumbParent="DSR"
        breadCrumbActive="DSR List"
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
<Col lg="4" >
<FormGroup>
<Link to="/dsr/add"><Button  color='primary mr-2'>+ Add DSR</Button> </Link>
</FormGroup>
</Col>
</Row>
             <Card>
              
               <CardBody>
               <CardHeader><CardTitle><h4>DSR List</h4></CardTitle></CardHeader>
                
               
             

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
          
          highlightOnHover
  
        />
      </div>
      </CardBody>
      </Card>
      </React.Fragment>
  );
}

export default DSRlist;
  

