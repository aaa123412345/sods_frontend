import React from "react";

const CMultipleText = (props) => (
    generator(props)
)

export default CMultipleText;

function generator(props){
    let spans = []
    var key = props.block.rank.toString() + "subtext"

    for(let i=0;i<props.block.textNum;i++){
        spans.push(<span className="subtext" key = {key+i} style={props.block.elementstyle[i]}>{props.block.content[i]}</span>)
    }

    return(
        <div className="cmultipletext" style={props.block.commonStyle}>  
            {spans}
        </div>
    )
}





