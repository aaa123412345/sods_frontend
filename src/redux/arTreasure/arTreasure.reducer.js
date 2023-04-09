import { initARTreasureState } from "./arTreasure.state"
import { UPDATE_AR_TREASURE, UPDATE_AR_TREASURES, UPDATE_AR_BOOTHS, UPDATE_BOOTH_GAMES } from "./arTreasure.action"

const arTreasureReducer = (state = initARTreasureState, action) => {

    switch(action.type){

        case UPDATE_AR_BOOTHS:
            return { ...state, tourBooths: action.tourBooths }

        case UPDATE_BOOTH_GAMES:
            return { ...state, boothGames: action.boothGames }

        case UPDATE_AR_TREASURE:
            return { ...state, treasure: action.treasure }

        case UPDATE_AR_TREASURES:
            return { ...state, treasures: action.treasures }

        default:
            return state

    }

}

export default arTreasureReducer
