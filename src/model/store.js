import { configureStore } from "@reduxjs/toolkit";
import tourguideReducer from './reducers/tourguideReducer'
import themeReducer from "./reducers/themeReducer";
import modalReducer from "./reducers/modalReducer";
import functionalFooterReducer from "./reducers/functionalFooterSlice";

export const store = configureStore({
    reducer: {
        tourguide: tourguideReducer, 
        themeConfig: themeReducer,
        modal: modalReducer,
        functionalFooter: functionalFooterReducer
    },
})
