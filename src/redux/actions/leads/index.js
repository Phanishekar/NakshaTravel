import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "configs/index";
export const getData = (params) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/leads/getAllLeads`, {
        params: {
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: "GET_LEAD",
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
      .get(`${REACT_APP_API_URL}/leads/getAllLeads`, {
        params: { key, value },
      })
      .then((response) => {
        dispatch({
          type: "GET_LEAD",
          data: response.data.data.data,
          totalPages: response.data.data.totalPages,
          params: {},
        });
      });
  };
};

export const resetLeadInfo = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_LEAD_INFO" });
  };
};

export const deleteData = (obj) => {
  return (dispatch) => {
    axios
      .post("/api/leads/delete-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "DELETE_LEAD", obj });
      });
  };
};

export const fetchLeadInfo = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/leads/getLeadById`, {
        params: {
          id,
        },
      })
      .then((response) => {
        if (response.data.status == 1) {
          dispatch({ type: "LEAD_INFO", data: response.data.data });
        } else {
          toast.error(response.data.message);
        }
      });
  };
};

export const updateData = (obj) => {
  return (dispatch, getState) => {
    axios.post(`${REACT_APP_API_URL}/leads/save`, obj).then((response) => {
      if (response.data.status == 1) {
        toast.success("Lead Updated successfully");
      } else {
        toast.error(response.data.message);
      }
    });
  };
};

export const addData = (obj) => {
  return (dispatch, getState) => {
    axios
      .post(`${REACT_APP_API_URL}/leads/save`, obj)
      .then((response) => {
        if (response.data.status == 1) {
          toast.success("Lead added successfully");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("something went wrong");
      });
  };
};
