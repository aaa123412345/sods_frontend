import { UPDATE_CONFIG, SET_REFRESH_FLAG, CLEAR_REFRESH_FLAG } from "./sysConfig.action"
import { initSysConfigState } from "./sysConfig.state"

const sysConfigReducer = (state = initSysConfigState, action) => {

    switch(action.type){

        case UPDATE_CONFIG:
            return { ...state, config: action.config }

        case SET_REFRESH_FLAG:
            return { ...state, refreshFlag: 1 }

        case CLEAR_REFRESH_FLAG:
            return { ...state, refreshFlag: 0 }

        default:
            return state

    }

}

export default sysConfigReducer
