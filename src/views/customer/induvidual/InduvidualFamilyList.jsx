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
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import Pagination from 'react-js-pagination';
// import * as Icon from "react-feather";

// import "assets/scss/pages/data-list.scss";


// export default class InduvidualFamilyList extends Component {
  
//     constructor(props){
//         super(props);
//         this.state=
//         {
//             users:'',
//             loading:true,
//             user:[],
//             columns: [
//               {
//                 name: <b>Employee Name</b>,
//                 selector: "induvidual_family_first_name",
//                 sortable: true,
//                 width: "200px",
//               },
            
//               {
//                 name: <b>Email</b>,
//                 selector: "induvidual_family_email",
//                 sortable: true,
//                 width: "350px",
           
              
//               },
//               {
//                 name: <b>City</b>,
//                 selector: "induvidual_family_permanent_city",
//                 sortable: true,
//                 width: "200px",
//               },
//               {
//                 name: <b>Country</b>,
//                 selector: "induvidual_family_permanent_country",
//                 sortable: true,
//                 width: "200px",
                
               
//               },
            
//               {
//                 name: <b>Action</b>,
                
//               cell:(row)=> <Link to={`/customer/induvidual/editfamily/${row.induvidual_customer_family_id}`}>
//               <Icon.Edit size={20} ></Icon.Edit>
//               </Link>,
//                 width: "100px",
                
//               },
        
              
//             ],
//         }
//     }  
//     async componentDidMount() {
//       this.getUserData(1)
//     }
   

//     async getUserData(pageNumber) {
//       const resp= await axios.get(`/api/induvidualcustomer/getFamily/${this.props.id}?page=${pageNumber}`);
//       console.log(resp.data);

//       if(resp.data.status==200)
//       {
//         this.setState({
//           users:resp.data.customer,
//           user:resp.data.customer.data,
//           loading:false,
//         });
//       }
//     }
    
//   render() {
    
//     const{data,current_page,per_page,total}=this.state.users;
    
//     return (
//       <React.Fragment>
      

//           <Card> 
//                   <CardHeader><CardTitle>Employee Family List</CardTitle></CardHeader>
//               <CardBody>
                  
//         <Row>
// <Col lg="6" >
// <FormGroup>
// <Input name="name"
// type='text'
// placeholder='Search By Company Name'
//  >
// </Input>
// </FormGroup>
// </Col>
// <Col lg="4" >
// <FormGroup>
// <Link to={`/customer/induvidual/addfamily/${this.props.id}`}><Button  color='primary mr-2' >+ ADD Individual Family</Button> </Link>
// </FormGroup>
// </Col>
// </Row>
// </CardBody>
           
//           <div className="data-list list-view">
//           <DataTable 
//           noHeader
//         SearchBar
//         columns={this.state.columns}
//         data={data}
//         pagination
//         paginationServer
//         paginationComponent={() => (
         
//           <div style={{padding:"20px", display: "flex", justifyContent: "flex-end" }}> 
  
//         <Pagination 
// activePage={current_page}
// totalItemsCount={total}
// itemsCountPerPage={per_page}
// onChange={(pageNumber)=>this.getUserData(pageNumber)}
// className="pagination"
// itemClass="page-item"
// linkClass="page-link"
// firstPageText="First"
// lastPageText="Last"
// /></div>)}
//   responsive
//   pointerOnHover
//   fixedHeader
//   fixedHeaderScrollHeight='500px'

//             />
//           </div>

        
//           </Card>

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

export function InduvidualFamilyList(props) {
  const [compnanys, setCompnanys] = useState([]);
  const [search, setSearch] = useState("");
  const [filtercontries, setFiltercontries] = useState("");
  const [allResponse, setAllResponse] = useState("");

  const getContry = async (pageNumber) => {
    try {
      
      const res = await axios.get(`/api/individualcustomer/getFamily/${props.id}?page=${pageNumber}`);

      setCompnanys(res.data.customer.data);
      setFiltercontries(res.data.customer.data);
      setAllResponse(res.data.customer);
      console.log(res.data.customer.data)
     
    } catch (error) {
      console.log(error);
    }
  };
  const{data,current_page,per_page,total}=allResponse;
  const columns = [
    {
     
      name: <b>Family Member Name</b>,
      selector: (row) => row.individual_family_name,
      width: "200px",
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.individual_family_email,
      width: "300px",
    },
    {
      name: <b>Phone</b>,
      selector: (row) => row.individual_family_phone_number,
      width: "200px",
    },
    {
      name: <b>City</b>,
      selector: (row) => row.individual_family_residential_city,
      width: "150px",
    },
    {
      name: <b>Relationship</b>,
      selector: (row) => row.relationship_name,
      width: "150px",
    },
    
    {
      name:<b>Edit</b>,
      cell: (row) => (
        <Link to={`/customer/induvidual/editfamily/${row.individual_customer_family_id}`}>
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
      
      return company.individual_family_name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercontries(result);
  }, [search]);

  return (
           <React.Fragment>
             <Card>
               <CardHeader><CardTitle> {props.nameq} {props.namew} Family List</CardTitle></CardHeader>
               <CardBody>
               
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
<Link to={`/customer/induvidual/addfamily/${props.id}`}><Button  color='primary mr-2'>+ Add Family</Button> </Link>
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
  );
}

export default InduvidualFamilyList;
