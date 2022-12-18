// action type

export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"
export const UPDATE_MODAL = "UPDATE_MODAL"

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
