import React from "react";
import ElementBuilder from "../ElementBuilder/ElementBuilder";
import Col from 'react-bootstrap/Col';


const BoostrapColHandler = (data) => {
    
    const bsData = data.data.bootstrap
    
   
    return(
       <Col xs={bsData.xs} sm={bsData.sm} md={bsData.md} lg={bsData.lg} xl={bsData.xl} xxl={bsData.xxl}>
            {ElementBuilder(data)}
       </Col>
    )
}


export default BoostrapColHandler;