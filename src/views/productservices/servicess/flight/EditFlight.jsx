import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb'
import React, { Component } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import axios from "axios";
import * as Icon from "react-feather";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';



export default class  EditFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      air_line_name:'',
        
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
    var formData = new FormData(document.querySelector("#editflight"));
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
      .post(`api/productandservices/services/updateairline/${this.props.id}`, formData)
      .then((response) => {
        if (response.data.status == 200) {
          toast.success(response.data.Result);
          // this.props.history.push(`/productandservice/service/flight`);
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

        const res= await axios.get(`/api/productandservices/services/getairlinebyid/${id}`);
        console.log(res.data);
  
        if(res.data.status==200)
        {
          this.setState({
            users:res.data.AirLine,
            air_line_name:res.data.AirLine.air_line_name,
           
           
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
      url1=<Redirect to={`/productandservice/servicess/Redirect1/1/flight`} />;
    }
    return (
      <React.Fragment>
        
        <div  >
       
    <Icon.Edit size={20} onClick={this.toggle} style={{color:"#7367f0"}}></Icon.Edit> 
       
          </div>
          {url1}         
     <Modal  isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}} >
       <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Edit {this.props.name}  Service </span></ModalHeader>
                <ModalBody>
                <div style={{padding:"20px"}}>
                    <form onSubmit={this.handleSubmit} id="editflight">
              <Row>
              <Col lg="3"><Label for="flight_name">Flight Name</Label></Col>
                <Col lg="6">
                  <FormGroup>
                   
                    <Input name="air_line_name" value={this.state.air_line_name} onChange={this.handleChange}
                      type='text' placeholder='Enter Your Flight Name'>
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
