export const login = (
  state = { userRole: "admin", isAuthenticated: false, user: null },
  action
) => {
  switch (action.type) {
    case "LOGIN_WITH_EMAIL": {
      return {
        ...state,
        data: action.payload.loggedInUser,
        isAuthenticated: true,
      };
    }

    case "LOGIN_WITH_JWT": {
      return {
        ...state,
        data: action.payload.loggedInUser,
        isAuthenticated: true,
      };
    }

    case "STORE_USER": {
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }

    case "UPDATE_USER": {
      return {
        ...state,
        data: action.payload.loggedInUser,
        isAuthenticated: true,
      };
    }

    case "LOGOUT_WITH_JWT": {
      return {
        ...state,
        data: action.payload.loggedInUser,
        isAuthenticated: false,
      };
    }

    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole, isAuthenticated: true };
    }
    default: {
      return state;
    }
  }
};
