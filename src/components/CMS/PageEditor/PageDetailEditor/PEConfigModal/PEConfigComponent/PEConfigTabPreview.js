import { Tab,Row,Col } from "react-bootstrap"
import ElementBuilder from "../../../../../PageBuilder/ElementBuilder/ElementBuilder"

const PEConfigTabPreview = ({editData,command}) =>{
    return(
        <Tab eventKey="preview" title="Preview">
                <Row>
                  <Col>
                    {ElementBuilder({data:editData,path:"path",subpath:"subpath",lang:"lang"})}
                  </Col>
                </Row>
        </Tab>
    )
}

export default PEConfigTabPreview