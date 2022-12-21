// action type

export const SHOW_VR_TOUR = "SHOW_VR_TOUR"
export const HIDE_VR_TOUR = "HIDE_VR_TOUR"

// action creator

export const showVRTour = () => {
    return { type: SHOW_VR_TOUR }
}

export const hideVRTour = () => {
    return { type: HIDE_VR_TOUR }
}

