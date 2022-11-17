import React from "react";
import PublicPageManager from "./components/PublicSite/PublicPageManager/PublicPageManager";
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
    return (
        <Router>
            <div className="App" >
                <PublicPageManager/>
            </div>
        </Router>
      
      
    );
  }

export default App;