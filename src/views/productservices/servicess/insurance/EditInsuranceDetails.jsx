import React, { Component } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Pagination, Row, Spinner, Table } from 'reactstrap'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import * as Icon from "react-feather";
import { Redirect } from 'react-router-dom';

export default class EditInsuranceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insurence_plan:'',
            insurence_dateORyears:'',
            insurence_price:'',
            insurence_description:'',
            insurence_company_id:'',
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
        var formData = new FormData(document.querySelector("#editinsurancedetails"));
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
          let  ids=this.props.id;
          axios
          .post(`api/productandservices/services/updateinsurancedetails/${ids}`, formData)
          .then((response) => {
            if (response.data.status == 200) {
              toast.success(response.data.Result);
              // this.props.history.push(`/productandservice/service/hotel`);
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
    async componentDidMount() {

     
        this.getUserData(1)

    }

    async getUserData(pageNumber) {



        console.log("resp");
        let  id=this.props.id;
        const res= await axios.get(`/api/productandservices/services/getinsurancedetailsbyid/${id}?page=${pageNumber}`);
        console.log(res.data);
       
        if(res.data.status==200)
        {
          this.setState({
        
            insurence_plan:res.data.insurance_details.insurence_plan,
            insurence_dateORyears:res.data.insurance_details.insurence_dateORyears,
            insurence_price:res.data.insurance_details.insurence_price,
            insurence_description:res.data.insurance_details.insurence_description,
            insurence_company_id:res.data.insurance_details.insurence_company_id,
         
          });
        }



        
      }

    handleChange = (e) => {
        const { name, value, } = e.target;
        this.setState({ [name]: value });
    }
  render() {
    let url="";
    if(this.state.redirect)
    {
      url=<Redirect to={`/productandservice/servicess/Redirect1/${this.state.insurence_company_id}/insuranceplan`}/>;
    }
    return (
        <React.Fragment>
        <div  >
        <Icon.Edit size={20} onClick={this.toggle} style={{color:"#7367f0"}}></Icon.Edit>
               {/* <button >Add Hotel Details {this.props.buttonLabel} </button>    */}
             </div>
             {url}      
        <Modal contentClassName="flightdetails" isOpen={this.state.modal} toggle={this.toggle}size="lg" style={{maxWidth: '800px', width: '100%'}} >
          <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Edit Insurance</span></ModalHeader>
                   <ModalBody>
                   <div style={{padding:"20px"}}>
                   <form onSubmit={this.handleSubmit} id="editinsurancedetails">
        <Input name='insurence_company_id' type='text' value={this.state.insurence_company_id}
                                  placeholder='Enter Your Select Company' hidden></Input>
  <Row>
    <Col lg="3"><Label for='select_plan'>Select Plan</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                              
                              <Input type="text"
                                  name="insurence_plan"value={this.state.insurence_plan} onChange={this.handleChange}
                                  placeholder='Add Plan'>
                              </Input>
                          </FormGroup>
                      </Col>

                  </Row>
        <Row>
        <Col lg="3">  <Label for="select_daysORyears">Select Days/Years</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                            
                              <Input name='insurence_dateORyears' type='date'value={this.state.insurence_dateORyears} onChange={this.handleChange}
                                  placeholder='Enter Your  Days/Years'></Input>
                          </FormGroup>
                      </Col>
                      </Row>
                  <Row>
                  <Col lg="3">  <Label for='price'>Price</Label></Col>
                      <Col lg="6" >
                          <FormGroup>
                            
                              <Input type="number"
                                  name="insurence_price"value={this.state.insurence_price} onChange={this.handleChange}
                                  placeholder='Price'>
                              </Input>
                          </FormGroup>
                      </Col>

                  </Row>
                  <Row>
                  <Col lg="3">     <Label for='Description'>Description</Label></Col>
                    <Col lg="6">
                    <FormGroup>
                         
                              <Input type="textarea"value={this.state.insurence_description} onChange={this.handleChange}
                                  name="insurence_description"
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
