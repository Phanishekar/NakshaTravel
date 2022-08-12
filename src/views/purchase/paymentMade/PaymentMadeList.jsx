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

export function PaymentRecivedlist(props) {
  const [compnanys, setCompnanys] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercontries, setFiltercontries] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getContry = async (pageNumber) => {
    try {
     
      const res = await axios.get(`/api/purchases/payment/getAll?page=${pageNumber}`);

      setCompnanys(res.data.PaymentsRecived.data);
      setFiltercontries(res.data.PaymentsRecived.data);
      setAllResponse(res.data.PaymentsRecived);
      console.log(res.data.PaymentsRecived.data)
     
    } catch (error) {
      console.log(error);
    }
  };
  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
      
      name: <b>Payment ID</b>,
      selector: (row) => "Payment- " +row.payment_received_id,
      width: "200px",
    },
    {
      
      name: <b>Date</b>,
      selector: (row) => row.date_of_payment,
      width: "200px",
    },
    {
      name: <b>Bill Amount</b>,
      selector: (row) => row.payment_made+' '+row.currency,
      width: "190px",
    },
    
    {
      name: <b>Payment Made</b>,
      selector: (row) => row.recived_amount+' '+row.currency,
      width: "200px",
    },
    {
      name: <b>Pending Amount</b>,
      selector: (row) => row.payment_pending+' '+row.currency,
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
        <Link to={`/purchase/EditPaymentMade/${row.payment_received_id}`}>
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
        breadCrumbParent="Payment Made"
        breadCrumbActive="Payment Made"
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
<Link to="/purchase/AddPaymentMade"><Button  color='primary mr-2'>+ Add Payment Made</Button> </Link>
</FormGroup>
</Col>
</Row>
           
                
               
             

    <div className="data-list list-view">  
   
        <DataTable
          title="Payment Made"
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

export default PaymentRecivedlist;
  

