import { useContext,useEffect,useState } from "react";
import {UserContext} from '../../App'
import useSendRequest from "../../hooks/useSendRequest";
import { Navigate } from 'react-router-dom';

const LogoutPage = () => {
const {user,clearLoginState} = useContext(UserContext)
const [hookActive,setHookActive] = useState(false)
const logout = useSendRequest(process.env.REACT_APP_USER_SYSTEM_HOST+'/logout','post',{},true)
   

    useEffect(()=>{
        if(!logout.isLoaded){
          if(logout.ready){
            alert("Logout Success")
            clearLoginState()

          }else if(logout.errMsg!==''){
            if(hookActive){
              alert(logout.errMsg)
              setHookActive(false)
            }
          
          }
        }
      }
        ,[logout])

    return(
        <>
        {logout.ready?<Navigate to="/public/eng/about"></Navigate>:''}
        </>
    )
}

export default LogoutPage;