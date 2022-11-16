import React from "react";

const CText = (props) => (
    generator(props)
)

export default CText;


function generator(props){
    return(
        <div className="ctext" style={props.block.style}>  
            {props.block.content}
        </div>
    )
}



