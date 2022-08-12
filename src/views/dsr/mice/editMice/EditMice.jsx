import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Button,
    Label,
    Input

  } from "reactstrap";
  import "assets/scss/pages/data-list.scss";
  import SingleSelect from "components/common/formBasic/singleSelect";
import axios from 'axios';
import * as Icon from "react-feather";
import { toast } from 'react-toastify';
import './styles.css'
import { NavLink, Link, useParams } from "react-router-dom";
import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb';

export default class EditMice extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      MICE:[],
      MICEfamily:[],
      loading:true,
      individual:[],
      employee_id:''
     } 
     this.handleSubmit =this.handleSubmit.bind(this);
     this.deleteFamilyDetails =this.deleteFamilyDetails.bind(this);
     this.getFamily =this.getFamily.bind(this);

   }
   

   async getMiceDetails()
   {
      let res= await axios.get(`api/mice/getById/${this.props.match.params.id}`);
      console.log(res.data)
      await this.setState({
        MICE: res.data.mice,
        MICEfamily:res.data.miceFamily,
        loading:false,
        dsr_number:this.props.match.params.id
      })
   }
   async getFamily()
   {
    await this.getMiceDetails()

    const res2=await axios.get(`/api/corporatecustomer/getallEmployees/${this.state.MICE.customer_id}`);
    this.setState({
     
      individual:res2.data.customer
  });
   }
 async componentDidMount()
 {
    this.getFamily()
  
 }
 getValuesFn = (data) => {
     
  if (data.id == "employee_id") {
    this.setState({
      employee_id:data.value,
      is_unique:this.props.match.params.id+data.value,
    });
  }


}; 
 
async deleteFamilyDetails(e)
{
 console.log(e.target);
 let x=e.target.value;
  let res3 = await axios.get(`api/mice/deleteFamily/${x}`);
console.log(res3.data);
  if(res3.data.status==200)
  {
   this.getFamily();
  }
  
}

handleSubmit = (e) => {
  this.setState(
    {
      btnLoading:true,
      
    }
    );
    
    console.log(this.state)
    e.preventDefault();
  
    axios
    .post(`/api/mice/saveFamily`, this.state)
    .then((response) => {
      
      if (response.data.status ==200) {
        toast.success(response.data.Result);
        this.getFamily();
          
      } else {
        toast.error("Selected Member is alredy Added or May it is Null");
        this.setState(
          {
            error:response.data.Result,
            btnLoading:false,
            loading:false
          
          }
          
          );
          console.log(response.data.messages);
      }
    })
    .catch((error) => {
      toast.error("Cant Add This record");
      this.setState(
        {
          btnLoading:false,
        }
        );
      
    });

} 

toggleActice=(e)=>{

  e.preventDefault();
    
      axios
      .post(`/api/mice/makeIvoice`, this.state.MICE)
      .then((response) => {
        console.log(response.data)
        if (response.data.status ==200) {
          toast.success(response.data.Result);
            
        } else {
          toast.error("Please Upload Valid Details");
          this.setState(
            {
              error:response.data.Result,
              btnLoading:false,
                loading:false
            
            }
            );
        }
      })
      .catch((error) => {

        this.setState(
          {
            btnLoading:false,
          }
          );
        
      });
}

 render(){
  let options='';
  options  = this.state.individual.map(function (corporate) {
     
    return {label:corporate.individual_name,value:corporate.individual_customer_id}
    
  })
  var HTML_TABLE="",i=1;
  if(this.state.loading)
  {
    HTML_TABLE= <tr><td colSpan="3"><h2>....</h2></td></tr>;
  }
  else{
    HTML_TABLE= 
    this.state.MICEfamily.map( (item,i) =>{
      i++;
      return(
        <tr key={item.mice_family_id}>
          <td>{i}</td>
          <td>Family-{item.mice_family_id}</td>
          <td><b>Name:</b>{item.individual_name}<br></br><b>Email:</b> {item.individual_email}<br></br><b>Phone Number:</b> {item.individual_phone_number}</td>
          
          
          <td>
          <Link to={`/mice/${item.mice_family_id}/Passenger/${item.employee_id}/edit/${this.props.match.params.id}`}>
          <Icon.Edit size={20}></Icon.Edit>
        </Link>
          </td>
          <td  >
          <Button  id='delete-family' type='button' value={`${item.mice_family_id}`} color='danger' onClick={this.deleteFamilyDetails} >
      Delete
      </Button>
          </td>
        </tr>
      )
    })
  }
   
 return (
    

    <React.Fragment>
       <BreadCrumbs
        breadCrumbTitle="MICE"
        breadCrumbParent="Edit MICE"
        breadCrumbActive="MICE Familys"
      />
   <Card>
    <CardHeader><CardTitle>MICE Details</CardTitle></CardHeader>
    <CardBody>
    <div style={{display:"flex",justifyContent:"flex-end"}}>
                  {this.state.MICE.type=="MICE"?<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-outline-info'>{this.state.MICE.type}</Button>:<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-outline-dark'>{this.state.MICE.type}</Button>} </div>
        <Row>
        <Col lg='12'>
                <b>MICE Number:</b> MICE-{this.state.MICE.dsr_number}
            </Col>
           
        </Row>
        <br></br>
        <Row>
        <Col lg='6'>
                <b>MICE Name:</b> {this.state.MICE.mice_name}
            </Col>
            <Col lg='6'>
                <b>Company Name:</b> {this.state.MICE.company_name}
            </Col>
        </Row>
        <br></br>
        <Row>
        <Col lg='6'>
                <b>Email:</b> {this.state.MICE.email}<br/>
                <b>Phone Number:</b> {this.state.MICE.phone_number}
            </Col>
            <Col lg='6'>
                <b>Billing Addres:</b>{this.state.MICE.addres},{this.state.MICE.addres2}<br/>
                {this.state.MICE.city},{this.state.MICE.state}
                <br/>
                {this.state.MICE.country},<br></br>Pincode:{this.state.MICE.pincode}
                <br/>
               
            </Col>
        </Row><br /><br />
        <form onSubmit={this.handleSubmit} id="passenger">
        <Input name="dsr_number"  hidden></Input>
        <Input name="mice_family_id"  hidden></Input>
        <Input name="is_it_unique"  hidden></Input>
        <Row>

        <Col lg='6'>
                <Label>Add Employee </Label> 

                <SingleSelect 
                name="employee_id"
                options={options}    
                getValuesFn={this.getValuesFn}  
                selectedValue={this.state.employee_id}  />
            </Col>
            <Col lg='6'>
            <Label></Label> <br />
               <Button color="primary" type="submit">ADD</Button>
            </Col> 
        </Row>
            </form>
        <hr />
        <table id="customers">
        <tr>
        <th>Sl No</th>
        <th>Family Number</th>
        <th>Family Head</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        {HTML_TABLE}
        </table>
    </CardBody>
   </Card>

    </React.Fragment>
 )
 }
  }