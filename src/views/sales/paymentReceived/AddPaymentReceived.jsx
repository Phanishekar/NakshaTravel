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
import {PaymentMode,tax} from "./../../country/CountryList"
import * as Icon from "react-feather";

export default class AddPaymentRecived extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      date_of_payment:"", 
      tds_account_amount:"",  
      tds_account:"",  
      payment_pending :0, 
      deposit_account :"", 
      payment_mode :"", 
      payment_made :0, 
      invoice_amount :0, 
      invoice_number:"", 
      invoicesList:[],
      InvoiceDetils:[],
      setCard:false,
      currency:'',
      AccountList:[],
      TaxAccountList:[],
      tds:0,
      tax_amount:'',
      recived_amount:''
     } 
     this.getValuesFn=this.getValuesFn.bind(this)
   }
  async getValuesFn(data)
   {

    if(data.id=='invoice_number')
    {
     await this.setState({
        invoice_number:data.value,

      })
      this.getInvoicesById()
     }
    else if(data.id=='payment_mode')
    {
     await this.setState({
      payment_mode:data.value,

      })
     }
    else if(data.id=='deposit_account')
    {
     await this.setState({
      deposit_account:data.value,

      })
     }
    else if(data.id=='tds_account')
    {
     await this.setState({
      tds_account:data.value,

      })
     }
    else if(data.id=='tds')
    {
     await this.setState({
      tds:data.value,

      })
      this.sum()
     }

    }
   async sum()
    {
      let tax=parseFloat(this.state.invoice_amount)*(parseFloat(this.state.tds)/100);
      
      await this.setState({
        tax_amount:tax.toFixed(2),
        
      })
      let rec=parseFloat(this.state.payment_made)-parseFloat(this.state.tax_amount);
      let x = parseFloat(this.state.invoice_amount)-parseFloat(this.state.payment_made)+parseFloat(this.state.tax_amount);
     await this.setState({
        payment_pending:x.toFixed(2),
        recived_amount:rec.toFixed(2)
      })
    }
handleChange = async(e) => {
  if(e.target.name="payment_made")
  {
    const { name, value,} = e.target;
   await this.setState({ [name]: value });
    this.sum()
  }
    else{
      const { name, value,} = e.target;
      await this.setState({ [name]: value });
      console.log(value);
    }  
      }
async getInvoicesById()
{
  let res=await axios.get(`api/dsr/getById/${this.state.invoice_number}`);
    this.setState({
      InvoiceDetils:res.data.dsr[0],
      setCard:true,
      invoice_amount:res.data.total,
      currency:res.data.dsr[0].dsr_currency,
    })

   
}
   async getAllInvoices()
   {
    let res=await axios.get('api/sales/invoice/selectInvoice');
    this.setState({
      invoicesList:res.data.dsr
    })
 
   }


  async componentDidMount() {
     
    this.getAllInvoices();
    let res=await axios.get(`api/account/selectIncomeAccount`);
    this.setState({
      AccountList:res.data.account,
    })
    let res2=await axios.get(`api/account/selectTax`);
    this.setState({
      TaxAccountList:res2.data.account,
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
    
     
     axios.post(`/api/sales/payment/save`, formData)
        .then((response) => {
          if (response.data.status == 200) 
          {
            toast.success(response.data.Result);
          
            this.props.history.push(`/purchase/paymentMade`);
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
let Details=[];
if(this.state.setCard==true)
{
 
    Details=
    <div>
    <Row>
    <Col lg='12'>
      <b>Invoice Number:</b> &nbsp;&nbsp;Invoice-{this.state.InvoiceDetils.dsr_number}
    </Col>
    </Row>
<br/>
    <Row>
    <Col lg='12'>
      <b>Customer Name:</b>&nbsp;&nbsp;{this.state.InvoiceDetils.customer_name}
    </Col>
    </Row>
    <br/>
    <Row>
    <Col lg='12'>
      <b>Customer Email:</b>&nbsp;&nbsp;{this.state.InvoiceDetils.email}
    </Col>
    </Row>
    <br/>
    <Row>
    <Col lg='12'>
      <b>Phone Number:</b>&nbsp;&nbsp;{this.state.InvoiceDetils.phone_number}
    </Col>
    </Row>
    </div>;
  
 
}
  let invoice=[];
  invoice = this.state.invoicesList.map(function (invoicesList) {
     
        return {label:'Invoice'+" - "+invoicesList.dsr_number,value:invoicesList.dsr_number}
        
})
  let AccountList=[];
  AccountList = this.state.AccountList.map(function (AccountLists) {
     
        return {label:AccountLists.account_name,value:AccountLists.account_id}
        
})
  let TaxAccountList=[];
  TaxAccountList = this.state.TaxAccountList.map(function (AccountLists) {
     
        return {label:AccountLists.account_name,value:AccountLists.account_id}
        
})




 return (
    <React.Fragment>
        <BreadCrumbs
        breadCrumbTitle="Sales"
        breadCrumbParent="Payment Recived"
        breadCrumbActive="Add Payment Recived"
      />
        <Card>
            <CardHeader><CardTitle>Add Payments Recevied</CardTitle></CardHeader>
            <CardBody>
              <form onSubmit={this.handleSubmit} id="payment_Recived">
              <Input 
                      name="payment_type"
                      type='hidden'
                      value="Credit"
                       />
            <Row>
                <Col lg="6" >
                  <FormGroup >
                    <Label for="date_of_payment">Date Of Payment</Label>
                    <Input 
                      name="date_of_payment"
                      type='date'
                       />
                  </FormGroup>
                </Col>
                </Row>
            <Row>
                <Col lg="6" >
                  <FormGroup >
                    <Label for="invoice_number">select invoice</Label>
                    
                    <SingleSelect  
                               name="invoice_number"
                               selectedValue={this.state.invoice_number}
                               options={invoice}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
                  </FormGroup>
                </Col>
              
                <Col lg="4" >
                  
                    <Label for="invoice_amount">Invoice Amount</Label>
                    <Input 
                      name="invoice_amount"
                      type='text'
                      value={this.state.invoice_amount}
                      onChange={this.handleChange} readOnly/>
                </Col>
                <Col lg='2'><br/>{this.state.currency}</Col>
                </Row>
            <Row>
                <Col lg="6" >
                  <FormGroup >
                    <Label for="payment_mode">Payment Mode</Label>
                    <SingleSelect  
                               name="payment_mode"
                               selectedValue={this.state.payment_mode}
                               options={PaymentMode}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
                  </FormGroup>
                </Col>
                <Col lg="4" >
                  
                    <Label for="payment_made">Payment Made</Label>
                    <Input name="payment_made"
                      type='number'
                      value={this.state.payment_made}
                      onChange={this.handleChange} >
                    </Input>
                  
                </Col>
                <Col lg='2'><br/>{this.state.currency}</Col>
                </Row>
            <Row>
            <Col lg="6" >
                  <FormGroup >
                    <Label for="deposit_account">Deposite To</Label>
                      <SingleSelect  
                               name="deposit_account"
                               selectedValue={this.state.deposit_account}
                               options={AccountList}
                               getValuesFn={this.getValuesFn}
                               >
                             
                        </SingleSelect >
                  </FormGroup>
                </Col>

                <Col lg="4" >
                  
                    <Label for="payment_pending">Pending</Label>
                    <Input name="payment_pending"
                      type='number'
                      value={this.state.payment_pending}
                      onChange={this.handleChange} readOnly>
                    </Input>
                 
                </Col>
                <Col lg='2'><br/>{this.state.currency}</Col>
                
                </Row>
            <Row>
                <Col lg="6" >
                  <FormGroup >
                    <Label for="tds_account">TDS Account</Label>
                    <SingleSelect  
                               name="tds_account"
                               selectedValue={this.state.tds_account}
                               options={TaxAccountList}
                               getValuesFn={this.getValuesFn}
                               > 
                        </SingleSelect >
                  </FormGroup>
                </Col>
              
                <Col lg="6" >
                  <FormGroup >
                    <Label for="tds">TDS Amount</Label>
                      <SingleSelect  
                               name="tds"
                               selectedValue={this.state.tax_amount}
                               options={tax}
                               getValuesFn={this.getValuesFn}
                               > </SingleSelect>
                  </FormGroup>
                </Col>
               
              </Row>
              <hr></hr>
              <h2>Payment Recept</h2>
              <hr></hr>
              {Details}
             
              <br></br>
              <div style={{marginLeft:"50%"}}>
             <br></br>  
             <Row>
              <Col lg="4">    <Label for='total'>Actual Amount </Label></Col>
             <Col lg="6">
              
               
                   <Input name='invoice_amount' type='number'
                   placeholder='Actual Amount'
                   value={this.state.invoice_amount} readOnly></Input>
             
           </Col>
           <Col lg="2">{this.state.currency}</Col>
           </Row>
           <br/>
           <Row>
           <Col lg="4"><Label for='payment_pending'>Pending Amount</Label></Col>
             <Col lg="6">
             
                   
                   <Input name='payment_pending' type='number'
                   placeholder='Pending Amount'
                   value={this.state.payment_pending} onChange={this.handleChange}  readOnly></Input>
            
           </Col>
           <Col lg="2">{this.state.currency}</Col>
           </Row>
           <br></br>
           <Row>
           <Col lg="4">
           <Label for="tds_amount">TDS Amount</Label></Col>
           <Col lg="6">
           <Input name='tds_amount' type='number'
                   placeholder='TDS Amount'
                   value={this.state.tax_amount}  readOnly></Input>
           
             
               
             
             </Col>
             <Col lg='2'>{this.state.currency}</Col>
             </Row>
             <br></br>
          
             <Row>
              <Col lg="4">    <Label for='total'>Receiving Amount</Label></Col>
             <Col lg="6">
              
               
                   <Input name='recived_amount' type='number'
                   placeholder='Receiving Amount'
                   value={this.state.recived_amount} readOnly></Input>
             
           </Col>
           <Col lg="2">{this.state.currency}</Col>
           </Row>
           <br/>
          
           <br/>    
           </div>
           <Input name="currency" type='hidden' value={this.state.currency}/>

              <div style={{display:"flex",justifyContent:"flex-end"}}>
            <Link to={'/sales/PaymentRecived'}> <Button color="warning mr-2" type="button">Cancel</Button></Link>
          <Button.Ripple  color="primary" type="submit">Submit  </Button.Ripple>
     </div>
     </form>
            </CardBody>
        </Card>
    </React.Fragment>

 )
 }
  }