import { Tab,Row,Col,Tabs,Tooltip,OverlayTrigger } from "react-bootstrap"
import PEConfigTabBasic from "./PEConfigTabBasic"
import PEConfigTabPreview from "./PEConfigTabPreview"
import FileTable from "../../../../FTP/FileTable"

const PEConfigImage = ({editData,command}) => {
    
    return(
                <>
                <Tabs defaultActiveKey="basic" id="uncontrolled-tab-1">
                    {PEConfigTabBasic({editData:editData,command:command})}
                    <Tab eventKey="picturePreview" title="picturePreview">
                        <Row>
                            <Col>
                                <FileTable/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="detail" title="Detail">
                        
                        <Row>
                            <Col>
                            <OverlayTrigger
                                key={"SRC-tip"}
                               
                                overlay={
                                    <Tooltip id={`tooltip-srctip`} >
                                        {"(Format: https://www.youtube.com/embed/{video code} or local file : /assets/video/{video name}"}
                                    </Tooltip>
                                }
                                >
                                <h1 style={{fontSize:"1.5vw"}}>{"src: "}</h1>
                                </OverlayTrigger>
                               
                                <input type="text" value={editData.src} style={{border:'solid black 1px'}}
                                    onChange={(e)=>command.setEditDataInChild("src",e.target.value)}>
                                </input>
                                <h1 style={{fontSize:"1.5vw"}}>{"alt: "}</h1>
                                <input type="text" value={editData.alt} style={{border:'solid black 1px'}}
                                    onChange={(e)=>command.setEditDataInChild("alt",e.target.value)}>
                                </input>
                                <h1 style={{fontSize:"1.5vw"}}>{"width: "}</h1>
                                <input type="text" value={editData.width} style={{border:'solid black 1px'}}
                                    onChange={(e)=>command.setStyleData("width",e.target.value)}>
                                </input>
                                <h1 style={{fontSize:"1.5vw"}}>{"height: "}</h1>
                                <input type="text" value={editData.height} style={{border:'solid black 1px'}}
                                    onChange={(e)=>command.setStyleData("height",e.target.value)}>
                                </input>
                                <h1 style={{fontSize:"1.5vw"}}>{"Picture Align: "}</h1>
                                <select value={editData.pictureAlign} onChange={(e)=>command.setStyleData("float",e.target.value)} style={{border:'solid black 1px'}}>
                                    <option value="left">Left</option>
                                    <option value="none">Center</option>
                                    <option value="right">Right</option>
                                </select>
                               


                            </Col>
                        </Row>
                    </Tab>
                    
                    {PEConfigTabPreview({editData:editData,command:command})}

                </Tabs>
            
                </>
    )
    
}

export default PEConfigImage