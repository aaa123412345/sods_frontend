import { Tab,Row,Col,Tabs,Table, Button } from "react-bootstrap"
import PEConfigTabBasic from "./PEConfigTabBasic"
import PEConfigTabPreview from "./PEConfigTabPreview"

const PEConfigTable = ({editData,command}) => {

    function addRow(){
        let temp = editData.content.value
        var tmp ={}
        editData.content.key.forEach((key,index)=>{
            tmp[key] = ""
        })
        temp.push(tmp)
        command.setEditDataInChild("value",temp)
    }

    function addColoumn(){
        let temp = editData.content
        var tmpKey = temp.key.length+1
        temp.key.push(tmpKey.toString())
        temp.value.forEach((value)=>{
            value[tmpKey.toString()] = ""
        })
        command.setEditDataInChild("content",temp)
    }

    function setKey(index,value){
        let temp = editData.content.key
        temp[index] = value
        command.setEditDataInChild("key",temp)
    }

    function setValue(rowindex,keyindex,value){
        console.log(rowindex,keyindex,value)
        let temp = editData.content.value
        temp[rowindex][keyindex] = value
        command.setEditDataInChild("value",temp)
    }
    
    return(
                <>
                <Tabs defaultActiveKey="basic" id="uncontrolled-tab-1">
                    {PEConfigTabBasic({editData:editData,command:command})}
                    <Tab eventKey="detail" title="Table Detail">
                        <Row>
                            <Col>
                                <Button onClick={()=>addRow()}>Add Row</Button>
                                <Button onClick={()=>addColoumn()}>Add Coloumn</Button>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {editData.content.key.map((key,index)=>{
                                                return(
                                                    <th key={"head"+index}>
                                                        <input type={"text"} value={key} onChange={(e)=>setKey(index,e.target.value)}></input>
                                                        </th>
                                                )
                                            }
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {editData.content.value.map((value,index)=>{
                                            return(
                                                <tr key={"body-tr-"+index}>
                                                    {editData.content.key.map((key,sindex)=>{
                                                        return(
                                                            <td key={"body-td-"+index+"-"+sindex}>
                                                                <input type={"text"} value={value[key]}
                                                                onChange={(e)=>setValue(index,key,e.target.value)}></input>
                                                                </td>
                                                        )
                                                    })}
                                                   
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="style" title="Table Style">
                        <Row>
                            <Col>
                            </Col>
                        </Row>
                    </Tab>
                    {PEConfigTabPreview({editData:editData,command:command})}

                </Tabs>
            
                </>
    )
    
}

export default PEConfigTable