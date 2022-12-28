import React from "react";

import BoostrapColHandler from "../LayoutColHandler/LayoutColHandler";
import { Row } from "react-bootstrap";


const LayoutRowHandler = (data) => {
    

    return(
        <Row>
            {data['data'].map((element,index) =>  React.createElement(BoostrapColHandler,
                {
                    data:element,
                    key:data['keypass']+"col"+index.toString(),
                    path : data.path,
                    subpath: data.subpath
                }
                ))}
        </Row>
    )
}


export default LayoutRowHandler;