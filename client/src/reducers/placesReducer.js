const initialState = { loading: false, places: [],response:'' };

export const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetchPlaces":
      return {...state,...action.payload}
      
    default:
      return state;
  }
};
