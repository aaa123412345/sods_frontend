// action type

export const UPDATE_AR_BOOTHS = "UPDATE_BOOTHS"
export const UPDATE_BOOTH_GAMES = "UPDATE_BOOTH_GAMES"
export const UPDATE_AR_TREASURE = "UPDATE_AR_TREASURE"
export const UPDATE_AR_TREASURES = "UPDATE_AR_TREASURES"

// action creator

export const updateARBooths = (tourBooths) => {
    return { type: UPDATE_AR_BOOTHS, tourBooths }
}

export const updateBoothGames = (boothGames) => {
    return { type: UPDATE_BOOTH_GAMES, boothGames }
}

export const updateARTreasure = (treasure) => {
    return { type: UPDATE_AR_TREASURE, treasure }
}

export const updateARTreasures = (treasures) => {
    return { type: UPDATE_AR_TREASURES, treasures }
}