import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "configs/index";
import { history } from "history.js";

export const getData = (params) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/invoices/getAllInvoices`, {
        params: {
          ...params,
          type: "invoice",
        },
      })
      .then((response) => {
        dispatch({
          type: "GET_INVOICE",
          data: response.data.data.data,
          totalPages: response.data.data.totalPages,
          data_summary: response.data.data.data_summary,
          params,
        });
      });
  };
};

export const getInvoiceDashboardData = (params) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/invoices/getInvoiceDashboardData`, {
        params: {
          ...params,
          type: "invoice",
        },
      })
      .then((response) => {
        dispatch({
          type: "GET_INVOICE_DASHBOARD_DATA",
          data: response.data.data,
        });
      });
  };
};

export const getClientData = () => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/clients/getAllClientsForInvoice`)
      .then((response) => {
        dispatch({
          type: "GET_INVOICE_CLIENT",
          data: response.data.data,
        });
        dispatch({
          type: "GET_INVOICE_CLIENT_FILTER",
          data: response.data.data,
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
          type: "GET_INVOICE_BUSINESS",
          data: response.data.data,
        });
      });
  };
};

export const getInitialData = () => {
  return async (dispatch) => {
    await axios.get("/api/invoice/initial-data").then((response) => {
      dispatch({ type: "GET_ALL_INVOICE", data: response.data });
    });
  };
};

export const filterData = (value) => {
  return (dispatch) => dispatch({ type: "FILTER_INVOICE", value });
};

export const deleteData = (obj) => {
  return (dispatch) => {
    axios
      .post("/api/invoice/delete-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "DELETE_INVOICE", obj });
        toast.success("Invoice deleted successfully");
      });
  };
};

export const fetchInvoiceInfo = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${REACT_APP_API_URL}/invoices/getInvoiceById`, {
        params: {
          id,
        },
      })
      .then((response) => {
        dispatch({ type: "INVOICE_INFO", data: response.data.data });
      });
  };
};

export const updateData = (obj) => {
  return (dispatch, getState) => {
    axios
      .post(`${REACT_APP_API_URL}/invoices/update`, {
        ...obj,
        invoice_type: "invoice",
      })
      .then((response) => {
        if (response.data.status == 1) {
          toast.success("Invoice updated successfully");
          history.push("/downloadInvoice/" + obj.id);
        } else {
          toast.error("Something went wrong");
        }
      });
  };
};

export const addData = (obj) => {
  return (dispatch, getState) => {
    axios
      .post(`${REACT_APP_API_URL}/invoices/create`, {
        ...obj,
        invoice_type: "invoice",
      })
      .then((response) => {
        if (response.data.status == 1) {
          toast.success("Invoice added successfully");
          history.push("/downloadInvoice/" + response.data.data.id);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        toast.error("something went wrong");
      });
  };
};
