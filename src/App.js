import React from "react";
import PublicPageManager from "./components/PublicSite/PublicPageManager/PublicPageManager";
import ServerPageManager from "./components/ServerSite/ServerPageManager/ServerPageManager";

import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';

import { Provider } from "react-redux";
import { store } from './model/store'




function App() {

   


    return (

        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                   
                    <Route path='/public/:path' element={<PublicPageManager />}></Route> 
                    <Route path='/server/:path' element={<ServerPageManager/>}></Route>
                    <Route
                        path="*"
                        element={
                            <Navigate replace to="/public/about" />
                        }
                        />
                </Routes>
                
            </BrowserRouter>
        </Provider>
        
      
    );
  }

export default App;