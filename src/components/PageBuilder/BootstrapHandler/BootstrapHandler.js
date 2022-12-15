import React from "react";
import PageElementBuilder from "../ElementBuilder/ElementBuilder";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BoostrapRowHandler from "../BootstrapRowHandler/BootstrapRowHandler";

const BoostrapHandler = (data) => {
    
   
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

export default BoostrapHandler;