import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {

    isShow: false,
    path: '',
    method: '',
    data: null

}

export const functionalFooterSlice = createSlice({
    name: "functionalFooter", 
    initialState,
    reducers:{
        showFooter: (state, action) => {
            state.path = action.payload.path
            state.method = action.payload.method
            state.isShow = true
        },
        hideFooter: (state) => {
            state.isShow = false
        }
    
    }
})

export const { showFooter, hideFooter } = functionalFooterSlice.actions;

export default functionalFooterSlice.reducer;

