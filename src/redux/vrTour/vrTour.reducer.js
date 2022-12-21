import { initVRTourState } from "./vrTour.state"
import { SHOW_VR_TOUR, HIDE_VR_TOUR } from "./vtTour.action"


const vrTourReducer = (state = initVRTourState, action) => {

    switch(action.type){
        case SHOW_VR_TOUR:
            return { ...state, isShow: true }
        
        case HIDE_VR_TOUR:
            return { ...state, isShow: false }
        default:
            return state
    }

}

export default vrTourReducer
