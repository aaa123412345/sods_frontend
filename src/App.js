import React from "react";
import PublicPageManager from "./components/PublicSite/PublicPageManager/PublicPageManager";
import ServerPageManager from "./components/ServerSite/ServerPageManager/ServerPageManager";

import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react'


function App() {

    /*
    <Route path='/public' element={<PublicPageManager />}></Route> 
                <Route path='/' element={<PublicPageManager />}></Route> 
    */

    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    
                    <Route path='/public/:path' element={<PublicPageManager />}></Route> 
                    <Route path='/server/*' element={<ServerPageManager/>}></Route>
                    <Route
                        path="*"
                        element={
                            <Navigate replace to="/public/about" />
                        }
                        />
                </Routes>
                
            </BrowserRouter>
        </ChakraProvider>
      
    );
  }

export default App;