import React from "react";
import { Link } from "react-router-dom";
import {
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
  Spinner,
} from "reactstrap";
import { Mail, Lock } from "react-feather";
import { history } from "history.js";
import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "configs/index";
import { storeUser } from "redux/actions/auth/loginActions";
import { connect } from "react-redux";

    
class LoginJWT extends React.Component {      


  state = {
    email: " ",
    password: "",
    btnLoading: false,
  };

 

  handleLogin = (e) => {


    e.preventDefault();
    this.setState({ btnLoading: true });
    axios.get ('/sanctum/csrf-cookie').then(response => {
  console.log(response.config.headers);
    axios 
      .post(`/api/login`, this.state,)
      .then((response) => {
        console.log(response);
        
        if (response.data) {
          if (response.data.status===200) {
            // this.getUser(response.data.token);
          
            history.push("/profile");
          } else {
            toast.error(response.data.message);
          }
        }
      })
      .catch((err) => {
        toast.error("!Oops something went wrong... Try Again later...");
        this.setState({ btnLoading: false });
      });
    });
  };

  getUser = (token) => {
    // if (token) {
    //   localStorage.setItem("token", token);
    //   axios
    //     .get(`${REACT_APP_API_URL}/get_user`, {
    //       params: {
    //         token: token,
    //       },
    //     })
    //     .then((response) => {
    //       if (response.data.user) {
    //         this.props.storeUser(response.data.user);
    //         this.setState({ btnLoading: false });
    //         toast.success("Logged In Successfully");
    //         history.push("/profile");
    //       } else {
    //         history.push("/login");
    //       }
    //     })
    //     .catch((error) => {
    //       toast.error(error.message);
    //     });
    // } else {
    //   history.push("/login");
    // }
  };
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Email</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              
            </FormGroup>
            <div className="d-flex justify-content-between">
              

              {this.state.btnLoading ? (
                <Button.Ripple color="primary" type="button">
                  <Spinner color="white" size="sm" />
                  <span className="ml-50">Loading...</span>
                </Button.Ripple>
              ) : (
                <Button.Ripple color="primary" type="submit">
                  Login
                </Button.Ripple>
              )}
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.login,
  };
};

export default connect(mapStateToProps, { storeUser })(LoginJWT);
