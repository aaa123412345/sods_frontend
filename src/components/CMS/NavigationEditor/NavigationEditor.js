import { useEffect, useState } from "react";
import useSendRequest from "../../../hooks/useSendRequest";
import cloneDeep from 'lodash/cloneDeep'
import NavigationTree from "./NavigationTree";
import { Col, Row } from "react-bootstrap";

const NavigationEditor = props => {
    const lang = props.lang
    const host = process.env.REACT_APP_PAGE_IMPORTANT_ELEMENT_REST_HOST
    const pathname = "publicnavdata"

    const [navDataState,setNavDataState] = useState(true);
    const navDataHook = useSendRequest(host+lang+'/'+pathname,'get',{},navDataState,false)
    
    const [navData, setNavData] = useState([])

    const [pageReady,setPageReady] = useState(true)

    const parentNodeTemplate = {
        path:'',
        auth:'',
        navName:'',
        child:[]
    }

    const childNodeTemplate = {
        path:'',
        auth:'',
        navName:''
    }

    function setNode(index,subindex,newData){
        var tmp = navData

        //no child
        if(subindex<0){
            tmp[index] = newData;
            setNavData(tmp);
        }else{
            var tmp1 = tmp[index]
            tmp1.child[subindex] = newData;
            setNavData(tmp);
        }
    }

    useEffect(()=>{
        if(!navDataHook.isLoaded&&navDataState){
            if(navDataHook.ready){
                setNavDataState(false)
                setNavData(cloneDeep(navDataHook.items))
                setPageReady(true)
                console.log(navDataHook.items)
            }else if(navDataHook.errMsg!==""){
                alert(navDataHook.errMsg)
            }
        }
    },[navDataHook])

    if(pageReady){
        return(
        <>
        <Row>
            <Col style={{paddingLeft:"15px"}}>
                <NavigationTree data={cloneDeep(navData)}></NavigationTree>
            </Col>
            <Col style={{paddingLeft:"15px"}}>
               
            </Col>
        </Row>    
        </>
        )
    }

}

export default NavigationEditor;