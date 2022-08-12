import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "configs/index";

export const getData = (params) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/clients/getAllClients`, {
        params: {
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: "GET_CLIENT",
          data: response.data.data.data,
          totalPages: response.data.data.totalPages,
          params,
        });
      });
  };
};

export const filterData = (key, value) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/clients/getAllClients`, {
        params: { key, value },
      })
      .then((response) => {
        dispatch({
          type: "GET_CLIENT",
          data: response.data.data.data,
          totalPages: response.data.data.totalPages,
          params: {},
        });
      });
  };
};

export const resetClientInfo = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_CLIENT_INFO" });
  };
};
export const getInitialData = () => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/clients/getAllClients`)
      .then((response) => {
        dispatch({ type: "GET_ALL_CLIENT", data: response.data.data });
      });
  };
};
export const deleteData = (obj) => {
  return (dispatch) => {
    axios
      .post("/api/clients/delete-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "DELETE_CLIENT", obj });
        toast.success("Client deleted successfully");
      });
  };
};

export const fetchClientInfo = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/clients/getClientById`, {
        params: {
          id,
        },
      })
      .then((response) => {
        if (response.data.status == 1) {
          dispatch({ type: "CLIENT_INFO", data: response.data.data });
        } else {
          toast.error(response.data.message);
        }
      });
  };
};

export const updateData = (obj) => {
  return (dispatch, getState) => {
    axios.post(`${REACT_APP_API_URL}/clients/save`, obj).then((response) => {
      if (response.data.status == 1) {
        toast.success("Client Updated successfully");
      } else {
        toast.error(response.data.message);
      }
    });
  };
};

export const addData = (obj) => {
  return (dispatch, getState) => {
    //const created_by = getState().auth.login.user.id;
    //{ obj: obj, created_by: created_by }
    axios
      .post(`${REACT_APP_API_URL}/clients/save`, obj)
      .then((response) => {
        if (response.data.status == 1) {
          toast.success("Client added successfully");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
