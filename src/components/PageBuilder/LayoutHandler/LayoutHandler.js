import React from "react";

import Container from 'react-bootstrap/Container';

import BoostrapRowHandler from "../LayoutRowHandler/LayoutRowHandler";

const LayoutHandler = (data) => {
    
   
    const groupedData= dataRowGrouper(data['data'])
    
   
    return(
        <Container>
            {groupedData.map((element,index) =>  React.createElement(BoostrapRowHandler,
            {
                data:element,
                key:"row"+index.toString(),
                keypass:"row"+index.toString(),
                path : data.path,
                subpath: data.subpath
            }
            ))}
        </Container>
    )
    
}

function dataRowGrouper(data){
    

    const maxRow = data[data.length-1]['rank']
    const result = []
    for(var i=0;i<maxRow;i++){
        result[i]=data.filter(element => element['rank'] == i+1)
    }
    return result;
}

export default LayoutHandler;