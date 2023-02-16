import { Form,InputGroup,Button,Row } from "react-bootstrap";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
const RegistereFormStyle = {
    color:"black",
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    border:"solid black",
    borderRadius: "25px"
  }

const RegisterForm=({setDictUP,dict,handleSubmit})=>{
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
            <Form.Group className="mb-3 mt-4" controlId="formBasicName" style={{width:'80%'}}>
              <Form.Label>User Name (Required)</Form.Label>
              <Form.Control type="text" placeholder="User Name" required onChange={(e)=>setDict("userName",e.target.value)}/> 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:'80%'}}>
            <Form.Label>Password (Required)</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Password"
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
              <Form.Label>Nick Name</Form.Label>
              <Form.Control type="text" placeholder="Nick Name" onChange={(e)=>setDict("nickName",e.target.value)}/> 
            </Form.Group>

            <Form.Group className="mt-4" controlId="formBasicEmail" style={{width:'80%'}}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Email" onChange={(e)=>setDict("email",e.target.value)}/> 
            </Form.Group>

            <Form.Group className=" mt-4" controlId="formBasicPhone" style={{width:'80%'}}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Phone Number" onChange={(e)=>setDict("phonenumber",e.target.value)}/> 
            </Form.Group>

            <Form.Group className=" mt-4" controlId="formBasicSex" style={{width:'80%'}}>
              <Form.Label>Sex</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e)=>setDict("sex",e.target.value)}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
            </Form.Select>
              
            </Form.Group>
  

            <Button variant="primary" className='mb-3' onClick={handleSubmit}>
              Register
            </Button>

           
          </Form>
        </Row>
    )
}
export default RegisterForm