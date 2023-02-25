// action type

export const UPDATE_FLOORPLAN = "UPDATE_FLOORPLAN"
export const UPDATE_BOOTH = "UPDATE_BOOTH"
export const UPDATE_VR = "UPDATE_VR"
export const UPDATE_MARKER = "UPDATE_MARKER"
export const UPDATE_STORY = "UPDATE_STORY"
export const UPDATE_AR_TREASURE = "UPDATE_AR_TREASURE"
export const UPDATE_BOOTH_GAME = "UPDATE_BOOTH_GAME"
export const RESET_DATA = "RESET_DATA"

// action creator

export const updateFloorplan = (floorplan) => {
    return { type: UPDATE_FLOORPLAN, floorplan }
}

export const updateBooth = (booth) => {
    return { type: UPDATE_BOOTH, booth }
}

export const updateVR = (vr) => {
    return { type: UPDATE_VR, vr }
}

export const updateMarker = (marker) => {
    return { type: UPDATE_MARKER, marker }
}

export const updateStory = (story) => {
    return { type: UPDATE_STORY, story }
}

export const updateARTreasure = (arTreasure) => {
    return { type: UPDATE_AR_TREASURE, arTreasure }
}

export const updateBoothGame = (boothGame) => {
    return { type: UPDATE_BOOTH_GAME, boothGame }
}

export const resetData = () => {
    return { type: RESET_DATA }
}