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
  Spinner

} from "reactstrap";
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import "assets/scss/pages/data-list.scss";
  import SingleSelect from "components/common/formBasic/singleSelect";
  import IndividualFamily from "./IndividualFamily"
  import CorporateEmployee from "./CorporateEmployee"
  import axios from "axios";
  import { toast } from 'react-toastify';


  const customerType=[
  {value:'Corporate',label:'Corporate'},
  {value:'Individual',label:'Individual'}];

export default class AddProForma extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      form_field_name:'Corporate',
     } 
   }
  
   handleSubmit = (e) => {

    this.setState(
      {
        btnLoading:true,
      }
      );
    
    var formData = new FormData(document.querySelector("#dsr"));
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
      .post(`/api/dsr/save`, formData)
      .then((response) => {
      if (response.data.status == 200)
       {
        let id=response.data.id;
        this.props.history.push(`/addproforma/${id}/form`);
       } 
      else {
        this.setState(
          {
            uploading:false,
            
          }
          )
       
      toast.error("Please Check All feilds");
      console.log(response.data.Result);
      this.setState(
        {
          error:response.data.Result,
        }
        );
      }
      })
      .catch((error) => {
      toast.error("Cant Add this employee");
      this.setState({ btnLoading: false });
      });
    
}  
   getValuesFn = (data) => {
     
    if (data.id == "form_field_name") {
      this.setState({
        form_field_name:data.value,

      });
    }
  }
 
 render(){
  
let card='';

if(this.state.form_field_name=="Corporate")
{
 card=<CorporateEmployee />
}

else if(this.state.form_field_name=="Individual")
{
 card=<IndividualFamily />
}
   
 return (
    

    <React.Fragment>
        <BreadCrumbs
          breadCrumbTitle= "Sales"
          breadCrumbParent="ProForma"
          breadCrumbActive= "Add ProForma"
        />

<Card>
            <CardHeader>
              <CardTitle>
                Choose Costomer First
              </CardTitle>
            </CardHeader>
            <CardBody>
            <form onSubmit={this.handleSubmit} id="dsr" >
            <Row>
                  <Col lg="6" >
                    <Label>Select Customer Type</Label>
         <SingleSelect
              name="form_field_name"
                options={customerType} 
                getValuesFn={this.getValuesFn}  
                selectedValue={this.state.form_field_name}               
         />
         </Col>
         <Input name="type" value="ProForma"
hidden />  
         <Input name="customer_type" value={this.state.form_field_name} 
hidden />  
         <Col lg="6" >
                  {card}
         </Col>
         </Row>

         </form>
         </CardBody>
         </Card>

          </React.Fragment>
 )
 }
  }