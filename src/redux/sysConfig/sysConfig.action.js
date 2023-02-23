// action type

export const UPDATE_CONFIG = "UPDATE_CONFIG"

// action creator

export const updateConfig = (config) => {
    return { type: UPDATE_CONFIG, config }
}
