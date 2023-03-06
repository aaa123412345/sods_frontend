// action type

export const INSPECT_BOOTH = "INSPECT_BOOTH"
export const FINISH_INSPECT = "FINISH_INSPECT"

// action creator

export const inspectBooth = (data) => {
    return { type: INSPECT_BOOTH, data }
}

export const finishInspect = () => {
    return { type: FINISH_INSPECT }
}