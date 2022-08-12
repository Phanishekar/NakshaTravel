import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,

  } from "reactstrap";
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import "assets/scss/pages/data-list.scss";
  import SingleSelect from "components/common/formBasic/singleSelect";
  import IndividualFamily from "./IndividualFamily"
  import CorporateEmployee from "./CorporateEmployee"
  
  const customerType=[
  {value:'Corporate',label:'Corporate'},
  {value:'Individual',label:'Individual'}];

export default class AddDSR extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      form_field_name:'',
     } 
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
          breadCrumbTitle= "DSR"
          breadCrumbParent="DSR"
          breadCrumbActive= "Add DSR"
        />

<Card>
            <CardHeader>
              <CardTitle>
                Select Customer Type
              </CardTitle>
            </CardHeader>
            <CardBody>
            <Row>
                  <Col lg="6" >
         <SingleSelect
              name="form_field_name"
                options={customerType} 
                getValuesFn={this.getValuesFn}  
                selectedValue={this.state.form_field_name}               
         />
         </Col>
           
         </Row>
         </CardBody>
         </Card>
{card}
          </React.Fragment>
 )
 }
  }