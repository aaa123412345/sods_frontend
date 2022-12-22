// action type

export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"
export const UPDATE_MODAL = "UPDATE_MODAL"
export const UPDATE_ERROR_LIST = "UPDATE_ERROR_LIST"
export const CLEAR_ERROR_LIST = "CLEAR_ERROR_LIST"

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

export const updateErrorList = (errorList) => {
    return { type: UPDATE_ERROR_LIST, errorList }
}

export const clearErrorList = () => {
    return { type: CLEAR_ERROR_LIST }
}