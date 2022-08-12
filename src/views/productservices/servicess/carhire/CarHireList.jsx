
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


import EditCarHire from "./EditCarHire";
import AddCarHire from "./AddCarHire";


export function CarHireList(props) {
  const [inventory, setinventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterInventory, setFilterInventory] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getAllInventory = async (pageNumber) => {
    try {

      const res = await axios.get(`/api/productandservices/services/getcarhire?page=${pageNumber}`);

      setinventory(res.data.Result.data);
      setFilterInventory(res.data.Result.data);
      setAllResponse(res.data.Result);


    } catch (error) {
      console.log(error);
    }
  };
  const { data, current_page, per_page, total } = allResponse;
  const columns = [
    {
      name: "Type of Vehicle",
      selector: (row) => row.car_hire_vehicle_type,
      width: "300px",
    },
    {
      name: " Days",
      selector: (row) => row.car_hire_days,
      width: "300px",
    },
    {
      name: "Price",
      selector: (row) => row.car_hire_amount,
      width: "300px",

    },
    // {
    //   name: "Price",
    //   selector: (row) => row.asisst_price,
    //   width: "200px",
    // },
    // {
    //   name: "Unit",
    //   selector: (row) => row.inventory_unit,
    //   width: "150px",      
    // },
    // {
    //   name: "Initial Quantity",
    //   selector: (row) => row.inventory_quantity_on_hand,
    //   width: "150px",      
    // },
    {
      name: "Action",
      cell: (row) =>
       
        // <EditAssistList id={row.asisst_id} name={row.asisst_meeting_type} />,
        <EditCarHire id={row.car_hire_id} name={row.car_hire_vehicle_type} />,
      width: "100px",
    },
  ];
  useEffect(() => {
    getAllInventory(1);
  }, []);

  useEffect(() => {
    const result = inventory.filter((inventories) => {
      return inventories.car_hire_vehicle_type.toLowerCase().match(search.toLowerCase());
    });
    setFilterInventory(result);
  }, [search]);

  return (
    <React.Fragment>
      <BreadCrumbs
      breadCrumbTitle= "Product And Services"
      breadCrumbParent="Services"
      breadCrumbActive= "Car Hire"
    />
      <Row>
        <Col lg="6">
          <Input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col lg="4" >

  <AddCarHire/>

 
 </Col>
      </Row>
      <br/>
      <br/>
      <Card>
        
        <CardBody>


          <div className="data-list list-view">

            <DataTable
              
              title="Car Hire List"
              columns={columns}
              data={filterInventory}
              pagination
              paginationServer

              paginationComponent={() => (

                <div style={{padding:"20px", display: "flex", justifyContent: "flex-end" ,backgroundColor:"white"}}>


                  <Pagination
                    activePage={current_page}
                    totalItemsCount={total}
                    itemsCountPerPage={per_page}
                    onChange={(pageNumber) => getAllInventory(pageNumber)}
                    className="pagination"
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last" />
                </div>)}
              responsive
           
              highlightOnHover
            />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}
export default  CarHireList;
