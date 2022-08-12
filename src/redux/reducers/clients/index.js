const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  clientInfo: {},
  totalRecords: 0,
};

const ClientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CLIENT":
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
      };
    case "RESET_CLIENT_INFO":
      return { ...state, clientInfo: {} };
    case "GET_ALL_CLIENT":
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
      };

    case "DELETE_CLIENT":
      let index = state.data.findIndex((item) => item.id === action.obj.id);
      let updatedData = [...state.data];
      updatedData.splice(index, 1);
      return {
        ...state,
        data: updatedData,
        totalRecords: state.allData.length,
      };
    case "CLIENT_INFO":
      return {
        ...state,
        clientInfo: action.data,
      };
    default:
      return state;
  }
};

export default ClientsReducer;
