
// import axios from 'axios'
// import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb'
// import * as Icon from "react-feather";
// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Pagination, Row, Spinner, Table } from 'reactstrap'
// import AddVisa from './AddVisa'
// import EditVisa from './EditVisa';




// export default class VisaList extends Component {
//   constructor(props){
//     super(props);
//     this.state=
//     {
//         users:'',
//         total:'',
//         loading:true,
//         user:[],
//     }
// }  
// async componentDidMount() {
//   this.getUserData(1)
// }
// async getUserData(pageNumber) {
//   const res= await axios.get(`/api/productandservices/services/getvisa?page=${pageNumber}`);
//   console.log(res.data);

//   if(res.data.status==200)
//   {
//     this.setState({
//       users:res.data.visa,
//       user:res.data.visa.data,
//       total:res.data.visa.total,
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
// <tr className='mt-5 mb-5' key={item.visa_id}>
//                     <td>{item.visa_entry_type }</td>
//                     <td>{item.visa_daysORyears }</td>
//                     <td>{item.visa_price }</td>
            
//             <td>
//                <EditVisa id={item.visa_id}/>
//             </td>
//           </tr>
          
          
//         )
//       })
//     }
//     return (
//       <React.Fragment>
    //                    <BreadCrumbs
    //   breadCrumbTitle= "Product And Services"
    //   breadCrumbParent="Services"
    //   breadCrumbActive= "Visa"
    // />
//               <Row>
// <Col lg="6" >
// <FormGroup>
// <Input name="name"
// type='text'
// placeholder='Search By Visa Name'
//  >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
//   <AddVisa/>
// {/* <Link to="/employee/create"> </Link> */}
// </FormGroup>
// </Col>
// </Row>
//       <Card>
//           <CardHeader>Visa List</CardHeader>
//           <CardBody>
//           <div  style={{overflow:"auto"}}>
//                     <Table striped >
//               <thead>
//                 <tr id='tablelist' >
//                       <th>Visa Entry Type</th>
//                       <th>Days</th>
//                       <th>Price</th>
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
//       </React.Fragment>
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


import AddVisa from './AddVisa'
import EditVisa from './EditVisa';


export function VisaList(props) {
  const [inventory, setinventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterInventory, setFilterInventory] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getAllInventory = async (pageNumber) => {
    try {

      const res = await axios.get(`/api/productandservices/services/getvisa?page=${pageNumber}`);

      setinventory(res.data.visa.data);
      setFilterInventory(res.data.visa.data);
      setAllResponse(res.data.visa);


    } catch (error) {
      console.log(error);
    }
  };
  const { data, current_page, per_page, total } = allResponse;
  const columns = [
    { 
      name: "Visa Entry Type",
      selector: (row) => row.visa_entry_type,
      width: "300px",
    },
    {
      name: "Days",
      selector: (row) => row.visa_daysORyears,
      width: "300px",
    },
    {
      name: "Price",
      selector: (row) => row.visa_price,
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
       
       
        <EditVisa id={row.visa_id} name={row.visa_entry_type} />,
      width: "100px",
    },
  ];
  useEffect(() => {
    getAllInventory(1);
  }, []);

  useEffect(() => {
    const result = inventory.filter((inventories) => {
      return inventories.visa_entry_type.toLowerCase().match(search.toLowerCase());
    });
    setFilterInventory(result);
  }, [search]);

  return (
    <React.Fragment>
           <BreadCrumbs
      breadCrumbTitle= "Product And Services"
      breadCrumbParent="Services"
      breadCrumbActive= "Visa"
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

        <AddVisa/>

 
 </Col>
      </Row>
      <br/>
      <br/>
      <Card>
        
        <CardBody>


          <div className="data-list list-view">

            <DataTable
             
              title="Visa List"
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
export default  VisaList;
