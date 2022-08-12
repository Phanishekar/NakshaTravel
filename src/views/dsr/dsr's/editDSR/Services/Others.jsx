import React, { Component } from 'react'
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import Select from 'react-select'
import { toast } from 'react-toastify';
import axios from 'axios';
import SingleSelect from 'components/common/formBasic/singleSelect';
const unit =[
  {label:'kilo gram',value:'kg'},
  {label:'gram',value:'grm'},
  {label:'meter',value:'meter'},
  {label:'feet',value:'ft'},
  {label:'meeter square',value:'m2'},
  {label:'feet square',value:'ft2'},
] 
export default class Others extends Component {
  constructor(props) {
    super(props);
  this.state = {
    dsr_type:'DSR',
    dsr_number:this.props.id,
      item_details :'',
      quantity :0,
      per_price :0,
      total:0,
      quantity_unit:''
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.getValuesFn = this.getValuesFn.bind(this);
}
async sum()
  {

    let x= parseFloat(this.state.quantity)*parseFloat(this.state.per_price);
  

   await this.setState({
  total:x.toFixed(2)
 })

  }
handleChange = async (e)  => {    

  if(e.target.name=='quantity'||e.target.name=='per_price')
  {
    
    const { name, value,} = e.target;
    await this.setState({ [name]: value });

    this.sum();
  }
  else
   {
    const { name, value,} = e.target;
  this.setState({ [name]: value });
  
  
}
}
handleSubmit(e) {
  console.log(this.state);
    e.preventDefault();
    let dataOther=this.state;
    this.props.submitOthers (dataOther)
}
getValuesFn(data)
{
if(data.id=='quantity_unit')
{
this.setState({
  quantity_unit:data.value
});
}
}
  render() {
   
  
    return (
      <React.Fragment>
      <br/>
      <h1>Others</h1>
      <br/>
       
      <form onSubmit={this.handleSubmit}>
              
           <Row>
           <Col lg="3">
                  <FormGroup>
                      <Label for='item_details'>Item Details</Label>
                      <Input name='item_details' type='text'
                      placeholder='Item Details' value={this.state.item_details} onChange={this.handleChange}></Input>
                  </FormGroup>
              </Col>
           <Col lg="3">
                  <FormGroup>
                      <Label for='quantity'>Quantity</Label>
                      <Input name='quantity' type='text'
                      placeholder='Quantity' value={this.state.quantity} onChange={this.handleChange}></Input>
                        <SingleSelect 
                  name="quantity_unit"
                  placeholder="unit"
                  options={unit}
                  selectedValue={this.state.quantity_unit}
                  getValuesFn={this.getValuesFn}
                ></SingleSelect>
                  </FormGroup>
              </Col>
           <Col lg="3">
                  <FormGroup>
                      <Label for='per_price'>Per Price</Label>
                      <Input name='per_price' type='number'
                      placeholder='Per Price' value={this.state.per_price} onChange={this.handleChange}></Input>
                  </FormGroup>
              </Col>
           <Col lg="3">
                  <FormGroup>
                      <Label for='total'><b>Total</b></Label>
                      <Input name='total' type='number'
                      placeholder='Total' value={this.state.total} readOnly></Input>
                  </FormGroup>
              </Col>
             
             
                </Row>
                <br></br>
   
   <div style={{marginLeft:"85%"}}>

<Row>

<Button  type='submit' value="submit" color='primary mr-2'>Add</Button> 
</Row>    </div>
         </form>

                      
         </React.Fragment>
     
   
    )
  }
}
