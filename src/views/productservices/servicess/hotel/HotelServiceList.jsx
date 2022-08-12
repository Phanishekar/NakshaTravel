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
import {Active} from "views/country/CountryList"
import AddHotelService from "./AddHotelService";
import EditHotelService from "./EditHotelService";
import SingleSelect from "components/common/formBasic/singleSelect";

export function HotelServiceList(props) {
  const [hotel, sethotel] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercontries, setFiltercontries] = useState("");
  const [allResponse, setAllResponse] = useState("");
  const [filter, setFilter] = useState("");

  const getContry = async (pageNumber) => {
    try {
     let id=props.id;
      const res = await axios.get(`/api/productandservices/services/hotelandservice/${id}?page=${pageNumber}`);
     console.log(res);
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
      
      name: <b>Room Name</b>,
      selector: (row) => row.hotel_room_name,
      width: "200px",
     
    
    },
    {  
      name: <b>Occupency</b>,
      selector: (row) => row.hotel_occupency,
      width: "250px",
    },
    {
      name: <b>Bed</b>,
      selector: (row) => row.hotel_bed,
      width: "200px",
    },
    {
      name: <b>Price</b>,
      selector: (row) => row.hotel_price,
      width: "200px",
    },
   
     {
      name: <b>Status</b>,
      selector: (row) => row.hotel_service_active=="Active"?<span class="badge badge-success">{row.hotel_service_active}</span>:<span class="badge badge-danger">{row.hotel_service_active}</span>,
      width: "170px",
    },
   
    
    {
      name:<b>Edit</b>,
      cell: (row) => (
        // <Link to={`/productandservice/servicess/hotel/edit/${row.hotel_service_id}}`}>
        //   <Icon.Edit size={20}></Icon.Edit>
        // </Link>
        <EditHotelService id={row.hotel_service_id} />
      ),
    },
  ];
  useEffect(() => {
    getContry(1);
  }, []);

  useEffect(() => {
    const result = hotel.filter((company1) => {
      console.log(company1)
     return company1.hotel_room_name.toLowerCase().match(search.toLowerCase());
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
      return account.hotel_service_active==filter;
   
    });
    setFiltercontries(result);
  }
  }, [filter]);

  return (
           <React.Fragment>
    
             <Card>
             <CardHeader><CardTitle><h4>{props.name} service List</h4></CardTitle></CardHeader>
              
               <CardBody>
              
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
<AddHotelService hotel_id={props.id} hotel_name={props.name}  />
</FormGroup>
</Col>
</Row>
               
             

    <div className="data-list list-view">  
   
        <DataTable
          noHeader
          // title={props.name} service List
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

export default HotelServiceList;
  
  