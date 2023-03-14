import { useEffect, useState } from "react";
import useSendRequest from "../../../hooks/useSendRequest";
import cloneDeep from 'lodash/cloneDeep'
import NavigationTree from "./NavigationTree";
import NavigationConfigPanel from "./NavigationConfigPanel";
import { Button, Col, Row, Modal} from "react-bootstrap";


const NavigationEditor = props => {
   
    const host = process.env.REACT_APP_PAGE_IMPORTANT_ELEMENT_REST_HOST

    const [navDataState,setNavDataState] = useState({
        active:false,
        lang:'eng',
        domain:'public',
        backup:false
        
    });
    const navDataHook = useSendRequest(navDataHookPathBuilder(),'get',{},navDataState.active,false)
    
    const [navData, setNavData] = useState({})
    const [navDataBackup, setNavDataBackup] = useState({})

    const [updateNavDataState, setUpdateNavDataState] = useState({
        active:false,
        mode:'put'
    })
    const updateNavDataHook = useSendRequest(host+navDataState.lang+'/'+navDataState.domain+"navdata",updateNavDataState.mode,
    navData,updateNavDataState.active,false)

    const [checkHookData,setCheckHookData] = useState({
        active:false,
    })
    const checkHook = useSendRequest(host+'check/'+navDataState.lang+'/'+navDataState.domain+"navdata",'get',{},checkHookData.active,false)
   

    const [copyModelShow,setCopyModelShow] = useState(false)
    const [copyModelData,setCopyModelData] = useState({
        domain:'public',
        lang:'eng',
        autoConvert:false
    })

    const [simpleFormHookState,setSimpleFormHookState] = useState(true)
    const simpleFormHook = useSendRequest(process.env.REACT_APP_LANGUAGE_HOST+'/simpleform','get',{},simpleFormHookState,false,false)
    const [langData,setLangData] = useState([])

    const [configNodeData , setConfigNodeData] = useState({
        index:-1,
        sindex:-1
    })

    const [pageReady,setPageReady] = useState(true)
    const [inEdit,setInEdit] = useState(false)
    const [update,setUpdate] = useState(false)

    const borderStyle = {
        borderStyle:'solid',
        borderWidth:'1px',
        borderColor:'black',
    }

    function changeNavDataState(value,target){
        
        setNavDataState({
            ...navDataState,
            [target]:value
        })
    }

    function startNew(){
        setNavData({...navData,navdata:[]})
        setNavDataBackup({...navDataBackup,navdata:[]})
        setInEdit(true)
        setUpdateNavDataState({
            ...updateNavDataState,
        })
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
        setUpdateNavDataState({
            ...updateNavDataState,
        })
        

    
    }

    function Unfreeze(){
        window.location.reload();
    }

    function updateNavData(){
        if(!navDataState.backup){
            if(!dictIsSame(navData,navDataBackup)){
                
                /*
                setUpdateNavDataState({
                    ...updateNavDataState,
                    active:true
                })*/
                setCheckHookData({
                    ...checkHookData,
                    active:true
                })
                
            }else{
                alert("No Change")
            }
        }else{
            setCheckHookData({
                ...checkHookData,
                active:true
            })
            /*
            setUpdateNavDataState({
                ...updateNavDataState,
                active:true
            })*/

        }
    }

    function handlecopyModelShow(){
        setCopyModelShow(true)
    }

    function handlecopyModelClose(){
        setCopyModelShow(false)
    }

    function copyModel(){
        function copyModelOK(){
            
            if(copyModelData.autoConvert){
                autoConvert()
            }
            setNavDataState({
                ...navDataState,
                domain:copyModelData.domain,
                lang:copyModelData.lang

            })
            
            setCopyModelShow(false)
        }
        function autoConvert(){
            var tmp = cloneDeep(navData)
            tmp.navdata.forEach((node)=>{
                node.path = node.path.replace(navDataState.domain,copyModelData.domain)
                node.path = node.path.replace(navDataState.lang,copyModelData.lang)
                node.child.forEach((child)=>{
                    child.path = child.path.replace(navDataState.domain,copyModelData.domain)
                    child.path = child.path.replace(navDataState.lang,copyModelData.lang)
                })
            })
            setNavData(tmp)

        }
        
        return(
            <Modal show={copyModelShow} onHide={handlecopyModelClose}>
                <Modal.Header closeButton>
                <Modal.Title>Copy For:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Domain: {"   "}
                <select style={borderStyle} onChange={(e)=>{setCopyModelData(
                    {...copyModelData,
                    domain:e.target.value
                    }
                )}}>
                    <option value="public">Public</option>
                    <option value="server">Server</option>
                </select>
                <br/>
                Language: {"   "}
                <select style={borderStyle} onChange={(e)=>{setCopyModelData(
                    {...copyModelData,
                    lang:e.target.value
                    }
                )}}>
                     {langData.map((item,index)=>
                        <option key={"lang-slecet-copymodel-"+index} value={item} >{item}</option>
                    )}
                </select>
                <br></br>

                <input type="checkbox" id= "autoConvert" name="autoConvert" style={borderStyle}
                onChange={(e)=>{setCopyModelData(
                    {...copyModelData,
                    autoConvert:e.target.checked
                    }
                )}}/>
                <label htmlFor="autoConvert"> {"Auto Convert the path?"}</label>

                </Modal.Body>
                <Modal.Footer>
              
                <Button variant="primary" onClick={copyModelOK}>
                    Copy
                </Button>
                </Modal.Footer>
            </Modal>
        )
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
    //swap two node in array
    function swapNode(index,subindex,dir){
        var tmp = navData
        if(subindex=== -1){
            //parent mode
            if(dir === 'up'){
                if(index>0){
                    var tmpNode = tmp.navdata[index]
                    tmp.navdata[index] = tmp.navdata[index-1]
                    tmp.navdata[index-1] = tmpNode
                    setNavData(tmp)
                    setUpdate(true)
                }
            }else{
                if(index<tmp.navdata.length-1){
                    var tmpNode = tmp.navdata[index]
                    tmp.navdata[index] = tmp.navdata[index+1]
                    tmp.navdata[index+1] = tmpNode
                    setNavData(tmp)
                    setUpdate(true)
                }
            }
        }
    }


    //compare two nested dictionary
    function dictIsSame(dict1,dict2){
        if(dict1===dict2){
            return true
        }else if(dict1===null || dict2===null){
            return false
        }else if(dict1===undefined || dict2===undefined){
            return false
        }else if(typeof dict1 !== typeof dict2){
            return false
        }else if(typeof dict1 === 'object'){
            if(Object.keys(dict1).length !== Object.keys(dict2).length){
                return false
            }else{
                for(var key in dict1){
                    if(!dictIsSame(dict1[key],dict2[key])){
                        return false
                    }
                }
                return true
            }
        }else{
            return false
        }
    }

    useEffect(()=>{
        if(simpleFormHookState){
            if(!simpleFormHook.isLoaded){
                if(simpleFormHook.ready){
                    
                    setLangData(simpleFormHook.items.languageData)
                    setSimpleFormHookState(false)
                }else if(simpleFormHook.errMsg !==""){
                    alert(simpleFormHook.errMsg)
                    setSimpleFormHookState(false)

                }
            }
        }
    },[simpleFormHook])


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
                setNavDataBackup(cloneDeep(navDataHook.items))
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

    useEffect(()=>{
        if(checkHookData.active){
            if(!checkHook.isLoaded){
                if(checkHook.ready){
                    if('exist' in checkHook.items){
                        setUpdateNavDataState({
                            ...updateNavDataState,
                            mode:checkHook.items.exist?'PUT':'POST',
                            active:true
                        })
                        setCheckHookData({
                            ...checkHookData,
                            active:false
                        })
                    }
                }else if(checkHook.errMsg!==""){
                    alert(checkHook.errMsg)
                    setCheckHookData({
                        ...checkHookData,
                        active:false
                    })
                }
            }
        }
    },[checkHook])

    useEffect(()=>{
       
        if(updateNavDataState.active){
            if(!updateNavDataHook.isLoaded){
                if(updateNavDataHook.ready){
                    setUpdateNavDataState({
                        ...updateNavDataState,
                        active:false
                    })
                    alert("Update Success")
                    setInEdit(false)
                    setNavData({...navData,navdata:[]})
                    setNavDataBackup({...navDataBackup,navdata:[]})
                    window.location.reload()
                }else if(updateNavDataHook.errMsg!==""){
                    alert(updateNavDataHook.errMsg)
                    setUpdateNavDataState({
                        ...updateNavDataState,
                        active:false
                    })
                }
            }
        }
    },[updateNavDataHook])

    useEffect(()=>{
        console.log(updateNavDataState)
    },[updateNavDataState])

    useEffect(()=>{
        console.log(navDataState)
    },[navDataState])


    if(pageReady){
        return(
        <>
        <Row className="mb-3 mt-3">
            <Col>
                {"Domain: "} 
                <select style={borderStyle} disabled={inEdit} onChange={(e)=>{changeNavDataState(e.target.value,'domain')}} value={navDataState.domain}>
                    {['public','server'].map((item,index)=>{
                        return <option key={"domain-slecet-"+index} value={item} >{item}</option>
                    })}
                    
                </select>
            </Col>
            <Col>
                {"Language: "} 
                <select style={borderStyle} disabled={inEdit} onChange={(e)=>{changeNavDataState(e.target.value,'lang')}} value={navDataState.lang}>
                {langData.map((item,index)=>{
                        return <option key={"lang-slecet-"+index} value={item} >{item}</option>
                    })}
                   
                    
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
                 <Button style={{marginRight:"5px"}} onClick={updateNavData}>Upload</Button>
                 <Button style={{marginRight:"5px"}} onClick={()=>{getExist(navDataState.backup)}}>Recover</Button>
                 <Button style={{marginRight:"5px"}} onClick={Unfreeze}>Unfreeze</Button>
                 <Button style={{marginRight:"5px"}} onClick={handlecopyModelShow}>Copy to</Button>
                </>}
                
            </Col>
            {copyModel()}
        </Row>
        {inEdit?
        <Row>
            <Col style={{paddingLeft:"15px"}}>
                <NavigationTree data={cloneDeep(navData)} configNodeData={configNodeData} swapNode={swapNode}
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