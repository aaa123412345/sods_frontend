import React, { useState,useContext } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
//import useSendRequestMK2 from '../../../hooks/useSendRequestMK2';
import {UserContext} from '../../../App'

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const {user,clearLoginState} = useContext(UserContext)
 
  const [postHookDict, setPostHookDict] = useState({
    url: process.env.REACT_APP_FTP_HOST+ '/upload',
    method: 'POST',
    body: null,
  });

  //const postHook = useSendRequestMK2(postHookDict,postHookState.active,false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    //const formData = new FormData();
    //formData.append('file', event.target.files[0]);
    //etPostHookDict({...postHookDict,body:formData});
  }

  const handleSubmit = (event) => {
    //event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    fetch(postHookDict.url, {
      method: 'POST',
      body: formData,
      headers: {
        token: user.token,
      }
    })
    .then(response => response.json())
    .then(data => alert("File uploaded"))
    .catch(error => console.error(error));
  }

  const handleUpload = () => {
    console.log(postHookDict);
    //setPoostHookState({...postHookState,active:true});
  }


/*
  useEffect(() => {
    console.log(postHook);
    if(postHookState.active){
        if(!postHook.isLoaded){
            if(postHook.ready){
                setPoostHookState({...postHookState,active:false});
                alert("File uploaded");
            }else if(postHook.errMsg !=""){
                alert(postHook.errMsg);
                setPoostHookState({...postHookState,active:false});
            }
        }
        
    }
    }, [postHook])*/


  return (
  <div>
    <input type="file" onChange={handleFileChange} />
    <Button onClick={handleSubmit}>Upload</Button>
  </div>
  )
    
  

}

export default FileUpload;