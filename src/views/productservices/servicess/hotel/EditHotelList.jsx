
import axios from "axios";
import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Pagination, Row, Spinner, Table } from 'reactstrap'
import AddHotelService from './AddHotelService';
import SingleSelect from "components/common/formBasic/singleSelect";
import EditHotelService from "./EditHotelService";
import {country,HotelType} from "./../../../country/CountryList"
import {HotelServiceList} from "./HotelServiceList"





export default class EditHotelList extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            users:'',
            user:'',
            id:this.props.match.params.id,
            hotel_type: '',
            hotel_name: '',
            hotel_addres: '',
            hotel_city: '',
            hotel_state: '',
            hotel_country: '',
            hotel_active:"",
            hotel_addres2:"",
            uploading: false,
            loading: true,
            loadingDetails: true,
        

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

    toggleActice= async(e)=>{
        let id=this.props.match.params.id;
        const resp= await axios.get(`/api/productandservices/services/hotelActive/${id}`);
        if(resp.data.status==200)
        {
          toast.warning(resp.data.Result);
              
              this.props.history.push(`/productandservice/service/hotel`);
        }
        else{
          toast.error("Oops! Something went Wrong");
        }
  
        }
  
    handleSubmit = (e) => {
        this.setState(
            {
                uploading: true,
            }
        )
        var formData = new FormData(document.querySelector("#editemployee"));
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
            .post(`/api/productandservices/services/updatehotel/${ids}`, formData)
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success(response.data.Result);
                    this.props.history.push(`/productandservice/service/hotel`);
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
        this.setState(
            {
            }
        )
    }



    getValuesFn = (data) => {

        if (data.id == "hotel_country") {
            this.setState({
                hotel_country: data.value,
            });
        }
        else if(data.id == "hotel_type"){
            this.setState({
                hotel_type: data.value,
            });
        }
    };

    async componentDidMount() {

     
        this.getUserData(1)

    }

    async getUserData(pageNumber) {



        console.log("resp");
        let id=this.props.match.params.id;
        const res= await axios.get(`/api/productandservices/services/hotelandservice/${id}?page=${pageNumber}`);
        console.log(res.data);
       
        if(res.data.status==200)
        {
          this.setState({
            users:res.data.Hotel,
            user:res.data.Hotel.data,
            loading:false,
          });
        }


        let  hotel_id=this.props.match.params.id;
        const resp = await axios.get(`/api/productandservices/services/gethotelbyid/${hotel_id}`);
        console.log(resp.data);


        if (resp.data.status == 200) {
            this.setState({


                loading: false,
                hotel_type: resp.data.result.hotel_type,
                hotel_name: resp.data.result.hotel_name,
                hotel_addres: resp.data.result.hotel_addres,
                hotel_addres2:resp.data.result.hotel_addres2,
                hotel_city: resp.data.result.hotel_city,
                hotel_state: resp.data.result.hotel_state,
                hotel_country: resp.data.result.hotel_country,
                hotel_active:resp.data.result.hotel_active,
                
               
                loadingDetails: false,
            });
        }

        if (resp.data.status == 409) {
            this.setState({


                loading: false,
                error: resp.data.result,
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
    <tr className='mt-5 mb-5' key={item.hotel_service_id}>
                        <td>{item.hotel_room_name}</td>
                <td>{item.hotel_occupency}</td>
                <td>{item.hotel_bed}</td>
                <td>{item.hotel_price}</td>
                <td>
                    <EditHotelService hotel_id={this.state.id} hotel_name={this.state.hotel_name} id={item.hotel_service_id} />
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
                    breadCrumbActive="Edit Hotel"
                />
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Hotel</CardTitle>
                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                  {this.state.hotel_active=="Active"?<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-success mr-2'>{this.state.hotel_active}</Button>:<Button id='corporatebackbtn' type='btn' onClick={this.toggleActice} value="Cancel" color='btn btn-danger mr-2'>{this.state.hotel_active}</Button>} </div>
                    </CardHeader>
                    <CardBody>
                        <form id="editemployee"  onSubmit={this.handleSubmit}>
                            <div style={{padding:"20px"}}>
                            <Row>
                                <Col lg="3"><Label>Hotel Type</Label></Col>
                                <Col lg="6">
                                    <FormGroup >

                                        
                                        <SingleSelect name="hotel_type"
                                            options={HotelType}
                                            getValuesFn={this.getValuesFn}
                                            selectedValue={this.state.hotel_type} />

                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                            <Col lg="3"> <Label for="hotel_name">Hotel Name</Label></Col>
                            <Col lg="6">
                                    <FormGroup >
                                       
                                        <Input name="hotel_name" value={this.state.hotel_name}
                                            type='text' placeholder='Enter Your Hotel Name'>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                            <Col lg="3"><Label for="address">Address Line 1</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                        
                                        <Input name='hotel_addres' type='textarea' value={this.state.hotel_addres}
                                            placeholder='Enter Your Address 1'></Input>
                                    </FormGroup>
                                </Col>
                                </Row>
                            <Row>
                                <Col lg="3">  <Label>Address Line 2</Label></Col>
                                 <Col lg="6">
                                 <FormGroup>
                               <Input name="hotel_addres2" type='textarea' 
                               placeholder='Enter Your Address 2'
                                value={this.state.hotel_addres2} ></Input>
                                </FormGroup>
                               </Col>
                            
                            </Row>
                            <Row>
                            <Col lg="3"><Label for='city'>City/Town</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                        
                                        <Input type="text"
                                            name="hotel_city" value={this.state.hotel_city}
                                            placeholder='City'>
                                        </Input>
                                    </FormGroup>
                                </Col>
                               
                                </Row>
                            <Row>
                            <Col lg="3"><Label for='state' >State</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                        
                                        <Input type="text" value={this.state.hotel_state}
                                            name="hotel_state"
                                            placeholder='State'>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                </Row>
                            <Row>
                            <Col lg="3"> <Label for='Country' >Country</Label></Col>
                                <Col lg="6" >
                                    <FormGroup>
                                       
                                        <SingleSelect name="hotel_country"
                                            options={country}
                                            getValuesFn={this.getValuesFn}
                                            selectedValue={this.state.hotel_country} />
                                    </FormGroup>
                                </Col>

                          
                            </Row>
                            <hr></hr>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}><Link to="/productandservice/service/hotel" >
                                <Button id='corporatebackbtn' type='reset' value="Cancel" color='warning mr-2'>Back</Button> </Link>
                                <Button id='corporatesubmitbtn' type='submit' value="submit" color='primary mr-2' >Update</Button>
                            </div>
                            </div>
                        </form>

                    </CardBody>

                </Card>


                
                       

                        <HotelServiceList id={this.props.match.params.id} name={this.state.hotel_name}/>
                    
            </React.Fragment>
        )
    }
}
