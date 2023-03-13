import { Form,InputGroup,Button,Row } from "react-bootstrap";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from 'react-i18next'

const LoginPageStyle = {
    color:"black",
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    border:"solid black",
    borderRadius: "25px"
  }

const LoginForm=({setDictUP,dict,handleSubmit})=>{

    const { t } = useTranslation()


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
            <Form.Group className="mb-3 mt-4" controlId="formLoginFormName" style={{width:'80%'}}>
              <Form.Label>{t('loginForm.username')}</Form.Label>
              <Form.Control type="text" placeholder={t('loginForm.username')} onChange={(e)=>setDict("userName",e.target.value)}/>
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLoginFormPassword" style={{width:'80%'}}>
            <Form.Label>{t('loginForm.password')}</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder={t('loginForm.password')}
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  type={dict.showPassword===undefined?'password':dict.showPassword?'text':'password'}
                  onChange={(e)=>setDict("password",e.target.value)}
                  
                />
                <Button variant="outline-secondary" id="button-LoginForm-addon2" 
                onClick={(e)=>setDict("showPassword",!dict.showPassword)}>

                  {dict.showPassword?<FontAwesomeIcon icon={faEye}></FontAwesomeIcon>:
                  <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                  
                  }
                
                </Button>
              </InputGroup>
            </Form.Group>
          
              
            <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{width:'80%'}}>
              <Form.Check type="checkbox" label={t('loginForm.remember')}
              onChange={(e)=>setDict("remember",!dict.remember)}/>
            </Form.Group>
            <Button variant="primary" className='mb-3' onClick={handleSubmit}>
            {t('loginForm.login')}
            </Button>

           
          </Form>
        </Row>
    )
}
export default LoginForm