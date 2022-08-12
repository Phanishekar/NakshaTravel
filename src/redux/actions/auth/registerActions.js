import * as firebase from "firebase/app";
import { history } from "history.js";
import "firebase/auth";
import "firebase/database";
import axios from "axios";
import { REACT_APP_API_URL } from "configs/index";

let firebaseAuth = firebase.auth();

export const signupWithFirebase = (email, password, name) => {
  return (dispatch) => {
    let userEmail = null,
      loggedIn = false;
    // userName = null

    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebaseAuth.onAuthStateChanged((user) => {
          result.user.updateProfile({
            displayName: name,
          });
          if (user) {
            userEmail = user.email;
            // let userName = user.displayName
            loggedIn = true;
            dispatch({
              type: "SIGNUP_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
                isSignedIn: loggedIn,
              },
            });
            dispatch({
              type: "LOGIN_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
              },
            });
          }
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const signupWithJWT = (email, password, name) => {
  return (dispatch) => {
    axios
      .post(`${REACT_APP_API_URL}/register`, {
        name,
        email,
        password,
      })
      .then((response) => {
        var loggedInUser;

        if (response.data) {
          loggedInUser = response.data.user;

          localStorage.setItem("token", response.data.token);

          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" },
          });

          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
};
