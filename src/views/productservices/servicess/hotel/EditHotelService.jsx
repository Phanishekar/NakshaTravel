import * as Icon from "react-feather";
import axios from 'axios';
import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Pagination, Row, Table } from 'reactstrap'

import { Redirect } from 'react-router-dom';
import {Meal,Occupiency,Bed,tax} from "views/country/CountryList"
import SingleSelect from "components/common/formBasic/singleSelect";


export default class EditHotelService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel_id:'',
            hotel_name:'',
            hotel_room_name:'',
            hotel_occupency:'',
            hotel_meal:'',
            hotel_bed:'',
            hotel_price:'',
            hotel_tax:'',
            hotel_description:'',
            hotel_attachment:'',
            hotel_service_active:"",
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      
      toggleActice= async(e)=>{
        let id=this.props.id;
        const resp= await axios.get(`/api/productandservices/services/hotelServiceActive/${id}`);
        if(resp.data.status==200)
        {
          toast.warning(resp.data.Result);
              
            //   this.props.history.push(`/productandservice/service/hotel`);
              this.setState({
                modal: !this.state.modal,
                redirect:true,
              });
        }
        else{
          toast.error("Oops! Something went Wrong");
        }
  
        }
      handleSubmit = (e) => {
        var formData='';
        var formData = new FormData(document.querySelector("#edithotelService"));
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
          .post(`api/productandservices/services/updatehotelservice/${this.props.id}`, formData)
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
    handleChange = (e) => {    
        const { name, value,} = e.target;
        this.setState({ [name]: value });
    } 
    async componentDidMount() {
        this.getUserData(1)
        let id=this.props.id;
        console.log(this.props.id);
        if(id!==0)
        {

            const res= await axios.get(`api/productandservices/services/gethotelservicebyid/${id}`);
            console.log(res.data);
      
            if(res.data.status==200)
            {
              this.setState({
                users:res.data.Hotel,
                hotel_id:res.data.Hotel.hotel_id,
                hotel_room_name:res.data.Hotel.hotel_room_name,
                hotel_occupency:res.data.Hotel.hotel_occupency,
                hotel_meal:res.data.Hotel.hotel_meal,
                hotel_bed:res.data.Hotel.hotel_bed,
                hotel_price:res.data.Hotel.hotel_price,
                hotel_tax:res.data.Hotel.hotel_tax,
                hotel_description:res.data.Hotel.hotel_description,
                hotel_attachment:res.data.Hotel.hotel_attachment,
                hotel_service_active:res.data.Hotel.hotel_service_active,
               
              });
            }
        }
 
        
      }
      async getUserData(pageNumber) {
         
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
          url=<Redirect to={`/productandservice/servicess/Redirect1/${this.state.hotel_id}/hotelservice`}/>;
        }


        return (
            <React.Fragment>
              
              <div  >
       
       <Icon.Edit size={20} onClick={this.toggle} style={{color:"#7367f0"}}></Icon.Edit>
       
          </div>
          {url}   
     <Modal  isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}} >
       <ModalHeader style={{height:'80px',alignItems:"center"}} toggle={this.toggle}>Edit {this.props.hotel_name}  Service 
        
       </ModalHeader>
      
        
                <ModalBody>
                
                <div style={{padding:"20px"}}>
                    <form onSubmit={this.handleSubmit} id="edithotelService">
                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                  {this.state.hotel_service_active=="Active"?<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-success mr-2'>{this.state.hotel_service_active}</Button>:<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-danger mr-2'>{this.state.hotel_service_active}</Button>} </div>
                  
                            <Row>
                                <Col>
                                    <FormGroup >
                                    
                                        <Input name="hotel_id"
                                            type='text' placeholder='Enter Your Hotel Name'
                                            value={this.state.hotel_id}
                                            onChange={this.handleChange}
                                            hidden>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                              <Col lg="3"><Label for="room_number">Room Name/Number </Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                        
                                        <Input name='hotel_room_name' type='text'
                                            placeholder='Enter Your Room Name/Number'
                                            value={this.state.hotel_room_name}  onChange={this.handleChange}></Input>
                                    </FormGroup>
                                </Col>
                                </Row>
                            <Row>
                            <Col lg="3"><Label for='occupency'>Occupency</Label></Col>
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
                            <Col lg="3">    <Label for='price'>Price</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                    
                                        <Input type="text"
                                            name="hotel_price" value={this.state.hotel_price}  onChange={this.handleChange}
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
                            <Col lg="3"> <Label for='description' >Description</Label></Col>
                            <Col lg="6" >
                                    <FormGroup>
                                       
                                        <Input type="textarea"
                                            name="hotel_description" value={this.state.hotel_description} onChange={this.handleChange}
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
