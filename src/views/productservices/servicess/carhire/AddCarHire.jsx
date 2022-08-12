import axios from 'axios';
import React, { Component } from 'react'
import { toast } from 'react-toastify';
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
  Card,
} from "reactstrap";
import { Redirect } from 'react-router-dom';

export default class AddCarHire extends Component {
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
        var formData = new FormData(document.querySelector("#carhire"));
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
          .post(`api/productandservices/services/savecarhire`, formData)
          .then((response) => {
            if (response.data.status == 200) {
              toast.success(response.data.Result);
              // this.props.history.push(`/productandservice/service/carhire`);
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
  render() {
    let url1="";
    if(this.state.redirect)
    {
      url1=<Redirect to={`/productandservice/servicess/Redirect1/1/carhire`} />;
    }
    return (
      <React.Fragment>
           <div  >
        <Button  color='primary mr-2'  id='addbtn' className='ml-2'  onClick={this.toggle}>+ Add CarHire</Button>
            {/* <button >Add Hotel Details {this.props.buttonLabel} </button>    */}
          </div>
                  {url1}    
     <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}} >
       <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Add CarHire</span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
            <form onSubmit={this.handleSubmit} id="carhire">
        <Row>
          <Col lg="3"> <Label for="type_of_vehicle">Type of Vehicle</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                             
                              <Input name='car_hire_vehicle_type' type='text'
                                  placeholder='Enter Your Type of Vehicle'></Input>
                          </FormGroup>
                      </Col>
                      </Row>
        <Row>
                      <Col lg="3"><Label for='select_days'>Select Days</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                              
                              <Input type="text"
                                  name="car_hire_days"
                                  placeholder='Select Days'>
                              </Input>
                          </FormGroup>
                      </Col>

                  </Row>
        <Row>
        <Col lg="3"><Label for="amount">Amount</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                              
                              <Input name='car_hire_amount' type='number'
                                  placeholder='Enter Your Amount'></Input>
                          </FormGroup>
                      </Col>
                      </Row>
        <Row>
                      <Col lg="3"><Label for='description'>Description</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                              
                              <Input type="text"
                                  name="car_hire_description"
                                  placeholder='description'>
                              </Input>
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
