import React from "react";


const CVideo = (props) => (
    generator(props)
)
export default CVideo

function generator(props){
    return(
        <div className="cvideo">  
            <video style={props.block.style} 
            src={props.block.src} 
            alt={props.block.alt}
            controls={props.block.controls}
            autoPlay={props.block.autoPlay}
            muted={props.block.muted}
            >
           
            Your browser does not support the video tag.
            </video>
            
        </div>
    )
}