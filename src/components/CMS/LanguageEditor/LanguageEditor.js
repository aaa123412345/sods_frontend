import React, { useState,useContext,useEffect } from 'react';
import { Col, Row,Table,Modal,Button } from 'react-bootstrap';
import useSendRequest from '../../../hooks/useSendRequest';
import cloneDeep from 'lodash.clonedeep';




const LanguageEditor = (props) => {
    const [simpleFormHookState,setSimpleFormHookState] = useState(true)
    const simpleFormHook = useSendRequest(process.env.REACT_APP_LANGUAGE_HOST+'/simpleform','get',{},simpleFormHookState,false,false)

    const [languageMatrixHookState,setLanguageMatrixHookState] = useState(true)
    const languageMatrixHook = useSendRequest(process.env.REACT_APP_LANGUAGE_HOST+'/fullMatrix','get',{},languageMatrixHookState,false,false)

 


    const [tableData,setTableData] = useState([])
    const [langData,setLangData] = useState([])

    const [updateHookState,setUpdateHookState] = useState({
            active:false,
            data:{},      
        })
    const updateHook = useSendRequest(process.env.REACT_APP_LANGUAGE_HOST+'/languagesAndMatrix?languages='+getUpdateParm(),
    'put',updateHookState.data,updateHookState.active,false,false)

    const [showAddModal,setShowAddModal] = useState(false)
    const [showRemoveModal,setShowRemoveModal] = useState(false)
    const [addTarget,setAddTarget] = useState('')
    const [removeTarget,setRemoveTarget] = useState('')
    

    const borderStyle = {
        border:"1px solid black"
    }
    useEffect(()=>{
        if(simpleFormHookState){
            if(!simpleFormHook.isLoaded){
                if(simpleFormHook.ready){
                    
                    setLangData(simpleFormHook.items.languageData)
                    setSimpleFormHookState(false)
                }else if(simpleFormHook.errMsg !==""){
                    alert(simpleFormHook.errMsg)
                    setSimpleFormHookState(false)

                }
            }
        }
    },[simpleFormHook])

    useEffect(()=>{
        if(languageMatrixHookState){
            if(!languageMatrixHook.isLoaded){
                if(languageMatrixHook.ready){

                    setTableData(cloneDeep(languageMatrixHook.items))
                    setLanguageMatrixHookState(false)
                }else if(languageMatrixHook.errMsg !==""){
                    alert(languageMatrixHook.errMsg)
                    setLanguageMatrixHookState(false)
                }
            }
        }
    },[languageMatrixHook])

    useEffect(()=>{
        //console.log(tableData)
    },[tableData])

    useEffect(()=>{
        if(updateHookState.active){
            if(!updateHook.isLoaded){
                if(updateHook.ready){
                    alert("Update success")
                    setUpdateHookState({
                        active:false,
                        data:{}
                    })
                    window.location.reload()
                }else if(updateHook.errMsg !==""){
                    alert(updateHook.errMsg)
                    setUpdateHookState({
                        active:false,
                        data:{}
                    })
                }
            }
        }
    },[updateHook])

    function getUpdateParm(){
        
        var requestParm = langData.join(',')
        console.log(requestParm)
        return requestParm
    }

    function update(){
        console.log(tableData)
        
        setUpdateHookState({
            active:true,
            data:[...tableData]
            
        })

    }

    function removeLanguage(language){
        var newLangData = cloneDeep(langData)
        var newTableData = cloneDeep(tableData)

        const updateFilter = (item) => item.lsfIn !== language && item.lsfBasic !== language
        newTableData = newTableData.filter(updateFilter)
        newLangData = newLangData.filter((item)=>item!==language)

        setLangData(newLangData)
        setTableData(newTableData)

    }

    function addLanguage(language){
        function getTemplate(lsfin, basic, full){
            const dict = {
                lsfIn: lsfin,
                lsfBasic: basic,
                languageFull: full
            }
            return dict

        }

        var newLangData = cloneDeep(langData)
        var newTableData = cloneDeep(tableData)

        //Add old language in new language
        newLangData.map((basic)=>{
            newTableData.push(getTemplate(language,basic,""))
        })

        newLangData.push(language)
        //Add new language in old language 
        newLangData.map((basic)=>{
            newTableData.push(getTemplate(basic,language,""))
        })
        setLangData(newLangData)
        setTableData(newTableData)

    }

    function addModal(){
        function addTargetBtn(){
            alert(addTarget +" is added")
            addLanguage(addTarget)
            setShowAddModal(false)
            setAddTarget("")
        }
        return(
            <Modal show={showAddModal} onHide={()=>{setShowAddModal(false)}}>
                <Modal.Header closeButton>
                <Modal.Title>Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>Language: <input type="text" key={"AddModalInput"} onChange={(e)=>setAddTarget(e.target.value)} 
                style={borderStyle} defaultValue={addTarget}></input></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setShowAddModal(false)}}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>{addTargetBtn()}}>
                    Add Language
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function removeModal(){
        function removeTargetBtn(){
            alert(removeTarget +" is removeed")
            removeLanguage(removeTarget)
            setShowRemoveModal(false)
            setRemoveTarget("")
        }
        return(
            <Modal show={showRemoveModal} onHide={()=>{setShowRemoveModal(false)}}>
                <Modal.Header closeButton>
                <Modal.Title>Remove</Modal.Title>
                </Modal.Header>
                <Modal.Body>{"Language: "} 
                    <select onChange={(e)=> setRemoveTarget(e.target.value)} style={borderStyle}>
                        <option value="">. . .</option>
                        {langData.map((item,index)=>
                            <option key={"remove-"+index} value={item}>{item}</option>
                        )}
                    </select>
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setShowRemoveModal(false)}}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>{removeTargetBtn()}}>
                    Reomve
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    
    function renderLanguageMatrixTable(){
        function getDataInMatrix(par1,par2){
            var data = tableData.filter((item)=>{
                return item.lsfIn === par1 && item.lsfBasic === par2
            })
       
            return data[0].languageFull
        }
        function setDataInMatrix(par1,par2,value){
            //get index where lsfIn = par1 and lsfBasic = par2
            const targetIndex = (item) => item.lsfIn === par1 && item.lsfBasic === par2
            var index = tableData.findIndex(targetIndex)
            replaceDataWithIndex(index,value)
        }

        function replaceDataWithIndex(index,value){
            var temp = cloneDeep(tableData)
            temp[index].languageFull = value
            setTableData(temp)
        }

        function handleCellChange(e){
            //console.log(e.target.value)
            setDataInMatrix(e.target.getAttribute("par1"),e.target.getAttribute("par2"),e.target.value)
        }

        return(
            <>
                <Table striped bordered hover style={borderStyle}>
                    <thead>
                        <tr>
                            <th></th>
                            {langData.map((item,index)=>
                                <th key={"topRow"+index}>{item}</th>
                            )} 
                        </tr>
                        </thead>
                        <tbody>
                            {langData.map((item1,index)=>
                                <tr key={"tr-"+item1}>
                                    <td key={"td-main-"+item1}>{item1}</td>
                                    {langData.map((item2,index)=>
                                        <td key={"td-"+item1+"-"+item2} >{
                                            <input type="text" key={"input-"+item1+"-"+item2} 
                                            par1={item1} par2 ={item2}
                                            value={getDataInMatrix(item1,item2)}
                                            onChange={handleCellChange}
                                            style={borderStyle}></input>
                                        
                                            
                                            
                                        }</td>
                                    )} 
                                </tr>
                            )} 
                        </tbody>
                </Table>
            </>
        )
    }

    if(languageMatrixHook.ready && simpleFormHook.ready && tableData.length>0 && langData.length>0){
        return(
            <>
                {renderLanguageMatrixTable()}
                {addModal()}
                {removeModal()}
                <Button onClick={()=>setShowAddModal(true)}>Add</Button>
                <Button onClick={()=>setShowRemoveModal(true)}>Remove</Button>
                <Button onClick={()=>update()}>Update</Button>
            </>
           
            )
    }
}

export default LanguageEditor