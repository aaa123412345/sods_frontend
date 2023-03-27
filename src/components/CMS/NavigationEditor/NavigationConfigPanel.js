import { useState } from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"
import useSendRequest from "../../../hooks/useSendRequest"

const NavigationConfigPanel = ({data,configNodeData,setNode}) =>{
    const [nodeNavData,setNodeNavData] = useState({
        auth:"",
        path:"",
        navName:"",
        child:[]
    })
    const [editData, setEditData] = useState({
        auth:"",
        path:"",
        navName:"",
        authSelect:"",
        pathSelect:""
    })

    const [pageDataState,setPageDataState] = useState({
       
        active:true
    })

    const [pageConfigChoice,setPageConfigChoice] = useState({
        page:[],
        permission:[]
    })
  
    const searchPageHook = useSendRequest(getRequestURL(),'get',{},pageDataState.active,false,false)

    function getRequestURL(){
        var url = process.env.REACT_APP_CMS_PAGE_EDITOR_HOST
       
        url += "?editable=1"
        return url

    }

    
    function setDataToUpperEditor(){
        const tmpData = {}
        if(editData.auth === ""){
            tmpData["auth"]=nodeNavData.auth
        }else{
            tmpData["auth"]=editData.auth
        }
        if(editData.path === ""){
            tmpData["path"]=nodeNavData.path
        }else{
            tmpData["path"]=editData.path
        }
        if(editData.navName === ""){
            tmpData["navName"]=nodeNavData.navName
        }else{
            tmpData["navName"]=editData.navName
        }
      
        if(configNodeData.sindex<0){
            tmpData["child"] = nodeNavData.child === undefined ? []:nodeNavData.child
        }

        if(configNodeData.sindex<0){
            setNodeNavData(
                {...nodeNavData,
                auth: tmpData.auth,
                path: tmpData.path,
                navName: tmpData.navName, 
                child: tmpData.child
                }
            )
        }else{
            setNodeNavData(
                {...nodeNavData, 
                auth: tmpData.auth,
                path: tmpData.path,
                navName: tmpData.navName
                }
            )
        }

        setNode(configNodeData.index,configNodeData.sindex,tmpData)
    }

    function changeAuthSelect(event){
        
        if(event.target.value !== "other"){
            setEditData({
                ...editData,
                authSelect: event.target.value,
                auth: event.target.value
            })
        }else{
            setEditData({
                ...editData,
                authSelect: event.target.value
                
            })
        }
    }

    function changePathSelect(event){
        if(event.target.value !== "other"){
            setEditData({
                ...editData,
                pathSelect: event.target.value,
                path: event.target.value
            })
        }else{
            setEditData({
                ...editData,
                pathSelect: event.target.value
                
            })
        }
    }


    function changeAuth(event){
        if(editData.authSelect === "other"){
            setEditData({
                ...editData,
                auth:event.target.value
            })
        }
    }

    function changePath(event){
        if(editData.pathSelect === "other"){
            setEditData({
                ...editData,
                path:event.target.value
            })
        }
    }

    function changePath(event){
        setEditData({
            ...editData,
            path:event.target.value
        })
    }

    function changeNavName(event){
        setEditData({
            ...editData,
            navName:event.target.value
        })
    }

    const borderStyle = {
        borderStyle:'solid',
        borderWidth:'1px',
        borderColor:'black',
    }

    useEffect(()=>{
        console.log("pageConfigChoice")
        console.log(pageConfigChoice)
    },[pageConfigChoice])

    useEffect(()=>{
        if(pageDataState.active){
            if(!searchPageHook.isLoaded){
                if(searchPageHook.ready){
                    setPageConfigChoice({
                        ...pageConfigChoice,
                        page:searchPageHook.items
                    })
                    setPageDataState({
                        ...pageDataState,
                        active:false
                    })
                }else if(searchPageHook.errMsg !== ""){
                    alert(searchPageHook.errMsg)
                    setPageDataState({
                        ...pageDataState,
                        active:false
                    })
                }
            }
        }
    },[searchPageHook])

    useEffect(()=>{
        if(configNodeData !== undefined){
            if(configNodeData.index >= 0 ){
                var parent

                if(configNodeData.sindex >=0 ){
                    parent = data.navdata[configNodeData.index].child[configNodeData.sindex]
                }else{
                    parent = data.navdata[configNodeData.index]
                }

                console.log(parent)

                if(configNodeData.sindex<0){
                    setNodeNavData(
                        {...nodeNavData,
                        auth: parent.auth,
                        path: parent.path,
                        navName: parent.navName, 
                        child: parent.child
                        }
                    )
                }else{
                    setNodeNavData(
                        {...nodeNavData, 
                        auth: parent.auth,
                        path: parent.path,
                        navName: parent.navName
                        }
                    )
                }
            }
        }
       
        
    },[configNodeData])

    if(configNodeData !== undefined){
        if(configNodeData.index >=0 ){
            return(
                <>
                
                <h4>auth : {nodeNavData.auth}</h4>
                <select onChange={changeAuthSelect} style={borderStyle}>
                    <option value={""}>No change</option>
                    <option value={"anonymous"}>permit all</option>
                    <option value={"anonymousOnly"}>anonymous</option>
                    <option value={"authenticated"}>authenticated</option>
                    <option value={"other"}>other</option>
                </select>
                <br/>
                {editData.authSelect === "other"?<input type="text" onChange={changeAuth} style={{border:"black solid 1px"}}></input>:""}

                <h4> path : {nodeNavData.path}</h4>
                
                <select onChange={changePathSelect} style={borderStyle}>
                    <option value={""}>No change</option>
                    <option value={"other"}>Other</option>
                    {pageConfigChoice.page.map((item,index)=>{
                        return(
                            <option key={"path-select-opt-"+index} value={"/"+item.domain+"/"+item.language+"/"+item.path}>{"/"+item.domain+"/"+item.language+"/"+item.path}</option>
                        )
                    }
                    )}
                </select>
                <br/>
                {editData.pathSelect === "other"?<input type="text" onChange={changePath} style={{border:"black solid 1px"}}></input>:""}

                <h4>navName : {nodeNavData.navName}</h4>
          
                <input type="text" onChange={changeNavName} style={borderStyle}></input>
                <br></br><br></br>
                <Button onClick={setDataToUpperEditor}>Change</Button>
                </>
            )
        }
    }
}

export default NavigationConfigPanel