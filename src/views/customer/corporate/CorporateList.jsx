
import "assets/scss/pages/data-list.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as Icon from "react-feather";
import { NavLink, Link, useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';
import {Active} from "views/country/CountryList"

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
import SingleSelect from "components/common/formBasic/singleSelect";

export function CorporateList(props) {
  const [compnanys, setCompnanys] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercontries, setFiltercontries] = useState("");
  const [allResponse, setAllResponse] = useState("");
  const [filter, setFilter] = useState("");

  const getContry = async (pageNumber) => {
    try {
     
      const res = await axios.get(`/api/corporatecustomer/getAll?page=${pageNumber}`);

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
      
      name: <b>Company Name</b>,
      selector: (row) => row.company_name,
      width: "200px",
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.company_email,
      width: "300px",
    },
    {
      name: <b>Phone</b>,
      selector: (row) => row.company_phone_number,
      width: "200px",
    },
    // {
    //   name: <b>City</b>,
    //   selector: (row) => row.company_city,
    //   width: "190px",
    // },
    {
      name: <b>Country</b>,
      selector: (row) =>row.company_country,
      width: "250px",
    },
    {
      name: <b>Status</b>,
      selector: (row) => row.company_active=="Active"?<span class="badge badge-success">{row.company_active}</span>:<span class="badge badge-danger">{row.company_active}</span>,
      width: "130px",
    },
    
    {
      name:<b>Edit</b>,
      cell: (row) => (
        <Link to={`/customer/corporate/edit/${row.corparate_customer_id}`}>
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
      
      return company.company_name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercontries(result);
  }, [search]);

  const  getValuesFn= async (data) => 
    {
      setFilter(data.value);
    };

    useEffect(() => {
      if(filter=='')
      {
        getContry(1);
      }
      else
      {
      const result = compnanys.filter((account) => {
       console.log(filter);
        return account.company_active==filter;
     
      });
      setFiltercontries(result);
    }
    }, [filter]);

  return (
           <React.Fragment>
                 <Row>

<Col lg="4">
<Input
type="text"
placeholder="Search here"
value={search}
onChange={(e) => setSearch(e.target.value)}
/>
</Col>
<Col lg="4" >
                    <SingleSelect 
                    options={Active}
                    getValuesFn={getValuesFn}
                    selectedValue={filter}
                  />
             
</Col>
<Col lg="4" >
<FormGroup>
<Link to="/customer/corporate/add"><Button  color='primary mr-2'>+ Add Corporate</Button> </Link>
</FormGroup>
</Col>
</Row>
           
           
    <div className="data-list list-view">  
   
        <DataTable
          
           title="Corporate Customer List"
          columns={columns}
          data={filtercontries}
          pagination
                  paginationServer
              
                  paginationComponent={() => (
                   
                    <div style={{padding:"20px", display: "flex", justifyContent: "flex-end",backgroundColor:"white"}}>
                       
            
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

export default CorporateList;
  