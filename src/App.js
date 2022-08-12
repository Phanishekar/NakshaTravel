import React from "react";
import Router from "./Router";
import "./components/@custom/rippleButton/RippleButton";

import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";


axios.defaults.baseURL = "https://wellniverse.in/Naksha/api";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';

axios.defaults.withCredentials = true;

const App = (props) => {
  return <Router />;
};

export default App;
