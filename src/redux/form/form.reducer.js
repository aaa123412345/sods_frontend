import { RESET_DATA, UPDATE_BOOTH, UPDATE_FLOORPLAN, UPDATE_GAME, UPDATE_STORY } from "./form.action"
import { initFormState } from "./form.state"

const formReducer = (state = initFormState, action) => {

    switch(action.type){
        case UPDATE_FLOORPLAN:
            return { ...state, floorplan: action.floorplan }
        case UPDATE_BOOTH:
            return { ...state, booth: action.booth}
        case UPDATE_STORY:
            return { ...state, story: action.story }
        case UPDATE_GAME:
            return { ...state, game: action.game }
        case RESET_DATA:
            return { ...initFormState }
        default:
            return state
    }

}

export default formReducer
