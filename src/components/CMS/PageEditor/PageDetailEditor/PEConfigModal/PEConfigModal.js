import React, { useState } from 'react';

import {Modal,Button} from 'react-bootstrap';
import { faGear} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cloneDeep from 'lodash.clonedeep';
import { useEffect } from 'react';
import PEConfigModalFactory from './PEConfigModalFactory';

const PEConfigModal = ({data})=> {
  const [editData, setEditData] = useState(null);
  const [editDataUpdate, setEditDataUpdate] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setEditData(null)
 };

  const handleShow = () => {
        setShow(true)
        setEditData(cloneDeep(data))
        setEditDataUpdate(true)
 };

 function setEditDataInChild(key,value){
    var tmpEditData = cloneDeep(editData)
    tmpEditData[key] = value
    setEditData(tmpEditData)
    setEditDataUpdate(true)
    }

 function setBootstrapData(key,value){
    var tmpEditData = cloneDeep(editData)
    tmpEditData.bootstrap[key] = parseInt(value)
    setEditData(tmpEditData)
    setEditDataUpdate(true)
 }

    useEffect(()=>{
        if(editDataUpdate){
            console.log(editData)
            setEditDataUpdate(false)
        }
    },[editDataUpdate])
   
        return (
            <>
            <FontAwesomeIcon icon={faGear} style={{paddingLeft:'5px',paddingRight:"5px", cursor:"pointer"}} onClick={handleShow}/>
            {editData !== null ?
            <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" size="xl">
                <Modal.Header closeButton>
                <Modal.Title>{"Component in Rank: "+editData.rank +" - Subrank: "+editData.subrank} </Modal.Title>
                
                </Modal.Header>
                <Modal.Body>
                    <PEConfigModalFactory type={editData.type} editData={editData} command={{setEditDataInChild:setEditDataInChild,setBootstrapData:setBootstrapData}}></PEConfigModalFactory>
                    
                
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>:null
            }
            </>
        );
    
}

export default PEConfigModal;