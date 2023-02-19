import { CLEAR_ERROR_LIST, CLOSE_MODAL, CLOSE_QR_MODAL, OPEN_MODAL, OPEN_QR_MODAL, UPDATE_ERROR_LIST, UPDATE_MODAL, UPDATE_QR_ID } from './modal.action'
import { initModalState } from './modal.state'

const modalReducer = (state = initModalState, action) => {
    switch(action.type){
        case OPEN_MODAL:
            return { 
                ...state,
                ...action.config,
                isOpen: true
            }
        case CLOSE_MODAL:
            return { ...state, isOpen: false, session: null }
        case UPDATE_MODAL:
            return { ...state, ...action.config }
        case UPDATE_ERROR_LIST:
            return { ...state, errorList: action.errorList }
        case CLEAR_ERROR_LIST:
            return { ...state, errorList: [] }
        case OPEN_QR_MODAL:
            return { ...state, isQRCode: true }
        case CLOSE_QR_MODAL:
            return { ...state, isQRCode: false }
        case UPDATE_QR_ID:
            return { ...state, qrID: action.qrID }
        default:
            return state
    }
}

export default modalReducer
