// import axios from 'axios';
// import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb'
// import * as Icon from "react-feather";
// import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Pagination, Row, Spinner, Table } from 'reactstrap'
// import InsuranceCompany from './InsuranceCompany'

// export default class InsuranceList extends Component {
//   constructor(props){
//     super(props);
//     this.state=
//     {
//         users:'',
//         loading:true,
//         user:[],
//     }
// }  
// async componentDidMount() {
//   this.getUserData(1)
// }
// async getUserData(pageNumber) {
//   const res= await axios.get(`api/productandservices/services/getinsurance?page=${pageNumber}`);
//   console.log(res.data);

//   if(res.data.status==200)
//   {
//     this.setState({
//       users:res.data.insurance,
//       user:res.data.insurance.data,
//       loading:false,
//     });
//   }
// }
//   render() {
//     const{data,current_page,per_page,total}=this.state.users;
//     console.log(current_page,per_page,total);
//       var user_HTML_TABLE="";
//     if(this.state.loading)
//     {
//       user_HTML_TABLE= <tr><td style={{color:"#7367f0",textAlign:"center",fontSize:"20px"}} colSpan="6"><Spinner animation="border" variant="primary" /> Loading.....</td></tr>;
//     }else if(this.state.total==0)
//     {
//         user_HTML_TABLE= <tr><td style={{color:"#7367f0",textAlign:"center",fontSize:"20px"}} colSpan="6"><h4>No Record Found</h4></td></tr>;
//     }
//     else{
//       user_HTML_TABLE= 
//       this.state.user.map( (item) =>{
//         return(
// <tr className='mt-5 mb-5' key={item.insurence_company_id}>
//                     <td>{item.insurence_company_name }</td>
            
//             <td>
//                 <Link to={`/productandservice/servicess/insurance/edit/${item.insurence_company_id}`}>
//                 <Icon.Edit size={20} ></Icon.Edit>
//                 </Link>
//             </td>
//           </tr>
          
          
//         )
//       })
//     }
//     return (
//         <React.Fragment>
//         <BreadCrumbs
// breadCrumbTitle= "Product And Services"
// breadCrumbParent="Services"
// breadCrumbActive= "Insurance"
// />
// <Row>
// <Col lg="6" >
// <FormGroup>
// <Input name="name"
// type='text'
// placeholder='Search By Insurance Name'
//  >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <InsuranceCompany />
// {/* <Link to="/employee/create"> </Link> */}
// </FormGroup>
// </Col>
// </Row>
// <Card>
//           <CardHeader>Insurance List</CardHeader>
//           <CardBody>
//           <div  style={{overflow:"auto"}}>
//                     <Table striped >
//               <thead>
//                 <tr id='tablelist' >
//                       <th>Company Name</th>
                    
//                       <th>Edit</th>
//                   </tr>
//               </thead>
//               <tbody className='mt-5' >
//                 {user_HTML_TABLE}
//                 <br></br><br></br>
//                 <Pagination 
// activePage={current_page}
// totalItemsCount={total}
// itemsCountPerPage={per_page}
// onChange={(pageNumber)=>this.getUserData(pageNumber)}
// className="pagination"
// itemClass="page-item"
// linkClass="page-link"
// firstPageText="First"
// lastPageText="Last"
// />
//               </tbody>

//           </Table>
//           </div>
//           </CardBody>
//         </Card>
// </React.Fragment>
//     )
//   }
// }




import "assets/scss/pages/data-list.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as Icon from "react-feather";
import { NavLink, Link, useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';
import InsuranceCompany from './InsuranceCompany'

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


export function InsuranceList(props) {
  const [hotel, sethotel] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercontries, setFiltercontries] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getContry = async (pageNumber) => {
    try {
     
      const res = await axios.get(`api/productandservices/services/getinsurance?page=${pageNumber}`);
      sethotel(res.data.insurance.data);
      setFiltercontries(res.data.insurance.data);
      setAllResponse(res.data.insurance);
      console.log(res.data.insurance.data)
     
    } catch (error) {
      console.log(error);
    }
  };
  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
      
      name: <b>Company Name</b>,
      selector: (row) => row.insurence_company_name,
      width: "800px",
    },
    // {  
    //   name: <b>Hotel Type</b>,
    //   selector: (row) => row.hotel_type,
    //   width: "300px",
    // },
  
    // {
    //   name: <b>City</b>,
    //   selector: (row) => row.hotel_city,
    //   width: "190px",
    // },
    // {
    //   name: <b>Country</b>,
    //   selector: (row) => row.hotel_country,
    //   width: "190px",
    // },
   
    
    {
      name:<b>Edit</b>,
      cell: (row) => (
        <Link to={`/productandservice/servicess/insurance/edit/${row.insurence_company_id}`}>
          <Icon.Edit size={20}></Icon.Edit>
        </Link>
      ),
    },
  ];
  useEffect(() => {
    getContry(1);
  }, []);

  useEffect(() => {
    const result = hotel.filter((company1) => {
      console.log(company1)
     return company1.insurence_company_name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercontries(result);
  }, [search]);


  return (
           <React.Fragment>
                <BreadCrumbs
      breadCrumbTitle= "Product And Services"
      breadCrumbParent="Services"
      breadCrumbActive= "Insurance"
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
<InsuranceCompany />
</FormGroup>
</Col>
</Row>
             <Card>
              
           
             
                <CardBody>
               
             

    <div className="data-list list-view">  
   
        <DataTable
         
          title="Insurance List"
          columns={columns}
          data={filtercontries}
          pagination
                  paginationServer
              
                  paginationComponent={() => (
                   
                    <div style={{padding:"20px", display: "flex", justifyContent: "flex-end" ,backgroundColor:"white"}}>
                       
            
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

export default InsuranceList ;
  
  
