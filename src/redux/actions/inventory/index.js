import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "configs/index";

export const getData = (params) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/inventory/getAllInventory`, {
        params: {
          ...params,
        },
      })
      .then((response) => {
        dispatch({
          type: "GET_INVENTORY",
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
      .get(`${REACT_APP_API_URL}/inventory/getAllInventory`, {
        params: { key, value },
      })
      .then((response) => {
        dispatch({
          type: "GET_INVENTORY",
          data: response.data.data.data,
          totalPages: response.data.data.totalPages,
          params: {},
        });
      });
  };
};

export const resetInventoryInfo = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_INVENTORY_INFO" });
  };
};

export const deleteData = (obj) => {
  return (dispatch) => {
    axios
      .post("/api/inventory/delete-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "DELETE_INVENTORY", obj });
        toast.success("Inventory deleted successfully");
      });
  };
};

export const fetchInventoryInfo = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/inventory/getInventoryById`, {
        params: {
          id,
        },
      })
      .then((response) => {
        if (response.data.status == 1) {
          dispatch({ type: "INVENTORY_INFO", data: response.data.data });
        } else {
          toast.error(response.data.message);
        }
      });
  };
};

export const updateData = (obj) => {
  return (dispatch, getState) => {
    axios.post(`${REACT_APP_API_URL}/inventory/save`, obj).then((response) => {
      if (response.data.status == 1) {
        toast.success("Inventory Updated successfully");
      } else {
        toast.error(response.data.message);
      }
    });
  };
};

export const addData = (obj) => {
  return (dispatch, getState) => {
    axios
      .post(`${REACT_APP_API_URL}/inventory/save`, obj)
      .then((response) => {
        if (response.data.status == 1) {
          toast.success("Inventory added successfully");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
