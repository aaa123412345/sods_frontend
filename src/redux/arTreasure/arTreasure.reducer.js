import { initARTreasureState } from "./arTreasure.state"
import { UPDATE_AR_TREASURES, UPDATE_BOOTHS, UPDATE_BOOTH_GAMES } from "./arTreasure.action"

const arTreasureReducer = (state = initARTreasureState, action) => {

    switch(action.type){

        case UPDATE_BOOTHS:
            return { ...state, booths: action.booths }

        case UPDATE_BOOTH_GAMES:
            return { ...state, boothGames: action.boothGames }

        case UPDATE_AR_TREASURES:
            return { ...state, arTreasures: action.arTreasures }


        default:
            return state

    }

}

export default arTreasureReducer
