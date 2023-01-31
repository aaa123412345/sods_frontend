import React from "react";
import ReactDOM from "react-dom/client";

import "./css/styles.css";
import "./css/bootstrap.min.css"
import App from "./App";


import './i18n/i18n'




const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);



root.render(<App/>);
//ReactDOM.render(<App/>, rootElement);

