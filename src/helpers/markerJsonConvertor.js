export const markerConvertor = (dataArr, isForImageMarker = true) => {


    // error occurs in backend if key names === "top" || "left"
    // purpose: to fit the requirement of ImageMarker & backend design
    const convert_toServerFormat = (data) => {

        data['y'] = data['top']
        data['x'] = data['left']
        delete data['top']
        delete data['left']

    }

    const convert_toImageMarkerFormat = (data) => {

        data['top'] = data['y']
        data['left'] = data['x']
        delete data['y']
        delete data['x']

    }

    const perform_covert = (data) => {

        if(isForImageMarker)
            convert_toImageMarkerFormat(data)
        else
            convert_toServerFormat(data)

    }

    if(Array.isArray(dataArr))
        dataArr.forEach(data => {
            perform_covert(data)
        })    
    else
        perform_covert(dataArr)

    return dataArr

}