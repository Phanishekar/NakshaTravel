


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
import AddHotelList from "./AddHotelList";
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import SingleSelect from "components/common/formBasic/singleSelect";

export function HotelList(props) {
  const [hotel, sethotel] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercontries, setFiltercontries] = useState("");
  const [allResponse, setAllResponse] = useState("");
  const [filter, setFilter] = useState("");

  const getContry = async (pageNumber) => {
    try {
     
      const res = await axios.get(`api/productandservices/services/gethotel?page=${pageNumber}`);

      sethotel(res.data.Hotel.data);
      setFiltercontries(res.data.Hotel.data);
      setAllResponse(res.data.Hotel);
      console.log(res.data.Hotel.data)
     
    } catch (error) {
      console.log(error);
    }
  };
  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
      
      name: <b>Hotel Name</b>,
      selector: (row) => row.hotel_name,
      width: "250px",
    },
    {  
      name: <b>Hotel Type</b>,
      selector: (row) => row.hotel_type,
      width: "200px",
    },
  
    {
      name: <b>City</b>,
      selector: (row) => row.hotel_city,
      width: "200px",
    },
    {
      name: <b>Country</b>,
      selector: (row) => row.hotel_country,
      width: "230px",
    },
   
    {
      name: <b>Status</b>,
      selector: (row) => row.hotel_active=="Active"?<span class="badge badge-success">{row.hotel_active}</span>:<span class="badge badge-danger">{row.hotel_active}</span>,
      width: "150px",
    },
    {
      name:<b>Edit</b>,
      cell: (row) => (
        <Link to={`/productandservice/servicess/hotel/edit/${row.hotel_id}`}>
          <Icon.Edit size={20}></Icon.Edit>
        </Link>
      ),
    },
  ];
  useEffect(() => {
    getContry(1);
  }, []);

  useEffect(() => {
    const result = hotel.filter((company1) => {
      console.log(company1)
     return company1.hotel_name.toLowerCase().match(search.toLowerCase());
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
    const result = hotel.filter((account) => {
     console.log(filter);
      return account.hotel_active==filter;
   
    });
    setFiltercontries(result);
  }
  }, [filter]);

  return (
           <React.Fragment>
               <BreadCrumbs
                    breadCrumbTitle="Product & Service"
                    breadCrumbParent="Services"
                    breadCrumbActive=" Hotel"
                />
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
<AddHotelList />
</FormGroup>
</Col>
</Row>
             <Card>
            <CardBody>
               
  
    <div className="data-list list-view">  
   
        <DataTable
        
          title="Hotel List"
          columns={columns}
          data={filtercontries}
          pagination
                  paginationServer
              
                  paginationComponent={() => (
                   
                    <div style={{padding:"20px", display: "flex", justifyContent: "flex-end" ,backgroundColor:"white"}}>
                       
            
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

export default HotelList;
  
  