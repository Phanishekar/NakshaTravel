import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import SingleSelect from "components/common/formBasic/singleSelect";
import {filterOptions} from 'views/country/CountryList';
import AddCharts from './AddCharts';
import "assets/scss/pages/data-list.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as Icon from "react-feather";
import {Link} from "react-router-dom";
import Pagination from 'react-js-pagination';




function ChartsOfAccountList(props) {
    const [compnanys, setCompnanys] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [filtercontries, setFiltercontries] = useState("");
    const [allResponse, setAllResponse] = useState("");
    const [account_name, setAccountName] = useState("");
  
    const getCountry = async (pageNumber) => {
      try {
       
        const res = await axios.get(`/api/account/getAll?page=${pageNumber}`);
  
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
        
        name: <b>Account Name</b>,
        selector: (row) => row.account_name,
        width: "300px",
      },
      {
        name: <b>Account Code</b>,
        selector: (row) => row.account_code,
        width: "200px",
      },
      {
        name: <b>Account Type</b>,
        selector: (row) => row.account_type,
        width: "300px",
      },
    
     
  
     
      
      {
        name:<b style={{textAlign:"center"}}>Action</b>,
        cell: (row) => (
            [
        <Link to={`/Accountant/chartsOfAccount/Report/${row.account_id}/${row.account_name}`} >
        <Icon.FileText size={20}></Icon.FileText>
      </Link>
       ,
          <Link to={`/accountant/ChartsOfAccount/EditCofA/${row.account_id}`}style={{marginLeft:"20px"}}>
            <Icon.Edit size={20}></Icon.Edit>
          </Link>
    ]),
      },
    ];
    useEffect(() => {
      getCountry(1);
    }, []);
  
    useEffect(() => {
      const result = compnanys.filter((account) => {
        
        return account.account_name.toLowerCase().match(search.toLowerCase());
      });
      setFiltercontries(result);
    }, [search]);
   
    useEffect(() => {
      if(filter=='')
      {
        getCountry(1);
      }
      else
      {
      const result = compnanys.filter((account) => {
       console.log(filter);
        return account.account_type==filter;
     
      });
      setFiltercontries(result);
    }
    }, [filter]);
    
    const  getValuesFn= async (data) => 
    {
      setFilter(data.value);
    }
    

        return (
            <React.Fragment>
                <BreadCrumbs
                    breadCrumbTitle="Accountant"
                    breadCrumbParent="Charts of Account"
                    breadCrumbActive="Account List"
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
                    value={search}
                    options={filterOptions}
                    getValuesFn={getValuesFn}
                    selectedValue={filter}
                  />
             
</Col>
<Col lg="4" >
 <AddCharts/>
</Col>
                </Row><br></br>


              
                 
                   
                      <div className="data-list list-view">  
   
        <DataTable
        title={filter?filter: "All Account"} 
       
        columns={columns}
        data={filtercontries}
        pagination
                paginationServer
            
                paginationComponent={() => (
                 
                  <div style={{padding:"20px", display: "flex",backgroundColor:"white",justifyContent: "flex-end" }}>
                     
          
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
      
        highlightOnHover

      />
    </div>


                    
              
            </React.Fragment>
        )
    }


export default ChartsOfAccountList;


