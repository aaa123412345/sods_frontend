import React from "react";


const CVideo = (props) => (
    generator(props)
)
export default CVideo

function generator(props){
    function checkSRC(src){
        //check if src contains http:// or https://
        if(src.includes("http://") || src.includes("https://")){
            return true
        }else{
            return false
        }
    }
    return(
        <div className="cvideo">  
            {checkSRC(props.block.src) ?
            <iframe 
            style={props.block.style}
            src={props.block.src}
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
            </iframe>:
             <video style={props.block.style} 
            src={props.block.src} 
            alt={props.block.alt}
            controls={props.block.controls}
            autoPlay={props.block.autoPlay}
            muted={props.block.muted}
            > 
            Your browser does not support the video tag.
            </video>
            }
           
           
           
            
        </div>
    )
}