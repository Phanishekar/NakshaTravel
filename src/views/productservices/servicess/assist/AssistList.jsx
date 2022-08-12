// import axios from 'axios';
// import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb'
// import * as Icon from "react-feather";
// import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Pagination, Row, Spinner, Table } from 'reactstrap'
// import AddAssist from './AddAssist'
// import EditAssistList from './EditAssistList';

// export default class AssistList extends Component {
//   constructor(props){
//     super(props);
//     this.state=
//     {
//         users:'',
//         loading:true,
//         total:'',
//         user:[],
//     }
// }  
// async componentDidMount() {
//   this.getUserData(1)
// }
// async getUserData(pageNumber) {
//   const res= await axios.get(`api/productandservices/services/getassit?page=${pageNumber}`);
//   console.log(res.data);

//   if(res.data.status==200)
//   {
//     this.setState({
//       users:res.data.assist,
//       user:res.data.assist.data,
//       total:res.data.assist.total,
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
// <tr className='mt-5 mb-5' key={item.asisst_id}>
//                     <td>{item.asisst_meeting_type }</td>
//                     <td>{item.asisst_airport_name }</td>
//                     <td>{item.asisst_num_of_person }</td>
//                     <td>{item.asisst_price }</td>
//                     <td>{item.asisst_description}</td>



//             <td>
//                <EditAssistList id={item.asisst_id}/>
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
// breadCrumbActive= "Assist"
// />
// <Row>
// <Col lg="6" >
// <FormGroup>
// <Input name="name"
// type='text'
// placeholder='Search By Assist Name'
//  >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <AddAssist/>
// {/* <Link to="/employee/create"> </Link> */}
// </FormGroup>
// </Col>
// </Row>
// <Card>
//           <CardHeader>Assist List</CardHeader>
//           <CardBody>
//           <div  style={{overflow:"auto"}}>
//                     <Table striped >
//               <thead>
//                 <tr id='tablelist' >
//                       <th>Meeting Type</th>
//                       <th>Airport Name</th>
//                       <th>No of Persons</th>
//                       <th>Price</th>
//                       <th>Description</th>
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
//

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
import AddAssist from "./AddAssist";
import EditAssistList from "./EditAssistList";


export function AssistList(props) {
  const [inventory, setinventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterInventory, setFilterInventory] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getAllInventory = async (pageNumber) => {
    try {

      const res = await axios.get(`api/productandservices/services/getassit?page=${pageNumber}`);

      setinventory(res.data.assist.data);
      setFilterInventory(res.data.assist.data);
      setAllResponse(res.data.assist);


    } catch (error) {
      console.log(error);
    }
  };
  const { data, current_page, per_page, total } = allResponse;
  const columns = [
    {
      name: "Meeting Type",
      selector: (row) => row.asisst_meeting_type,
      width: "250px",
    },
    {
      name: "Airport Name",
      selector: (row) => row.asisst_airport_name,
      width: "250px",
    },
    {
      name: "No of Persons",
      selector: (row) => row.asisst_num_of_person,
      width: "250px",

    },
    {
      name: "Price",
      selector: (row) => row.asisst_price,
      width: "200px",
    },
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
        // <Link to={`/productservices/inventory/edit/${row.asisst_id}`}>
        //   <Icon.Edit size={20}></Icon.Edit>
        // </Link>,
        <EditAssistList id={row.asisst_id} name={row.asisst_meeting_type} />,
      width: "100px",
    },
  ];
  useEffect(() => {
    getAllInventory(1);
  }, []);

  useEffect(() => {
    const result = inventory.filter((inventories) => {
      return inventories.asisst_meeting_type.toLowerCase().match(search.toLowerCase());
    });
    setFilterInventory(result);
  }, [search]);

  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Products & Services"
        breadCrumbParent="Services"
        breadCrumbActive="Assist"
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

<AddAssist />


 </Col>
      </Row>
      <br/>
      <br/>
      <Card>
      
        <CardBody>


          <div className="data-list list-view">

            <DataTable
             
              title="Assist List"
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
export default AssistList;
