const initialState = { loading: false, services: [],response:'' };

export const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetchServices":
      return {...state,...action.payload}
      
    default:
      return state;
  }
};
