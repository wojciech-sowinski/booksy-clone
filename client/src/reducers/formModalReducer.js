const initialState = {
  show: false,
  type: "",
};

export const formModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "showModal":
      return { show: true, type: action.payload };
    case "hideModal":
      return { show: false, type: state.type };
    default:
      return state;
  }
};
