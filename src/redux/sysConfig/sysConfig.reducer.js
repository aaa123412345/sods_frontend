import { UPDATE_CONFIG } from "./sysConfig.action"
import { initSysConfigState } from "./sysConfig.state"

const sysConfigReducer = (state = initSysConfigState, action) => {

    switch(action.type){

        case UPDATE_CONFIG:
            return { ...state, config: action.config }

        default:
            return state

    }

}

export default sysConfigReducer
