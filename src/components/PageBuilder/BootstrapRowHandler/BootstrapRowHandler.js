import React from "react";

import BoostrapColHandler from "../BootstrapColHandler/BootstrapColHandler";
import Row from 'react-bootstrap/Row';


const BoostrapRowHandler = (data) => {
    

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


export default BoostrapRowHandler;