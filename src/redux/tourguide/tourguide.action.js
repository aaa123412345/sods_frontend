// action type

export const UPDATE_PAGE = "UPDATE_PAGE"
export const UPDATE_THEME_COLOR = "UPDATE_THEMECOLOR"
export const UPDATE_HOST = "UPDATE_HOST"
export const UPDATE_REGION_INDEX = "UPDATE_REGION_INDEX"
export const UPDATE_STORY_INDEX = "UPDATE_STORY_INDEX"
export const UPDATE_FLOORPLANS = "UPDATE_FLOORPLANS"
export const UPDATE_BOOTHS = "UPDATE_BOOTHS"
export const UPDATE_STORIES = "UPDATE_STORIES"
export const UPDATE_STORY_PROGRESS = "UPDATE_STORY_PROGRESS"
export const UPDATE_GAMES = "UPDATE_GAMES"

// action creator

export const updatePage = (page) => {
    return { type: UPDATE_PAGE, page }
}

export const updateThemeColor = (color) => {
    return { type: UPDATE_THEME_COLOR, color }
}

export const updateHost = (host) => {
    return { type: UPDATE_HOST, host}
}

export const updateRegionIndex = (index) => {
    return { type: UPDATE_REGION_INDEX, index }
}

export const updateStoryIndex = (index) => {
    return { type: UPDATE_STORY_INDEX, index }
}

export const updateFloorplans = (floorplans) => {
    return { type: UPDATE_FLOORPLANS, floorplans }
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
