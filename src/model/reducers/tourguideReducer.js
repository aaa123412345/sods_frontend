// import { createSlice } from "@reduxjs/toolkit"; 

const initState = {

    page: 0,
    regionIndex: 0,
    storyIndex: 0,
    floorplans: [],
    floorplan: {
        region: ""
    },
    booths: [],
    booth: {
        region: "",
        name: "",
        venue: "",
        description: "",
        passcode: '0000',
    },
    marker: {
        top: null,
        left: null,
        region: null
    },
    games: [],
    game: {
        gameType: null,
    },
    stories: [],
    storyProgress: 2,
    story: {
        name: "",
        content: ""
    }

}

const tourguideReducer = (state = initState, action) => {
    switch(action.type){
        case 'UPDATE_PAGE':
            return { ...state, page: action.payload }
        case "UPDATE_REGION_INDEX":
            return { ...state, regionIndex: action.payload}
        case "UPDATE_STORY_INDEX":
            return { ...state, storyIndex: action.payload}
        case 'UPDATE_FLOORPLANS':
            return { ...state, floorplans: action.payload }
        case 'UPDATE_FLOORPLAN':
            return { ...state, floorplan: action.payload }
        case 'UPDATE_BOOTHS':
            return { ...state, booths: action.payload }
        case 'UPDATE_BOOTH':
            return { ...state, booth: {...action.payload, region: state.floorplans[state.regionIndex].region,}}
        case 'UPDATE_MARKER':
            return { ...state, marker: action.payload }
        case "UPDATE_GAMES":
            return { ...state, games: action.payload }
        case 'UPDATE_GAME':
            return { ...state, game: action.payload }
        case 'UPDATE_STORIES':
            return { ...state, stories: action.payload }
        case 'UPDATE_STORY':
            return { ...state, story: action.payload }
        case 'RESET_DATA':
            return { 
                    ...state, 
                    floorplan: { 
                        region: "" 
                    }, 
                    booth: {
                        region: state.floorplans[state.regionIndex].region,
                        name: "",
                        venue: "",
                        description: "",
                        passcode: '0000'
                    },
                    marker: {
                        top: null,
                        left: null,
                        region: null
                    },
                    game: {gameType: null},
                    story: {
                        name: "",
                        content: ""
                    }
                }
        default:
            return state
    }
}

export default tourguideReducer

// export const tourguideSlice = createSlice({
//     name: "tourguide", 
//     initialState,
//     reducers:{
//         updatePage: (state, action) => {
//             state.page = action.payload
//         },
//         updateFloorplans: (state, action) => {
//             state.floorplans = action.payload
//         },
//         updateFloorplan: (state, action) => {
//             state.floorplan = action.payload
//         },
//         resetData: (state, action) => {
//             state.floorplan = {
//                 region: ""
//             } 
//         }
//     }
// })

// export const { updatePage, updateFloorplans, updateFloorplan, resetData } = tourguideSlice.actions;

// export default tourguideSlice.reducer;

