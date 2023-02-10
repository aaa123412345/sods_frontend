import axios from "axios";
import { useState, useEffect,useContext } from "react";
import {UserContext} from '../App'

export default function useFetch(url){
    const {user,clearLoginState} = useContext(UserContext)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    
    
    useEffect(()=>{
        getDataFromServerAndProcess()
    },[url])

    async function getDataFromServerAndProcess(){
        var headers={}
        setIsLoaded(true)
        try{
            
            if(user.token !== ''){
                headers['token'] = user.token
            }
            
            const { data } = await axios({
                method: 'get',
                url: url,
               
                headers:headers
            })
            
                if(data === undefined||!("code" in data) ||!("msg" in data)){
                    alert("Response Data format have ERROR")
                }
    
                if(data.code>=100 &&data.code<400){
                    setItems(data.data);
                    setIsReady(true);
                }else if(data.code>=400 &&data.code<500){           //404 -> Not found Error 403 -> Permission Error 401-> Validation Error 
                    if(data.code === 401){
                        clearLoginState();  
                        setErrMsg('ValidationError')
                    }else if(data.code === 402){
                        setErrMsg('PermissionError')
                    }else if(data.code === 404){
                        setErrMsg('DataNotFound')
                    }

               
                
                }else if(data.code>=500 &&data.code<600){
                    setErrMsg('ServiceError')
            
                }
                
            
        }catch (error){
                
                setError(error);
                
        }finally{
            setIsLoaded(false)
        }
    }

    return {items,isLoaded,ready,error,errMsg}

    
  };

