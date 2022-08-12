
import "assets/scss/pages/data-list.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as Icon from "react-feather";
import { NavLink, Link, useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';
import { toast } from "react-toastify";

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

  const makeBill=async(e)=>{
    var formData = new FormData(document.querySelector("#bill"));
    let i=0,Name=[],Data=[];
    for(var pair of formData.entries())
    {
      Name[i]=pair[0];
      Data[i]=pair[1];
      i++;
    }

    for(var j=0;j<i;j++ )
    {
      formData.append(Name[i],Data[i]);
    }
    e.preventDefault();
   await axios
    .post(`/api/dsr/saveBill`,formData)
    .then((response) => {
    if (response.data.status == 200)
     {
      let id=response.data.id;
      props.history.push(`/addBill/${id}/form`);
     } 
    else {
    toast.error("Some thing Went Wrong");
    console.log(response.data.Result);
    }
    })
    .catch((error) => {
    toast.error("Cant Add Bill");
    });
  
  }
  const getContry = async (pageNumber) => {
    try {
     
      const res = await axios.get(`api/sales/bill/getAll?page=${pageNumber}`);

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
      
      name: <b>Invoice Number</b>,
      selector: (row) => "I- " +row.dsr_number,
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
        <Link to={`/addinvoiceform/${row.dsr_number}/form`}>
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
        breadCrumbTitle="Purchases"
        breadCrumbParent="Bill"
        breadCrumbActive="Bill List"
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
  <form onSubmit={makeBill} id="bill">
  <Input type="hidden" name="type" value="Bill" />
<Button  color='primary mr-2' type="submit">+ Add Bill</Button>
</form>
</FormGroup>
</Col>
</Row>
           
                
               
             

    <div className="data-list list-view">  
   
        <DataTable
          title="Bills"
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

export default DSRlist;
  

