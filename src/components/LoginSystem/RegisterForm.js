import { Form,InputGroup,Button,Row } from "react-bootstrap";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from 'react-i18next'

const RegistereFormStyle = {
    color:"black",
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    border:"solid black",
    borderRadius: "25px"
  }

const RegisterForm=({setDictUP,dict,handleSubmit})=>{
    const { t } = useTranslation()

    function setDict(key,value){
        //setDictUP(...dict,{key:value})
        var tmp = dict
        tmp[key]=value
        setDictUP(tmp)
        setUpdate(true)
        console.log(dict)
    }

    const [update,setUpdate] = useState(false)

    useEffect(()=>{
        if(update){
            setUpdate(false)
        }
    },[update])

    return(
        <Row style={RegistereFormStyle} className="mt-4">
           
          <Form>
            <Form.Group className="mb-3 mt-4" controlId="formRegisterName" style={{width:'80%'}}>
              <Form.Label>{t('registerForm.username')}</Form.Label>
              <Form.Control type="text" placeholder={t('registerForm.username')} required onChange={(e)=>setDict("userName",e.target.value)}/> 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRegisterPassword" style={{width:'80%'}}>
            <Form.Label>{t('registerForm.password')}</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder={t('registerForm.password')}
                  aria-label="Password"
                  aria-describedby="showPassword"
                  type={dict.showPassword===undefined?'password':dict.showPassword?'text':'password'}
                  onChange={(e)=>setDict("password",e.target.value)}
                  required
                />
                <Button variant="outline-secondary" id="button-addon2-showPassword" 
                onClick={(e)=>setDict("showPassword",!dict.showPassword)}>

                  {dict.showPassword?<FontAwesomeIcon icon={faEye}></FontAwesomeIcon>:
                  <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                  
                  }
                
                </Button>
              </InputGroup>
            </Form.Group>
          
            <Form.Group className=" mt-4" controlId="formBasicNickName" style={{width:'80%'}}>
              <Form.Label>{t('registerForm.nickname')}</Form.Label>
              <Form.Control type="text" placeholder={t('registerForm.nickname')} onChange={(e)=>setDict("nickName",e.target.value)}/> 
            </Form.Group>

            <Form.Group className="mt-4" controlId="formBasicEmail" style={{width:'80%'}}>
              <Form.Label>{t('registerForm.email')}</Form.Label>
              <Form.Control type="text" placeholder={t('registerForm.email')} onChange={(e)=>setDict("email",e.target.value)}/> 
            </Form.Group>

            <Form.Group className=" mt-4" controlId="formBasicPhone" style={{width:'80%'}}>
              <Form.Label>{t('registerForm.phone')}</Form.Label>
              <Form.Control type="text" placeholder={t('registerForm.phone')} onChange={(e)=>setDict("phonenumber",e.target.value)}/> 
            </Form.Group>

            <Form.Group className=" mt-4" controlId="formBasicSex" style={{width:'80%'}}>
              <Form.Label>{t('registerForm.sex')}</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e)=>setDict("sex",e.target.value)}>
                <option value="M">{t('registerForm.sexMale')}</option>
                <option value="F">{t('registerForm.sexFemale')}</option>
                <option value="O">{t('registerForm.sexOther')}</option>
            </Form.Select>
              
            </Form.Group>
  

            <Button variant="primary" className='mb-3' onClick={handleSubmit}>
            {t('registerForm.registerBtn')}
            </Button>

           
          </Form>
        </Row>
    )
}
export default RegisterForm