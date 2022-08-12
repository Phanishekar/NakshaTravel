import React, { Component } from 'react';
import { Modal,  ModalHeader, ModalBody,  FormGroup,formGroup,Row,Col,form,Label,Input,Button, } from 'reactstrap';
import Select from 'react-select'
import axios from "axios";
import { toast } from "react-toastify";
import {country} from "./../../../country/CountryList"
import { Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';

const HotelType = [
  { value: 'Resort', label: 'Resort' },
  { value: 'Home Stay', label: 'Home Stay' },
  { value: 'Rental', label: 'Rental' },
  { value: 'Tent', label: 'Tent' }
]


export default class AddHotelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          redirect:false,
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
        var formData = new FormData(document.querySelector("#hotelNames"));
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
          .post(`api/productandservices/services/savehotel`, formData)
          .then((response) => {
            if (response.data.status == 200) {
              toast.success(response.data.Result);
              console.log(response);
              // this.props.history.push(`/customer/corporate/`);
             
              this.setState({
                modal: !this.state.modal,
                redirect:true,
              });
              // browserHistory.push("/path");
              
              
            } else {
              toast.error("pls check all feilds");
            }
          })
          .catch((error) => {
            toast.error("Cant add Record");
          });
        
        
        
    }    

   
      render() {

        let url="";
        if(this.state.redirect)
        {
          url=<Redirect to='/productandservice/servicess/Redirect1/1/hotel'/>;
        }
        return <React.Fragment>
        <div  >
        <Button  color='primary mr-2'  id='addbtn' className='ml-2'  onClick={this.toggle}>+ Add Hotel</Button>
            {/* <button >Add Hotel Details {this.props.buttonLabel} </button>    */}
          </div>
          {url} 
     <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}} >
       <ModalHeader style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Add Hotel</span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
                    <form onSubmit={this.handleSubmit} id="hotelNames">
                <Row>
                <Col lg="3"> <Label>Hotel Type</Label></Col>
                    <Col lg="6">
                    <FormGroup>
                            
                               <Select  name="hotel_type" 
                               options={HotelType} />
                               </FormGroup>
                     </Col>
                </Row>
                
                <Row>
                <Col lg="3"><Label>Hotel Name</Label></Col>
                <Col lg="6">
                <FormGroup>
                               <Input name="hotel_name" type='text' 
                               placeholder='Hotel Name' ></Input>
                               </FormGroup>
                            </Col>
                  
                </Row>
               
                <Row>
                <Col lg="3"> <Label>Address Line 1</Label></Col>
                              <Col lg="6">
                              <FormGroup>
                               <Input name="hotel_addres" type='textarea' placeholder='Address Line 1' ></Input>
                               </FormGroup>
                               </Col>
                               </Row>
               
                <Row>
                <Col lg="3"> <Label>Address Line 2</Label></Col>
                              <Col lg="6">
                              <FormGroup>
                               <Input name="hotel_addres2" type='textarea' placeholder='Address Line 2' ></Input>
                               </FormGroup>
                               </Col>

                </Row>
                
                <Row>
                <Col lg="3"><Label>City</Label></Col>
                <Col lg="6">
                <FormGroup>
                               <Input name="hotel_city"placeholder='City'
                               type="text" />
                               </FormGroup>
                     </Col>
                     </Row>
               
               <Row>
               <Col lg="3"><Label>State</Label></Col>
               <Col lg="6">
               <FormGroup>
                             <Input name="state"placeholder='State'
                               type="text" />
                               </FormGroup>
                     </Col>
                     </Row>
               
               <Row>
                <Col lg="3"> <Label>Country</Label></Col>
               <Col lg="6">
               <FormGroup>
                               <Select  name="hotel_country"
                               options={country} />
                               </FormGroup>
                     </Col>
                    
                </Row>
                <br></br>
                
              <hr></hr>
              <div style={{display:"flex",justifyContent:"flex-end"}}>
<Button  type='submit' value="submit" color='primary mr-2'>Submit</Button> </div>
            

 
                </form>
                </div>
                </ModalBody>
            </Modal>
        </React.Fragment>;
      }
    }
