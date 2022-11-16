import React from "react";
import ReactDOM from "react-dom";


import "./css/styles.css";
import "./css/bootstrap.min.css"
import PageContent from "./components/PageContent/PageContent.js";
import Header from "./components/Header/Header";
import ConfiguratedNavbar from "./components/ConfiguredNavbar/ConfiguratedNavbar";


function App() {
  return (
    <div className="App">
      <Header/>
      <ConfiguratedNavbar/>
      <PageContent/>
    </div>
    
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
