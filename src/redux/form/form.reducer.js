import { RESET_DATA, UPDATE_AR_TREASURE, UPDATE_BOOTH, UPDATE_BOOTH_GAME, UPDATE_FLOORPLAN, UPDATE_MARKER, UPDATE_STORY, UPDATE_VR } from "./form.action"
import { initFormState } from "./form.state"

const formReducer = (state = initFormState, action) => {

    switch(action.type){
        case UPDATE_FLOORPLAN:
            return { ...state, floorplan: action.floorplan }
        case UPDATE_BOOTH:
            return { ...state, booth: action.booth}
        case UPDATE_VR:
            return { ...state, vr: action.vr }
        case UPDATE_STORY:
            return { ...state, story: action.story }
        case UPDATE_MARKER:
            return { ...state, marker: action.marker }
        case UPDATE_AR_TREASURE:
            return { ...state, arTreasure: action.arTreasure }
        case UPDATE_BOOTH_GAME:
            return { ...state, boothGame: action.boothGame }
        case RESET_DATA:
            return { ...initFormState, file: null }
        default:
            return state
    }

}

export default formReducer
