const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  leadInfo: {},
  totalRecords: 0,
  loading: true,
};

const LeadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LEAD":
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
      };
    case "RESET_LEAD_INFO":
      return { ...state, leadInfo: {} };
    case "GET_ALL_LEAD":
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
      };
    case "DELETE_LEAD":
      let index = state.data.findIndex((item) => item.id === action.obj.id);
      let updatedData = [...state.data];
      updatedData.splice(index, 1);
      return {
        ...state,
        data: updatedData,
        totalRecords: state.allData.length,
      };
    case "LEAD_INFO":
      return {
        ...state,
        leadInfo: action.data,
      };
    default:
      return state;
  }
};

export default LeadsReducer;
