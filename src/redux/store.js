import { configureStore } from "@reduxjs/toolkit";

import sysConfigReducer from './sysConfig/sysConfig.reducer'

import tourguideReducer from './tourguide/tourguide.reducer'
import formReducer from "./form/form.reducer";
import modalReducer from './modal/modal.reducer'

import arTreasureReducer from "./arTreasure/arTreasure.reducer";
import vrTourReducer from "./vrTour/vrTour.reducer";


export const store = configureStore({
    reducer: {
        sysConfig: sysConfigReducer,
        tourguide: tourguideReducer, 
        form: formReducer,
        modal: modalReducer,
        arTreasure: arTreasureReducer,
        vrTour: vrTourReducer
    },
})
