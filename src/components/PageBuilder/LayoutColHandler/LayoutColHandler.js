import React from "react";
import ElementBuilder from "../ElementBuilder/ElementBuilder";
import { Col } from "react-bootstrap";


const LayoutColHandler = (data) => {
    
    const bsData = data.data.bootstrap
    
   
    return(
       
       <Col xs={bsData.xs} sm={bsData.sm} md={bsData.md} lg={bsData.lg} xl={bsData.xl} xxl={bsData.xxl}>
            {ElementBuilder(data)}
       </Col>
    )
}


export default LayoutColHandler;