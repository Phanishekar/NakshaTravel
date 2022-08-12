import React, { Component } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { Link } from 'react-router-dom';
import * as Icon from "react-feather";
import { Redirect } from 'react-router-dom';
export default class EditCarHire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car_hire_vehicle_type:'',
            car_hire_days:'',
            car_hire_amount:'',
            car_hire_description:"",
            
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
        var formData = new FormData(document.querySelector("#editcarhire"));
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
          .post(`api/productandservices/services/updatecarhire/${this.props.id}`, formData)
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
    
            const res= await axios.get(`/api/productandservices/services/getcarhirebyid/${id}`);
            console.log(res.data);
      
            if(res.data.status==200)
            {
              this.setState({
                users:res.data.Result,
                car_hire_vehicle_type:res.data.Result.car_hire_vehicle_type,
                car_hire_days:res.data.Result.car_hire_days,
                car_hire_amount:res.data.Result.car_hire_amount,
                car_hire_description:res.data.Result.car_hire_description,
               
               
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
      url1=<Redirect to={`/productandservice/servicess/Redirect1/1/carhire`} />;
    }
    return (
     <React.Fragment>
         <div  >
       
       <Icon.Edit size={20} onClick={this.toggle} style={{color:"#7367f0"}}></Icon.Edit> 
       
          </div>
          {url1}         
          <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}} >
       <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Edit CarHire</span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
                    <form onSubmit={this.handleSubmit} id="editcarhire">
        <Row>
        <Col lg="3">  <Label for="type_of_vehicle">Type of Vehicle</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                            
                              <Input name='car_hire_vehicle_type' type='text'value={this.state.car_hire_vehicle_type} onChange={this.handleChange}
                                  placeholder='Enter Your Type of Vehicle'></Input>
                          </FormGroup>
                      </Col>
                      </Row>
        <Row>
                      <Col lg="3"><Label for='select_days'>Select Days</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                              
                              <Input type="text"
                                  name="car_hire_days"value={this.state.car_hire_days} onChange={this.handleChange}
                                  placeholder='Select Days'>
                              </Input>
                          </FormGroup>
                      </Col>

                  </Row>
        <Row>
          <Col lg="3"> <Label for="amount">Amount</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                             
                              <Input name='car_hire_amount' type='number'value={this.state.car_hire_amount} onChange={this.handleChange}
                                  placeholder='Enter Your Amount'></Input>
                          </FormGroup>
                      </Col>
                      </Row>
        <Row>
                      <Col lg="3"><Label for='description'>Description</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                              
                              <Input type="text"value={this.state.car_hire_description} onChange={this.handleChange}
                                  name="car_hire_description"
                                  placeholder='description'>
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
