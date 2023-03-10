// action type

export const UPDATE_CONFIG = "UPDATE_CONFIG"
export const UPDATE_ORIGINAL_THEMECOLOR = "UPDATE_ORIGINAL_THEMECOLOR"
export const SET_REFRESH_FLAG = "SET_REFRESH_FLAG"
export const CLEAR_REFRESH_FLAG = "CLEAR_REFRESH_FLAG"

// action creator

export const updateConfig = (config) => {
    return { type: UPDATE_CONFIG, config }
}

export const updateOriginalThemeColor = (color) => {
    return { type: UPDATE_ORIGINAL_THEMECOLOR, color }
}

export const setRefreshFlag = () => {
    return { type: SET_REFRESH_FLAG }
}

export const clearRefreshFlag = () => {
    return { type: CLEAR_REFRESH_FLAG }
}