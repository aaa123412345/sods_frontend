import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from './redux/store'
import { useState, createContext, useEffect } from "react";
/*
const PublicPageManager = React.lazy(()=>import("./components/PublicSite/PublicPageManager/PublicPageManager"))
const ServerPageManager = React.lazy(()=>import("./components/ServerSite/ServerPageManager/ServerPageManager"))
const UserPageManager = React.lazy(()=>import("./components/UserSite/UserPageManager/UserPageManager"))

const Chatroom = React.lazy(()=>import("./components/Chatroom/Chatroom"))
const VRCanvas = React.lazy(()=>import("./components/VRCanvas/VRCanvas"))
const QRScanner = React.lazy(()=>import("./components/QRScanner"))
const ARCanvas = React.lazy(()=>import("./components/ARCanvas/ARCanvas"))
*/

import PublicPageManager from "./components/PublicSite/PublicPageManager/PublicPageManager";
import ServerPageManager from "./components/ServerSite/ServerPageManager/ServerPageManager";
import UserPageManager from "./components/UserSite/UserPageManager/UserPageManager";

import Chatroom from "./components/Chatroom/Chatroom";
import VRCanvas from "./components/VRCanvas/VRCanvas";
import QRScanner from "./components/QRScanner";

import ARCanvas from "./components/ARCanvas/ARCanvas";
import Crush from "./components/MiniGame/Crush/Crush";
import Snake from "./components/MiniGame/Snake/snake";
import FileUpload from "./components/CMS/FTP/FileUpload";


export const UserContext = createContext()


function App() {
    //Set the default permission here for testing
    
    const permission = []
    permission.push(process.env.REACT_APP_DEFAULT_PERMISSION)
    const [user, setUser] = useState({
        rolePermission: [''],
        token:'',
        userType:'',
        userId:''
    });
    
    const setUserContext = (userDict) => {
        if (userDict.rolePermission.length > 0) {
            setUser(userDict)
        }
    }

    const clearLoginState = () =>{
        setUser({
            rolePermission: [''],
            token:'',
            userType:''
        })
        try{
            localStorage.removeItem('sods_fyp_ck')
            localStorage.removeItem('sods_fyp_ut')
            localStorage.removeItem('sods_fyp_rp')
            localStorage.removeItem('sods_fyp_t')
        }catch(e){
            console.log(e)
        }
        window.location.reload();
    }

    useEffect(()=>{
        
        if(user.userType === ''){
            getInLocal()
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
            userType:'',
            userId:''
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
                localStorage.removeItem('sods_fyp_ud')
            }
            
        }

        if(userType!== '' && haveData){
             //decrept --- user type
            var bytes1  = CryptoJS.AES.decrypt(localStorage.getItem('sods_fyp_ut'), key);
            var userType = bytes1.toString(CryptoJS.enc.Utf8);
             //decrept --- role permission
            var bytes2  = CryptoJS.AES.decrypt(localStorage.getItem('sods_fyp_rp'), key);
            var rolePermission = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));

            //decrept --- token
            var bytes3  = CryptoJS.AES.decrypt(localStorage.getItem('sods_fyp_t'), key);
            var token = bytes3.toString(CryptoJS.enc.Utf8);

            //decrept --- user id
            var bytes4  = CryptoJS.AES.decrypt(localStorage.getItem('sods_fyp_ud'), key);
            var userId = bytes4.toString(CryptoJS.enc.Utf8);

           

            tmpUser.rolePermission = rolePermission
            tmpUser.token = token
            tmpUser.userType = userType
            tmpUser.userId = userId
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
                                <Route path="/snake" element={<Snake/>}></Route>
                                <Route path="/file" element={<FileUpload></FileUpload>}></Route>
                                <Route path="/crush" element={<Crush/>}></Route>
                                <Route path="/testQR" element={<QRScanner/>}></Route>
                                <Route path="/public/:lang/ar-treasure/:id" element={<ARCanvas/>}></Route>
                                <Route path="/public/:lang/tourguide-vr/:id" element={<VRCanvas />}></Route> 
                                {/*bootstrap and chakraUI are affecting the display of VR Mode Button (which is provided by a-frame.js)*/}
                                <Route path='/public/:lang/:path' element={<PublicPageManager />}></Route> 
                                <Route path='/public/:lang/:path/:subpath' element={<PublicPageManager />}></Route> 
                                <Route path='/public/:lang/:path/:subpath/:subsubpath' element={<PublicPageManager />}></Route> 
                                <Route path='/public/:lang/:path/:subpath/:subsubpath/:subsubsubpath' element={<PublicPageManager />}></Route> 

                                <Route path='/user/:lang/:path' element={<UserPageManager />}></Route> 
                                <Route path='/user/:lang/:path/:subpath' element={<UserPageManager />}></Route> 

                            </Route>
                                <Route path='/server/:lang/:path' element={<ServerPageManager/>}></Route>
                                <Route path='/server/:lang/:path/:subpath' element={<ServerPageManager/>}></Route> 
                                <Route path='/server/:lang/:path/:subpath/:subsubpath' element={<ServerPageManager/>}></Route> 
                                <Route path='/server/:lang/:path/:subpath/:subsubpath/:subsubsubpath' element={<ServerPageManager/>}></Route>

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