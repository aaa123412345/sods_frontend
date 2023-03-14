import { useState } from "react"
import { useEffect } from "react"
import { Button } from "react-bootstrap"

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
        select:""
    })

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

    function changeSelect(event){
        
        if(event.target.value !== "other"){
            setEditData({
                ...editData,
                select: event.target.value,
                auth: event.target.value
            })
        }else{
            setEditData({
                ...editData,
                select: event.target.value
                
            })
        }
    }

    function changeAuth(event){
        if(editData.select === "other"){
            setEditData({
                ...editData,
                auth:event.target.value
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
                <select onChange={changeSelect} style={borderStyle}>
                    <option value={""}>No change</option>
                    <option value={"anonymous"}>permit all</option>
                    <option value={"anonymousOnly"}>anonymous</option>
                    <option value={"authenticated"}>authenticated</option>
                    <option value={"other"}>other</option>
                </select>
                {editData.select === "other"?<input type="text" onChange={changeAuth} ></input>:""}

                <h4> path : {nodeNavData.path}</h4>
                
                <input type="text" onChange={changePath} style={borderStyle}></input>

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