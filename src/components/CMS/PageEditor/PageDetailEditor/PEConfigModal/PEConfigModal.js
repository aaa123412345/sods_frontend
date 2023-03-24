import React, { useState,startTransition } from 'react';

import {Modal,Button} from 'react-bootstrap';
import { faGear} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cloneDeep from 'lodash.clonedeep';
import { useEffect } from 'react';
import PEConfigModalFactory from './PEConfigModalFactory';
import { pageDataCommand } from '../../PageDataCommand';

const PEConfigModal = ({data,command})=> {
  const [editData, setEditData] = useState(null);
  const [editDataUpdate, setEditDataUpdate] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setEditData(null)
 };

  const handleSave = () => {
    //console.log(command)
    command(pageDataCommand.updateElement, {element:editData,rank:editData.rank,subrank:editData.subrank});
    setShow(false)
    setEditData(null)
 };

  const handleShow = () => {
        setShow(true)
        setEditData(cloneDeep(data))
        setEditDataUpdate(true)
 };

 const changeType = async (type) =>{
    
    function getDataFromTemp(type){
        var tmpEditData = cloneDeep(data)
        if(tmpEditData.type===type) {
            return tmpEditData
        }

        var response = {}
        response.type = type
        response.rank = tmpEditData.rank
        response.subrank = tmpEditData.subrank
        response.bootstrap = tmpEditData.bootstrap
        
        //get template in tempDict and foreach key in template, set value to response

        const tempDict = {
            ctext:{
                content:"Temp Text",
                style:{
                    color:"black",
                    fontSize:"1vw",
                    fontWeight:"normal",
                    fontStyle:"normal",
                    textDecoration:"none",
                }
            },
            cimage:{
                alt:"Temp Image",
                src:"",
                style:{
                }
            },
            cvideo:{
                alt:"Temp Video",
                src:"",
                style:{
                    width:"100%",
                },
                autoplay:false,
                loop:false,
                muted:false,
                controls:true,
            },
            crestable:{
                content:{
                    key:["TempKey","TempValue"],
                    tableStyle:{
                        dataStyleNum :2,
                        head:{
                            backgroundColor:"black",
                            color:"white",
                           
                           

                        },
                        whole:{
                                hover:true,
                                striped:true,
                                bordered:true,
                        }, 
                        data:[
                            {backgroundColor:"white",color:"black"},
                            {backgroundColor:"gray",color:"black"}
                        ]
                    },
                    value:[{TempKey:1,TempValue:11},{TempKey:2,TempValue:22}],
                },
                style:{
                    width:"500px",
                    height:"500px",
                }
                    

            },
            cmultipletext:{
                content:['temp1','temp2','temp3'],
                commonstyle:{
                    width:"500",
                    height:"500",
                },
                textNum:3,
                elementstyle:[
                    {color: '#FF0000'},
                    {color: '#00FF00'},
                    {color: '#0000FF'}
                ]
            }
        
        }
        var template = tempDict[type]
        for (const [key, value] of Object.entries(template)) {
            response[key] = value
        }

        return response
    }   
            
    
    startTransition(() => {
       
        setEditData(getDataFromTemp(type))
        setEditDataUpdate(true)
    })
 }

 function setEditDataInChild(key,value){
    var tmpEditData = cloneDeep(editData)
    tmpEditData[key] = value
    setEditData(tmpEditData)
    setEditDataUpdate(true)
 }

 function setEditDataWithSubkeyInChild(key,subkey,value){
    var tmpEditData = cloneDeep(editData)
    tmpEditData[key][subkey] = value
    setEditData(tmpEditData)
    setEditDataUpdate(true)
 }

 function setEditDataWithSubSubkeyInChild(key,subkey,subsubkey,value){
    var tmpEditData = cloneDeep(editData)
    tmpEditData[key][subkey][subsubkey] = value
    setEditData(tmpEditData)
    setEditDataUpdate(true)
 }

 function setBootstrapData(key,value){
    var tmpEditData = cloneDeep(editData)
    tmpEditData.bootstrap[key] = parseInt(value)
    setEditData(tmpEditData)
    setEditDataUpdate(true)
 }

 function setStyleData(key,value){
    var tmpEditData = cloneDeep(editData)
    tmpEditData.style[key] = value
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
                    <h1 style={{fontSize:"2vw"}}>{"Type: "}</h1>
                            <select value={editData.type} onChange={(e)=>changeType(e.target.value)} style={{border:'solid black 1px'}}>
                                <option value="ctext">Text</option>
                                <option value="cimage">Image</option>
                                <option value="cvideo">Video</option>
                                <option value="crestable">Table</option>
                                <option value="cmultipletext">Multiple Text</option>
                            </select>
                        <PEConfigModalFactory type={editData.type} editData={editData} 
                        command={{setEditDataInChild:setEditDataInChild,
                        setBootstrapData:setBootstrapData,setEditDataWithSubkeyInChild:setEditDataWithSubkeyInChild,
                        setEditDataWithSubSubkeyInChild:setEditDataWithSubSubkeyInChild,
                        setStyleData:setStyleData,changeType:changeType}}></PEConfigModalFactory>
                        
                    
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>:null
            }
            </>
        );
    
}

export default PEConfigModal;