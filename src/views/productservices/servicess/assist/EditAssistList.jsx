import React, { Component } from 'react'
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
import { Link } from 'react-router-dom'
import * as Icon from "react-feather";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class EditAssistList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asisst_meeting_type:'',
            asisst_airport_name:'',
            asisst_num_of_person:'',
            asisst_price:'',
            asisst_description:'',
            
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
        var formData = new FormData(document.querySelector("#editassist"));
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
          .post(`api/productandservices/services/updateassit/${this.props.id}`, formData)
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
    
            const res= await axios.get(`/api/productandservices/services/getassitbyid/${id}`);
            console.log(res.data);
      
            if(res.data.status==200)
            {
              this.setState({
                users:res.data.assist,
                asisst_meeting_type:res.data.assist.asisst_meeting_type,
                asisst_airport_name:res.data.assist.asisst_airport_name,
                asisst_num_of_person:res.data.assist.asisst_num_of_person,
                asisst_price:res.data.assist.asisst_price,
                asisst_description:res.data.assist.asisst_description,
               
              });
            }
        }
    
        
      }
      async getUserData(pageNumber) {
         
      }
  render() {
    let url1="";
    if(this.state.redirect)
    {
      url1=<Redirect to={`/productandservice/servicess/Redirect1/1/assist`} />;
    }
    return (
      <React.Fragment>
            
      <div  >
       
        <Icon.Edit size={20} onClick={this.toggle} style={{color:"#7367f0"}}></Icon.Edit> 
       
          </div>
          {url1}
          <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}}>
       <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Edit Assist</span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
                <form onSubmit={this.handleSubmit} id="editassist">
              <Row>
              <Col lg="3" ><Label for="meeting_type">Meeting Type</Label></Col>
                            <Col lg="6" >
                                <FormGroup>
                                    
                                    <Input name='asisst_meeting_type' type='text'value={this.state.asisst_meeting_type} onChange={this.handleChange}
                                        placeholder='Enter Your Meeting Type'></Input>
                                </FormGroup>
                            </Col>
                            </Row>
              <Row>
                            <Col lg="3" > <Label for='airport_name'>Airport Name</Label></Col>
                            <Col lg="6" >
                                <FormGroup>
                                   
                                    <Input type="text"
                                        name="asisst_airport_name"value={this.state.asisst_airport_name} onChange={this.handleChange}
                                        placeholder='Airport Name'>
                                    </Input>
                                </FormGroup>
                            </Col>
      
                        </Row>
              <Row>
              <Col lg="3" ><Label for="no_of_persons">No of Persons</Label></Col>
                            <Col lg="6" >
                                <FormGroup>
                                    
                                    <Input name='asisst_num_of_person' type='number'value={this.state.asisst_num_of_person} onChange={this.handleChange}
                                        placeholder='Enter Your No of Persons'></Input>
                                </FormGroup>
                            </Col>
                            </Row>
              <Row>
                            <Col lg="3" ><Label for='price'>Price</Label></Col>
                            <Col lg="6" >
                                <FormGroup>
                                    
                                    <Input type="number"
                                        name="asisst_price"value={this.state.asisst_price} onChange={this.handleChange}
                                        placeholder='Price'>
                                    </Input>
                                </FormGroup>
                            </Col>
      
                        </Row>
                        <Row>
                        <Col lg="3" ><Label for='Description'>Description</Label></Col>
                          <Col lg="6">
                          <FormGroup>
                                    
                                    <Input type="textarea"
                                        name="asisst_description"value={this.state.asisst_description} onChange={this.handleChange}
                                        placeholder='Description'>
                                    </Input>
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
