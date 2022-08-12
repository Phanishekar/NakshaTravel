import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Label,
    Input,
    Button,
    Spinner,
    FormGroup

  } from "reactstrap";
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import "assets/scss/pages/data-list.scss";
  import {Link,Route} from 'react-router-dom';
  import SingleSelect from "components/common/formBasic/singleSelect";
  import axios from "axios";
import { toast } from 'react-toastify';
import {PaymentMode,tax,currency} from "./../../country/CountryList"
import * as Icon from "react-feather";
import { Select } from 'evergreen-ui';

export default class AddExpences extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
     date:'',
     purpose:'',
     expence_account:'',
     amount:'',
     debit_from:'',
     vendor:'',
     invoice_number:'',
     notes:'',
     AccountList:[],
     Vendors:[]
     } 
     this.getValuesFn=this.getValuesFn.bind(this)
   }


  async getValuesFn(data)
   {
      
    if(data.id=='expence_account')
    {
     await this.setState({
      expence_account:data.value,

      })
     }
    else if(data.id=='debit_from')
    {
     await this.setState({
      debit_from:data.value,

      })
     }
    else if(data.id=='vendor')
    {
     await this.setState({
      vendor:data.value,

      })
     }
    }

handleChange = async(e) => {
 
      const { name, value,} = e.target;
      await this.setState({ [name]: value });
    
      }



  async componentDidMount() {
    let res=await axios.get(`api/account/selectAll`);
    this.setState({
      AccountList:res.data.account,
    })
    let res3=await axios.get(`api/purchases/supplier/selectSupplier`);
    this.setState({
      Vendors:res3.data.supplier,
    })
    let id=this.props.match.params.id;
    let res4=await axios.get(`api/purchases/expence/getById/${id}`);
    this.setState({
        date:res4.data.Expenses.date,
        purpose:res4.data.Expenses.purpose,
        expence_account:res4.data.Expenses.expence_account,
        amount:res4.data.Expenses.amount,
        debit_from:res4.data.Expenses.debit_from,
        vendor:res4.data.Expenses.vendor,
        invoice_number:res4.data.Expenses.invoice_number,
        notes:res4.data.Expenses.notes,
    })

   }

   handleSubmit = (e) => {
    this.setState(
      {
        btnLoading:true,
      }
      );
    var formData = new FormData(document.querySelector("#payment_Recived"));
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
      let id=this.props.match.params.id;
     
     axios.post(`/api/purchases/expence/update/${id}`, formData)
        .then((response) => {
          if (response.data.status == 200) 
          {
            toast.success(response.data.Result);
          
            this.props.history.push(`/purchase/Expenses`);
          } 
          else {
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

 render(){


  let AccountList=[];
  AccountList = this.state.AccountList.map(function (AccountLists) {
     
        return {label:AccountLists.account_name,value:AccountLists.account_id}
        
})
  let Vendors=[];
  Vendors = this.state.Vendors.map(function (AccountLists) {
     
        return {label:AccountLists.supplier_company_name,value:AccountLists.supplier_id}
        
})




 return (
    <React.Fragment>
        <BreadCrumbs
        breadCrumbTitle="Purchases"
        breadCrumbParent="Expence"
        breadCrumbActive="Add Expence"
      />
        <Card>
            <CardHeader><CardTitle>Add Expences</CardTitle></CardHeader>
            <CardBody>
              <form onSubmit={this.handleSubmit} id="payment_Recived">
            <Row>
                <Col lg="3" >
                  
                    <Label for="date_of_payment">Date</Label>
                    </Col>
                    <Col lg="6" >
                    <Input 
                      name="date"
                      type='date'
                      value={this.state.date}
                      onChange={this.handleChange}
                       />  
                     
                
                </Col>
                </Row>
                <br/>
                <Row>
                <Col lg="3" >
                  
                    <Label for="date_of_payment">Purpose</Label>
                    </Col>
                    <Col lg="6" >
                    <Input 
                      name="purpose"
                      type='text'
                      value={this.state.purpose}
                      onChange={this.handleChange}
                      placeHolder="Please Enter Purpose"
                       />

                </Col>
                </Row>
                <br/>
            <Row>
           
            <Col lg="3" >
                 
                    <Label for="expence_account">Expence Account</Label>
                    </Col>
                    <Col lg="6" >
                      <SingleSelect  
                               name="expence_account"
                               selectedValue={this.state.expence_account}
                               options={AccountList}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
                
                </Col>
                </Row>
                <br/>
                  <Row>
                  <Col lg="3" >
                    <Label for="amount">Amount</Label>
                    </Col>
                    <Col lg="6" >
                    <Input name="amount"
                      type='number'
                      placeHolder="Please Enter Amount"
                      value={this.state.amount}
                      onChange={this.handleChange} >
                    </Input>
                    </Col>

                        </Row>
<br/>
         <Row>
                <Col lg="3" >

                    <Label for="debit_from">Debit From</Label>
                    </Col>
                    <Col lg="6" >
                    <SingleSelect  
                               name="debit_from"
                               selectedValue={this.state.debit_from}
                               options={AccountList}
                               getValuesFn={this.getValuesFn}
                               > 
                        </SingleSelect >
              
                </Col> 
                      
               
              </Row>
              <br/>
              <Row>
                <Col lg="3" >
                    <Label for="vendor">select Vendor</Label>
                    </Col>
                    <Col lg="6" >
                    <SingleSelect  
                               name="vendor" 
                               selectedValue={this.state.vendor}
                               options={Vendors}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
                </Col>
                </Row>
                <br/> 
                      
              <Row>
                <Col lg="3" >
                  
                    <Label for="invoice_number">Invoice number</Label>
                    </Col>
                    <Col lg="6" >
                    <Input 
                      name="invoice_number"
                      type='text'
                      placeHolder="Please Enter Invoice Number"
                      value={this.state.invoice_number}
                      onChange={this.handleChange}/>
                </Col>
                </Row>
                <br/>
                <Row> 
                       
              
              
                <Col lg="3" >
                  
                    <Label for="invoice_amount">Notes</Label>
                    </Col>
                    <Col lg="6" >
                   
                    <Input
                      type="textarea"
                      name="notes"
                      placeHolder="Enter if any notes"
                      value={this.state.notes}
                      onChange={this.handleChange} />
                </Col>
                </Row>
              <hr></hr>
             

              <div style={{display:"flex",justifyContent:"flex-end"}}>
            <Link to={'/sales/PaymentRecived'}> <Button color="warning mr-3" type="button">Cancel</Button></Link>
          <Button.Ripple  color="primary" type="submit">Submit  </Button.Ripple>
     </div>
     </form>
            </CardBody>
        </Card>
    </React.Fragment>

 )
 }
  }