import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "configs/index";

export const getData = (params) => {
  return async (dispatch) => {
    await axios.get("/api/business/data", params).then((response) => {
      dispatch({
        type: "GET_BUSINESS",
        data: response.data.data,
        totalPages: response.data.totalPages,
        params,
      });
    });
  };
};

export const getBusinessData = () => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/clients/getAllBusinessesForInvoice`)
      .then((response) => {
        dispatch({
          type: "GET_ALL_BUSINESS",
          data: response.data.data,
        });
      });
  };
};

export const getInitialData = () => {
  return async (dispatch) => {
    await axios.get("/api/business/initial-data").then((response) => {
      // dispatch({ type: "GET_ALL_BUSINESS", data: response.data });
    });
  };
};

export const filterData = (value) => {
  return (dispatch) => dispatch({ type: "FILTER_BUSINESS", value });
};

export const deleteData = (obj) => {
  return (dispatch) => {
    axios
      .post("/api/business/delete-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "DELETE_BUSINESS", obj });
        toast.success("Business deleted successfully");
      });
  };
};

export const fetchBusinessInfo = (id) => {
  return async (dispatch) => {
    await axios.get("/api/business/initial-data").then((response) => {
      dispatch({ type: "GET_ALL_BUSINESS", data: response.data });
      dispatch({ type: "BUSINESS_INFO", id });
    });
  };
};

export const updateData = (obj) => {
  return (dispatch, getState) => {
    axios
      .post("/api/business/update-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "UPDATE_BUSINESS", obj });
        toast.success("Business updated successfully");
      });
  };
};

export const addData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    axios
      .post("/api/business/add-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "ADD_BUSINESS", obj });
        dispatch(getData(params));
        toast.success("Business added successfully");
      })
      .catch((error) => {
        toast.error("something went wrong");
      });
  };
};
