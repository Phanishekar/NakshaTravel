import { Icon, Select } from '@mui/material'
import Axios from 'axios';
import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Pagination, Row, Table } from 'reactstrap'
import { Redirect } from 'react-router-dom';
import {Meal,Occupiency,Bed,tax} from "views/country/CountryList"
import SingleSelect from "components/common/formBasic/singleSelect";

export default class AddHotelService extends Component {
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
        var formData = new FormData(document.querySelector("#hotelService"));
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
          .post(`api/productandservices/services/savehotelservice`, formData)
          .then((response) => {
            if (response.data.status == 200) {
              toast.success(response.data.Result);
            //   this.props.history.push(`/productandservice/service/hotel`);
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
     
        if (data.id == "hotel_occupency") {
          this.setState({
            hotel_occupency:data.value,
    
          });  
        }
       
       else if (data.id == "hotel_meal") {
          this.setState({
            hotel_meal:data.value,
          });
        }
       else if (data.id == "hotel_bed") {
          this.setState({
            hotel_bed:data.value,
          });
        }
       else if (data.id == "hotel_tax") {
          this.setState({
            hotel_tax:data.value,
          });
        }
    }

    render() {
        let url="";
        if(this.state.redirect)
        {
          url=<Redirect to={`/productandservice/servicess/Redirect1/${this.props.hotel_id}/hotelservice`}/>;
        }

        return (
            <React.Fragment>
              
              <div  >
        <Button  color='primary mr-2'  id='addbtn' className='ml-2'  onClick={this.toggle}>+ ADD Hotel Service</Button>
       
          </div>
          {url}     
     <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}}>
       <ModalHeader style={{height:'80px',alignItems:"center"}} toggle={this.toggle}>Add {this.props.hotel_name} Hotel Service </ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
                    <form onSubmit={this.handleSubmit} id="hotelService">
                           
                            <Row>
                        
                                <Col >
                                    <FormGroup >
                                       
                                        <Input name="hotel_id"
                                            type='text' placeholder='Enter Your Hotel Name'
                                            value={this.props.hotel_id}
                                            hidden>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                            <Col lg="3"> <Label for="room_number">Room Name/Number</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                       
                                        <Input name='hotel_room_name' type='text'
                                            placeholder='Enter Your Room Name/Number'></Input>
                                    </FormGroup>
                                </Col>
                                </Row>
                            <Row>
                            <Col lg="3">  <Label for='occupency'>Occupency</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                      
                                        <SingleSelect    name="hotel_occupency"
                          
                          selectedValue={this.state.hotel_occupency}
                          options={Occupiency}
                          getValuesFn={this.getValuesFn}
                          >
                            
                  </SingleSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                            <Col lg="3"> <Label for='meal'>Meal</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                       
                                        <SingleSelect    name="hotel_meal"
                          
                          selectedValue={this.state.hotel_meal}
                          options={Meal}
                          getValuesFn={this.getValuesFn}
                          >
                            
                  </SingleSelect>
                                    </FormGroup>
                                </Col>
                                </Row>
                            <Row>
                            <Col lg="3"> <Label for='bed' >Bed</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                       
                                        <SingleSelect    name="hotel_bed"
                          
                          selectedValue={this.state.hotel_bed}
                          options={Bed}
                          getValuesFn={this.getValuesFn}
                          >
                            
                  </SingleSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                            <Col lg="3"><Label for='price'>Price</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                        
                                        <Input type="text"
                                            name="hotel_price"
                                            placeholder='Price'>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                </Row>
                            <Row>
                            <Col lg="3"><Label for='tax' >Tax</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                        
                                        <SingleSelect    name="hotel_tax"
                          
                          selectedValue={this.state.hotel_tax}
                          options={tax}
                          getValuesFn={this.getValuesFn}
                          >
                            
                  </SingleSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                              <Col lg="3"><Label for='description' >Description</Label></Col>
                            <Col lg="6" >
                                    <FormGroup>
                                        
                                        <Input type="textarea"
                                            name="hotel_description"
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
