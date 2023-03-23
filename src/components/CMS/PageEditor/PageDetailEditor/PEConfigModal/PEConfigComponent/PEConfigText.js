import { Tab,Row,Col,Tabs } from "react-bootstrap"
import PEConfigTabBasic from "./PEConfigTabBasic"
import PEConfigTabPreview from "./PEConfigTabPreview"
import { CompactPicker } from 'react-color';

const PEConfigText = ({editData,command}) => {
    
    
    return(
                <>
                <Tabs defaultActiveKey="basic" id="uncontrolled-tab-1">
                    {PEConfigTabBasic({editData:editData,command:command})}
                    <Tab eventKey="detail" title="Detail">
                        <Row>
                            <Col>
                                <h1 style={{fontSize:"2vw"}}>{"Content: "}</h1>
                                <textarea  rows="4" cols="75" value={editData.content} style={{border:'solid black 1px'}}
                                    onChange={(e)=>command.setEditDataInChild("content",e.target.value)}>
                                </textarea>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="style" title="Style">
                        <Row>
                            <Col>
                                <h1 style={{fontSize:"1.5vw"}}>{"Color: "}</h1>
                                <CompactPicker color={editData.style.color} 
                                onChangeComplete={(color)=>command.setStyleData("color",color.hex)}/>
                                <h1 style={{fontSize:"1.5vw"}}>{"Font Size: "}</h1>
                                <input type="text" value={editData.style.fontSize} style={{border:'solid black 1px'}}
                                    onChange={(e)=>command.setStyleData("fontSize",e.target.value)}>
                                </input>
                                <h1 style={{fontSize:"1.5vw"}}>{"Font Style: "}</h1>
                                <input type="checkbox" checked={editData.style.fontWeight === "bold"?true:false}
                                onChange={(e)=>command.setStyleData("fontWeight",e.target.checked?"bold":"normal")}
                                style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Bold "}
                                <input type="checkbox" checked={editData.style.fontstyle === "italic"?true:false}
                                onChange={(e)=>command.setStyleData("fontstyle",e.target.checked?"italic":"normal")}
                                style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Italic "}
                                <input type="checkbox" checked={editData.style.textDecorationLine === "underline"?true:false}
                                onChange={(e)=>command.setStyleData("textDecorationLine",e.target.checked?"underline":"none")} 
                                style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Underline "}
                               
                                
                            </Col>
                        </Row>
                    </Tab>
                    {PEConfigTabPreview({editData:editData,command:command})}

                </Tabs>
            
                </>
    )
    
}

export default PEConfigText