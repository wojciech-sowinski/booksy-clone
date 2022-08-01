const initialState = {
  loading: false,
  userData: {},
  response: "",
  auth: false,
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "registerNewUser":
      return { ...state, ...action.payload };
    case "loginUser":
      return { ...state, ...action.payload };
    case "fetchUserData":
      return { ...state, ...action.payload };
    case 'clearUserData':
      return initialState
    default:
      return state;
  }
};
