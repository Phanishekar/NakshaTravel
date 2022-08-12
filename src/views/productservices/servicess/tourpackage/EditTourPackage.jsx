import { Select } from '@mui/material'
import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb'
import React, { Component } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Pagination, Row, Table } from 'reactstrap'
import axios from "axios";
import { Link } from 'react-router-dom'
import * as Icon from "react-feather";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import SingleSelect from "components/common/formBasic/singleSelect";
import {Meal} from "views/country/CountryList"
 const HotelTypet = [
  { value: '2 Star', label: '2 Star' },
  { value: '3 Star', label: '3 Star' },
  { value: '5 Star', label: '5 Star' },
  { value: '7 Star', label: '7 Star' },
];
 const Transportation1 = [
  { value: 'YES', label: 'YES' },
  { value: 'NO', label: 'NO' },
 
];



export default class EditTourPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tour_package_name:'',
            tour_package_destination:'',
            tour_package_days:'',
            tour_package_hotel_type:'',
            tour_package_meal:'',
            tour_package_trasport:'',
            tour_package_others:'',
            tour_package_price_per_person:'',
            
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      
    
      handleSubmit = (e) => {
        var formData='';
        var formData = new FormData(document.querySelector("#edittourpackage"));
        let i=0,Name=[],Data=[];
        for(var pair of formData.entries())
        {
          console.log(pair[0],pair[1]);
          Name[i]=pair[0];
          Data[i]=pair[1];
          i++;
        }
    
        for(var j=0;j<i;j++ )
        {
          formData.append(Name[i],Data[i]);
        }
          e.preventDefault();
          axios
          .post(`api/productandservices/services/updatetourpackage/${this.props.id}`, formData)
          .then((response) => {
            if (response.data.status == 200) {
              toast.success(response.data.Result);
              // this.props.history.push(`/productandservice/service/tourpackage`);
              this.setState({
                modal: !this.state.modal,
                redirect:true,
              });
            } else {
              toast.error(response.data.Result);
            }
          })
          .catch((error) => {
            toast.error(error.Result);
          });
    
        
        
    }    
    handleChange = (e) => {    
        const { name, value,} = e.target;
        this.setState({ [name]: value });
    } 
    async componentDidMount() {
        this.getUserData(1)
        let id=this.props.id;
        console.log(this.props.name);
        if(id!==0)
        {
    
            const res= await axios.get(`/api/productandservices/services/gettourpackagebyid/${id}`);
            console.log(res.data);
      
            if(res.data.status==200)
            {
              this.setState({
                users:res.data.tourpackage,
                tour_package_name:res.data.tourpackage.tour_package_name,
                tour_package_destination:res.data.tourpackage.tour_package_destination,
                tour_package_days:res.data.tourpackage.tour_package_days,
                tour_package_hotel_type:res.data.tourpackage.tour_package_hotel_type,
                tour_package_meal:res.data.tourpackage.tour_package_meal,
                tour_package_trasport:res.data.tourpackage.tour_package_trasport,
                tour_package_others:res.data.tourpackage.tour_package_others,
                tour_package_price_per_person:res.data.tourpackage.tour_package_price_per_person,
               
              });
            }
        }
    
        
      }
      async getUserData(pageNumber) {
         
      }
      getValuesFn = (data) => {
     
        if (data.id == "tour_package_hotel_type") {
          this.setState({
            tour_package_hotel_type:data.value,
    
          });  
        }
       
       else if (data.id == "tour_package_meal") {
          this.setState({
            tour_package_meal:data.value,
          });
        }
      
       else if (data.id == "tour_package_trasport") {
          this.setState({
            tour_package_trasport:data.value,
          });
        }
      }
  render() {
    let url1="";
    if(this.state.redirect)
    {
      url1=<Redirect to={`/productandservice/servicess/Redirect1/1/tourpackage`} />;
    }
    return (
      <React.Fragment>
                       
                       <div  >
       
      <Icon.Edit size={20} onClick={this.toggle} style={{color:"#7367f0"}}></Icon.Edit> 
       
          </div>
          {url1}        
     <Modal  isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}} >
       <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Edit {this.props.name}  Service </span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
                    <form onSubmit={this.handleSubmit} id="edittourpackage">
                  <Row>
                    <Col lg="3"><Label for="destination">Package Name</Label></Col>
                      <Col lg="6">
                          <FormGroup >
                              
                              <Input name="tour_package_name"value={this.state.tour_package_name} onChange={this.handleChange}
                                  type='text' placeholder='Enter Your Destination'>
                              </Input>
                          </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                    <Col lg="3"><Label for="destination">Destination</Label></Col>
                      <Col lg="6">
                          <FormGroup >
                              
                              <Input name="tour_package_destination"value={this.state.tour_package_destination} onChange={this.handleChange}
                                  type='text' placeholder='Enter Your Destination'>
                              </Input>
                          </FormGroup>
                      </Col>

                  </Row>
                  <Row>
                  <Col lg="3"><Label for="days">Days</Label></Col>
                      <Col lg="6">
                          <FormGroup >
                              
                              <Input name="tour_package_days"value={this.state.tour_package_days} onChange={this.handleChange}
                                  type='text' placeholder='Enter Your Days'>
                              </Input>
                          </FormGroup>
                      </Col>
                  </Row>
                
                  <Row>
                  <Col lg="3">  <Label for="hotel_type">Hotel Type</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                            
                           
                          <SingleSelect    name="tour_package_hotel_type"
                          
                          selectedValue={this.state.tour_package_hotel_type}
                          options={HotelTypet}
                          getValuesFn={this.getValuesFn}
                          >
                            
                  </SingleSelect></FormGroup>
                      </Col>
                      </Row>
                
                  <Row>
                  <Col lg="3">   <Label for='meal'>Meal</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                           
                           
                              <SingleSelect    name="tour_package_meal"
                          
                          selectedValue={this.state.tour_package_meal}
                          options={Meal}
                          getValuesFn={this.getValuesFn}
                          >
                            
                  </SingleSelect>
                          </FormGroup>
                      </Col>

                  </Row>
                  
                  <Row> 
                  <Col lg="3">  <Label for='price_per_person' >Price Per Person</Label></Col>
                   <Col lg="6" >
                          <FormGroup>
                            
                              <Input type="text"
                                  name="tour_package_price_per_person"
                                  placeholder='Price Per Person' 
                                  value={this.state.tour_package_price_per_person}
                                  onChange={this.handleChange}>
                              </Input>
                          </FormGroup>
                      </Col>
                     
                      </Row>
                
                <Row>
                <Col lg="3"> <Label for='other' >Other</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                             
                              <Input type="text"
                                  name="tour_package_others"
                                  placeholder='Other'
                                  value={this.state.tour_package_others}
                                  onChange={this.handleChange}>
                              </Input>
                          </FormGroup>
                      </Col>
                  </Row>
                  <Row>
                  <Col lg="3"><Label for='transport'>Transport</Label></Col>
                  <Col lg="6" >
                          <FormGroup>
                          
                              
                              <SingleSelect    name="tour_package_trasport"
                          
                          selectedValue={this.state.tour_package_trasport}
                          options={Transportation1}
                          getValuesFn={this.getValuesFn}
                          >
                            
                  </SingleSelect>
                          </FormGroup>
                      </Col>

                     
                  

                     
                  </Row>
                 <hr></hr>
                
                  
                  <div style={{display:"flex",justifyContent:"flex-end"}}>
<Button  type='submit' value="submit" color='primary mr-2'>Update</Button> </div>
              </form>
</div>
         </ModalBody>
         </Modal>
      </React.Fragment>
    )
  }
}
