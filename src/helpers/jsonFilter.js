export const jsonFilter = (dataArr, filterName, filterValue) => {

    let filteredData = []

    dataArr.forEach(data => {

        if(data[filterName] === filterValue)
            filteredData.push(data)

    })

    return filteredData

}