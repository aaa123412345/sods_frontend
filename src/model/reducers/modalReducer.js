// import { createSlice } from "@reduxjs/toolkit"; 

const initState = {

    isOpen: false,
    modalIndex: 0,
    page: 0,
    path: '',
    method: '',
    name: "",
    updateID: null,
    isError: false,

}

const modalReducer = (state = initState, action) => {
    switch(action.type){
        case 'OPEN_MODAL':
            return { 
                ...state,
                modalIndex: action.payload.modalIndex,
                page: 0,
                path: action.payload.path,
                method: action.payload.method,
                name: action.payload.name,
                updateID: action.payload.updateID,
                isOpen: true,
                isError: false
            }
        case 'CLOSE_MODAL':
            return { ...state, isOpen: false }
        case "UPDATE_MODAL":
            return { ...state, ...action.payload }
        case 'GOTO_NEXT_PAGE':
            return {
                ...state,
                page: state.page + 1
            }
        case 'GOTO_PREVIOUS_PAGE':
            return {
                ...state,
                page: state.page - 1
            }
        default:
            return state
    }
}

export default modalReducer

// export const modalSlice = createSlice({
//     name: "modal", 
//     initialState,
//     reducers:{
//         openModal: (state, action) => {
//             state.contentIndex = action.payload.contentIndex
//             state.path = action.payload.path
//             state.method = action.payload.method
//             state.data = action.payload.data
//             state.isOpen = true
//         },
//         closeModal: (state) => {
//             state.isOpen = false
//         }
    
//     }
// })

// export const { openModal, closeModal } = modalSlice.actions;

// export default modalSlice.reducer;

