// action type

export const UPDATE_BOOTHS = "UPDATE_BOOTHS"
export const UPDATE_BOOTH_GAMES = "UPDATE_BOOTH_GAMES"
export const UPDATE_AR_TREASURES = "UPDATE_AR_TREASURES"

// action creator


export const updateBooths = (booths) => {
    return { type: UPDATE_BOOTHS, booths }
}

export const updateBoothGames = (boothGames) => {
    return { type: UPDATE_BOOTH_GAMES, boothGames }
}

export const updateARTreasures = (arTreasures) => {
    return { type: UPDATE_AR_TREASURES, arTreasures }
}