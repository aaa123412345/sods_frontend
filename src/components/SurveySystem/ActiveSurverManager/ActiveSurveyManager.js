import React,{useEffect, useState} from "react";
import {Table,Row,Col} from 'react-bootstrap';
import { Link } from "react-router-dom"; 

//import user context and related component
import {UserContext} from '../../../App'
import { useContext } from "react";
import axios from 'axios';
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";


const ActiveSurveyManager = (props) => {
    
    //user information
    const {user,clearLoginState} = useContext(UserContext)
    const [ready,setReady] = useState(false);
    const [surveydata, setSurveyData] = useState({});

    const getAllSurvey = async() =>{
       
        try{
            const { data } = await axios({
              method: 'get',
              url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+'/active_survey',
              headers:{
                'token':user.token
              }
             
            
            })
           
            var rest = jsonExtractor(data);
            //console.log(rest)
            
            if(rest.response === "success"){
              console.log(rest.data)
              setSurveyData(rest.data)
              setReady(true)
              
            }else if (rest.response === "undefineerror"){
              console.log("The authentication server is down")
              alert("The service is not avaliable. Please try to login later")
              clearLoginState()
            }else{
              console.log(rest)
              alert("Get data fail")
              clearLoginState()
            }
          }catch (error){
           
            alert("The survey uploading service is not avaliable at this moment")
            clearLoginState()
          }
    }

   

    useEffect(()=>{getAllSurvey()},[])

    if(ready){
        return(
            <>
                <div className="d-none d-sm-block">
                   {DesktopTable(surveydata,"surveymanager-")}
                </div>

                <div id="mTable" className="d-block d-sm-none">
                    {MobileTable(surveydata,"surveymanager-")}
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
        var tableKey = ['Active Survey ID', 'Information', 'Start Time', 'End Time', 'Action', 'Action']
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
                   <td key={keyPass + "-table-data-"+index+"-td-"+1}> {data['activeSurveyId']} </td>
                   
                   <td key={keyPass + "-table-data-"+index+"-td-"+3}> {data['information']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+4}> {data['startTime']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+5}> {data['endTime']} </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+6}> 
                   <Link to={'/server/eng/active_survey?activeSurveyID='+data['activeSurveyId']}> Edit</Link>
                    </td>
                   <td key={keyPass + "-table-data-"+index+"-td-"+7}>
                    <Link to={'/server/eng/surveyeditor?surveyID='+data['surveyId']}> Delete</Link>
                    </td>
                </tr>
            )
        }
    }

    function MobileTable(table,pkey){
        var styleNum = 2;
        var tableKey = ['Active Survey ID', 'Information', 'Start Time', 'End Time', 'Action', 'Action']
        
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
                    
                    <span key={keyPass + "-table-data-"+index+"-td-"+3}> {data['information']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+4}> {data['startTime']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+5}> {data['endTime']} <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+6}>
                        <Link to={'/server/eng/active_survey?activeSurveyID='+data['activeSurveyId']}> Edit</Link> <br></br></span>
                    <span key={keyPass + "-table-data-"+index+"-td-"+7}> 
                        <Link to={'/server/eng/surveyeditor?surveyID='+data['surveyId']}> Delete</Link><br></br>
                    </span>
                </Col>
                   
            </Row>
        )
    }

    }


}
export default ActiveSurveyManager;