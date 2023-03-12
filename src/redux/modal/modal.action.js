// action type

export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"
export const UPDATE_MODAL = "UPDATE_MODAL"
export const OPEN_QR_MODAL = "OPEN_QR_MODAL"
export const CLOSE_QR_MODAL = "CLOSE_QR_MODAL"
export const UPDATE_QR_ID = "UPDATE_QR_ID"

// action creator

export const openModal = (config) => {
    return { type: OPEN_MODAL, config }
}

export const closeModal = () => {
    return { type: CLOSE_MODAL }
}

export const updateModal = (config) => {
    return { type: UPDATE_MODAL, config }
}

export const openQRModal = (needUpdate) => {
    return { type: OPEN_QR_MODAL, needUpdate }
}

export const closeQRModal = () => {
    return { type: CLOSE_QR_MODAL }
}

export const updateQRID = (qrID) => {
    return { type: UPDATE_QR_ID, qrID }
}