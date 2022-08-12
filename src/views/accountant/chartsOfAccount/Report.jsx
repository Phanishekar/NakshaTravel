import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb'

import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import SingleSelect from "components/common/formBasic/singleSelect";
import { Accountant } from 'views/country/CountryList';
import Select from 'react-select'

import AddCharts from './AddCharts';
import "assets/scss/pages/data-list.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as Icon from "react-feather";
import { NavLink, Link, useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';
import { NoBackpackSharp } from '@mui/icons-material';


function Report(props) {
    const [compnanys, setCompnanys] = useState([]);
    const [search, setSearch] = useState("");
    const [filtercontries, setFiltercontries] = useState("");
    const [allResponse, setAllResponse] = useState("");
  
    const getCountry = async (pageNumber) => {
      try {
        let id=props.match.params.id;
        const res = await axios.get(`/api/account/trasaction/${id}`);
  console.log(res);
  console.log(id);
        setCompnanys(res.data.account.data);
        setFiltercontries(res.data.account.data);
        setAllResponse(res.data.account);
        console.log(res.data.account.data)
       
      } catch (error) {
        console.log(error);
      }
    };
    const{data,current_page,per_page,total}=allResponse;
    const columns = [
     
      {
        name: <b>Date</b>,
        selector: (row) => row.date,
        width: "300px",
      },					
      {
        name: <b>Payment Type</b>,
        selector: (row) => row.payment_type,
        width: "200px",
      },
      {
        name: <b>Amount</b>,
        selector: (row) => row.amount+" "+row.currency,
        width: "300px",
      },
    
     
      {
        name: <b>Transaction</b>,
        selector: (row) => row.transaction_type=='Credit'?<span style={{color:'green'}}>{row.transaction_type}</span>:<span style={{color:'red'}}>{row.transaction_type}</span>,
        width: "200px",
      },
     
      
    
    ];
    useEffect(() => {
      getCountry(1);
    }, []);
  
    useEffect(() => {
      const result = compnanys.filter((company) => {
        
        return company.company_name.toLowerCase().match(search.toLowerCase());
      });
      setFiltercontries(result);
    }, [search]);
   
        return (
            <React.Fragment>
                <BreadCrumbs
                    breadCrumbTitle="Accountant"
                    breadCrumbParent="Charts Of Account"
                    breadCrumbActive="Transactions"
                />
                <Row>
                    <Col lg="4">
                        <Input
                            type="text"
                            placeholder="Search here"

                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                        />
                    </Col>
                    <Col lg="4" >
                    <Input
                            type="date"
                            placeholder="Search here"

                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                        />
</Col>
<Col lg="4" >
<FormGroup>
 

</FormGroup>
</Col>
                </Row><br></br>


                <Card>
                    <CardHeader><CardTitle>{props.match.params.name} All Transactions</CardTitle></CardHeader>
                    <CardBody>
                        <div className="data-list list-view">  
   
        <DataTable
        noHeader
        // title="Country List"
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
        onChange={(pageNumber)=>getCountry(pageNumber)}
        className="pagination"
        itemClass="page-item"
        linkClass="page-link"
        firstPageText="First"
        lastPageText="Last"
        
        /></div>)}
          responsive
        fixedHeader
        fixedHeaderScrollHeight="500px"
        highlightOnHover

      /> 
    </div>


                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }


export default Report;