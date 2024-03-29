export const floorplan = { 

    regionZH: "", 
    regionEN: "", 
    imageUrl: null,

}

export const booth = {

    titleZH: "", 
    titleEN: "" ,
    venueZH: "", 
    venueEN: "",
    descriptionZH: "", 
    descriptionEN: "",
    imageUrl: null,
    vrImageUrl: null

}

export const marker = {

    y: null,
    x: null,
    floorPlanID: null,
    boothID: null

}

export const story = {

    titleZH: "", 
    titleEN: "",
    contentZH: "", 
    contentEN: "" , 
    imageUrl: null

}
export const arTreasure = {

    questionEN: "",
    questionZH: "",
    answers: JSON.stringify([])

}

export const boothGame = {

    boothId: null,
    gameId: null

}

export const configs = {
    themeColor: '', 
    opendayDate: null,
    minStampNum: 0,
}

// not use currently
export const vr = {

    nameZH: "", 
    nameEN: "" ,
    venueZH: "", 
    venueEN: "",
    descriptionZH: "", 
    descriptionEN: "",
    speechEN: "",
    speechZH: ""

}

export const template_dict = {
    'floorplan': floorplan, 
    'booth': booth,
    'story': story,
    'marker': marker, 
    'arTreasure': arTreasure,
    'boothGame': boothGame,
    'configs': configs
}