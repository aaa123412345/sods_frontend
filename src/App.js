import React from "react";
import PublicPageManager from "./components/PublicSite/PublicPageManager/PublicPageManager";
import ServerPageManager from "./components/ServerSite/ServerPageManager/ServerPageManager";

import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';

import { Provider } from "react-redux";
import { store } from './redux/store'
import Chatroom from "./components/Chatroom/Chatroom";
import VRCanvas from "./components/VRCanvas/VRCanvas";




function App() {

   


    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    
                    <Chatroom />

                    <Routes>
                        
                    <Route>
                        <Route path="/public/tourguide-vr" element={<VRCanvas />}></Route> 
                        {/*bootstrap and chakraUI are affecting the display of VR Mode Button (which is provided by a-frame.js)*/}
                        <Route path='/public/:lang/:path' element={<PublicPageManager />}></Route> 
                        <Route path='/public/:lang/:path/:subpath' element={<PublicPageManager />}></Route> 
                    </Route>
                        <Route path='/server/:lang/:path' element={<ServerPageManager/>}></Route>
                        <Route path='/server/:lang/:path/:subpath' element={<ServerPageManager/>}></Route> 
                        <Route
                            path="*"
                            element={
                                <Navigate replace to="/public/eng/about" />
                            }
                            />
                    </Routes>
                
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
      
    );
  }

export default App;