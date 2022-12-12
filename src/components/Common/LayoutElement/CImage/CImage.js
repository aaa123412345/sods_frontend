import React from "react";


const CImage = (props) => (
    generator(props)
)
export default CImage;

function generator(props){
    return(
        <div className="cimage">  
            <img src={props.block.src} alt={props.block.alt} style={props.block.style}></img>
        </div>
    )
}