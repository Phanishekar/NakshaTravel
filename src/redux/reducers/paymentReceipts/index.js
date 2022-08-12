const initialState = {
  data: [],
  invoiceDashboardData: null,
  data_summary: null,
  allClients: [],
  allClientsForFilter: [],
  allBusinesses: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  invoiceInfo: {},
  totalRecords: 0,
  sortIndex: [],
};

const moveIndex = (arr, from, to) => {
  let el = arr[from];
  arr.splice(from, 1);
  arr.splice(to, 0, el);
};

const getIndex = (arr, arr2, arr3, params = {}) => {
  console.log(arr, arr2, arr3, params);
  if (arr2.length > 0) {
    let startIndex = arr.findIndex((i) => i.id === arr2[0].id) + 1;
    let endIndex = arr.findIndex((i) => i.id === arr2[arr2.length - 1].id) + 1;
    let finalArr = [startIndex, endIndex];
    return (arr3 = finalArr);
  } else {
    let finalArr = [arr.length - parseInt(params.perPage), arr.length];
    return (arr3 = finalArr);
  }
};

const formatDataForFilter = (data) => {
  return data.map((data) => {
    return { label: data.business_name, value: data.id };
  });
};

const PaymentReceiptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INVOICE":
      return {
        ...state,
        data: action.data,
        data_summary: action.data_summary,
        totalPages: action.totalPages,
        params: action.params,
        sortIndex: getIndex(
          state.allData,
          action.data,
          state.sortIndex,
          action.params
        ),
      };
    case "GET_INVOICE_DASHBOARD_DATA":
      return {
        ...state,
        invoiceDashboardData: action.data,
      };
    case "GET_INVOICE_CLIENT":
      return {
        ...state,
        allClients: action.data,
      };
    case "GET_INVOICE_CLIENT_FILTER":
      return {
        ...state,
        allClientsForFilter: formatDataForFilter(action.data),
      };
    case "GET_INVOICE_BUSINESS":
      return {
        ...state,
        allBusinesses: action.data,
      };
    case "GET_ALL_INVOICE":
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
        sortIndex: getIndex(action.data, state.data, state.sortIndex),
      };
    case "FILTER_INVOICE":
      let value = action.value;
      let filteredData = [];
      if (value.length) {
        filteredData = state.allData
          .filter((item) => {
            let startsWithCondition =
              item.date.toLowerCase().startsWith(value.toLowerCase()) ||
              item.email.toLowerCase().startsWith(value.toLowerCase()) ||
              item.invoice.toLowerCase().startsWith(value.toLowerCase());

            let includesCondition =
              item.date.toLowerCase().includes(value.toLowerCase()) ||
              item.email.toLowerCase().includes(value.toLowerCase()) ||
              item.invoice.toLowerCase().includes(value.toLowerCase());

            if (startsWithCondition) {
              return startsWithCondition;
            } else if (!startsWithCondition && includesCondition) {
              return includesCondition;
            } else return null;
          })
          .slice(state.params.page - 1, state.params.perPage);
        return { ...state, filteredData };
      } else {
        filteredData = state.data;
        return { ...state, filteredData };
      }
    case "ADD_INVOICE":
      let id = 2;
      state.data.unshift({
        ...action.obj,
        id,
      });
      moveIndex(
        state.data,
        state.data.findIndex((item) => item.id === id),
        0
      );
      return {
        ...state,
        data: state.data,
        totalRecords: state.allData.length,
        sortIndex: getIndex(state.allData, state.data, state.sortIndex),
      };
    case "UPDATE_INVOICE":
      state.allData.find((item) => {
        console.log(action);
        if (item.id === action.obj.id) {
          return Object.assign(item, { ...action.obj });
        } else {
          return item;
        }
      });
      return { ...state };
    case "DELETE_INVOICE":
      let index = state.data.findIndex((item) => item.id === action.obj.id);
      let updatedData = [...state.data];
      updatedData.splice(index, 1);
      return {
        ...state,
        data: updatedData,
        totalRecords: state.allData.length,
        sortIndex: getIndex(
          state.allData,
          state.data,
          state.sortIndex,
          state.params
        ),
      };
    case "INVOICE_INFO":
      return {
        ...state,
        invoiceInfo: action.data,
      };
    default:
      return state;
  }
};

export default PaymentReceiptsReducer;
