import { useEffect, useState } from "react";
import useSendRequest from "../../../hooks/useSendRequest";
import cloneDeep from 'lodash/cloneDeep'
import NavigationTree from "./NavigationTree";
import NavigationConfigPanel from "./NavigationConfigPanel";
import { Button, Col, Row} from "react-bootstrap";


const NavigationEditor = props => {
   
    const host = process.env.REACT_APP_PAGE_IMPORTANT_ELEMENT_REST_HOST

    const [navDataState,setNavDataState] = useState({
        active:false,
        lang:'eng',
        domain:'public',
        backup:false
        
    });
    const navDataHook = useSendRequest(navDataHookPathBuilder(),'get',{},navDataState.active,false)
    
    const [updateNavDataState, setUpdateNavDataState] = useState({
        active:false,
    })
    const updateNavDataHook = useSendRequest(host+navDataState.lang+'/'+navDataState.domain+"navdata",'post',
    navData,updateNavDataState.active,false)

    const [navData, setNavData] = useState({})
    const [configNodeData , setConfigNodeData] = useState({
        index:-1,
        sindex:-1
    })

    const [pageReady,setPageReady] = useState(true)
    const [inEdit,setInEdit] = useState(false)
    const [update,setUpdate] = useState(false)

    function changeNavDataState(event,target){
        var tmp = navDataState
        tmp[target] = event.target.value
        setNavDataState(tmp)
    }

    function startNew(){
        setNavData({...navData,navdata:[]})
        setInEdit(true)
    }

    function navDataHookPathBuilder(){
        if(navDataState.backup){
            return host+navDataState.lang+'/'+navDataState.domain+"navdata_backup"
        }else{
            return host+navDataState.lang+'/'+navDataState.domain+"navdata"
        }
        

    }

    function getExist(withBackup){
        setNavDataState({
            ...navDataState,
            active:true,
            backup:withBackup
        })
        

    
    }

    function Unfreeze(){
        setInEdit(false)
        setNavData({...navData,navdata:[]})
    }

    const parentNodeTemplate = {
        path:'',
        auth:'',
        navName:'Parent Template',
        child:[]
    }

    const childNodeTemplate = {
        path:'',
        auth:'',
        navName:'Child Template'
    }

    function setNode(index,subindex,newData){
        var tmp = navData
        

        //no child
        if(subindex<0){
            tmp.navdata[index] = newData;
            console.log(tmp.navdata[index])
            console.log(newData)
            setNavData(tmp);
        }else{
            
            tmp.navdata[index].child[subindex] = newData;
            console.log(tmp)
            setNavData(tmp);
        }
        

        setUpdate(true)
    }

    function configNode(index,subindex){
       
        setConfigNodeData({
            ...configNodeData,
            index:index,
            sindex:subindex
        })
       
    }

    function addNode(index){
        var tmp = navData
        if(index === -1){
            //Add Parent
            tmp.navdata.push(parentNodeTemplate)
            setNavData(tmp)
            setUpdate(true)
        }else{
            //Add child
            tmp.navdata[index].child.push(childNodeTemplate)
            setNavData(tmp)
            setUpdate(true)
        }
    }

    function removeNode(index,subindex){
        var tmp = navData
        if(subindex=== -1){
            //parent mode
            tmp.navdata.splice(index, 1);
            setNavData(tmp)
            setUpdate(true)

        }else{
            //child mode
            tmp.navdata[index].child.splice(subindex, 1);
            setNavData(tmp)
            setUpdate(true)
        }
    }

    useEffect(()=>{
        if(update){
            setUpdate(false)
        }
    },[update])



    useEffect(()=>{
        if(!navDataHook.isLoaded&&navDataState.active){
            if(navDataHook.ready){
                setNavDataState({
                    ...navDataState,
                    active:false
                })
                setInEdit(true)
                setNavData(cloneDeep(navDataHook.items))
               
                setPageReady(true)
                console.log(navDataHook.items)
            }else if(navDataHook.errMsg!==""){
                alert(navDataHook.errMsg)
                setInEdit(false)
                setNavDataState({
                    ...navDataState,
                    active:false
                })
            }
        }
    },[navDataHook])

    if(pageReady){
        return(
        <>
        <Row className="mb-3 mt-3">
            <Col>
                {"Domain: "} 
                <select disabled={inEdit} onChange={(e)=>{changeNavDataState(e,'domain')}}>
                    <option value="public">Public</option>
                    <option value="server">Server</option>
                </select>
            </Col>
            <Col>
                {"Language: "} 
                <select disabled={inEdit} onChange={(e)=>{changeNavDataState(e,'lang')}}>
                    <option value="eng">English</option>
                    <option value="chi">Chinese</option>
                    
                </select>
            </Col>
            <Col>
                {!inEdit? 
                <>
                <Button style={{marginRight:"5px"}} onClick={()=>{getExist(false)}}>Get Exist</Button>
                <Button style={{marginRight:"5px"}} onClick={()=>{getExist(true)}}>Get Backup</Button>
                <Button onClick={startNew}>Start New</Button>
                </>
                : 
                <>
                 <Button style={{marginRight:"5px"}}>Upload</Button>
                 <Button style={{marginRight:"5px"}} onClick={()=>{getExist(navDataState.backup)}}>Recover</Button>
                 <Button style={{marginRight:"5px"}} onClick={Unfreeze}>Unfreeze</Button>
                
                </>}
                
            </Col>
        </Row>
        {inEdit?
        <Row>
            <Col style={{paddingLeft:"15px"}}>
                <NavigationTree data={cloneDeep(navData)} configNodeData={configNodeData} 
                configNode={configNode} addNode={addNode} removeNode={removeNode}></NavigationTree>
            </Col>
            <Col style={{paddingLeft:"15px"}}>
                <NavigationConfigPanel data={cloneDeep(navData)} configNodeData={configNodeData} setNode={setNode}/>
            </Col>
        </Row>
        :''}
            
        </>
        )
    }

}

export default NavigationEditor;