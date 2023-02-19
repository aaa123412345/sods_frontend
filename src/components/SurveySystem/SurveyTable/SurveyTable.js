import React from "react";
import {Table,Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom"; 

import useSendRequest from "../../../hooks/useSendRequest";

const SurveyTable = (props) => {
    

    const {items,isLoaded,ready,error,redirection} = 
    useSendRequest(process.env.REACT_APP_SURVEY_SYSTEM_HOST+'/survey','get',{},true)
   
    if (error) {
        console.log("Error")
      } else if (isLoaded) {
        
      } else {
       
        if(ready) {
            return(
                <>
                    <div className="d-none d-sm-block">
                    {DesktopTable(items,"surveymanager-")}
                    </div>

                    <div id="mTable" className="d-block d-sm-none">
                        {MobileTable(items,"surveymanager-")}
                    </div>
                </>
            )
        }
    }
    
    function DesktopTable(content,pkey){
        var styleNum = 2
        var hover = true
        var striped = true
        var bordered = true
        var tableHeadStyle = {}
        var tableDataStyle = [{},{}]
        var tableKey = ['Survey ID','Survey Title','Survey Type', 'Create Time', 'Create User ID', 'Modify Time', 'Modify User ID', 'Action 1', 'Action 2']
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
                    <td key={keyPass + "-table-data-"+index+"-td-"+1}> {data['surveyId']} </td>
                    <td key={keyPass + "-table-data-"+index+"-td-"+2}> {data['surveyTitle']} </td>
                    <td key={keyPass + "-table-data-"+index+"-td-"+9}> {data['surveyType']} </td>
                    <td key={keyPass + "-table-data-"+index+"-td-"+3}> {data['createTime']} </td>
                    <td key={keyPass + "-table-data-"+index+"-td-"+4}> {data['createUserId']} </td>
                    <td key={keyPass + "-table-data-"+index+"-td-"+5}> {data['updateTime']} </td>
                    <td key={keyPass + "-table-data-"+index+"-td-"+6}> {data['updateUserId']} </td>
                    <td key={keyPass + "-table-data-"+index+"-td-"+7}>
                        <Link to={'/server/eng/surveyeditor?surveyID='+data['surveyId']}> Edit </Link>
                    </td>
                    <td key={keyPass + "-table-data-"+index+"-td-"+8}>
                        <Link to={'/server/eng/active_survey?surveyID='+data['surveyId']}> Active </Link>
                    </td>
                </tr>
            )
        }
    }

    function MobileTable(table,pkey){
        var styleNum = 2;
        var tableKey = ['Survey ID','Survey Title','Survey Type', 'Create Time', 'Create User ID', 'Modify Time', 'Modify User ID', 'Action 1', 'Action 2']
        
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
                  
                    <span key={keyPass + "-table-data-"+index+"-td-"+1}> {data['surveyId']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+2}> {data['surveyTitle']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+9}> {data['surveyType']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+3}> {data['createTime']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+4}> {data['createUserId']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+5}> {data['updateTime']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+6}> {data['updateUserId']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+7}> 
                        <Link to={'/server/eng/surveyeditor?surveyID='+data['surveyId']}> Edit</Link><br></br>
                    </span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+8}> 
                        <Link to={'/server/eng/active_survey?surveyID='+data['surveyId']}> Active </Link><br></br>
                    </span>
                    
                </Col>
                   
            </Row>
        )
    }

    }


}
export default SurveyTable;