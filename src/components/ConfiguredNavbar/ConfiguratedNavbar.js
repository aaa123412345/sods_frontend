import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import navbardata from '../../testData/testNavbar.json'

const lang = "chi"

const ConfiguratedNavbar = () => (
  <div className="configuratedNavbar">
     <Navbar bg={navbardata.style.bg} expand={navbardata.style.expand}>
      <Container style={{paddingRight:0,paddingLeft:10, margin:0}}>
        <Navbar.Brand href={navbardata.home.path[lang]}>{navbardata.home.navName[lang]}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {navbardata.navdata.map((data,index) => navbarTypeSelector(data,index))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>   
   
  </div>
)

export default ConfiguratedNavbar;

function navbarTypeSelector(data,index){
 
  if(data["child"].length == 0 ){
    
    return directlink(data,index)
  }else{
    return dropdownlist(data,index)
  }
}

function directlink(data,index){
  
  return(
    <Nav.Link key={"navbar"+index} href={data.path[lang]}>{data.navName[lang]}</Nav.Link>
  )
}

function dropdownlist(data,index){

  let subitem = []
  

  for(let i=0;i<data.child.length;i++){
    subitem.push(<NavDropdown.Item key={"navbar"+index+"a"+i} href={data.child[i].path[lang]}>{data.child[i].navName[lang]}</NavDropdown.Item>) // add children e.g. = > chinese
  }

  return(
    <NavDropdown title={data.navName[lang]} key={"navbar"+index}> 
      {subitem}
   
    </NavDropdown>
  )
  
}

