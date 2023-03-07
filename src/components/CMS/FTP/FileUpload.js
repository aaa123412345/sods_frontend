import axios from 'axios';
import React, { useState,useContext } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
//import useSendRequestMK2 from '../../../hooks/useSendRequestMK2';
import {UserContext} from '../../../App'

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const {user,clearLoginState} = useContext(UserContext)
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
 
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

  const handleSubmit = async() => {
    //event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    await axios.post(process.env.REACT_APP_FTP_HOST+ '/upload',
    formData,{
      headers: {
        token: user.token,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        console.log(progressEvent.loaded);
        setProgress(progress);
      }
    })
    .then(response => {
      
      alert("File uploaded");
    })
    .catch(error => {
      console.error(error);
      alert(error);
    });
    setUploading(false);
  }
    /*
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
  }*/

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
    <img src='https://sods-file.s3.ap-northeast-1.amazonaws.com/2_1.png'></img>
    <Button onClick={handleSubmit}>Upload</Button>
    {uploading && <div>Uploading... {"Progress: "+ progress}</div>}
  </div>
  )
    
  

}

export default FileUpload;