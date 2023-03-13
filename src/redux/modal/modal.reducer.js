import { CLOSE_MODAL, CLOSE_QR_MODAL, OPEN_MODAL, OPEN_QR_MODAL, UPDATE_MODAL, UPDATE_QR_ID } from './modal.action'
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
            return { ...initModalState, isOpen: false, assignItem: null }
        case UPDATE_MODAL:
            return { ...state, ...action.config }
        case OPEN_QR_MODAL:
            return { ...state, isQRCode: true, needUpdate: action.needUpdate??false }
        case CLOSE_QR_MODAL:
            return { ...state, isQRCode: false, qrID: null }
        case UPDATE_QR_ID:
            return { ...state, qrID: action.qrID }
        default:
            return state
    }
}

export default modalReducer
