/*
import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Button,
    Label,
    Row,
    Col,
    Spinner,
    Input,
    Table
  } from "reactstrap";
  import { NavLink,Link,useParams } from "react-router-dom";
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import { toast } from "react-toastify";
  import axios from "axios";
  import { Select } from 'evergreen-ui'
  import Pagination from 'react-js-pagination';
  import * as Icon from "react-feather";
 
export default class NonNonnoninventoryList extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            
          ledger:[],
          customer:"",
          loading:true,
          users:'',
          loading:true,
          user:[],
          total:'',
        };

      }

     
  async componentDidMount() {
    let id=0;
    const nonnoninventory= await axios.get(`/api/productandservices/nonnoninventory/getAll`);

    console.log(nonnoninventory.data);

    if(nonnoninventory.data.status==200)
    {
      this.setState(
        {
          ledger:nonnoninventory.data.Nonnoninventory,
          users:nonnoninventory.data.Nonnoninventory,
          user:nonnoninventory.data.Nonnoninventory.data,
          loading:false,
          total:nonnoninventory.data.Nonnoninventory.total,
        })
    }
    
    
  } 


  render() {
    const{data,current_page,per_page,total}=this.state.users;
    console.log(current_page,per_page,total);
      var user_HTML_TABLE="";
    if(this.state.loading)
    {
      user_HTML_TABLE= <tr><td colSpan="5"><h2>Loading....</h2></td></tr>;
    }
    
    else if(this.state.total==0)
    {
        user_HTML_TABLE= <tr><td colSpan="6"><h4>No Record Found</h4></td></tr>;
    }
    //  
    else
    {
      user_HTML_TABLE=
      this.state.user.map( (item) =>{
        return(
<tr className='mt-5 mb-5' key={item.non_noninventory_id}>
                    <td>{item.non_noninventory_name}</td>
            <td>{item.non_noninventory_hsn_code}</td>
            <td>{item.non_noninventory_sku}</td>
            <td>{item.non_noninventory_quantity_on_hand}</td>
            <td>{item.non_noninventory_asof_date}</td>
           
            <td>
                <Link to={`/productservices/nonnoninventory/edit/${item.non_noninventory_id}`}>
                <Icon.Edit size={20} ></Icon.Edit>
                </Link>
                
            </td>
          </tr>
        
        )
      })
    }
     
    
    
    return (<React.Fragment>
        <BreadCrumbs
          breadCrumbTitle= "Product & Services"
          breadCrumbParent="Nonnoninventory"
          breadCrumbActive= "Nonnoninventory List"
        />
    <Row>
<Col lg="6" >
<FormGroup>
<Input name="name"
type='text'
placeholder='Search By Item Name'
 >
</Input>
</FormGroup>
</Col>
<Col lg="4" >
<FormGroup>
<Link to={`/productservices/nonnoninventory/add`}><Button  color='primary mr-2'>+ ADD Nonnoninventory</Button> </Link>
</FormGroup>
</Col>
</Row>
          <Card>
          <CardHeader>{this.state.company_name} Nonnoninventory List</CardHeader>
          <CardBody>
      
                    <Table striped >
              <thead>
                <tr id='tablelist' >
                      <th>Item Name</th>
                      <th>HSN code</th>
                      <th>SKU</th>
                      <th>Quantity</th>
                      <th>As of Date</th>
                      <th>Edit</th> 
                  </tr>
              </thead>
              <tbody className='mt-5' >
                {user_HTML_TABLE}
                <br></br><br></br>
                <Pagination 
activePage={current_page}
totalItemsCount={total}
itemsCountPerPage={per_page}
onChange={(pageNumber)=>this.getUserData(pageNumber)}
className="pagination"
itemClass="page-item"
linkClass="page-link"
firstPageText="First"
lastPageText="Last"
/>
              </tbody>

          </Table>
          </CardBody>
        </Card>
         
      </React.Fragment>
      );
  }
}
*/



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

export function NoninventoryList(props) {
  const [noninventory, setnoninventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filternoninventory,setFilternoninventory] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getAllnoninventory = async (pageNumber) => {
    try {
      //  const res = await axios.get("https://restcountries.com/v2/all");
      const res = await axios.get(`/api/productandservices/noninventory/getAll?page=${pageNumber}`);

      setnoninventory(res.data.NonInventory.data);
      setFilternoninventory(res.data.NonInventory.data);
      setAllResponse(res.data.NonInventory);
      console.log(res.data.NonInventory.data)
     
    } catch (error) {
      console.log(error);
    }
  };
  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
      name: "Item Name",
      selector: (row) => row.non_inventory_name,
      width: "200px",   
      sortable: true,
    },
    {
      name: " HSN Code",
      selector: (row) => row.non_inventory_hsn_code,
      width: "200px",     
    },
    {
      name: "SKU",
      selector: (row) => row.non_inventory_sku,
      width: "200px",      

    },
    {
      name: "Category",
      selector: (row) => row.non_inventory_categaroy,
      width: "200px",      
    },
    {
      name: "Unit",
      selector: (row) => row.non_inventory_unit,
      width: "150px",      
    },
    {
      name: "Initial Quantity ",
      selector: (row) => row.non_inventory_quantity_on_hand,
      width: "150px",      
    },
    {
      name: "Action",
      cell: (row) => 
        <Link to={`/productservices/noninventory/edit/${row.non_inventory_id}`}>
          <Icon.Edit size={20}></Icon.Edit>
        </Link>,
        width: "100px",      
    },
  ];
  useEffect(() => {
    getAllnoninventory(1);
  }, []);

  useEffect(() => {
    const result = noninventory.filter((noninventories) => {      
      return noninventories.non_inventory_name.toLowerCase().match(search.toLowerCase());
    });
   setFilternoninventory(result);
  }, [search]);

  return (
           <React.Fragment>
              <BreadCrumbs
        breadCrumbTitle="Products & Services"
        breadCrumbParent="Non Inventory"
        breadCrumbActive="Non Inventory List"
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
                  <Link to="/productservices/non_inventory/add"><Button  color='primary mr-2'>+ Add Non-inventory</Button></Link>
                  </FormGroup>
                  </Col>
                  </Row>
             <Card>
               {/* <CardHeader><CardTitle>Non - inventory List</CardTitle></CardHeader> */}
               <CardBody>
               
             
    <div className="data-list list-view">  

        <DataTable
          // noHeader
          title="Non - inventory List"
          columns={columns}
          data={filternoninventory}
          pagination
                  paginationServer              
                  paginationComponent={() => (                   
                    <div style={{padding:"20px", display: "flex", justifyContent: "flex-end" }}>
                       
          <Pagination 
          activePage={current_page}
          totalItemsCount={total}
          itemsCountPerPage={per_page}
          onChange={(pageNumber)=>getAllnoninventory(pageNumber)}
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
export default NoninventoryList;