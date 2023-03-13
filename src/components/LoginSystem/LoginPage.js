  import React, {useState, useContext, useEffect} from 'react';


  import { Navigate } from 'react-router-dom';
  import {UserContext} from '../../App.js'
  import useSendRequest from '../../hooks/useSendRequest';
  import LoginForm from './LoginForm.js';
  import RegisterForm from './RegisterForm.js';
  import { Tab, Tabs } from "react-bootstrap";

  import { useTranslation } from 'react-i18next'


  const LoginPage = (props) =>{
    const {user,setUserContext} = useContext(UserContext)

    //Login
    const [loginDict,setLoginDict] = useState({userName:"",password:"",showPassword:false,remember:false})

    //Register
    const [registerDict,setRegisterDict] = useState({userName:"",password:"",showPassword:false,remember:false})

    const { t } = useTranslation()

    //Hook
    const [hookState, setHookState] = useState({
      loginActive:false,
      registerActive:false,
    })
    const login = useSendRequest(process.env.REACT_APP_USER_SYSTEM_HOST+'/login'
    ,'post',loginDict,hookState.loginActive,false,false)
    const register = useSendRequest(process.env.REACT_APP_USER_SYSTEM_HOST+'/register'
    ,'post',registerDict,hookState.registerActive,false,false)


    const handleLoginSubmit = (event) => {
      const form = event.currentTarget;
     
      if (loginDict.userName===""||loginDict.password==='') {
        
          alert(t("loginPage.invalidFormat"))
      }else{
        setHookState({...hookState,loginActive:true})
          
      }
    };

    const handleRegisterSubmit = (event) => {
      const form = event.currentTarget;
     
      if (registerDict.userName===""||registerDict.password==='') {
          alert(t('loginPage.invalidFormat'))
          
      }else{
        setHookState({...hookState,registerActive:true})
          
      }
    };

    function storeInLocal(data){
      var CryptoJS = require("crypto-js");
      var key = process.env.REACT_APP_LOCAL_STARGE_KEY
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
  

  
    useEffect(()=>{
      //window.sessionStorage.clear()
      if(!login.isLoaded){
        if(login.ready){
            //alert("Welcome")
            alert(t('loginPage.loginSuccess'))
            setUserContext(login.items)
            storeInLocal(login.items)
        }else if(login.errMsg!==''){
          if(hookState.loginActive){
            alert(login.errMsg)
            setHookState({...hookState,loginActive:false})
          }
        
        }
      }
    }
      ,[login])

      useEffect(()=>{
        if(!register.isLoaded){
          if(register.ready){
              
              if(hookState.registerActive){
                //alert("Registered. Please login again")
                alert(t('loginPage.registerSuccess'))
                window.location.reload();
              }
             
          }else if(register.errMsg!==''){
            if(hookState.registerActive){
              alert(register.errMsg)
              setHookState({...hookState,registerActive:false})
            }
          
          }
        }
      }
        ,[register])

    

    return(
      <>
       {login.ready?<Navigate to={"/public/"+props.lang+"/about"}></Navigate>:''}
       {user.userType === ''?'':<Navigate replace to={"/public/"+props.lang+"/about"} />}
       <Tabs
                defaultActiveKey="login"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
            <Tab eventKey="login" title={t('loginPage.tabLogin')}>
                <LoginForm setDictUP={setLoginDict} dict={loginDict} handleSubmit={handleLoginSubmit}></LoginForm>
            </Tab>
            <Tab eventKey="register" title={t('loginPage.tabRegister')}>
                <RegisterForm setDictUP={setRegisterDict} dict={registerDict} handleSubmit={handleRegisterSubmit}></RegisterForm>
            </Tab>


        </Tabs>
        

      </>
    )
  }

  export default LoginPage;