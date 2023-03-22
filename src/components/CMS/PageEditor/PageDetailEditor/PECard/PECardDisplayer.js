import PECardModel from "./PECardModel";
import PECardModelForAdd from "./PECardModelForAdd";
import { Row,Col,Button } from "react-bootstrap";

const PECardDisplayer = () =>{
    return(
        <Row>
            <Col sm={1}>
                <Row>
                    <Col>
                        <PECardModelForAdd/>
                    </Col>
                </Row>
            </Col>
            <Col sm={10}>
                <Row>
                    <Col >
                        <PECardModel/>
                    </Col>
                    <Col >
                        <PECardModel/>
                    </Col>
                </Row>
            </Col>
            <Col sm={1}>
                <Row>
                    <Col>
                        <PECardModelForAdd/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PECardDisplayer;