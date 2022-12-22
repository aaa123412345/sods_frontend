import { CLOSE_QR_SCANNER, OPEN_QR_SCANNER, UPDATE_BOOTHS, UPDATE_FLOORPLANS, UPDATE_GAMES, UPDATE_HOST, UPDATE_LANGUAGE, UPDATE_PAGE, UPDATE_REGION_INDEX, UPDATE_STORIES, UPDATE_STORY_INDEX, UPDATE_STORY_PROGRESS, UPDATE_THEME_COLOR } from "./tourguide.action"
import { initTourguideState } from "./tourguide.state"

const tourguideReducer = (state = initTourguideState, action) => {

    switch(action.type){
        case UPDATE_PAGE:
            return { ...state, page: action.page }
        case UPDATE_THEME_COLOR:
            return { ...state, themeColor: action.color }
        case UPDATE_LANGUAGE:
            return { ...state, language: action.lang }
        case UPDATE_HOST:
            return { ...state, host: action.host }
        case UPDATE_REGION_INDEX:
            return { ...state, regionIndex: action.index}
        case  UPDATE_STORY_INDEX:
            return { ...state, storyIndex: action.index}
        case UPDATE_FLOORPLANS:
            return { ...state, floorplans: action.floorplans }
        case UPDATE_BOOTHS:
            return { ...state, booths: action.booths }
        case UPDATE_GAMES:
            return { ...state, games: action.games }
        case UPDATE_STORIES:
            return { ...state, stories: action.stories }
        case UPDATE_STORY_PROGRESS:
            return { ...state, storyProgress: action.storyProgress }
        case OPEN_QR_SCANNER: 
            return { ...state, isOpenScanner: true }
        case CLOSE_QR_SCANNER: 
            return { ...state, isOpenScanner: false }
        default:
            return state
    }

}

export default tourguideReducer
