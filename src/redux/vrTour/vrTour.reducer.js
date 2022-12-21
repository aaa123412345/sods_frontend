import { initVRTourState } from "./vrTour.state"
import { SHOW_VR_TOUR, HIDE_VR_TOUR, UPDATE_VR_BOOTH_ID } from "./vtTour.action"


const vrTourReducer = (state = initVRTourState, action) => {

    switch(action.type){

        case UPDATE_VR_BOOTH_ID:
            return { ...state, vrBoothID: action.boothID }

        default:
            return state

    }

}

export default vrTourReducer
