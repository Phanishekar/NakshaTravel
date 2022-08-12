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

export function InventoryList(props) {
  const [inventory, setinventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterInventory,setFilterInventory] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getAllInventory = async (pageNumber) => {
    try {
      //  const res = await axios.get("https://restcountries.com/v2/all");
      const res = await axios.get(`/api/productandservices/inventory/getAll?page=${pageNumber}`);
      setinventory(res.data.Inventory.data);
      setFilterInventory(res.data.Inventory.data);
      setAllResponse(res.data.Inventory);
      // console.log(res.data.Inventory.data)
     
    } catch (error) {
      console.log(error);
    }
  };

  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
      name: "Item Name",
      selector: (row) => row.inventory_name,
      width: "180px", 
      sortable: true,
    },
    {
      name: " HSN Code",
      selector: (row) => row.inventory_hsn_code,
      width: "150px",     
    },
    {
      name: "SKU",
      selector: (row) => row.inventory_sku,
      width: "200px",      
    },
    {
      name: "Category",
      selector: (row) => row.inventory_categaroy,
      width: "200px",      
    },
    {
      name: "Unit",
      selector: (row) => row.inventory_unit,
      width: "150px",      
    },
    {
      name: "Initial Quantity",
      selector: (row) => row.inventory_quantity_on_hand,
      width: "200px",      
    },
    {
      name: "Action",
      cell: (row) => 
        <Link to={`/productservices/inventory/edit/${row.inventory_id}`}>
          <Icon.Edit size={20}></Icon.Edit>
        </Link>,
        width: "100px",      
    },
  ];
  useEffect(() => {
    getAllInventory(1);
  }, []);

  useEffect(() => {
    const result = inventory.filter((inventories) => {      
      return inventories.inventory_name.toLowerCase().match(search.toLowerCase());
    });
   setFilterInventory(result);
  }, [search]);

  return (
           <React.Fragment>
              <BreadCrumbs
        breadCrumbTitle="Products & Services"
        breadCrumbParent="Inventory "
        breadCrumbActive="Inventory List"
      />

                <Row>
                  <Col lg="6">
                  <Input
                        type="text"
                        placeholder="Search here"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}/>
                    </Col>
                  <Col lg="4" >
                  <FormGroup>
                  <Link to="/productservices/inventory/add"><Button  color='primary mr-2'>+ Add New Inventory</Button></Link>
                  </FormGroup>
                  </Col>
                  </Row>
             <Card>
               {/* <CardHeader><CardTitle>Inventory List</CardTitle></CardHeader> */}
               <CardBody>
               
             
    <div className="data-list list-view">  

        <DataTable
          // noHeader
          title="Inventory List"
          columns={columns}
          data={filterInventory}
          pagination
                  paginationServer
              
                  paginationComponent={() => (
                   
                    <div style={{padding:"20px", display: "flex", justifyContent: "flex-end" }}>
                       
            
                  <Pagination 
          activePage={current_page}
          totalItemsCount={total}
          itemsCountPerPage={per_page}
          onChange={(pageNumber)=>getAllInventory(pageNumber)}
          className="pagination"
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"/>
          </div>)}
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
export default InventoryList;

