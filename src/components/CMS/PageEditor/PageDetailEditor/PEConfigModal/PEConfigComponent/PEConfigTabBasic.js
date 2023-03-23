import { Tab,Row,Col,Table } from "react-bootstrap"

const PEConfigTabBasic = ({editData,command}) =>{
    return(
        <Tab eventKey="basic" title="Basic">
                <Row>
                    <Col>
                       
                        <h1 style={{fontSize:"2vw"}}>{"Bootstrap: (MAX:12)"}</h1>
                    
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>xs</th>
                                    <th>sm</th>
                                    <th>md</th>
                                    <th>lg</th>
                                    <th>xl</th>
                                    <th>xxl</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="number" value={editData.bootstrap.xs} 
                                        style={{maxWidth:"50px"}} onChange={(e)=>command.setBootstrapData("xs",e.target.value)}></input>
                                    </td>
                                    <td>
                                        <input type="number" value={editData.bootstrap.sm}
                                        style={{maxWidth:"50px"}} onChange={(e)=>command.setBootstrapData("sm",e.target.value)}></input>
                                    </td>
                                    <td>
                                        <input type="number" value={editData.bootstrap.md}
                                        style={{maxWidth:"50px"}} onChange={(e)=>command.setBootstrapData("md",e.target.value)}></input>
                                    </td>
                                    <td>
                                        <input type="number" value={editData.bootstrap.lg}
                                        style={{maxWidth:"50px"}} onChange={(e)=>command.setBootstrapData("lg",e.target.value)}></input>
                                    </td>
                                    <td>
                                        <input type="number" value={editData.bootstrap.xl}
                                        style={{maxWidth:"50px"}} onChange={(e)=>command.setBootstrapData("xl",e.target.value)}></input>
                                    </td>
                                    <td>
                                        <input type="number" value={editData.bootstrap.xxl}
                                        style={{maxWidth:"50px"}} onChange={(e)=>command.setBootstrapData("xxl",e.target.value)}></input>
                                    </td>

                                
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    
                </Row>
        </Tab>
    )
}

export default PEConfigTabBasic