import React from "react";
import {Table,Row,Col} from 'react-bootstrap';

const CResposiveTable = (props) => {
    const evenStyle={
        'backgroundColor':'white'
    }

    const oddStyle={
        'backgroundColor':'gray'
    }

    console.log(props.block)
    return(
        <>
            <div className="d-none d-sm-block">
                CResposiveTable
            </div>

            <div id="mTable" className="d-block d-sm-none">
                {MobileTable(props.block.table)}
            </div>
        </>
    )

    function MobileTable(table){
        
        return(
            <>
                {table.data.map((e,index)=> index%2===0? 
                MobileTableRow(evenStyle,table.head,e,index):MobileTableRow(oddStyle,table.head,e,index))}
            </>
        )
    }

    

    function MobileTableRow(style,head,dataRow,index){
        return(
            <Row style={style} key={"Mobile-table-main-data-row-"+index}>
                
                <Col key={"Mobile-table-data-row-"+index+"-subrow--col-key"}>
                    {head.map((e,i)=> <span key={"data-row-"+index+"-subrow-key-"+i}>{e}<br></br></span> )}
                </Col>
                <Col key={"Mobile-table-data-row-"+index+"-subrow-col-value"}>
                    {head.map((e,i)=> <span key={"data-row-"+index+"-subrow-value-"+i}>{dataRow[e]}<br></br></span> )}
                </Col>
                   
            </Row>
        )
    }

    
}

export default CResposiveTable;


