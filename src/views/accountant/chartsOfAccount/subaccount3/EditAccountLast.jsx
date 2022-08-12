import React, { Component } from 'react';
import { Modal,  ModalHeader, ModalBody,formGroup,Row,Col,form,Label,Input,Button, CardHeader, CardTitle, CardBody, Card,} from 'reactstrap';

import Select from 'react-select'
import SingleSelect from "components/common/formBasic/singleSelect";
import {groupedOptions,currency} from "./../../../country/CountryList"
import { toast } from 'react-toastify';
import axios from 'axios';
import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb';
import { Link } from 'react-router-dom';


export default class AddCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          
          divWidth: {
            width: 120

        },
        account_name:'',
        account_type:"",
        account_code:'',
        account_number:'',
        account_currency:'',
        account_description:'',
        parent_account:"",
        parent_account_id:"",
        account_branchaccount_number:'',
        account_currency:"",

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
      var formData = new FormData(document.querySelector("#account"));
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
        let id = this.props.match.params.id;
        axios
        .post(`/api/account/update/${id}`, formData)
        .then((response) => {
          if (response.data.status == 200) {
            toast.success(response.data.Result);
          
            // this.props.history.push(`/`);
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


    async componentDidMount() {
      let id = this.props.match.params.id;
  
      const res = await axios.get(`/api/account/getById/${id}`);
      
        this.setState({
          account_id:res.data.account.account_id,
          account_type:res.data.account.account_type,
          account_name:res.data.account.account_name,
          account_code:res.data.account.account_code,
          account_number:res.data.account.account_number,
          account_currency:res.data.account.account_currency,
          account_description:res.data.account.account_description,
          parent_account:res.data.account.parent_account,
          parent_account_id:res.data.account.parent_account_id,
          account_branchaccount_number:res.data.account.account_branchaccount_number,
          account_currency:res.data.account.account_currency,
        })

        console.log(res.data.account.account_id)
        }
  render() {

    let Account_num_input="";
             
    let Account_currency="";

    if(this.state.account_type=="Bank")
    {
        Account_num_input=     <Row>
  
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
     
             

        <React.Fragment>
        <BreadCrumbs
                    breadCrumbTitle="Accountant"
                    breadCrumbParent="Charts of Account"
                    breadCrumbActive="Sub Account 3"
                />

                      <Card>
                        <CardHeader><CardTitle>Edit <b><u>{this.state.account_name}</u></b> Account</CardTitle></CardHeader>
                        <CardBody>
                        <form onSubmit={this.handleSubmit} id="account">
                <Row>
                <Col lg="3">
                             <Label>Account Type<span style={{color:"red"}}> *</span></Label></Col>
                             <Col lg="6">
                             <Input
                               name="account_type"
                          
                          value={this.state.account_type} 
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
               {Account_num_input}
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

<br/><hr/>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<Link to={`/accountant/ChartsOfAccount/EditCofA1/${this.state.parent_account_id}`}><Button  type='button' value="" color='warning mr-2'>Back</Button></Link>

<Button  type='submit' value="submit" color='primary mr-2'>Submit</Button> </div>
                </form>
                        </CardBody>
                      </Card>

                     
                      
                     
        </React.Fragment>
        </div>
      
    )
  }
}
