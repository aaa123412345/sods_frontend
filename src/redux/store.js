import { configureStore } from "@reduxjs/toolkit";

import sysConfigReducer from './sysConfig/sysConfig.reducer'

import tourguideReducer from './tourguide/tourguide.reducer'
import inspectorReducer from "./inspector/inspector.reducer";
import formReducer from "./form/form.reducer";
import modalReducer from './modal/modal.reducer'
import arTreasureReducer from "./arTreasure/arTreasure.reducer";


export const store = configureStore({
    reducer: {
        sysConfig: sysConfigReducer,
        tourguide: tourguideReducer, 
        inspector: inspectorReducer,
        form: formReducer,
        modal: modalReducer,
        arTreasure: arTreasureReducer
    },
})
