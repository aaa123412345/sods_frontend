import React, { useEffect, useState } from "react"
import useSendRequest from "../../../hooks/useSendRequest"
import { Table, Row, Col,Modal,Button } from "react-bootstrap"


const FileTable = () =>{

    const init = useSendRequest(process.env.REACT_APP_FTP_HOST+ '/files','get',{},true)
    const [ready,setReady] = useState(false);

    const [removeHookState,setRemoveHookState] = useState({
        active:false,
        fileName:''
    })
    const removeHook = useSendRequest(process.env.REACT_APP_FTP_HOST+ '/file/'+removeHookState.fileName
    ,'delete',{},removeHookState.active)

    const [showPicModel,setShowPicModel] = useState(false)
    const [picModelData,setPicModelData] = useState({})

    useEffect(()=>{
        if(!init.isLoaded && !ready){
            if(init.ready){
                setReady(true)
            }
        }
        
    },[init])

    useEffect(()=>{
        if(removeHookState.active){
            if(!removeHook.isLoaded){
                if(removeHook.ready){
                    alert('File Deleted')
                    setRemoveHookState({
                        active:false,
                        fileName:''
                    })
                    window.location.reload()
                }else if(removeHook.error){
                    alert('Error in Deleting File')
                    setRemoveHookState({
                        active:false,
                        fileName:''
                    })
                    window.location.reload()
                }
            }
        }
    },[removeHook])

    function removeFile(fileName){
        setRemoveHookState({
            active:true,
            fileName:fileName
        })
    }
    
    function showPic(fileName,url){
        setShowPicModel(true)
        setPicModelData({
            fileName:fileName,
            URL:url
        })
    }
    
    const pictureModel = () => {
        function handleClosePicModel() {
            setShowPicModel(false)

        }

        return(
            <Modal show={showPicModel} onHide={handleClosePicModel}>
            <Modal.Header closeButton>
            <Modal.Title>Picture Preview {"("+picModelData.fileName+")"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={picModelData.URL}></img>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePicModel}>
                Close
            </Button>
            <Button variant="primary" onClick={()=>{
                handleClosePicModel()
                removeFile(picModelData.fileName)}}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
        )
    }

    if(ready){        
        console.log(init.items)
        return(
            <>
                <div className="d-none d-sm-block">
                    {DesktopTable(init.items,"FileTable-")}
                </div>

                <div id="mTable" className="d-block d-sm-none">
                    {MobileTable(init.items,"FileTable-")}
                </div>
                {pictureModel()}
            </>
        )
    }
 

    function DesktopTable(content,pkey){
        var styleNum = 2
        var hover = true
        var striped = true
        var bordered = true
        var tableHeadStyle = {}
        var tableDataStyle = [{},{}]
        var tableKey = ['fileName','type', 'extension','URL','Action']
        return(
            <Table key={pkey + "desktop-table"} hover={hover} striped={striped} bordered={bordered}>
                <thead key={pkey + "desktop-table-head"}>
                    {tableHead(tableHeadStyle,tableKey,pkey)}
                </thead>
                <tbody key={pkey + "desktop-table-body"}>
                    {content.map((e,index) => tableData(tableDataStyle[index%styleNum],e,index,pkey))}
                </tbody>
              
            </Table>
        )
        function tableHead(style,headkey, keyPass){
            return(
                <tr style={style} key={keyPass + "-table-head-tr"}>
                    {headkey.map((e,index )=> <th key={keyPass + "-table-head-th-"+index}> {e} </th>)}
                </tr>
            )
        }
        function tableData(style,data,index,keyPass){
           
            return(
                <tr style={style} key={keyPass + "-table-data-"+index+"-tr"}>
                   <td key={keyPass + "-table-data-"+index+"-td-"+1}> {data['fileName']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+2}> {data['type']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+3}> {data['extension']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+9}> {data['url']} </td>
                 
                   <td key={keyPass + "-table-data-"+index+"-td-"+6}> 
                        <Button onClick={()=>showPic(data['fileName'],data['url'])}>Preview</Button>
                    </td>
                   
                  
                </tr>
            )
        }
    }

    function MobileTable(table,pkey){
        var styleNum = 2;
        var tableKey = ['fileName','type', 'extension','URL','Action']
        
        var tableDataStyle = [{"backgroundColor":"gray","color":"black"},{"backgroundColor":"white","color":"black"}]
        return(
            <>
                {table.map((e,index)=> 
                MobileTableRow(tableDataStyle[index%styleNum],tableKey,e,index, pkey))}
            </>
        )
        function MobileTableRow(style,head,data,index, keyPass){
        return(
            <Row style={style} key={keyPass+"-Mobile-table-main-data-row-"+index}>
                
                <Col key={keyPass+"-Mobile-table-data-row-"+index+"-subrow--col-key"}>
                    {head.map((e,i)=> <span key={keyPass+"-data-row-"+index+"-subrow-key-"+i}>{e}<br></br></span> )}
                </Col>
                <Col key={keyPass+"-Mobile-table-data-row-"+index+"-subrow-col-value"}>
                  
                    <span key={keyPass + "-table-data-"+index+"-td-"+1}> {data['fileName']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+2}> {data['type']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+3}> {data['extension']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+9}> {data['url']} <br></br></span>
           
                    <span key={keyPass + "-table-data-"+index+"-td-"+6}>
                        <Button onClick={()=>showPic(data['fileName'],data['url'])}>Preview</Button> <br></br>
                    </span>
                   
                    
                </Col>
                   
            </Row>
        )
    }

    }

}

export default FileTable