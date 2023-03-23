import { Card} from "react-bootstrap";
import PEConfigModal from "../PEConfigModal/PEConfigModal";



const PECardModel = ({data}) =>{
    
    return(
        <Card style={{ width: '100%' }}>
            <Card.Body>
                
                <PEConfigModal data={data}/>
                {"Type : "+data.type}
            </Card.Body>
        </Card>
    )
}

export default PECardModel;