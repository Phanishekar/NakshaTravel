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
 import DsrEdit from "./DsrEdit"
  
 import Services from "./Services"
import Axios from 'axios';

export default class EditDSR extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      tabEdit:'nav-link active',
      tabService:'nav-link',
      currency:''
     } 
   }
   async componentDidMount() {

    let id=this.props.match.params.id;
    const res= await Axios.get(`/api/dsr/getById/${id}`);
    console.log(res.data); 
    if(res.data.status==200)
    {
    await this.setState({

        type:res.data.dsr[0].type,
        currency:res.data.dsr[0].dsr_currency,
        
    });
    console.log(this.state.currency); 
  }
   }
   selectTab =(e)=>{

if(e.target.id=='Edit')
{
this.setState({
    tabEdit:'nav-link active',
    tabService:'nav-link',
})
}

else if(e.target.id=='Services')
{
this.setState({
    tabEdit:'nav-link',
    tabService:'nav-link active',
})
}

   }
 
 render(){
    var TABSELECTED=''

if(this.state.tabEdit=='nav-link active'){
    
    TABSELECTED= <DsrEdit id={this.props.match.params.id} />;
 

}
else if(this.state.tabService=='nav-link active'){
    TABSELECTED=  <Services id={this.props.match.params.id} currency={this.state.currency} type={this.state.type}/>;
 
}
   
 return (
    

    <React.Fragment>
         <BreadCrumbs
        breadCrumbTitle="DSR"
        breadCrumbParent="DSR"
        breadCrumbActive="Edit DSR"
      />

    <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item"  role="presentation">
    <button className={this.state.tabEdit} id="Edit" data-bs-toggle="tab" data-bs-target="#Edit-DSR" type="button" role="tab" aria-controls="Edit-DSR" aria-selected="true" onClick={this.selectTab}>Edit DSR</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className={this.state.tabService} id="Services" data-bs-toggle="tab" data-bs-target="#Services" type="button" role="tab" aria-controls="Services" aria-selected="false" onClick={this.selectTab}>Services</button>
  </li>
  
</ul>

<br /><br /><br />
{TABSELECTED}
    </React.Fragment>
 )
 }
  }