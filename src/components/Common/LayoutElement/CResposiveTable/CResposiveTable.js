import React from "react";
import {Table,Row,Col} from 'react-bootstrap';

const CResposiveTable = (props) => {
    

    return(
        <>
            <div className="d-none d-sm-block">
                {DesktopTable(props.block.content,props.keyPass)}
            </div>

            <div id="mTable" className="d-block d-sm-none">
                {MobileTable(props.block.content,props.keyPass)}
            </div>
        </>
    )

    function DesktopTable(content,pkey){
        var styleNum = content.tableStyle.dataStyleNum
        var hover = content.tableStyle.whole.hover
        var striped = content.tableStyle.whole.striped
        var bordered = content.tableStyle.whole.bordered
        return(
            <Table key={pkey + "desktop-table"} hover={hover} striped={striped} bordered={bordered}>
                <thead key={pkey + "desktop-table-head"}>
                    {tableHead(content.tableStyle.head,content.key,pkey)}
                </thead>
                <tbody key={pkey + "desktop-table-body"}>
                    {content.value.map((e,index) => tableData(content.tableStyle.data[index%styleNum],e,index,content.key,pkey))}
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
        function tableData(style,data,index,headkey,  keyPass){
            
            return(
                <tr style={style} key={keyPass + "-table-data-"+index+"-tr"}>
                    {headkey.map((e,sindex) => <td key={keyPass + "-table-data-"+index+"-td-"+sindex}> {data[e]} </td>)}
                </tr>
            )
        }
    }

    function MobileTable(table,pkey){
        var styleNum = table.tableStyle.dataStyleNum;
        return(
            <>
                {table.value.map((e,index)=> 
                MobileTableRow(table.tableStyle.data[index%styleNum],table.key,e,index, pkey))}
            </>
        )
        function MobileTableRow(style,head,dataRow,index, keyPass){
        return(
            <Row style={style} key={keyPass+"-Mobile-table-main-data-row-"+index}>
                
                <Col key={keyPass+"-Mobile-table-data-row-"+index+"-subrow--col-key"}>
                    {head.map((e,i)=> <span key={keyPass+"-data-row-"+index+"-subrow-key-"+i}>{e}<br></br></span> )}
                </Col>
                <Col key={keyPass+"-Mobile-table-data-row-"+index+"-subrow-col-value"}>
                    {head.map((e,i)=> <span key={keyPass+"-data-row-"+index+"-subrow-value-"+i}>{dataRow[e]}<br></br></span> )}
                </Col>
                   
            </Row>
        )
    }

    }

    

    
    
}

export default CResposiveTable;


