import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import SingleSelect from "components/common/formBasic/singleSelect";
import { Accountant } from 'views/country/CountryList';
import AddCofA from './AddCofA';
import "assets/scss/pages/data-list.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { groupedOptions,account,filterOptions} from 'views/country/CountryList';
import axios from "axios";
import * as Icon from "react-feather";
import { NavLink, Link, useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';



function SubAccount(props) {
    const [compnanys, setCompnanys] = useState([]);
    const [search, setSearch] = useState("");
    const [filtercontries, setFiltercontries] = useState("");
    const [filter, setFilter] = useState("");
    const [allResponse, setAllResponse] = useState("");
    const [edit1, setEdit] = useState("");
    const getContry = async (pageNumber) => {
      try {
       let id=props.id;
       console.log(id);
        const res = await axios.get(`/api/account/getSubAccount/${id}?page=${pageNumber}`);
  
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
        width: "220px",
      },
      {
        name: <b>Account Code</b>,
        selector: (row) => row.account_code,
        width: "320px",
      },
      {
        name: <b>Account Type</b>,
        selector: (row) => row.account_type,
        width: "390px",
      },
    
     
      // {
      //   name: <b>Status</b>,
      //   selector: (row) => row.induvidual_permanent_country,
      //   width: "130px",
      // },
     
      
      {
        name:<b style={{textAlign:"center"}}>Action</b>,
        cell: (row) => (
            [
        <Link to={`/Accountant/chartsOfAccount/Report/${row.account_id}/${row.account_name}`} >
        <Icon.FileText size={20}></Icon.FileText>
      </Link>
       ,
          <Link to={`${props.path}/${row.account_id}`}style={{marginLeft:"20px"}}>
            <Icon.Edit size={20}></Icon.Edit>
          </Link>
    ]),
      },
    ];
    useEffect(() => {
      getContry(1);
    }, []);
  
    useEffect(() => {
      const result = compnanys.filter((company) => {
        
        return company.account_name.toLowerCase().match(search.toLowerCase());
      });
      setFiltercontries(result);
    }, [search]);

    useEffect(() => {
      if(filter=='')
      {
        getContry(1);
        setEdit(props.edit)
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
        <br></br>


                <Card>
                    <CardHeader><CardTitle>{props.mainAccount} Sub Accountant</CardTitle></CardHeader>
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
                    value={search}
                    options={filterOptions}
                    getValuesFn={getValuesFn}
                    selectedValue={filter}
                  />
             
</Col>
<Col lg="4" >
<FormGroup>
<AddCofA id={props.id} name={props.name} a_type={props.type}/>

</FormGroup>
</Col>
                </Row>


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
        onChange={(pageNumber)=>getContry(pageNumber)}
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


export default SubAccount;



