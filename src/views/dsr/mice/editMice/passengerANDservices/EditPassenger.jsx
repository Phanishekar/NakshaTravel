  import React, { Component } from 'react';
  import {Card,CardHeader,CardTitle,CardBody,Row,Col,} from "reactstrap";
  import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
  import "assets/scss/pages/data-list.scss";
  import SingleSelect from "components/common/formBasic/singleSelect";
  import axios from 'axios';
  import PassengerList from './PassengerList';
import Services from './Services';

  export default class EditPassenger extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      tabEdit:'nav-link active',
      tabService:'nav-link',
      currency:''
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
    
    TABSELECTED= <PassengerList id={this.props.match.params.mice} fId={this.props.match.params.id} emp={this.props.match.params.emp} />;
 

         }
     else if(this.state.tabService=='nav-link active')
     {
     TABSELECTED= <Services id={this.props.match.params.mice} fId={this.props.match.params.id} emp={this.props.match.params.emp} />;
 
     }
   
 return (
    <React.Fragment>
         
         <BreadCrumbs
        breadCrumbTitle="MICE"
        breadCrumbParent="Edit MICE"
        breadCrumbActive="MICE Passengers"
      />

     <ul className="nav nav-tabs" id="myTab" role="tablist">
     <li className="nav-item"  role="presentation">
     <button className={this.state.tabEdit} id="Edit" data-bs-toggle="tab" data-bs-target="#Edit-DSR" type="button" role="tab" aria-controls="Edit-DSR" aria-selected="true" onClick={this.selectTab}>Passengers List</button>
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