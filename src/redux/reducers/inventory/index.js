const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  inventoryInfo: {},
  totalRecords: 0,
};

const InventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INVENTORY":
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
      };
    case "GET_ALL_INVENTORY":
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
      };
    case "RESET_INVENTORY_INFO":
      return { ...state, inventoryInfo: {} };

    case "DELETE_INVENTORY":
      let index = state.data.findIndex((item) => item.id === action.obj.id);
      let updatedData = [...state.data];
      updatedData.splice(index, 1);
      return {
        ...state,
        data: updatedData,
        totalRecords: state.allData.length,
      };
    case "INVENTORY_INFO":
      return {
        ...state,
        inventoryInfo: action.data,
      };
    default:
      return state;
  }
};

export default InventoryReducer;
