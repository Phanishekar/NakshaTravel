import Axios from 'axios';
import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
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

export default class AddInsurance extends Component {
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
        var formData = new FormData(document.querySelector("#insurance"));
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
          Axios
          .post(`api/productandservices/services/saveinsurancedetails`, formData)
          .then((response) => {
            if (response.data.status == 200) {
              toast.success("");
              // this.props.history.push(`/productandservice/service/hotel`);
              this.setState({
                modal: !this.state.modal,
                redirect:true,
              });
            } else {
              toast.error("");
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
      url=<Redirect to={`/productandservice/servicess/Redirect1/${this.props.id}/insuranceplan`}/>;
    }
    return (
      <React.Fragment>
     <div  >
        <Button  color='primary mr-2'  id='addbtn' className='ml-2'  onClick={this.toggle}>+  ADD Insurance Plan</Button>
            {/* <button >Add Hotel Details {this.props.buttonLabel} </button>    */}
          </div>
          {url}  
     <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}}>
       <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Add Insurance</span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
        <form onSubmit={this.handleSubmit} id="insurance">
        <Input name='insurence_company_id' type='text' value={this.props.id}
                                  placeholder='Enter Your Select Company' hidden></Input>
  <Row>
    <Col lg="3">  <Label for='select_plan'>Select Plan</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                            
                              <Input type="text"
                                  name="insurence_plan"
                                  placeholder='Add Plan'>
                              </Input>
                          </FormGroup>
                      </Col>

                  </Row>
        <Row>
        <Col lg="3"> <Label for="select_daysORyears">Select Days/Years</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                             
                              <Input name='insurence_dateORyears' type='date'
                                  placeholder='Enter Your  Days/Years'></Input>
                          </FormGroup>
                      </Col>
                      </Row>
                  <Row>
                  <Col lg="3"><Label for='price'>Price</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                              
                              <Input type="number"
                                  name="insurence_price"
                                  placeholder='Price'>
                              </Input>
                          </FormGroup>
                      </Col>

                  </Row>
                  <Row>
                  <Col lg="3"><Label for='Description'>Description</Label></Col>
                    <Col lg="6">
                    <FormGroup>
                              
                              <Input type="textarea"
                                  name="insurence_description"
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
