import { configureStore } from "@reduxjs/toolkit";
import { formModalReducer } from "../reducers/formModalReducer";
import { userDataReducer } from "../reducers/userDataReducer";
import { placesReducer } from "../reducers/placesReducer";
import { timeFramesReducer } from "../reducers/timeFramesReducer";
import {servicesReducer} from '../reducers/servicesReducer'

export const store = configureStore({
  reducer: {
    formModalReducer,
    userDataReducer,
    placesReducer,
    timeFramesReducer,
    servicesReducer
  },
});
