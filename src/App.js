import React from "react";
import PublicPageManager from "./components/PublicSite/PublicPageManager/PublicPageManager";
import ServerPageManager from "./components/ServerSite/ServerPageManager/ServerPageManager";
import UserPageManager from "./components/UserSite/UserPageManager/UserPageManager";

import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';

import { Provider } from "react-redux";
import { store } from './redux/store'
import Chatroom from "./components/Chatroom/Chatroom";
import VRCanvas from "./components/VRCanvas/VRCanvas";

import { useState, createContext, useEffect } from "react";

export const UserContext = createContext()
export const UserContextUpdate = createContext()


function App() {
    const [user, setUser] = useState({
        userID:'',
        rolePermission:[],
        token:'',
        userType:''
    });
    
    const setUserContext = (userDict) => {
        setUser(userDict)
    }

    useEffect(()=>console.log(user),[user])


    return (
        <React.StrictMode>
            <UserContext.Provider value={user}>
                <UserContextUpdate.Provider value={setUserContext}>
                    <Provider store={store}>
                        <BrowserRouter>
                            
                            <Chatroom />

                            <Routes>
                                
                            <Route>
                            
                                <Route path="/public/tourguide-vr" element={<VRCanvas />}></Route> 
                                {/*bootstrap and chakraUI are affecting the display of VR Mode Button (which is provided by a-frame.js)*/}
                                <Route path='/public/:lang/:path' element={<PublicPageManager />}></Route> 
                                <Route path='/public/:lang/:path/:subpath' element={<PublicPageManager />}></Route> 

                                <Route path='/user/:lang/:path' element={<UserPageManager />}></Route> 
                                <Route path='/user/:lang/:path/:subpath' element={<UserPageManager />}></Route> 

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
                </UserContextUpdate.Provider>
            </UserContext.Provider>
        </React.StrictMode>
      
    );
  }

export default App;