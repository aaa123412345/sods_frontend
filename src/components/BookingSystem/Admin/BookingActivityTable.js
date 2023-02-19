import React, { useEffect, useState } from "react"
import useSendRequest from "../../../hooks/useSendRequest"
import { Table, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const BookingActivityTable = () =>{

    const init = useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST+'all','get',{},true)
    const [ready,setReady] = useState(false);
    useEffect(()=>{
        if(!init.isLoaded && !ready){
            if(init.ready){
                setReady(true)
            }
        }
        
    },[init])
   
           
    if(ready){        
        console.log(init.items)
        return(
            <>
                <div className="d-none d-sm-block">
                    {DesktopTable(init.items,"BookingActivity-")}
                </div>

                <div id="mTable" className="d-block d-sm-none">
                    {MobileTable(init.items,"BookingActivity-")}
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
        var tableKey = ['Active Survey ID','Location', 'Information','Quote','Current Participant', 'Start Time', 'End Time', 'Action']
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
                   <td key={keyPass + "-table-data-"+index+"-td-"+1}> {data['bookingActivityId']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+2}> {data['location']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+3}> {data['information']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+9}> {data['maxQuote']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+10}> {data['currentNum']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+4}> {data['startTime']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+5}> {data['endTime']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+6}> 
                   <Link to={'/server/eng/booking_activity_editor?ActivityID='+data['bookingActivityId']}> Edit</Link>
                    </td>
                  
                </tr>
            )
        }
    }

    function MobileTable(table,pkey){
        var styleNum = 2;
        var tableKey = ['Active Survey ID','Location', 'Information','Quote','Current Participant', 'Start Time', 'End Time', 'Action', 'Action']
        
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
                  
                    <span key={keyPass + "-table-data-"+index+"-td-"+1}> {data['activeSurveyId']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+2}> {data['location']} </span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+3}> {data['information']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+9}> {data['maxQuote']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+10}> {data['currentNum']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+4}> {data['startTime']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+5}> {data['endTime']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+6}>
                        <Link to={'/server/eng/booking_activity_editor?ActivityID='+data['bookingActivityId']}> Edit</Link> <br></br>
                        </span>
                    
                </Col>
                   
            </Row>
        )
    }

    }

}

export default BookingActivityTable