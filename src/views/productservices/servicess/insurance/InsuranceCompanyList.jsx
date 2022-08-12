// import "assets/scss/pages/data-list.scss";
// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import * as Icon from "react-feather";
// import { NavLink, Link, useParams } from "react-router-dom";
// import Pagination from 'react-js-pagination';

// import {
//   Button,
//   Progress,
//   UncontrolledDropdown,
//   DropdownMenu,
//   DropdownToggle,
//   DropdownItem,
//   Input,
//   Label,
  
//   Col,
//   Table,
//   Card,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   Row,
//   FormGroup,
// } from "reactstrap";

// import EditInsuranceDetails from "./EditInsuranceDetails";
// import AddInsurance from "./AddInsurance";

// export function InsuranceCompanyList(props) {
//   const [hotel, sethotel] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filtercontries, setFiltercontries] = useState("");
//   const [allResponse, setAllResponse] = useState("");

//   const getContry = async (pageNumber) => {
//     try {
//      let id=props.id;
//       const res = await axios.get(`/api/productandservices/services/insurancedetails/${id}?page=${pageNumber}`);
//      console.log(res);
//       sethotel(res.data.insurance_details.data);
//       setFiltercontries(res.data.insurance_details.data);
//       setAllResponse(res.data.insurance_details);
//       console.log(res.data.insurance_details.data)
     
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const{data,current_page,per_page,total}=allResponse;
//   const columns = [
//     {
      
//       name: <b>Hotel Name</b>,
//       selector: (row) => row.insurence_plan,
//       width: "200px",
//     },
//     {  
//       name: <b>Hotel Type</b>,
//       selector: (row) => row.insurence_dateORyears,
//       width: "300px",
//     },
  
//     {
//       name: <b>City</b>,
//       selector: (row) => row.insurence_price,
//       width: "190px",
//     },
   
   
    
//     {
//       name:<b>Edit</b>,
//       cell: (row) => (
//         // <Link to={`/productandservice/servicess/hotel/edit/${row.hotel_service_id}}`}>
//         //   <Icon.Edit size={20}></Icon.Edit>
//         // </Link>
//         <EditInsuranceDetails id={row.hotel_service_id} />
//       ),
//     },
//   ];
//   useEffect(() => {
//     getContry(1);
//   }, []);

//   useEffect(() => {
//     const result = hotel.filter((company1) => {
//       console.log(company1)
//      return company1.hotel_name.toLowerCase().match(search.toLowerCase());
//     });
//     setFiltercontries(result);
//   }, [search]);


//   return (
//            <React.Fragment>
    
//              <Card>
//              <CardHeader><CardTitle><h4>{props.name} service List</h4></CardTitle></CardHeader>
              
//                <CardBody>
              
//                <Row>

// <Col lg="6">
// <Input
// type="text"
// placeholder="Search here"

// value={search}
// onChange={(e) => setSearch(e.target.value)}
// />
// </Col>
// <Col lg="4" >
// <FormGroup>
// <AddInsurance id={props.id} name={props.name}  />
// </FormGroup>
// </Col>
// </Row>
               
             

//     <div className="data-list list-view">  
   
//         <DataTable
//           noHeader
//           // title="Country List"
//           columns={columns}
//           data={filtercontries}
//           pagination
//                   paginationServer
              
//                   paginationComponent={() => (
                   
//                     <div style={{padding:"20px", display: "flex", justifyContent: "flex-end" }}>
                       
            
//                   <Pagination 
//           activePage={current_page}
//           totalItemsCount={total}
//           itemsCountPerPage={per_page}
//           onChange={(pageNumber)=>getContry(pageNumber)}
//           className="pagination"
//           itemClass="page-item"
//           linkClass="page-link"
//           firstPageText="First"
//           lastPageText="Last"
          
//           /></div>)}
//             responsive
//           fixedHeader
//           fixedHeaderScrollHeight="500px"
//           highlightOnHover
  
//         />
//       </div>
//       </CardBody>
//       </Card>
//       </React.Fragment>
//   );
// }

// export default InsuranceCompanyList;
  
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
import EditInsuranceDetails from "./EditInsuranceDetails";
import AddInsurance from "./AddInsurance";



// import AddFlightList from "./AddFlightList";
// import EditFlight from "./EditFlight";


export function InsuranceCompanyList(props) {
  const [inventory, setinventory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterInventory, setFilterInventory] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getAllInventory = async (pageNumber) => {
    try {
      let id=props.id;
      const res = await axios.get(`/api/productandservices/services/insurancedetails/${id}?page=${pageNumber}`);

      setinventory(res.data.insurance_details.data);
      setFilterInventory(res.data.insurance_details.data);
      setAllResponse(res.data.insurance_details);


    } catch (error) {
      console.log(error);
    }
  };
  const { data, current_page, per_page, total } = allResponse;
  const columns = [
    {
      name: "Flight Name",
      selector: (row) => row.insurence_plan,
      width: "800px",
    },
   
    
    {
      name: "Action",
      cell: (row) =>
       
        
      <EditInsuranceDetails id={row.insurence_detail_id} />,
      
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
       
      
      <br/>
      <br/>
      <Card>
        <CardHeader><CardTitle>{props.name} Insurance Plans</CardTitle></CardHeader>
        <CardBody>
        <Row>
        <Col lg="6">
          <Input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col lg="4" >

        <AddInsurance id={props.id} name={props.name}  />

 
 </Col>
      </Row>

          <div className="data-list list-view">

            <DataTable
              noHeader
              // title="Country List"
              columns={columns}
              data={filterInventory}
              pagination
              paginationServer

              paginationComponent={() => (

                <div style={{ padding: "20px", display: "flex", justifyContent: "flex-end" }}>


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
export default InsuranceCompanyList;
