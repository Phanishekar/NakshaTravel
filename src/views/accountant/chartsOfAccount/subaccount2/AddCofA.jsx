import React, { Component } from 'react';
import { Modal,  ModalHeader, ModalBody,formGroup,Row,Col,form,Label,Input,Button, } from 'reactstrap';

import Select from 'react-select'
import SingleSelect from "components/common/formBasic/singleSelect";
import {groupedOptions,currency} from "./../../../country/CountryList"
import { toast } from 'react-toastify';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class AddCofA extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          
          divWidth: {
            width: 120

        },
        account_name:'',
        account_code:'',
        account_number:'',
        account_currency:'',
        account_description:'',
        parent_account:'',
        parent_account_id:this.props.id,
        account_branchaccount_number:'',
        account_currency:"",
        redirect:false

        };
    
        this.toggle = this.toggle.bind(this);
      }
      toggle() {
        this.setState({
            
          modal: !this.state.modal
        });
      }

      handleChange = (e) => {    
        const { name, value,} = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      this.setState(
        {
          btnLoading:true,
        }
        );
      var formData = new FormData(document.querySelector("#account12"));
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
        .post(`/api/account/save`, formData)
        .then((response) => {
          if (response.data.status == 200) {
            toast.success(response.data.Result);
          
            this.setState({
            
              modal: !this.state.modal,
              redirect:true
            });

          } else {
            toast.error("Please Upload Valid Details");
            this.setState(
              {
                error:response.data.Result,
                btnLoading:false,
              }
              );
          }
        })
        .catch((error) => {
          toast.error(error.Result);
          this.setState(
            {
              btnLoading:false,
            }
            );
        });
      
      
      
  }  
      getValuesFn = (data) => {
     
        if (data.id == "account_type") {
          this.setState({
            account_type:data.value,
    
          });
        }
        else if (data.id == "account_currency") {
            this.setState({
                account_currency:data.value,
      
            });
          }
        
    }
  render() {

    let redt="";
    
    if(this.state.redirect)
    {
      redt=<Redirect to={`/accountant/redirect/${this.props.id}/editsub`}></Redirect>
    }

    let Account_num_Input="";
             
    let Account_currency="";

    if(this.state.account_type=="Bank")
    {
        Account_num_Input=     <Row>
  
        <Col lg="3">
            <Label>Account Number</Label></Col>
       <Col lg="6">
           <Input name="account_name" type='text'  value={this.state.account_name}
        onChange={this.handleChange}  ></Input>
        </Col>

</Row>;

Account_currency= 

<Row>
<Col lg="3">
            <Label>Currency</Label></Col>
            <Col lg="6">
<SingleSelect  
                               name="account_currency"
                               selectedValue={this.state.account_currency}
                               options={currency}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect ></Col>
                        </Row>;
    }

    else if(this.state.account_type=="Credit Card")
    {
        Account_currency= 

<Row>
<Col lg="3">
            <Label>Currency</Label></Col>
            <Col lg="6">
<SingleSelect  
                               name="account_currency"
                               selectedValue={this.state.account_currency}
                               options={currency}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect ></Col>
                        </Row>;
    }

    return (

       


<div>
  {redt}
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{maxWidth: '800px', width: '100%'}}>
       <ModalHeader size="lg" style={{height:'80px',alignItems:"center"}} toggle={this.toggle}><span style={{marginLeft:"20px"}}>Create {this.props.name} Sub-Account</span></ModalHeader>
                <ModalBody>
                    <div style={{padding:"20px"}}>
                    <form onSubmit={this.handleSubmit} id="account12">
                <Row>
                <Col lg="3">
                             <Label>Account Type<span style={{color:"red"}}> *</span></Label></Col>
                             <Col lg="6">
                             <Input 
                               name="account_type"
                       
                          value={this.props.a_type} 
                          readOnly
                          />
                     </Col>
                </Row>
                <br/> 
                <Row>
  
                            <Col lg="3">
                                <Label>Account Name<span style={{color:"red"}}> *</span></Label></Col>
                           <Col lg="6">
                               <Input name="account_name" type='text'  value={this.state.account_name}
                            onChange={this.handleChange}  ></Input>
                            </Col>
                  
                </Row>
               <br/>
               <br/>
               <br/>
               {Account_num_Input}
               <br/>
               
               
                <Row>
  
                            <Col lg="3">
                                <Label>Account Code</Label></Col>
                           <Col lg="6">
                               <Input name="account_code" type='text'  value={this.state.account_code}
                            onChange={this.handleChange} ></Input>
                            </Col>
                  
                </Row>
                <br/>
                {Account_currency}
               <br/>
                <Row>
  
                <Col lg="3">
                               <Label>Description</Label></Col>
                               <Col lg="6">
                               <Input name="account_description" type='textarea' placeholder='Max 500 Characters' value={this.state.account_description}
                            onChange={this.handleChange} ></Input>
                               </Col>
                               
                </Row>

                <Input name="parent_account" value={this.props.name} onChange={this.handleChange}  hidden></Input>

                <Input name="parent_account_id" value={this.state.parent_account_id}  onChange={this.handleChange}  hidden></Input>
<br/><hr/>


<div style={{display:"flex",justifyContent:"flex-end"}}>
<Button  type='submit' value="submit" color='primary mr-2'>Submit</Button> </div>
                </form>
                </div>
                </ModalBody>
            </Modal>
        <React.Fragment>
        <div  >
        <Button  color='primary mr-2'  id='addbtn' className='ml-2'  onClick={this.toggle}>+ Add Sub Account</Button>
            
          </div>
          
                      
     
        </React.Fragment>
        </div>
      
    )
  }
}
