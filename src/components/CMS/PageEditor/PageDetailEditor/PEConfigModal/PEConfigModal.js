import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faGear} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cloneDeep from 'lodash.clonedeep';
import { useEffect } from 'react';

const PEConfigModal = ({data})=> {
  const [editData, setEditData] = useState({});
  const [editDataUpdate, setEditDataUpdate] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
        setShow(true)
        setEditData(cloneDeep(data))
        setEditDataUpdate(true)
 };

    useEffect(()=>{
        if(editDataUpdate){
            console.log(editData)
            setEditDataUpdate(false)
        }
    },[editDataUpdate])

  return (
    <>
      <FontAwesomeIcon icon={faGear} style={{paddingLeft:'5px',paddingRight:"5px", cursor:"pointer"}} onClick={handleShow}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Component in Rank: "+data.rank +" - Subrank: "+data.subrank} </Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
            <h3 className='text-md'>{"Type: "+data.type}</h3>
            <h3 className='text-md'>{"Bootstrap: "}</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PEConfigModal;