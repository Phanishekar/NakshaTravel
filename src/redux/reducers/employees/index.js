const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  employeeInfo: {},
  totalRecords: 0,
};

const EmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE":
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
      };
    case "RESET_EMPLOYEE_INFO":
      return { ...state, employeeInfo: {} };
    case "GET_ALL_EMPLOYEE":
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
      };

    case "DELETE_EMPLOYEE":
      let index = state.data.findIndex((item) => item.id === action.obj.id);
      let updatedData = [...state.data];
      updatedData.splice(index, 1);
      return {
        ...state,
        data: updatedData,
        totalRecords: state.allData.length,
      };
    case "EMPLOYEE_INFO":
      console.log("empee", action.data);
      return {
        ...state,
        employeeInfo: action.data,
      };
    default:
      return state;
  }
};

export default EmployeesReducer;
