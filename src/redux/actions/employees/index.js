import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "configs/index";

export const getData = (params) => {
  return async (dispatch) => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/posts`, {
        params: {
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: "GET_EMPLOYEE",
          data: response,
          totalPages: 5,
          params,
        });
      });
  };
};

export const filterData = (key, value) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/users/getAllUsers`, {
        params: { key, value },
      })
      .then((response) => {
        dispatch({
          type: "GET_EMPLOYEE",
          data: response.data.data.data,
          totalPages: response.data.data.totalPages,
          params: {},
        });
      });
  };
};

export const resetEmployeeInfo = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_EMPLOYEE_INFO" });
  };
};

export const deleteData = (obj) => {
  return (dispatch) => {
    axios
      .post("/api/employee/delete-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "DELETE_EMPLOYEE", obj });
        toast.success("Employee deleted successfully");
      });
  };
};

export const fetchEmployeeInfo = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/users/getUserById`, {
        params: {
          id,
        },
      })
      .then((response) => {
        if (response.data.status == 1) {
          dispatch({ type: "EMPLOYEE_INFO", data: response.data.data });
        } else {
          toast.error(response.data.message);
        }
      });
  };
};

export const updateData = (obj) => {
  return (dispatch, getState) => {
    axios.post(`${REACT_APP_API_URL}/users/save`, obj).then((response) => {
      if (response.data.status == 1) {
        toast.success("Employee Updated successfully");
      } else {
        toast.error(response.data.message);
      }
    });
  };
};

export const addData = (obj) => {
  return (dispatch, getState) => {
    axios
      .post(`/api/employee/save`, obj)
      .then((response) => {
        //dispatch({ type: "ADD_EMPLOYEE", obj });
        if (response.data.status == 200) {
          toast.success("Employee added successfully");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
