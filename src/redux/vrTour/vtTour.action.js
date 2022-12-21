// action type

export const UPDATE_VR_BOOTH_ID = "UPDATE_VR_BOOTH_ID"

// action creator


export const updateVRBoothID = (boothID) => {
    return { type: UPDATE_VR_BOOTH_ID, boothID }
}
