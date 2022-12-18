import { CLOSE_MODAL, OPEN_MODAL, UPDATE_MODAL } from './modal.action'
import { initModalState } from './modal.state'

const modalReducer = (state = initModalState, action) => {
    switch(action.type){
        case OPEN_MODAL:
            return { 
                ...state,
                ...action.config,
                isOpen: true,
                isError: false
            }
        case CLOSE_MODAL:
            return { ...state, isOpen: false }
        case UPDATE_MODAL:
            return { ...state, ...action.config }
        default:
            return state
    }
}

export default modalReducer
