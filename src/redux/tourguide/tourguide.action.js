// action type

export const UPDATE_ITEM_INDEX = "UPDATE_ITEM_INDEX"
export const UPDATE_FLOORPLANS = "UPDATE_FLOORPLANS"
export const UPDATE_MARKERS = "UPDATE_MARKERS"
export const UPDATE_BOOTHS = "UPDATE_BOOTHS"
export const UPDATE_BOOTH_RECORDS = "UPDATE_BOOTH_RECORDS"
export const UPDATE_STORIES = "UPDATE_STORIES"
export const UPDATE_BOOTH_GAMES = "UPDATE_BOOTH_GAMES"
export const UPDATE_LOADING_ITEM = "UPDATE_LOADING_ITEM"
export const CLEAR_LOADING_ITEM = "CLEAR_LOADING_ITEM"

// action creator

export const updateItemIndex = (index) => {
    return { type: UPDATE_ITEM_INDEX, index}
}

export const updateFloorplans = (floorplans) => {
    return { type: UPDATE_FLOORPLANS, floorplans }
}

export const updateMarkers = (markers) => {
    return { type: UPDATE_MARKERS, markers }
}

export const updateBooths = (booths) => {
    return { type: UPDATE_BOOTHS, booths }
}

export const updateStories = (stories) => {
    return { type: UPDATE_STORIES, stories }
}

export const updateBoothRecords = (records) => {
    return { type: UPDATE_BOOTH_RECORDS, records }
}

export const updateBoothGames = (games) => {
    return { type: UPDATE_BOOTH_GAMES, games }
}

export const updateLoadingItem = (loadingItem) => {
    return { type: UPDATE_LOADING_ITEM, loadingItem }
}

export const clearLoadingItem = () => {
    return { type: CLEAR_LOADING_ITEM }
}