
import { FINISH_INSPECT, INSPECT_BOOTH } from './inspector.action'
import { initInspectorState } from './inspector.state'

const inspectorReducer = (state = initInspectorState, action) => {
    switch(action.type){
        case INSPECT_BOOTH:
            return { 
                ...state,
                isInspecting: true,
                data: action.data
            }
        case FINISH_INSPECT: 
            return { 
                ...state,
                isInspecting: false,
                data: null
            }
        default:
            return state
    }
}

export default inspectorReducer
