import axios from "axios";
import { useState, useEffect,useContext } from "react";
import {UserContext} from '../App'

export default function useSendRequestMK2(axiosDict,active,autoRedirect){
    const {user,clearLoginState,fpHash} = useContext(UserContext)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    
    
    useEffect(()=>{
        
        if(active){
            setErrMsg('')
            setError(null)
            setIsLoaded(false)
            setIsReady(false)
            setItems([])
            getDataFromServerAndProcess()
        }
       
    },[active])

    async function getDataFromServerAndProcess(){
        var headers={}
        setIsLoaded(true)
        
        try{
            
            // if user is not logged in, token is empty string
            if (user.token) {
                headers['token'] = user.token
            }
            headers['deviceID'] = fpHash
            
            const { data } = await axios({
                ...axiosDict,
                headers: headers
            }).catch(err => {
                console.error(err);
            });


                if(typeof data !== 'object' || data === null || !('code' in data) || !('msg' in data)){
                    alert("Response Data format have ERROR")
                }
    
                if(data.code>=100 &&data.code<400){
                    setItems(data.data);
                    setIsReady(true);
                }else if(data.code>=400 &&data.code<500){           //404 -> Not found Error 403 -> Permission Error 401-> Validation Error 
                    if(data.code === 401){
                        if(user.token !== ''){
                            alert("Your token have error")
                            clearLoginState();  

                        }
                        setErrMsg('ValidationError')
                        if(autoRedirect === true){
                           window.location.href = "/user/eng/login"
                        }
                        
                    }else if(data.code === 402){
                        setErrMsg('PermissionError')
                        if(autoRedirect === true){
                            window.location.href = "/public/eng/about"
                         }

                    }else if(data.code === 404){
                        setErrMsg('DataNotFound')
                        if(autoRedirect === true){
                            window.location.href = "/public/eng/about"
                         }
                    }else if(data.code === 400){
                        setErrMsg(data.msg)
                        if(autoRedirect === true){
                            window.location.href = "/public/eng/about"
                         }
                    }
                    

               
                
                }else if(data.code>=500 &&data.code<600){
                    setErrMsg('ServiceError')
            
                }
                
            
        }catch (error){
                alert(error)
                setError(error);
                
        }finally{
            setIsLoaded(false)
        }
    }

    return {items,isLoaded,ready,error,errMsg}

    
};