import { history } from "history.js";
import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "configs/index";

export const loginWithJWT = (user) => {
  return (dispatch) => {
    axios
      .post(`${REACT_APP_API_URL}/login`, {
        email: user.email, 
        password: user.password,
      })
      .then((response) => {
        var loggedInUser;
        console.log(response);
        if (response.data) {
          loggedInUser = response.data;
          console.log(response.data);
          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" },
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const logoutWithJWT = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT_WITH_JWT", payload: {} });
    history.push("/login");
  };
};
export const storeUser = (user) => {
  return (dispatch) => dispatch({ type: "STORE_USER", user });
};
export const logout = () => {
  return (dispatch) => dispatch({ type: "LOGOUT" });
};

export const changeRole = (role) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: role });
};

export const getUser = (obj) => {
  return (dispatch, getState) => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${REACT_APP_API_URL}/get_user`, {
          params: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data.user) {
            let user = response.data.user;
            dispatch({ type: "STORE_USER", user });
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Your are not authenticated for this action");
    }
  };
};
