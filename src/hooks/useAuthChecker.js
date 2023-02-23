import { useState, useEffect,useContext } from "react";
import {UserContext} from '../App'

export default function useAuthChecker(requirePermission,active){
    const {user,clearLoginState} = useContext(UserContext)
    const [result,setResult] = useState(false)
    const [ready,setReady] = useState(false)
    const [redirect,setRedirect] = useState('')
    useEffect(()=>{
        if(active === true){
            if(requirePermission!== ""){
                
                setResult(checker())
                setReady(true)
            }
        }
    },[requirePermission,active])

    function checker(){
         //if the permission requirnment is anonymous, it is open for everyone 
        if(requirePermission==='anonymous') {
            return true
        }
        //if the permission requirnment is anonymousOnly, it only provide for anonymous user
        if(requirePermission==='anonymousOnly'){
    
            if(user.token === ''){
                return true;
            }else{
                setRedirect("/public/eng/about")
                return false;
            }

          
        } 

        //if user is system root, user can use any api
        if(user.rolePermission.find(element => element === "system:root") !== undefined) return true;
    

        if(requirePermission === 'authenticated'){
            if(user.token === ''){
                alert("You should login to visit this page")
                setRedirect("/user/eng/login")
                return false;
            }else{
                return true;
            } 
        }

        
        
    
        //if user have require permission
        if(user.rolePermission.find(element => element === requirePermission) === undefined) {
            setRedirect("/public/eng/about")
            return false;
        }else{
            return true;
        }
    }

    return {result,ready,redirect};
   
}