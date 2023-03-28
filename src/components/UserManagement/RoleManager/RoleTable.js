import React from "react"

import { Table, Row, Col,Button } from "react-bootstrap"
const RoleTable = ({data,removeRole}) => {
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
        var tableKey = ['ID','Name', 'Permission Length','Action']
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
                   <td key={keyPass + "-table-data-"+index+"-td-"+1}> {data.roles['roleId']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+2}> {data.roles['name']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+3}> {data.permissions.length} </td>
                    <td key={keyPass + "-table-data-"+index+"-td-"+4}>
                        <Button onClick={()=>removeRole(data.roles.roleId,data.roles['name'])}>Remove</Button>
                    </td>
    
                </tr>
            )
        }
    }

    function MobileTable(table,pkey){
        var styleNum = 2;
        var tableKey = ['ID','Name', 'Permission Length']
        
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
                  
                    <span key={keyPass + "-table-data-"+index+"-td-"+1}> {data.roles['roleId']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+2}> {data.roles['name']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+3}> {data.permissions.length} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+4}>
                        <Button onClick={()=>removeRole(data.roles['roleId'],data.roles['name'])}>Remove</Button>
                    </span>

           
                   
                   
                    
                </Col>
                   
            </Row>
        )
    }

    }
}

export default RoleTable;