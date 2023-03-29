import { Tabs,Tab } from "react-bootstrap";
import RoleTable from './RoleTable'
import RoleEditor from './RoleEditor'
import RoleCreator from "./RoleCreator";

import { useState, useEffect } from "react";
import useSendRequest from "../../../hooks/useSendRequest";



const RoleManager = () => {
    const [tabKey, setTabKey] = useState("searcher");

    const [roleData, setRoleData] = useState([]);
    const [currentEditRole, setCurrentEditRole] = useState(null);

    const [roleHookActive, setRoleHookActive] = useState(true);
    const RoleDataHook = useSendRequest(process.env.REACT_APP_SECURITY_HOST + "roleWithpermissions", "get", {},roleHookActive);

    const [pageConfigChoice,setPageConfigChoice] = useState({
       
        permission:[]
    })

    const [serchPemissionState,setSerchPemissionState] = useState({active:true})
    const serchPemissionHook = useSendRequest(process.env.REACT_APP_SECURITY_HOST+"permissions",'get',{},serchPemissionState.active,false,false)

    const [updateState,setUpdateState] = useState({
        url:"",
        method:"",
        data:{},
        active:false,
    })
    const UpdateHook = useSendRequest(updateState.url,updateState.method,updateState.data,updateState.active,false,false)

    const [removeState,setRemoveState] = useState({
        id:"",
        active:false
    })
    const removeHook = useSendRequest(process.env.REACT_APP_SECURITY_HOST+"role/"+removeState.id,'delete',{},removeState.active,false,false)

    useEffect(()=>{
        if(serchPemissionState.active){
            if(!serchPemissionHook.isLoaded){
                if(serchPemissionHook.ready){
                    setSerchPemissionState({
                        ...serchPemissionState,
                        active:false
                    })
                    //get the "perms" in serchPemissionHook.items and store it in pageConfigChoice.permission
                   
                    setPageConfigChoice({
                        ...pageConfigChoice,
                        permission:serchPemissionHook.items
                    })
                }else if(serchPemissionHook.errMsg !== ""){
                    alert(serchPemissionHook.errMsg)
                    setSerchPemissionState({
                        ...serchPemissionState,
                        active:false
                    })
                }
            }
        }
    },[serchPemissionHook])


    useEffect(() => {
        if (roleHookActive){
            if(!RoleDataHook.isLoaded){
                if(RoleDataHook.ready){
                    setRoleHookActive(false)
                    setRoleData(RoleDataHook.items)
                }else if(RoleDataHook.error){
                    alert(RoleDataHook.error)
                    setRoleHookActive(false)
                }
            }
        }
        //console.log(RoleDataHook)
    }, [RoleDataHook])

    useEffect(()=>{
        console.log("pageConfigChoice")
        console.log(pageConfigChoice)
    },[pageConfigChoice])

    useEffect(() => {
        console.log(roleData)
    }, [roleData])

    useEffect(()=>{
        if(updateState.active){
            if(!UpdateHook.isLoaded){
                if(UpdateHook.ready){
                    setUpdateState({
                        ...updateState,
                        active:false
                    })
                    alert("Update Success")
                    window.location.reload()
                }else if(UpdateHook.error){
                    alert(UpdateHook.error)
                    setUpdateState({
                        ...updateState,
                        active:false
                    })
                }
            }
        }
    },[UpdateHook])

    useEffect(()=>{
        if(removeState.active){
            if(!removeHook.isLoaded){
                if(removeHook.ready){
                    setRemoveState({
                        ...removeState,
                        active:false
                    })
                    alert("Remove Success")
                    window.location.reload()
                }else if(removeHook.error){
                    alert(removeHook.error)
                    setRemoveState({
                        ...removeState,
                        active:false
                    })
                }
            }
        }
    },[removeHook])


    function updateRole(methodMode){

        function getPermissionIdArray(permissionNameArray){
            var permissionIdArray = []
            permissionNameArray.forEach(permissionName => {
                var permission = pageConfigChoice.permission.find(e => e.perms === permissionName)
                permissionIdArray.push(permission.menuId)
            });
            return permissionIdArray
        }

        function getUpdateParm(permissionIdArray){
            var requestParm = permissionIdArray.join(',')
            return requestParm
        }

        var permissionIdArray = getPermissionIdArray(currentEditRole.permissions)
        var requestParm = getUpdateParm(permissionIdArray)
        var url = process.env.REACT_APP_SECURITY_HOST + "role?permissionID="+requestParm
        var method = methodMode
        var data = currentEditRole.roles

        setUpdateState({
            url:url,
            method:method,
            data:data,
            active:true
        })


    }

    function removeRole(id,name){
        function confirmBox(string){
            var result = window.confirm(string)
            return result
        }
        //
        var ok = confirmBox("Delete role with id = "+id+" and name = "+ name+" ?")

        if(ok){
            setRemoveState({
                id:id,
                active:true
            })
        }
    }

    
    return ( 
        <Tabs activeKey={tabKey} onSelect={(key)=>{
            if(key === "creator"){
                setCurrentEditRole(null)
            }
            setTabKey(key)}
            } id="uncontrolled-tab-example">
            <Tab eventKey="searcher" title="Searcher">
                <RoleTable data={roleData} removeRole={removeRole}/>
            </Tab>
            <Tab eventKey="editor" title="Editor">
                <RoleEditor data={roleData} setCurrentEditRole={setCurrentEditRole} updateRole={updateRole}
                currentEditRole={currentEditRole} permsChoice={pageConfigChoice.permission}/>
            </Tab>
            <Tab eventKey="creator" title="creator" >
                <RoleCreator data={roleData} setCurrentEditRole={setCurrentEditRole} updateRole={updateRole}
                currentEditRole={currentEditRole} permsChoice={pageConfigChoice.permission}/>
            </Tab>
        </Tabs>
    )
}

export default RoleManager;