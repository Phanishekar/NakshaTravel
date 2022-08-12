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

// import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb';

// import AddFlightList from './AddFlightList';
// import EditFlight from './EditFlight';



// export default class FlightList extends Component {
//     constructor(props){
//         super(props);
//         this.state=
//         {
//             users:'',
//             loading:true,
//             user:[],
//         }
//     }  
//     async componentDidMount() {
//       this.getUserData(1)
      
//     }
//     async getUserData(pageNumber) {
//       const res= await axios.get(`api/productandservices/services/getairline?page=${pageNumber}`);
//       console.log(res.data);

//       if(res.data.status==200)
//       {
//         this.setState({
//           users:res.data.AirLine,
//           user:res.data.AirLine.data,
//           loading:false,
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
//     }else if(this.state.total==0)
//     {
//         user_HTML_TABLE= <tr><td style={{color:"#7367f0",textAlign:"center",fontSize:"20px"}} colSpan="6"><h4>No Record Found</h4></td></tr>;
//     }
//     else{
//       user_HTML_TABLE= 
//       this.state.user.map( (item) =>{
//         return(
// <tr className='mt-5 mb-5' key={item.air_line_id}>
//                     <td>{item.air_line_name}</td>
            
//             <td>
//                 <EditFlight id={item.air_line_id} name={item.air_line_name}/>
//             </td>
//           </tr>
          
          
//         )
//       })
//     }
//     return (
//       <React.Fragment>
            // <BreadCrumbs
            //         breadCrumbTitle="Product & Service"
            //         breadCrumbParent="Services"
            //         breadCrumbActive=" Flight"
            //     />
//         <Row>
// <Col lg="6" >
// <FormGroup>
// <Input name="name"
// type='text'
// placeholder='Search By Flight Name'
//  >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <AddFlightList/>
// {/* <Link to="/employee/create"> </Link> */}
// </FormGroup>
// </Col>
// </Row>
//         <Card>
//           <CardHeader>FlightList</CardHeader>
//           <CardBody>
//           <div  style={{overflow:"auto"}}>
//                     <Table striped >
//               <thead>
//                 <tr id='tablelist' >
//                       <th>Flight Name</th>
                      
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



import AddFlightList from "./AddFlightList";
import EditFlight from "./EditFlight";


export function FlightList(props) {
  const [inventory, setinventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterInventory, setFilterInventory] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getAllInventory = async (pageNumber) => {
    try {

      const res = await axios.get(`api/productandservices/services/getairline?page=${pageNumber}`);

      setinventory(res.data.AirLine.data);
      setFilterInventory(res.data.AirLine.data);
      setAllResponse(res.data.AirLine);


    } catch (error) {
      console.log(error);
    }
  };
  const { data, current_page, per_page, total } = allResponse;
  const columns = [
    {
      name: "Flight Name",
      selector: (row) => row.air_line_name,
      width: "800px",
    },
   
    
    {
      name: "Action",
      cell: (row) =>
       
        
        <EditFlight id={row.air_line_id} name={row.air_line_name} />,
      
      width: "100px",
    },
  ];
  useEffect(() => {
    getAllInventory(1);
  }, []);

  useEffect(() => {
    const result = inventory.filter((inventories) => {
      return inventories.air_line_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterInventory(result);
  }, [search]);

  return (
    <React.Fragment>
       <BreadCrumbs
                    breadCrumbTitle="Product & Service"
                    breadCrumbParent="Services"
                    breadCrumbActive=" Flight"
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

        <AddFlightList/>

 
 </Col>
      </Row>
      <br/>
      <br/>
      <Card>
        
        <CardBody>


          <div className="data-list list-view">

            <DataTable
             
              title="Flight List"
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
export default FlightList;
