import React from "react";
import ReactDOM from "react-dom";


import "./css/styles.css";
import "./css/bootstrap.min.css"
import PublicPageManager from "./components/PublicSite/PublicPageManager/PublicPageManager";



function App() {
  return (
    <div className="App" >
      <PublicPageManager/>
    </div>
    
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
