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

import {country} from "views/country/CountryList"
import SingleSelect from "components/common/formBasic/singleSelect";
const VisaType1 = [
  { value: 'Single Entry', label: 'Single Entry' },
  { value: 'Multiple Entry', label: 'Multiple Entry' },
 
];
const VisaTour = [
  { value: 'Visit/Tourist', label: 'Visit/Tourist' },
  { value: 'Business', label: 'Business' },
  { value: 'Transit', label: 'Transit' },
  { value: 'Other', label: 'Other' },
 
];

export default class AddVisa extends Component {
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
        var formData = new FormData(document.querySelector("#visa"));
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
          .post(`api/productandservices/services/savevisa`, formData)
          .then((response) => {
            if (response.data.status == 200) {
              toast.success(response.data.Result);
              // this.props.history.push(`/productandservice/service/visa`);
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
     
      if (data.id == "visa_country") {
        this.setState({
          visa_country:data.value,
  
        });
      }
      else if (data.id == "visa_entry_type") {
        this.setState({
          visa_entry_type:data.value, 
        });
      }
      else if (data.id == "visa_purpose_type") {
        this.setState({
          visa_purpose_type:data.value,
        });
      }
    }
  render() {
    let url1="";
    if(this.state.redirect)
    {
      url1=<Redirect to={`/productandservice/servicess/Redirect1/1/visa`} />;
    }
    return (
       
           <React.Fragment>
                  <div  >
        <Button  color='primary mr-2'  id='addbtn' className='ml-2'  onClick={this.toggle}>+ Add Visa</Button>
            {/* <button >Add Hotel Details {this.props.buttonLabel} </button>    */}
          </div>
          {url1}     
     <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}}>
       <ModalHeader  size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Add Visa</span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
                <form onSubmit={this.handleSubmit} id="visa">
             
             
                <Row>
                <Col lg="3"><Label for="visa_entry_type">Visa Entry Type</Label></Col>
                 <Col lg="6" >
                     <FormGroup>
                         
                         
                             <SingleSelect name="visa_entry_type"
                               options={VisaType1}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.visa_entry_type} />
                     </FormGroup>
                 </Col>
                 </Row>
             
             <Row>
             <Col lg="3"><Label for='_country'>Country</Label> </Col>
                 <Col lg="6" >
                     
                     <FormGroup>
              
              <SingleSelect name="visa_country"
                               options={country}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.visa_country} />
                              
              </FormGroup>    
                 </Col>

             </Row>
             
             <Row>
             <Col lg="3">  <Label for='visa_type'>Visa Type</Label></Col>
                 <Col lg="6" >
                     <FormGroup>
                       
                        
                         <SingleSelect name="visa_purpose_type"
                               options={VisaTour}
                               getValuesFn={this.getValuesFn}
                               selectedValue={this.state.visa_purpose_type} />
                     </FormGroup>
                 </Col>
                 </Row>
             
             <Row>
             <Col lg="3"> <Label for='days' >Days</Label></Col>
                 <Col lg="6" >
                     <FormGroup>
                        
                         <Input type="text"
                             name="visa_daysORyears"
                             placeholder='Days'>
                         </Input>
                     </FormGroup>
                 </Col>
             </Row>
             <Row>
              <Col lg="3">     <Label for='price' >Price </Label></Col>
                 <Col lg="6" >
                     <FormGroup>
                    
                         <Input type="text"
                             name="visa_price"
                             placeholder='Price'>
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
