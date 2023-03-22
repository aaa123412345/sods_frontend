import PECardDisplayer from "./PECard/PECardDisplayer";
import { Row,Col } from "react-bootstrap";

const PageDetailEditor = (data) =>{
    return(
        <Row>
            <Col>
                <PECardDisplayer/>
            </Col>
            
        </Row>
        
    )
}

export default PageDetailEditor;