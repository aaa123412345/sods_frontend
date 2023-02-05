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
    //Set the default permission here for testing
    const permission = []
    permission.push(process.env.REACT_APP_DEFAULT_PERMISSION)
    const [user, setUser] = useState({
        rolePermission: permission,
        token:'',
        userType:''
    });
    
    const setUserContext = (userDict) => {
        setUser(userDict)
    }

    useEffect(()=>{
        console.log(user)
        if(user.userType === ''){
            getInLocal()
            console.log('get')
        }
    }
    ,[])

    

    function getInLocal(){
        var CryptoJS = require("crypto-js");
        var key = process.env.REACT_APP_LOCAL_STARGE_KEY;
        var haveData = false
        var tmpUser = {
            
            rolePermission: '',
            token:'',
            userType:''
        }

        //decrept
        if(localStorage.getItem('userType')!==null){
            var bytes1  = CryptoJS.AES.decrypt(localStorage.getItem('userType'), key);
            var userType = bytes1.toString(CryptoJS.enc.Utf8);
            haveData = true
        }

        if(userType!== '' && haveData){
             //decrept
            var bytes1  = CryptoJS.AES.decrypt(localStorage.getItem('rolePermission'), key);
            var rolePermission = JSON.parse(bytes1.toString(CryptoJS.enc.Utf8));

            //decrept
            var bytes2  = CryptoJS.AES.decrypt(localStorage.getItem('token'), key);
            var token = bytes2.toString(CryptoJS.enc.Utf8);

           

            tmpUser.rolePermission = rolePermission
            tmpUser.token = token
            tmpUser.userType = userType
            setUser(tmpUser)
        }
    }
   
    return (
        <React.StrictMode>
            <UserContext.Provider value={user}>
                <UserContextUpdate.Provider value={setUserContext}>
                    <Provider store={store}>
                        <BrowserRouter>
                            
                            {/* <Chatroom /> */}

                            <Routes>
                                
                            <Route>
                            
                                <Route path="/public/:lang/tourguide-vr/:id" element={<VRCanvas />}></Route> 
                                {/*bootstrap and chakraUI are affecting the display of VR Mode Button (which is provided by a-frame.js)*/}
                                <Route path='/public/:lang/:path' element={<PublicPageManager />}></Route> 
                                <Route path='/public/:lang/:path/:subpath' element={<PublicPageManager />}></Route> 
                                <Route path='/public/:lang/:path/:subpath/:subsubpath' element={<PublicPageManager />}></Route> 

                                <Route path='/user/:lang/:path' element={<UserPageManager />}></Route> 
                                <Route path='/user/:lang/:path/:subpath' element={<UserPageManager />}></Route> 

                            </Route>
                                <Route path='/server/:lang/:path' element={<ServerPageManager/>}></Route>
                                <Route path='/server/:lang/:path/:subpath' element={<ServerPageManager/>}></Route> 
                                <Route path='/server/:lang/:path/:subpath/:subsubpath' element={<ServerPageManager/>}></Route> 
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