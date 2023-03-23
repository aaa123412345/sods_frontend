import PECardDisplayer from "./PECard/PECardDisplayer";
import { Row,Col } from "react-bootstrap";

const PageDetailEditor = ({items,command}) =>{
    
    return(
        <Row>
            <Col>
                <PECardDisplayer items={items} command={command}/>
            </Col>
            
        </Row>
        
    )
}

export default PageDetailEditor;