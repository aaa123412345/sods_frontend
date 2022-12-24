// action type

export const UPDATE_FLOORPLAN = "UPDATE_FLOORPLAN"
export const UPDATE_BOOTH = "UPDATE_BOOTH"
export const UPDATE_STORY = "UPDATE_STORY"
export const UPDATE_GAME = "UPDATE_GAME"
export const RESET_DATA = "RESET_DATA"

// action creator

export const updateFloorplan = (floorplan) => {
    return { type: UPDATE_FLOORPLAN, floorplan }
}

export const updateBooth = (booth) => {
    return { type: UPDATE_BOOTH, booth }
}

export const updateStory = (story) => {
    return { type: UPDATE_STORY, story }
}

export const updateGame = (game) => {
    return { type: UPDATE_GAME, game }
}

export const resetData = () => {
    return { type: RESET_DATA }
}