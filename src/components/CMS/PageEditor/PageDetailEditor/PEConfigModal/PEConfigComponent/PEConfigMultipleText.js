import { Tab,Row,Col,Tabs, Button } from "react-bootstrap"
import PEConfigTabBasic from "./PEConfigTabBasic"
import PEConfigTabPreview from "./PEConfigTabPreview"
import { CompactPicker } from 'react-color';
import cloneDeep from "lodash.clonedeep"
import { useEffect,useState } from "react";

const PEConfigMultipleText = ({editData,command}) => {
    const [update,setUpdate] = useState(false)
    useEffect(()=>{
        if(update){
            setUpdate(false)
        }
    },[update])


    function setContentWithIndex(index,value){
        var temp = cloneDeep(editData.content)
        temp[index] = value
        command.setEditDataInChild("content",temp)
    }
    function setStyleDataWithIndex(key,value,index){
        var temp = cloneDeep(editData.elementstyle)
        temp[index][key] = value
        command.setEditDataInChild("elementstyle",temp)
    }

    function addContent(){
        var temp = cloneDeep(editData)
        temp.content.push("")
        temp.elementstyle.push({})
        temp.textNum = temp.textNum+1
        command.setEditDataDirectily(temp)
        setUpdate(true)
    }

    function removeContent(index){
        var temp = cloneDeep(editData)
        temp.content.splice(index,1)
        temp.elementstyle.splice(index,1)
        temp.textNum = temp.textNum-1
        command.setEditDataDirectily(temp)
        setUpdate(true)
    }

    return(
                <>
                <Tabs defaultActiveKey="basic" id="uncontrolled-tab-1">
                    {PEConfigTabBasic({editData:editData,command:command})}
                    <Tab eventKey="detail" title="Detail">
                        <Row>
                            <Col>
                                <h1 style={{fontSize:"2vw"}}>{"Content: (Current:"+editData.textNum+")"}</h1>
                                <Button onClick={()=>addContent()}>+</Button>
                               
                            </Col>
                        </Row>
                    </Tab>
                    {editData.content.map((value,index)=>{
                        return(
                            <Tab eventKey={"content-"+index} title={"Content "+(index+1)} key={"content-"+index+"tab"}>
                                <Row key={"content-"+index+"row"}>
                                    <Col key={"content-"+index+"col"}>
                                        <h1 style={{fontSize:"2vw"}}>{"Content: "}</h1>
                                        <textarea  rows="4" cols="75" value={editData.content[index]} style={{border:'solid black 1px'}}
                                            onChange={(e)=>setContentWithIndex(index,e.target.value)}>
                                        </textarea>
                                        <h1 style={{fontSize:"1.5vw"}}>{"Color: "}</h1>
                                        <CompactPicker color={editData?.elementstyle[index]?.color} 
                                            onChangeComplete={(color)=>setStyleDataWithIndex("color",color.hex,index)}/>
                                        <h1 style={{fontSize:"1.5vw"}}>{"Font Size: "}</h1>
                                        <input type="text" value={editData?.elementstyle[index]?.fontSize} style={{border:'solid black 1px'}}
                                            onChange={(e)=>setStyleDataWithIndex("fontSize",e.target.value,index)}>
                                        </input>
                                        <h1 style={{fontSize:"1.5vw"}}>{"Font Style: "}</h1>
                                        <input type="checkbox" checked={editData?.elementstyle[index]?.fontWeight === "bold"?true:false}
                                            onChange={(e)=>setStyleDataWithIndex("fontWeight",e.target.checked?"bold":"normal",index)}
                                            style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Bold "}
                                        <input type="checkbox" checked={editData?.elementstyle[index]?.fontstyle === "italic"?true:false}
                                            onChange={(e)=>setStyleDataWithIndex("fontstyle",e.target.checked?"italic":"normal",index)}
                                            style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Italic "}
                                        <input type="checkbox" checked={editData?.elementstyle[index]?.textDecorationLine === "underline"?true:false}
                                            onChange={(e)=>setStyleDataWithIndex("textDecorationLine",e.target.checked?"underline":"none",index)} 
                                            style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Underline "}
                                            <br></br>
                                        <Button onClick={()=>removeContent(index)}>Delete this part</Button>

                                    </Col>
                                </Row>
                            </Tab>
                        )
                    })}
                    {PEConfigTabPreview({editData:editData,command:command})}

                </Tabs>
            
                </>
    )
    
}

export default PEConfigMultipleText