import React from "react"
import { Table, Row, Col,Button } from "react-bootstrap"
const UserTable = ({data}) => {
    
    if(data?.length > 0){
        return(
            <>
                <div className="d-none d-sm-block">
                    {DesktopTable(data,"FileTable-")}
                </div>

                <div id="mTable" className="d-block d-sm-none">
                    {MobileTable(data,"FileTable-")}
                </div>
                
            </>
        )
    }

    function DesktopTable(content,pkey){
        var styleNum = 2
        var hover = true
        var striped = true
        var bordered = true
        var tableHeadStyle = {}
        var tableDataStyle = [{},{}]
        var tableKey = ['User ID','User Name', 'Create Time','Action']
        return(
            <Table key={pkey + "desktop-table"} hover={hover} striped={striped} bordered={bordered}>
                <thead key={pkey + "desktop-table-head"}>
                    {tableHead(tableHeadStyle,tableKey,pkey)}
                </thead>
                <tbody key={pkey + "desktop-table-body"}>
                    {content.map((e,index) => tableData(tableDataStyle[index%styleNum],e,index,pkey))}
                </tbody>
              
            </Table>
        )
        function tableHead(style,headkey, keyPass){
            return(
                <tr style={style} key={keyPass + "-table-head-tr"}>
                    {headkey.map((e,index )=> <th key={keyPass + "-table-head-th-"+index}> {e} </th>)}
                </tr>
            )
        }
        function tableData(style,data,index,keyPass){
           
            return(
                <tr style={style} key={keyPass + "-table-data-"+index+"-tr"}>
                   <td key={keyPass + "-table-data-"+index+"-td-"+1}> {data['userId']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+2}> {data['userName']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+3}> {data['createTime']} </td>
                  
                 
                   <td key={keyPass + "-table-data-"+index+"-td-"+6}> 

                    </td>
                   
                  
                </tr>
            )
        }
    }

    function MobileTable(table,pkey){
        var styleNum = 2;
        var tableKey = ['User ID','User Name', 'Create Time','Action']
        
        var tableDataStyle = [{"backgroundColor":"gray","color":"black"},{"backgroundColor":"white","color":"black"}]
        return(
            <>
                {table.map((e,index)=> 
                MobileTableRow(tableDataStyle[index%styleNum],tableKey,e,index, pkey))}
            </>
        )
        function MobileTableRow(style,head,data,index, keyPass){
        return(
            <Row style={style} key={keyPass+"-Mobile-table-main-data-row-"+index}>
                
                <Col key={keyPass+"-Mobile-table-data-row-"+index+"-subrow--col-key"}>
                    {head.map((e,i)=> <span key={keyPass+"-data-row-"+index+"-subrow-key-"+i}>{e}<br></br></span> )}
                </Col>
                <Col key={keyPass+"-Mobile-table-data-row-"+index+"-subrow-col-value"}>
                  
                    <span key={keyPass + "-table-data-"+index+"-td-"+1}> {data['userId']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+2}> {data['userName']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+3}> {data['createTime']} <br></br></span>
                    
           
                    <span key={keyPass + "-table-data-"+index+"-td-"+6}>
                        
                        <br></br>
                    </span>
                   
                    
                </Col>
                   
            </Row>
        )
    }

    }
}

export default UserTable;