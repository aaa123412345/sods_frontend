import React from "react";
import PublicPageManager from "./components/PublicSite/PublicPageManager/PublicPageManager";
import ServerPageManager from "./components/ServerSite/ServerPageManager/ServerPageManager";

import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';

import { Provider } from "react-redux";
import { store } from './redux/store'
import Chatroom from "./components/Chatroom/Chatroom";
import VRCanvas from "./components/TourGuideCanvas/VRCanvas/VRCanvas";




function App() {

   


    return (

        <Provider store={store}>
            <BrowserRouter>
                
                <Chatroom />

                <Routes>
                    
                   <Route>
                    {/*bootstrap and chakraUI are affecting the display of VR Mode Button (which is provided by a-frame.js)*/}
                    <Route path="/public/tourguide" element={<VRCanvas />}></Route> 
                    <Route path='/public/:path' element={<PublicPageManager />}></Route> 
                    <Route path='/public/:path/:subpath' element={<PublicPageManager />}></Route> 
                   </Route>
                    <Route path='/server/:path' element={<ServerPageManager/>}></Route>
                    <Route path='/server/:path/:subpath' element={<ServerPageManager/>}></Route> 
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