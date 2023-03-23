import { Card} from "react-bootstrap";
import PEConfigModal from "../PEConfigModal/PEConfigModal";



const PECardModel = ({data,command}) =>{
    
    return(
        <Card style={{ width: '100%' }}>
            <Card.Body>
                
                <PEConfigModal data={data} command={command}/>
                {"Type : "+data.type}
            </Card.Body>
        </Card>
    )
}

export default PECardModel;