import { configureStore } from "@reduxjs/toolkit";
import { formModalReducer } from "../reducers/formModalReducer";
import { userDataReducer } from "../reducers/userDataReducer";
import { placesReducer } from "../reducers/placesReducer";
import { timeFramesReducer } from "../reducers/timeFramesReducer";

export const store = configureStore({
  reducer: {
    formModalReducer,
    userDataReducer,
    placesReducer,
    timeFramesReducer,
  },
});
