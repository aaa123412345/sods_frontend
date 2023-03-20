import React,{useState,useEffect} from "react";

import {Offcanvas,Navbar,Nav,Form,Container,Button} from 'react-bootstrap';

import useSendRequest from "../../../../hooks/useSendRequest";
import CusNavbarbuilder from "../CusNavbarbuilder/CusNavbarbuilder";



const expand = 'md'

const CusNavbar = (data) => {
  
  const [simpleFormHookState,setSimpleFormHookState] = useState(true)
  const simpleFormHook = useSendRequest(process.env.REACT_APP_LANGUAGE_HOST+'/fullform','get',{},simpleFormHookState,false,false)
  const [langData,setLangData] = useState({})

  useEffect(()=>{
    if(simpleFormHookState){
        if(!simpleFormHook.isLoaded){
            if(simpleFormHook.ready){
                
                setLangData(simpleFormHook.items)
                setSimpleFormHookState(false)
            }else if(simpleFormHook.errMsg !==""){
                alert(simpleFormHook.errMsg)
                setSimpleFormHookState(false)

            }
        }
    }
},[simpleFormHook])

  useEffect(()=>{
  },[langData])

  function changeLanguage(e){
    var old = data.lang
    var newLang = e.target.value
    console.log("From "+old+" to "+newLang)
    var fullpath = window.location.href
    var fullpath = fullpath.replace(old,newLang)
    window.location.href=fullpath
  }


  return(
  <>
      {
        <Navbar key={expand} bg="light" expand={expand} className="py-lg-4 py-md-3">
          <Container fluid>
            <Navbar.Brand className="fs-1 ">{data.pdata.title}</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                  <span className="d-md-none">
                      <CusNavbarbuilder data={data}></CusNavbarbuilder>
                  </span>
              </Nav>
              {data.mode === "public"?
              <Form.Select aria-label="Default select example" style={{width:"100px"}} value={data.lang} onChange={changeLanguage}>
                {Object.keys(langData).map((key,index)=>
                  <option key={"lang-select-"+index} value={key}>{langData[key]}</option>
                )}
               
              </Form.Select>:''}
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
     }
    </>
  )
}

export default CusNavbar;


