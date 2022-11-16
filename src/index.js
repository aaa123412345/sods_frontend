import React from "react";
import ReactDOM from "react-dom";


import "./styles.css";
import PageContent from "./components/PageContent/PageContent.js";


function App() {
  return (
    <PageContent/>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
