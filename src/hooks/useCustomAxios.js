import axios from "axios";
import { useState, useEffect,useContext } from "react";
import {UserContext} from '../App'

const useCustomAxios = async (method,url,sendData) => {
    const {user,clearLoginState} = useContext(UserContext)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);
    const [redirection, setRedirection] = useState('');


    var url;
    var headers = {}
    useEffect(()=>{
        getDataFromServerAndProcess()
    },[])

    async function getDataFromServerAndProcess(){
        try{
            
            if(user.token !== ''){
                headers['token'] = user.token
            }
            
            const { data } = await axios({
                method: method,
                url: url,
                data: sendData,
                headers:headers
            })
            
            
    
                if(data === undefined||!("code" in json) ||!("msg" in json)){
                    alert("Response Data format have ERROR")
                }
    
                if(data.code>=100 &&json.code<200){
                    alert("Action is recieved")
            
                }else if(data.code>=200 &&json.code<300){
                    alert("ready")
                    setIsLoaded(true);
                    setItems(rest.data);
                    setIsReady(true);
                    
            
                }else if(data.code>300 &&json.code<400){
                    alert("ok")
                
                }else if(data.code>=400 &&json.code<500){           //404 -> Not found Error 403 -> Permission Error 402-> Validation Error 
                    alert(data.code)
                    alert(data.msg)
                    clearLoginState();
                    setIsLoaded(true);
                    setError(error);
                
                }else if(data.code>=500 &&json.code<600){
                    alert("Service ERROR")
            
                }
                
            
            }catch (error){
                alert(error)
                setIsLoaded(true);
                setError(error);
                clearLoginState();
            }
    }

    return {items,isLoaded,ready,error,redirection}

    
  };