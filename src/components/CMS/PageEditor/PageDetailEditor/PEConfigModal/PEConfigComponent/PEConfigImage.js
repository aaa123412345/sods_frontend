import { Tab,Row,Col,Tabs } from "react-bootstrap"
import PEConfigTabBasic from "./PEConfigTabBasic"
import PEConfigTabPreview from "./PEConfigTabPreview"

const PEConfigImage = ({editData,command}) => {
    
    return(
                <>
                <Tabs defaultActiveKey="basic" id="uncontrolled-tab-1">
                    {PEConfigTabBasic({editData:editData,command:command})}
                    <Tab eventKey="detail" title="Detail">
                        <Row>
                            <Col></Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="style" title="Style">
                        <Row>
                            <Col></Col>
                        </Row>
                    </Tab>
                    {PEConfigTabPreview({editData:editData,command:command})}

                </Tabs>
            
                </>
    )
    
}

export default PEConfigImage