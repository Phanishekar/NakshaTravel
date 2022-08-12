
import axios from "axios";
import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Pagination, Row, Spinner, Table } from 'reactstrap'


import InsuranceCompanyList from "./InsuranceCompanyList"
import EditInsuranceDetails from "./EditInsuranceDetails";


export default class EditInsuranceCompany extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            users:'',
            user:'',
            id:this.props.match.params.id,
            insurence_company_name:'',
            loading:'',
            total:''
        };

        this.initialState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) => {
        const { name, value, } = e.target;
        this.setState({ [name]: value }

        );
    }
    handleSubmit = (e) => {
        this.setState(
            {
                uploading: true,
            }
        )
        var formData = new FormData(document.querySelector("#editinsurence"));
        let i = 0, Name = [], Data = [];
        for (var pair of formData.entries()) {
            console.log(pair[0], pair[1]);
            Name[i] = pair[0];
            Data[i] = pair[1];
            i++;
        }
        for (var j = 0; j < i; j++) {
            formData.append(Name[i], Data[i]);
        }
        e.preventDefault();
        let ids = this.props.match.params.id;
        axios
            .post(`/api/productandservices/services/updateinsurance/${ids}`, formData)
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success(response.data.Result);
                    this.props.history.push(`/productservices/servicess/insurance`);
                } else {


                    toast.error(response.data.Result);
                    console.log(response.data.Result);
                    this.setState(
                        {
                            uploading: false,
                            error: response.data.Result,

                        }
                    );
                }
            })
            .catch((error) => {
                toast.error(error.result);
            });
        
    }



  

    async componentDidMount() {

     
        this.getUserData(1)

    }

    async getUserData(pageNumber) {



        console.log("resp");
        let  id=this.props.match.params.id;
        const res= await axios.get(`/api/productandservices/services/insurancedetails/${id}?page=${pageNumber}`);
        console.log(res.data);
       
        if(res.data.status==200)
        {
          this.setState({
            users:res.data.insurance_details,
            user:res.data.insurance_details.data,
            loading:false,
            total:res.data.insurance_details.total
          });
        }


        let  hotel_id=this.props.match.params.id;
        const resp = await axios.get(`/api/productandservices/services/getinsurancebyid/${hotel_id}`);
        console.log(resp.data);


        if (resp.data.status == 200) {
            this.setState({


                loading: false,
               
                insurence_company_name: resp.data.insurance.insurence_company_name,
               
            });
        }

        if (resp.data.status == 409) {
            this.setState({


                loading: false,
                error: resp.data.insurance,
            });
        }




        
      }

    handleChange = (e) => {
        const { name, value, } = e.target;
        this.setState({ [name]: value });
    }
    render() {


        const{data,current_page,per_page,total}=this.state.users;
        console.log(current_page,per_page,total);
          var user_HTML_TABLE="";
        if(this.state.loading)
        {
          user_HTML_TABLE= <tr><td style={{color:"#7367f0",textAlign:"center",fontSize:"20px"}} colSpan="6"><Spinner animation="border" variant="primary" /> Loading.....</td></tr>;
        }else if(this.state.total==0)
        {
            user_HTML_TABLE= <tr><td style={{color:"#7367f0",textAlign:"center",fontSize:"20px"}} colSpan="6"><h4>No Record Found</h4></td></tr>;
        }
        else{
          user_HTML_TABLE= 
          this.state.user.map((item) =>{
            return(
    <tr className='mt-5 mb-5' key={item.insurence_detail_id}>
                         <td>{item.insurence_plan}</td>
                        <td>{item.insurence_dateORyears}</td>
                <td>{item.insurence_price}</td>
               
                
                <td>
                    <EditInsuranceDetails id={item.insurence_detail_id} company_id={item.insurence_company_id}/>
                </td>
              </tr>
              
              
            )
          })
        }

        return (
            <React.Fragment>
                <BreadCrumbs
                    breadCrumbTitle="Product & Service"
                    breadCrumbParent="Services"
                    breadCrumbActive="Edit Insurance"
                />
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Insurance Company</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <form id="editinsurence"  onSubmit={this.handleSubmit}>
                          <div style={{padding:"20px"}}>
                            <Row>
                                <Col lg="2"><Label for="hotel_name">Company Name</Label></Col>
                                <Col lg="6">
                                    <FormGroup >
                                        
                                        <Input name="insurence_company_name" value={this.state.insurence_company_name} onChange={this.handleChange}
                                            type='text' placeholder='Enter Your Hotel Name'>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <br></br>
                         <hr></hr>
                         
                            <div style={{ display: "flex", justifyContent: "flex-end" }}><Link to="/productandservice/service/insurance" >
                                <Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Back</Button> </Link>
                                <Button id='corporatesubmitbtn' type='submit' value="submit" color='primary mr-2' >Update</Button>
                            </div>
                            </div>
                        </form>

                    </CardBody>

                </Card>


               <InsuranceCompanyList id={this.props.match.params.id} name={this.state.insurence_company_name}/>
            </React.Fragment>
        )
    }
}
