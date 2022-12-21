import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./form/form.reducer";
import modalReducer from './modal/modal.reducer'
import tourguideReducer from './tourguide/tourguide.reducer'
import vrTourReducer from "./vrTour/vrTour.reducer";

export const store = configureStore({
    reducer: {
        tourguide: tourguideReducer, 
        form: formReducer,
        modal: modalReducer,
        vrTour: vrTourReducer
    },
})
