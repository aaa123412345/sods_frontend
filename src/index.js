import React from "react";
import ReactDOM from "react-dom";
import Components from "./components.js";

import "./styles.css";

const data = {
  content: {
    body: [
     
      {
        type:"ctext",
        rank:1,
        subrank:1,
        bootstrap:{},
        content:"abc",
        style:{
            color:"#F00000",
            fontSize: 55,
            fontWeight:"bold",
            fontStyle: 'italic',
            textDecorationLine: 'underline',
            textAlign: "left"
        }
      },
      {
        type:"cimage",
        rank:2,
        subrank:1,
        src:"/images/test1.png",
        alt:"Good",
        bootstrap:{},
        style:{
            
        }
      },
      {
        type:"cvideo",
        rank:3,
        subrank:1,
        src:"/videos/testVideo.mp4",
        alt:"Bad",
        bootstrap:{},
        style:{
            height:500,
            width:500
        },
        autoplay:true,
        muted:true,
        controls:true
      },
      {
        type:"cmultipletext",
        rank:4,
        subrank:1,
        bootstrap:{},
        textNum: 3,
        content:[
            "abc:",
            "click me",
            "hahahaha"
        ],
        commonStyle:{

        },
        elementstyle:[{
            color:"#F00000",
            fontSize: 55,
            fontWeight:"bold",
            fontStyle: 'italic',
            textDecorationLine: 'underline',
            
        },{
            color:"#F00FF0",
            fontSize: 23,
            fontWeight:"bold",
            fontStyle: 'italic',
        },{
            color:"#F0FFF0",
            fontSize: 77,
            fontWeight:"bold",
            textDecorationLine: 'underline',      
        }
    ]
      }
     
     
    
    ]
  }
};

function App() {
  return (
    <div className="App">
      123
      {data.content.body.map(block => Components(block))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
