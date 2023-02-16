  import React, {useState, useContext, useEffect} from 'react';
  import {Form,Button,Row,InputGroup} from 'react-bootstrap';
  import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

  import { Navigate } from 'react-router-dom';
 



  import {UserContext} from '../../App.js'
  import useSendRequest from '../../hooks/useSendRequest';

  const LoginPageStyle = {
    color:"black",
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    border:"solid black",
    borderRadius: "25px"
  }

  const LoginPage = () =>{
    const [showPsw,setShowPsw] = useState(false)
    const [psw,setPsw] = useState('')
    const [userName,setUserName] = useState('')
    const [saveLogin,setSaveLogin] = useState(false)
    const {user,setUserContext} = useContext(UserContext)


    const [hookActive,setHookActive] = useState(false)
    const login = useSendRequest(process.env.REACT_APP_USER_SYSTEM_HOST+'/login','post',{userName:userName,password:psw},hookActive)


    const handleSubmit = (event) => {
      const form = event.currentTarget;
     
      if (userName===""||psw==='') {
        
          alert("Invalid Format of User Name or Password")
      }else{
          setHookActive(true)
          
      }
    };

    function storeInLocal(data){
      var CryptoJS = require("crypto-js");
      var key = process.env.REACT_APP_LOCAL_STARGE_KEY
      var rolePermission = CryptoJS.AES.encrypt(JSON.stringify(data.rolePermission), key).toString();
      var token = CryptoJS.AES.encrypt(data.token, key).toString();
      var userType = CryptoJS.AES.encrypt(data.userType, key).toString();
      var checkKey = CryptoJS.AES.encrypt('sods_fyp', key).toString();

      localStorage.setItem('sods_fyp_rp', rolePermission);
      localStorage.setItem('sods_fyp_t', token);
      localStorage.setItem('sods_fyp_ut', userType);
      localStorage.setItem('sods_fyp_ck',checkKey);
  }

  
    useEffect(()=>{
      if(!login.isLoaded){
        if(login.ready){
          alert("Welcome")
          setUserContext(login.items)
          storeInLocal(login.items)
        }else if(login.errMsg!==''){
          if(hookActive){
            alert(login.errMsg)
            setHookActive(false)
          }
        
        }
      }
    }
      ,[login])

    

    return(
      <>
       {login.ready?<Navigate to="/public/eng/about"></Navigate>:''}
       {user.userType === ''?'':<Navigate replace to="/public/eng/about" />}
        <Row style={LoginPageStyle} className="mt-4">
          <Form>
            <Form.Group className="mb-3 mt-4" controlId="formBasicName" style={{width:'80%'}}>
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="User Name" onChange={(e)=>setUserName(e.target.value)}/>
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:'80%'}}>
            <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  type={showPsw?'text':'password'}
                  onChange={(e)=>setPsw(e.target.value)}
                  
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={()=>setShowPsw(!showPsw)}>
                  {showPsw?<FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>:
                  <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                  }
                </Button>
              </InputGroup>
            </Form.Group>
          
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{width:'80%'}}>
              <Form.Check type="checkbox" label="Remember" onChange={()=>setSaveLogin(!saveLogin)}/>
            </Form.Group>
            <Button variant="primary" className='mb-3' onClick={handleSubmit}>
              Login
            </Button>
          </Form>
        </Row>
      </>
    )
  }

  export default LoginPage;