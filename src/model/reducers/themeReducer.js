// import { createSlice } from "@reduxjs/toolkit"; 

const initState = {

    themeColor: 'orange',
    isAdmin: true,
    link: 'http://localhost:3000/'

}

// export const themeConfigSlice = createSlice({
//     name: "themeConfig", 
//     initialState,
//     reducers:{
//         updateThemeColor: (state, action) => {
//             state.themeColor = action.payload
//         },
//         updateIsAdmin: (state, action) => {
//             state.isAdmin = action.payload
//         }
//     }
// })

const themeReducer = (state = initState, action) => {
    switch(action.type){
        case 'UPDATE_THEME_COLOR':
            return { ...state, themeColor: action.payload.themeColor }
        default:
            return state
    }
}

// export const { updateThemeColor, updateIsAdmin } = themeConfigSlice.actions;

// export default themeConfigSlice.reducer;

export default themeReducer

