import React from "react";
import { CircularProgress} from '@chakra-ui/react'

import { useState,useEffect,useContext } from "react";
import PageBootstrapHandler from "../../PageBuilder/LayoutHandler/LayoutHandler";

import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import ElementBuilder from "../../PageBuilder/ElementBuilder/ElementBuilder";
import axios from "axios";

import PublicHeader from "../../PublicSite/PublicHeader/PublicHeader";
import PublicNavbar from "../../PublicSite/PublicNavbar/PublicNavbar";
import ServerNavbar from "../../ServerSite/ServerNavbar/ServerNavbar";

import AuthHandler from "../../Common/AuthHandler/AuthHandler";
import { Navigate } from 'react-router-dom';

import {UserContext} from '../../../App'



const PageContent = ({host,path,subpath,subsubpath,lang,mode}) => {
    
    const {user,clearLoginState} = useContext(UserContext)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);

    const getData = async () => {
      var useLanguage = process.env.REACT_APP_USE_LANGUAGE;
      var url;
      var headers = {}
      try{
        if(useLanguage){
          url = host+lang+'/'+path
        }else{
          url = host+path
        }
        //console.log(url)
        if(user.userID !== ''){
          headers['token'] = user.token
        }
       

        const { data } = await axios({
          method: 'get',
          url: url,
          data: '',
          headers:headers
        })
        
        
        var rest = jsonExtractor(data);

        if(rest.response === "success"){
          setIsLoaded(true);
          setItems(rest.data);
          setIsReady(true);
        }else{
          clearLoginState();
          setIsLoaded(true);
          setError(error);
        }
      }catch (error){
          setIsLoaded(true);
          setError(error);
          clearLoginState()
      }
    };
      
    useEffect(() => {
      
        getData()
      
    }, [host,path,lang]);


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <CircularProgress isIndeterminate color='green.300' />;
    } else if(ready) {
      
      if(!AuthHandler(items.page.auth,user)){
        alert("You do not have permission to visit this page")
        //Do not have login so no permission
        if(user.userID === '') return (<Navigate replace to={"/user/"+lang+"/login"} />)
        //User do not have permission
        else return(<Navigate replace to={"/public/"+lang+"/about"} />)
      }

      return(
        <>
      
        {items.page.useHeader&&mode==="public"?<PublicHeader lang={lang}/>:''}
        <div className="PageContent" style={items.page.style}> 
            
            {mode==="public"? <PublicNavbar pdata={items.page} lang={lang}></PublicNavbar>:
              <ServerNavbar pdata={items.page} lang={lang}></ServerNavbar>
            }
          

          { items.page.useBootstrap?
          <PageBootstrapHandler data={items.element} path={path} subpath={ subpath} lang={lang}></PageBootstrapHandler>:
          items.element.map((element)=> ElementBuilder({data:element,path:path,subpath:subpath,lang:lang}))
          }
        </div>
        </>
      )
    }
}

export default PageContent;