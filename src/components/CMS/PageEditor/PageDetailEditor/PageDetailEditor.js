import PECardDisplayer from "./PECard/PECardDisplayer";
import { Row,Col } from "react-bootstrap";

const PageDetailEditor = ({items,command}) =>{
    console.log(items)
    

    return(
        <Row>
            <Col>
                <PECardDisplayer items={items} command={command}/>
            </Col>
            
        </Row>
        
    )
}

export default PageDetailEditor;