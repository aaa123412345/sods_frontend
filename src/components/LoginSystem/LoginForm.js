import { Form,InputGroup,Button,Row } from "react-bootstrap";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
const LoginPageStyle = {
    color:"black",
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    border:"solid black",
    borderRadius: "25px"
  }

const LoginForm=({setDictUP,dict,handleSubmit})=>{
    function setDict(key,value){
        //setDictUP(...dict,{key:value})
        var tmp = dict
        tmp[key]=value
        setDictUP(tmp)
        setUpdate(true)
        
    }

    const [update,setUpdate] = useState(false)

    useEffect(()=>{
        if(update){
            setUpdate(false)
        }
    },[update])

    return(
        <Row style={LoginPageStyle} className="mt-4">
          <Form>
            <Form.Group className="mb-3 mt-4" controlId="formBasicName" style={{width:'80%'}}>
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="User Name" onChange={(e)=>setDict("userName",e.target.value)}/>
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:'80%'}}>
            <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  type={dict.showPassword===undefined?'password':dict.showPassword?'text':'password'}
                  onChange={(e)=>setDict("password",e.target.value)}
                  
                />
                <Button variant="outline-secondary" id="button-addon2" 
                onClick={(e)=>setDict("showPassword",!dict.showPassword)}>

                  {dict.showPassword?<FontAwesomeIcon icon={faEye}></FontAwesomeIcon>:
                  <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                  
                  }
                
                </Button>
              </InputGroup>
            </Form.Group>
          
              
            <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{width:'80%'}}>
              <Form.Check type="checkbox" label="Remember" 
              onChange={(e)=>setDict("remember",!dict.remember)}/>
            </Form.Group>
            <Button variant="primary" className='mb-3' onClick={handleSubmit}>
              Login 
            </Button>

           
          </Form>
        </Row>
    )
}
export default LoginForm