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


function App() {
    //Set the default permission here for testing
    const permission = []
    permission.push(process.env.REACT_APP_DEFAULT_PERMISSION)
    const [user, setUser] = useState({
        rolePermission: [''],
        token:'',
        userType:''
    });
    
    const setUserContext = (userDict) => {
        setUser(userDict)
    }

    const clearLoginState = () =>{
        setUser({
            rolePermission: [''],
            token:'',
            userType:''
        })
        localStorage.removeItem('sods_fyp_ck')
        localStorage.removeItem('sods_fyp_ut')
        localStorage.removeItem('sods_fyp_rp')
        localStorage.removeItem('sods_fyp_t')


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
        var key = process.env.REACT_APP_LOCAL_STARGE_KEY
        var haveData = false
        var tmpUser = {
            
            rolePermission: [''],
            token:'',
            userType:''
        }

        //decrept
        if(localStorage.getItem('sods_fyp_ck')!==null){
            var bytes0  = CryptoJS.AES.decrypt(localStorage.getItem('sods_fyp_ck'), key);
            var checkKey = bytes0.toString(CryptoJS.enc.Utf8);
            if(checkKey === 'sods_fyp'){
                haveData = true
            }else{
                localStorage.removeItem('sods_fyp_ck')
                localStorage.removeItem('sods_fyp_ut')
                localStorage.removeItem('sods_fyp_rp')
                localStorage.removeItem('sods_fyp_t')
            }
            
        }

        if(userType!== '' && haveData){
             //decrept
            var bytes1  = CryptoJS.AES.decrypt(localStorage.getItem('sods_fyp_ut'), key);
            var userType = bytes1.toString(CryptoJS.enc.Utf8);
             //decrept
            var bytes1  = CryptoJS.AES.decrypt(localStorage.getItem('sods_fyp_rp'), key);
            var rolePermission = JSON.parse(bytes1.toString(CryptoJS.enc.Utf8));

            //decrept
            var bytes2  = CryptoJS.AES.decrypt(localStorage.getItem('sods_fyp_t'), key);
            var token = bytes2.toString(CryptoJS.enc.Utf8);

           

            tmpUser.rolePermission = rolePermission
            tmpUser.token = token
            tmpUser.userType = userType
            setUser(tmpUser)
        }
    }
   
    return (
        <React.StrictMode>
            <UserContext.Provider value={{user,setUserContext,clearLoginState}}>
                
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
                
            </UserContext.Provider>
        </React.StrictMode>
      
    );
  }

export default App;