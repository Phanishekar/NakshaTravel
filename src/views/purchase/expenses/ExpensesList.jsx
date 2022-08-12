
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

export function ExpensesList(props) {
  const [compnanys, setCompnanys] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercontries, setFiltercontries] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getContry = async (pageNumber) => {
    try {
     
      const res = await axios.get(`api/purchases/expence/getAll?page=${pageNumber}`);

      setCompnanys(res.data.Expenses.data);
      setFiltercontries(res.data.Expenses.data);
      setAllResponse(res.data.Expenses);
      console.log(res.data.Expenses.data)
     
    } catch (error) {
      console.log(error);
    }
  };
  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
      
      name: <b>Date</b>,
      selector: (row) => row.date,
      width: "200px",
    },
    {
      
      name: <b>Purpose</b>,
      selector: (row) => row.purpose,
      width: "200px",
    },
    {
      name: <b>Invoice Number</b>,
      selector: (row) => row.invoice_number,
      width: "190px",
    },
    {
      name: <b>Amount</b>,
      selector: (row) => row.amount,
      width: "200px",
    },

    
    // {
    //   name: <b>Status</b>,
    //   selector: (row) => row.induvidual_permanent_country,
    //   width: "130px",
    // },
    
    {
      name:<b>Edit</b>,
      cell: (row) => (
        <Link to={`/purchase/EditExpenses/${row.expenses_id}`}>
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
        breadCrumbTitle="Purchase"
        breadCrumbParent="Expenses"
        breadCrumbActive="Expenses List"
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
<Link to="/purchase/AddExpenses"><Button  color='primary mr-2'>+ Add Expenses</Button> </Link>
</FormGroup>
</Col>
</Row>
           
                
               
             

    <div className="data-list list-view">  
   
        <DataTable
          title="Expenses"
          columns={columns}
          data={filtercontries}
          pagination
                  paginationServer
              
                  paginationComponent={() => (
                   
                    <div style={{padding:"20px", display: "flex", justifyContent: "flex-end",background:'white' }}>
                       
            
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
   
      </React.Fragment>
  );
}

export default ExpensesList;
  

