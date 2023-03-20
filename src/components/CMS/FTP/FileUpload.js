import axios from 'axios';
import React, { useState,useContext } from 'react';
import { useEffect } from 'react';
import { Button, Tabs, Tab } from 'react-bootstrap';
//import useSendRequestMK2 from '../../../hooks/useSendRequestMK2';
import {UserContext} from '../../../App'

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null)

    const {user,clearLoginState} = useContext(UserContext)
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
   
    const [postHookDict, setPostHookDict] = useState({
      url: process.env.REACT_APP_FTP_HOST+ '/upload',
      method: 'POST',
      body: null,
    });
  
    //const postHook = useSendRequestMK2(postHookDict,postHookState.active,false);
  
    const handleFileChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFile(undefined)
            return
        }
        setFile(e.target.files[0]);

    }
  
    const handleSubmit = async() => {
      //event.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      setUploading(true);
      await axios.post(process.env.REACT_APP_FTP_HOST+ '/file',
      formData,{
        headers: {
          token: user.token,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          console.log(progressEvent.loaded);
          setProgress(progress);
        }
      })
      .then(response => {
        console.log(response);
        alert(response.data.msg);
        if(response.data.code === 200){
          window.location.reload();
        }
        
      })
      .catch(error => {
        console.error(error);
        alert(error);
      });
      setUploading(false);
    }
     
   

    useEffect(() => {
        if (!file) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])
  
  
  
  
  
    return (
     
            <div>
              <input type="file" onChange={handleFileChange} />
                <br />
                
                {file &&  <>
                    <h4>Preview</h4>
                    <img src={preview} />
                </> }
                <br />
              <Button onClick={handleSubmit}>Upload</Button>
              {uploading && <div>Uploading... {"Progress: "+ progress}</div>}
            </div>
       
  
    )
      
    
  
  }
  
  export default FileUpload;