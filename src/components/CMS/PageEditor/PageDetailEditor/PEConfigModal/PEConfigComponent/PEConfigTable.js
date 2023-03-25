import { Tab,Row,Col,Tabs,Table, Button } from "react-bootstrap"
import PEConfigTabBasic from "./PEConfigTabBasic"
import PEConfigTabPreview from "./PEConfigTabPreview"
import cloneDeep from "lodash.clonedeep"

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

    function setHeadColor(key,value){
        
        var temp = cloneDeep(editData.content.tableStyle)
        temp.head[key] = value
        command.setEditDataWithSubkeyInChild("content","tableStyle",temp)
        
    }

    function setBodyColorWithIndex(key,value,index){
        var temp = cloneDeep(editData.content.tableStyle)
        temp.data[index][key] = value
        command.setEditDataWithSubkeyInChild("content","tableStyle",temp)
    }

    function removeStyle(index){
        var temp = cloneDeep(editData.content.tableStyle)
        temp.data.splice(index,1)
        temp.dataStyleNum = temp.dataStyleNum-1
        command.setEditDataWithSubkeyInChild("content","tableStyle",temp)
    }
    function addStyle(){
        var temp = cloneDeep(editData.content.tableStyle)
        temp.dataStyleNum = temp.dataStyleNum+1
        temp.data.push({color:"#000000",backgroundColor:"#ffffff"})
        command.setEditDataWithSubkeyInChild("content","tableStyle",temp)
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
                                <h1>{"Head Style:"}</h1>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Background Color</th>
                                            <th>Font Color</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type={"color"} value={editData.content.tableStyle.head.backgroundColor} onChange={(e)=>setHeadColor("backgroundColor",e.target.value)}></input></td>
                                            <td><input type={"color"} value={editData.content.tableStyle.head.color} onChange={(e)=>setHeadColor("color",e.target.value)}></input></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <h1>{"Body Style: (Total:"+editData.content.tableStyle.dataStyleNum+")"}</h1>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Background Color</th>
                                            <th>Font Color</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {editData.content.tableStyle.data.map((key,index)=>{
                                                return(
                                                    
                                                    <tr key={"tableStyle-body-"+index+"-tr"}>
                                                        <td key={"tableStyle-body-"+index+"-td-bgc"}><input type={"color"} key={"tableStyle-body-"+index+"-BGC"} value={key.backgroundColor} onChange={(e)=>setBodyColorWithIndex("backgroundColor",e.target.value,index)}></input></td>
                                                        <td key={"tableStyle-body-"+index+"-td-fc"}><input type={"color"} key={"tableStyle-body-"+index+"-FC"} value={key.color} onChange={(e)=>setBodyColorWithIndex("color",e.target.value,index)}></input></td>
                                                        <td key={"tableStyle-body-"+index+"-td-rm"}><Button key={"tableStyle-body-"+index+"-RM"} onClick={()=>removeStyle(index)}>-</Button></td>
                                                    </tr>
                                                    
                                                )
                                            })}
                                    </tbody>
                                </Table>
                                <Button onClick={()=>addStyle()}>+</Button>
                               
                            </Col>
                        </Row>
                    </Tab>
                    {PEConfigTabPreview({editData:editData,command:command})}

                </Tabs>
            
                </>
    )
    
}

export default PEConfigTable