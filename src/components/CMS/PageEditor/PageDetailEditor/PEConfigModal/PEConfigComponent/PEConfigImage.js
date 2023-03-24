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
                               


                            </Col>
                        </Row>
                    </Tab>
                    
                    {PEConfigTabPreview({editData:editData,command:command})}

                </Tabs>
            
                </>
    )
    
}

export default PEConfigImage