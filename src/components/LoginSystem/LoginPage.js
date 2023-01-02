  import React, {useState, useContext, useEffect} from 'react';
  import {Form,Button,Row,InputGroup} from 'react-bootstrap';
  import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import axios from 'axios';
  import jsonExtractor from '../Common/RESTjsonextract/RESTjsonextract';
  import { Navigate } from 'react-router-dom';
 



  import {UserContextUpdate,UserContext} from '../../App.js'

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

    const setUserContext = useContext(UserContextUpdate)
    const user = useContext(UserContext)


    const handleSubmit = (event) => {
      const form = event.currentTarget;
     
      if (userName===""||psw==='') {
        
          alert("Invalid Format of User Name or Password")
      }else{
          console.log("ok")
          console.log({userName:userName,password:psw})
          postLogin({userName:userName,password:psw})
      }
    };

    const postLogin = async (cdata) => {
      try{
        const { data } = await axios({
          method: 'post',
          url: 'http://localhost:8888/user/login',
          data: cdata
        })
       
        var rest = jsonExtractor(data);
        if(rest.response === "success"){
          console.log(rest.data)
          setUserContext(rest.data)
          alert("Welcome !")

          
        }else if (rest.response === "undefineerror"){
          console.log("The authentication server is down")
          alert("The service is not avaliable. Please try to login later")
        }else{
          console.log(rest)
          alert("Account or Password error")
        }
      }catch (error){
       
        alert("The login service is not avaliable at this moment")
      }
    };

    

    return(
      <>
       {user.userID === ''?'':<Navigate replace to="/public/eng/about" />}
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