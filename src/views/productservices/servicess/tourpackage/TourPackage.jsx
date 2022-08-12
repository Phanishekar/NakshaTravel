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
import AddTourPackage from './AddTourPackage'
import EditTourPackage from './EditTourPackage';




export function CarHireList(props) {
  const [inventory, setinventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterInventory, setFilterInventory] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getAllInventory = async (pageNumber) => {
    try {

      const res = await axios.get(`api/productandservices/services/gettourpackage?page=${pageNumber}`);

      setinventory(res.data.tourpackage.data);
      setFilterInventory(res.data.tourpackage.data);
      setAllResponse(res.data.tourpackage);


    } catch (error) {
      console.log(error);
    }
  };
  const { data, current_page, per_page, total } = allResponse;
  const columns = [
    {
      name: "Package Name",
      selector: (row) => row.tour_package_name,
      width: "300px",
    },
    {
      name: "Destination",
      selector: (row) => row.tour_package_destination,
      width: "300px",
    },
    {
      name: " Days",
      selector: (row) => row.tour_package_days,
      width: "300px",
    },
    {
      name: "Price",
      selector: (row) => row.tour_package_price_per_person,
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
       
        
        <EditTourPackage id={row.tour_package_id} name={row.tour_package_destination} />,
      width: "100px",
    },
  ];
  useEffect(() => {
    getAllInventory(1);
  }, []);

  useEffect(() => {
    const result = inventory.filter((inventories) => {
      return inventories.tour_package_destination.toLowerCase().match(search.toLowerCase());
    });
    setFilterInventory(result);
  }, [search]);

  return (
    <React.Fragment>
              <BreadCrumbs
      breadCrumbTitle= "Product And Services"
      breadCrumbParent="Services"
      breadCrumbActive= "Tour Package"
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

        <AddTourPackage/>

 
 </Col>
      </Row>
      <br/>
      <br/>
      <Card>
       
        <CardBody>


          <div className="data-list list-view">

            <DataTable
             
              title="Tour Package List"
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
