// action type

export const UPDATE_PAGE = "UPDATE_PAGE"
export const UPDATE_THEME_COLOR = "UPDATE_THEMECOLOR"
export const UPDATE_REGION_INDEX = "UPDATE_REGION_INDEX"
export const UPDATE_STORY_INDEX = "UPDATE_STORY_INDEX"
export const UPDATE_ITEM_INDEX = "UPDATE_ITEM_INDEX"
export const UPDATE_FLOORPLANS = "UPDATE_FLOORPLANS"
export const UPDATE_MARKERS = "UPDATE_MARKERS"
export const UPDATE_BOOTHS = "UPDATE_BOOTHS"
export const UPDATE_STORIES = "UPDATE_STORIES"
export const UPDATE_STORY_PROGRESS = "UPDATE_STORY_PROGRESS"
export const UPDATE_GAMES = "UPDATE_GAMES"
export const UPDATE_LOADING_ITEM = "UPDATE_LOADING_ITEM"
export const CLEAR_LOADING_ITEM = "CLEAR_LOADING_ITEM"

// action creator

export const updatePage = (page) => {
    return { type: UPDATE_PAGE, page }
}

export const updateThemeColor = (color) => {
    return { type: UPDATE_THEME_COLOR, color }
}

export const updateRegionIndex = (index) => {
    return { type: UPDATE_REGION_INDEX, index }
}

export const updateStoryIndex = (index) => {
    return { type: UPDATE_STORY_INDEX, index }
}

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

export const updateStoryProgress = (progress) => {
    return { type: UPDATE_STORY_PROGRESS, progress }
}

export const updateGames = (games) => {
    return { type: UPDATE_GAMES, games }
}

export const updateLoadingItem = (loadingItem) => {
    return { type: UPDATE_LOADING_ITEM, loadingItem }
}

export const clearLoadingItem = () => {
    return { type: CLEAR_LOADING_ITEM }
}