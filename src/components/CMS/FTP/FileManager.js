
import React from 'react';
import FileUpload from './FileUpload';
import FileTable from './FileTable';
import { Button, Tabs, Tab } from 'react-bootstrap';


const FileManager = () => {
  

  return (
    <Tabs defaultActiveKey="upload">
      <Tab eventKey="upload" title="Upload">
          <FileUpload/>
      </Tab>
      <Tab eventKey="browser" title="File Table">
          <FileTable/>
      </Tab>
      
    </Tabs>

  )
    
  

}

export default FileManager;