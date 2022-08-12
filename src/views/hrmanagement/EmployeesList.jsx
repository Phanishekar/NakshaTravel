



// import React, { Component } from 'react';
// import {
//   Button,
//   Progress,
//   UncontrolledDropdown,
//   DropdownMenu,
//   DropdownToggle,
//   DropdownItem,
//   Input,
//   Label,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   FormGroup,
//   CustomInput,
//   Spinner,
// } from "reactstrap";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardBody,
//   Media,
//   Row,
//   Col,
//   Table,
// } from "reactstrap";
// import { NavLink,Link, useParams } from 'react-router-dom';
// import axios from "axios";
// import Pagination from 'react-js-pagination';
// import * as Icon from "react-feather";
// export default class EmployeesList extends Component {
//     constructor(props){
//         super(props);
//         this.state=
//         {
//             users:'',
//             loading:true,
//             user:[],
//             total:"",
//         }
//     }  
//     async componentDidMount() {
//       this.getUserData(1)
//     }
//     async getUserData(pageNumber) {
//       const res= await axios.get(`/api/employee/getAllEmployee?page=${pageNumber}`);
//       console.log(res.data);

//       if(res.data.status==200)
//       {
//         this.setState({
//           users:res.data.result,
//           user:res.data.result.data,
//           loading:false,
//           total:res.data.result.total
//         });
//       }
//     }
    
//   render() {
//     const{data,current_page,per_page,total}=this.state.users;
//     console.log(current_page,per_page,total);
//       var user_HTML_TABLE="";
//     if(this.state.loading)
//     {
//       user_HTML_TABLE= <tr><td style={{color:"#7367f0",textAlign:"center",fontSize:"20px"}} colSpan="6"><Spinner animation="border" variant="primary" /> Loading.....</td></tr>;
//     }
//     else if(this.state.total==0)
//     {
//         user_HTML_TABLE= <tr><td style={{color:"#7367f0",textAlign:"center",fontSize:"20px"}} colSpan="6"><h4>No Record Found</h4></td></tr>;
//     }
    
//     else{
//       user_HTML_TABLE= 
//       this.state.user.map( (item) =>{
//         return(
// <tr className='mt-5 mb-5' key={item.id}>
//                     <td>{item.name}</td>
//             <td>{item.email}</td>
//             <td>{item.phone_number}</td>
//             <td>{item.city}</td>
//             <td>{item.designation}</td>
//             <td>
//                 <Link to={`/employee/edit/${item.id}`}>
//                 <Icon.Edit size={20} ></Icon.Edit>
//                 </Link>
//             </td>
//           </tr>
          
          
//         )
//       })
//     }
//     return (
//       <React.Fragment>
//         <Row>
// <Col lg="6" >
// <FormGroup>
// <Input name="name"
// type='text'
// placeholder='Search By Employee Name'
//  >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Link to="/employee/create"><Button  color='primary mr-2'>+ ADD New Employee</Button> </Link>
// </FormGroup>
// </Col>
// </Row>
//         <Card>
//           <CardHeader>Employee List</CardHeader>
//           <CardBody>
//             <div  style={{overflow:"auto"}}>
//                     <Table striped>
//               <thead>
//                 <tr id='tablelist' >
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Phone</th>
//                       <th>City</th>
//                       <th>Designation</th>
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

export function EmployeesList(props) {
  const [employees, setemployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filterEmployees,setFilterEmployees] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getAllEmployee = async (pageNumber) => {
    try {
      //  const res = await axios.get("https://restcountries.com/v2/all");
      const res = await axios.get(`/api/employee/getAllEmployee?page=${pageNumber}`);

      setemployees(res.data.result.data);
     setFilterEmployees(res.data.result.data);
      setAllResponse(res.data.result);
      console.log(res.data.result.data)
     
    } catch (error) {
      console.log(error);
    }
  };
  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      width: "200px",   
    },
    {
      name: " Email",
      selector: (row) => row.email,
      width: "270px",     
    },
    {
      name: " Phone",
      selector: (row) => row.phone_number,
      width: "200px",      

    },
    {
      name: "City",
      selector: (row) => row.city,
      width: "200px",      
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      width: "250px",      
    },
    {
      name: "Action",
      cell: (row) => 
        <Link to={`/employee/edit/${row.id}`}>
          <Icon.Edit size={20}></Icon.Edit>
        </Link>,
        width: "100px",      
    },
  ];
  useEffect(() => {
    getAllEmployee(1);
  }, []);

  useEffect(() => {
    const result = employees.filter((employee) => {      
      return employee.name.toLowerCase().match(search.toLowerCase());
    });
   setFilterEmployees(result);
  }, [search]);

  return (
           <React.Fragment>
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
                  <Link to="/employee/create"><Button  color='primary mr-2'>+ Add New Employee</Button></Link>
                  </FormGroup>
                  </Col>
                  </Row>
             <Card>
               <CardHeader><CardTitle>Employee List</CardTitle></CardHeader>
               <CardBody>
               
             
    <div className="data-list list-view">  

        <DataTable
          noHeader
          // title="Country List"
          columns={columns}
          data={filterEmployees}
          pagination
                  paginationServer
              
                  paginationComponent={() => (
                   
                    <div style={{padding:"20px", display: "flex", justifyContent: "flex-end" }}>
                       
            
                  <Pagination 
          activePage={current_page}
          totalItemsCount={total}
          itemsCountPerPage={per_page}
          onChange={(pageNumber)=>getAllEmployee(pageNumber)}
          className="pagination"
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"/>
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
export default EmployeesList;