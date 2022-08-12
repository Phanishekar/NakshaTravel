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
export default class AddAssist extends Component {
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
    var formData = new FormData(document.querySelector("#assist"));
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
      .post(`api/productandservices/services/saveassit`, formData)
      .then((response) => {
        if (response.data.status == 200) {
          
          toast.success(response.data.Result);
         
          // this.props.history.push(`/productandservice/service/assist`);
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
    let url="";
    if(this.state.redirect)
    {
      url=<Redirect to={`/productandservice/servicess/Redirect1/0/assist`} />;
    }
    return (
        <React.Fragment>
        <div  >
        <Button  color='primary mr-2'  id='addbtn' className='ml-2'  onClick={this.toggle}>+ Add Assist</Button>
            {/* <button >Add Hotel Details {this.props.buttonLabel} </button>    */}
          </div>
          {url} 
     <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}}>
       <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}> Add Assist</span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
        <form onSubmit={this.handleSubmit} id="assist">
              <Row>
                <Col lg="3" >
                <Label for="meeting_type">Meeting Type</Label></Col>
                            <Col lg="6" >
                                <FormGroup>
                                   
                                    <Input name='asisst_meeting_type' type='text'
                                        placeholder='Enter Your Meeting Type'></Input>
                                </FormGroup>
                            </Col>
                            </Row>
              <Row>
                            <Col lg="3"> <Label for='airport_name'>Airport Name</Label></Col>
                            <Col lg="6" >
                                <FormGroup>
                                   
                                    <Input type="text"
                                        name="asisst_airport_name"
                                        placeholder='Airport Name'>
                                    </Input>
                                </FormGroup>
                            </Col>
      
                        </Row>
              <Row>
                <Col lg="3"> <Label for="no_of_persons">No of Persons</Label></Col>
                            <Col lg="6" >
                                <FormGroup>
                                   
                                    <Input name='asisst_num_of_person' type='number'
                                        placeholder='Enter Your No of Persons'></Input>
                                </FormGroup>
                            </Col>
                            </Row>
              <Row>
                            <Col lg="3"> <Label for='price'>Price</Label></Col>
                            <Col lg="6" >
                                <FormGroup>
                                   
                                    <Input type="number"
                                        name="asisst_price"
                                        placeholder='Price'>
                                    </Input>
                                </FormGroup>
                            </Col>
      
                        </Row>
                        <Row>
                        <Col lg="3">  <Label for='Description'>Description</Label></Col>
                          <Col lg="6">
                          <FormGroup>
                                  
                                    <Input type="textarea"
                                        name="asisst_description"
                                        placeholder='Description'>
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
