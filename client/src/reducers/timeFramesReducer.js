const initialState = {
  loading: false,
  timeFrames: [],
  response: '', 
};

export const timeFramesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetchTimeFrames":
 
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
