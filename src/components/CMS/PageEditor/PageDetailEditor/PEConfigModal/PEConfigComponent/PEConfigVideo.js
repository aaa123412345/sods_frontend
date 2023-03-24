import { Tab,Row,Col,Tabs,Tooltip,OverlayTrigger } from "react-bootstrap"
import PEConfigTabBasic from "./PEConfigTabBasic"
import PEConfigTabPreview from "./PEConfigTabPreview"

const PEConfigVideo = ({editData,command}) => {
    
    return(
                <>
                <Tabs defaultActiveKey="basic" id="uncontrolled-tab-1">
                    {PEConfigTabBasic({editData:editData,command:command})}
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
                                <h1 style={{fontSize:"1.5vw"}}>{"Video Config: "}</h1>
                                <input type="checkbox" checked={editData.autoplay}
                                onChange={(e)=>command.setEditDataInChild("autoplay",e.target.checked)} 
                                style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Autoplay "}

                                <input type="checkbox" checked={editData.controls}
                                onChange={(e)=>command.setEditDataInChild("controls",e.target.checked)}
                                style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Controls "}
                                <input type="checkbox" checked={editData.loop}
                                onChange={(e)=>command.setEditDataInChild("loop",e.target.checked)}
                                style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Loop "}
                                <input type="checkbox" checked={editData.muted}
                                onChange={(e)=>command.setEditDataInChild("muted",e.target.checked)}
                                style={{paddingLeft:"10px",paddingRight:"10px"}}></input> {"Muted "}

                               
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="style" title="Style">
                        <Row>
                            <Col>
                            <h1 style={{fontSize:"1.5vw"}}>{"Width: "}</h1>
                                <input type="text" value={editData.style.width} style={{border:'solid black 1px'}}
                                    onChange={(e)=>command.setStyleData("width",e.target.value)}>
                                </input>
                            </Col>
                        </Row>
                    </Tab>
                    {PEConfigTabPreview({editData:editData,command:command})}

                </Tabs>
            
                </>
    )
    
}

export default PEConfigVideo