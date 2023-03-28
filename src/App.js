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

import VRCanvas from "./components/VRCanvas/VRCanvas";

import ARCanvas from "./components/ARCanvas/ARCanvas";
import FileUpload from "./components/CMS/FTP/FileManager";

import ChatRoom from "./components/ChatRoom/ChatRoom";
import FingerprintJS from '@fingerprintjs/fingerprintjs';


export const UserContext = createContext()


function App() {
    //Set the default permission here for testing
    
    const permission = []
    permission.push(process.env.REACT_APP_DEFAULT_PERMISSION)
    const [user, setUser] = useState({
        rolePermission: [''],
        token:'',
        userType:'',
        userId:'',
        deviceID:''
        
    });
    const [fpHash, setFpHash] = useState('');
    const localStorageKey = process.env.REACT_APP_LOCAL_STARGE_KEY 
    
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
        console.log('App.js useEffect')
        if(user.userType === '' ){
            getInLocal()
        }
        
        const setFp = async () => {
          const fp = await FingerprintJS.load();
    
          const { visitorId } = await fp.get();
    
          setFpHash(visitorId);
         
        };
    
        setFp();

       
        
    }
    ,[])

    
   

    function storeInLocal(data){
        var CryptoJS = require("crypto-js");
        var key = localStorageKey
        var rolePermission = CryptoJS.AES.encrypt(JSON.stringify(data.rolePermission), key).toString();
        var token = CryptoJS.AES.encrypt(data.token, key).toString();
        var userType = CryptoJS.AES.encrypt(data.userType, key).toString();
        var userId = CryptoJS.AES.encrypt(data.userId, key).toString();
        var checkKey = CryptoJS.AES.encrypt('sods_fyp', key).toString();
       
        localStorage.setItem('sods_fyp_rp', rolePermission);
        localStorage.setItem('sods_fyp_t', token);
        localStorage.setItem('sods_fyp_ut', userType);
        localStorage.setItem('sods_fyp_ud', userId);
        localStorage.setItem('sods_fyp_ck',checkKey);

        
    }

    function getInLocal(){
        var CryptoJS = require("crypto-js");
        var key = localStorageKey
        var haveData = false
        
        //decrept
        if(localStorage.getItem('sods_fyp_ck')!==null){
            try{
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
            }catch(e){
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

            setUser({
                ...user,
                rolePermission: rolePermission,
                token:token,
                userType:userType,
                userId:userId

            })
        }

        
    }
   
    return (
        <React.StrictMode>
            
            <UserContext.Provider value={{user,setUserContext,clearLoginState,storeInLocal,fpHash}}>
                
                    <Provider store={store}>
                        <BrowserRouter>

                            <ChatRoom />

                            <Routes>
                                
                            <Route>                         
                                                           
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