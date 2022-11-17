import React from "react";
import PublicPageManager from "./components/PublicSite/PublicPageManager/PublicPageManager";
import ServerPageManager from "./components/ServerSite/ServerPageManager/ServerPageManager";

import { BrowserRouter, Link, Routes, Route, redirect} from 'react-router-dom';


function App() {

    

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/public' element={<PublicPageManager />}></Route> 
                <Route path='/' element={<PublicPageManager />}></Route> 
                <Route path='/public/:path' element={<PublicPageManager />}></Route> 
                <Route path='/server/*' element={<ServerPageManager/>}></Route>
            </Routes>
            
        </BrowserRouter>
      
      
    );
  }

export default App;