import { CLEAR_LOADING_ITEM, UPDATE_BOOTHS, UPDATE_FLOORPLANS, UPDATE_BOOTH_GAMES, UPDATE_HOST, UPDATE_ITEM_INDEX, UPDATE_LANGUAGE, UPDATE_LOADING_ITEM, UPDATE_MARKERS, UPDATE_PAGE, UPDATE_REGION_INDEX, UPDATE_STORIES, UPDATE_STORY_INDEX, UPDATE_STORY_PROGRESS, UPDATE_THEME_COLOR } from "./tourguide.action"
import { initTourguideState } from "./tourguide.state"

const tourguideReducer = (state = initTourguideState, action) => {

    switch(action.type){
        case UPDATE_PAGE:
            return { ...state, page: action.page }
        case UPDATE_THEME_COLOR:
            return { ...state, themeColor: action.color }
        case UPDATE_REGION_INDEX:
            return { ...state, regionIndex: action.index}
        case UPDATE_STORY_INDEX:
            return { ...state, storyIndex: action.index}
        case UPDATE_ITEM_INDEX:
            return { ...state, itemIndex: action.index }
        case UPDATE_FLOORPLANS:
            return { ...state, floorplans: action.floorplans }
        case UPDATE_MARKERS:
            return { ...state, markers: action.markers }
        case UPDATE_BOOTHS:
            return { ...state, booths: action.booths }
        case UPDATE_BOOTH_GAMES:
            return { ...state, boothGames: action.games }
        case UPDATE_STORIES:
            return { ...state, stories: action.stories }
        case UPDATE_STORY_PROGRESS:
            return { ...state, storyProgress: action.storyProgress }
        case UPDATE_LOADING_ITEM:
            return { ...state, loadingItem: action.loadingItem }
        case CLEAR_LOADING_ITEM: 
            return { ...state, loadingItem: "" }
        default:
            return state
    }

}

export default tourguideReducer
