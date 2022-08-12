import axios from 'axios';
import React, { Component } from 'react'
import { toast } from 'react-toastify';
import SingleSelect from "components/common/formBasic/singleSelect";
import {Meal} from "views/country/CountryList"
import {
  Button,
  Progress,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  CustomInput,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import { Redirect } from 'react-router-dom';
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


export default class AddTourPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        var formData = new FormData(document.querySelector("#tourPackage"));
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
          .post(`api/productandservices/services/savetourpackage`, formData)
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
        <Button  color='primary mr-2'  id='addbtn' className='ml-2'  onClick={this.toggle}>+ Add Tour Package</Button>
            {/* <button >Add Hotel Details {this.props.buttonLabel} </button>    */}
          </div>
          {url1}       
     <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}} >
       <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Add Tour Package</span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
              <form onSubmit={this.handleSubmit} id="tourPackage">
                  <Row>
                    <Col lg="3"> <Label for="destination">Package Name</Label></Col>
                      <Col lg="6">
                          <FormGroup >
                             
                              <Input name="tour_package_name"
                                  type='text' placeholder='Enter Your Destination'>
                              </Input>
                          </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                    <Col lg="3"> <Label for="destination">Destination</Label></Col>
                      <Col lg="6">
                          <FormGroup >
                             
                              <Input name="tour_package_destination"
                                  type='text' placeholder='Enter Your Destination'>
                              </Input>
                          </FormGroup>
                      </Col>

                  </Row>
                  <Row>
                  <Col lg="3"> <Label for="days">Days</Label></Col>
                      <Col lg="6">
                          <FormGroup >
                             
                              <Input name="tour_package_days"
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
                      <Col lg="3"> <Label for='meal'>Meal</Label></Col>
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
                                  placeholder='Price Per Person'>
                              </Input>
                          </FormGroup>
                      </Col>
                      </Row>
                  <Row>
                      <Col lg="3"><Label for='other' >Other</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                              
                              <Input type="text"
                                  name="tour_package_others"
                                  placeholder='Other'>
                              </Input>
                          </FormGroup>
                      </Col>
                  </Row>
                  <Row>
                  <Col lg="3"> <Label for='transport'> Transport</Label></Col>
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
<Button  type='submit' value="submit" color='primary mr-2'>Submit</Button> </div>
              </form>
              </div>
              </ModalBody>
              </Modal>
     </React.Fragment>
    )
  }
}
