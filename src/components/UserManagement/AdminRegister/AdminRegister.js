import React, { useEffect, useState } from 'react';
import useSendRequest from '../../../hooks/useSendRequest';
import { Table,Button } from 'react-bootstrap';
import cloneDeep from 'lodash.clonedeep';
const AdminRegister = () => {
    const [serchRoleState,setSerchRoleState] = useState({active:true})
    const serchRoleHook = useSendRequest(process.env.REACT_APP_SECURITY_HOST+"roles",'get',{},serchRoleState.active,false,false)
    
    const [updateHookState,setUpdateHookState] = useState({
        url:'',
        data:{},
        active:false
    })
    const updateHook = useSendRequest(updateHookState.url,'post',updateHookState.data,updateHookState.active,false,false)

    const [admin, setAdmin] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [Roles, setRoles] = useState([]);
    const [RolesOpt, setRolesOpt] = useState([]);

    function setRole(roles,index){
        var tmp = cloneDeep(Roles)
        tmp[index] = roles.target.value
        setRoles(tmp)
    }

    function addRole(){
        //add role to roles
        var roles = cloneDeep(Roles)
        roles.push("")
        setRoles(roles)

    }

    function removeRole(index){
        //remove role from roles
        var roles = cloneDeep(Roles)
        roles.splice(index,1)
        setRoles(roles)
    }

    function updateUserToServer(){
        function getRolesIdArray(rolesNameArray){
            var rolesIdArray = []
            rolesNameArray.forEach(e => {
                var role = RolesOpt.find(r => r.name === e)
                rolesIdArray.push(role.roleId)
            });
            return rolesIdArray
        }

        function getUpdateParm(rolesIDArray){
            var requestParm = rolesIDArray.join(',')
            return requestParm
        }

        var rolesIdArray = getRolesIdArray(Roles)
        console.log(rolesIdArray)
        var requestParm = getUpdateParm(rolesIdArray)
        var url = process.env.REACT_APP_SECURITY_HOST + "user?roleID="+requestParm
        var method = "post"
       
        var data = {
            userName: admin.username,
            password: admin.password,
            email: admin.email,
            userType: "9"
        }
        
        setUpdateHookState({
            url:url,
            data:data,
            active:true
        })


    }

    useEffect(() => {
        console.log(Roles)
    }, [Roles])

    useEffect(() => {
        if(updateHookState.active){
            if(!updateHook.isLoaded){
                if(updateHook.ready){
                    setUpdateHookState({
                        ...updateHookState,
                        active:false
                    })
                    alert("Update Success")
                    window.location.reload()
                }else if(updateHook.error){
                    alert(updateHook.error)
                    setUpdateHookState({
                        ...updateHookState,
                        active:false
                    })
                }
            }
        }
    },[updateHook])

    useEffect(() => {
        if(serchRoleState.active){
            if(!serchRoleHook.isLoaded){
                if(serchRoleHook.ready){
                    setSerchRoleState({
                        ...serchRoleState,
                        active: false
                    })
                    setRolesOpt(serchRoleHook.items)
                }else if(serchRoleHook.errMsg !== ""){
                    alert(serchRoleHook.errMsg)
                    setSerchRoleState({
                        ...serchRoleState,
                        active: false
                    })
                }
            }
        }
    }, [serchRoleHook])

    useEffect(() => {
        console.log(RolesOpt)
        
    }, [RolesOpt])

    if(RolesOpt.length > 0){
        
        return (
            <div>
                <h1 className='mt-3'>Username</h1>
                <input type="text" placeholder="Username" value={admin.username} style={{border: "1px solid black"}}
                onChange={(e) => setAdmin({ ...admin, username: e.target.value })} />
                <br/>
                <h1 className='mt-3'>Password</h1>
                <input type="text" placeholder="Password" value={admin.password} style={{border: "1px solid black"}}
                onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
                <br/>
                <h1 className='mt-3'>Email</h1>
                <input type="text" placeholder="Email" value={admin.email} style={{border: "1px solid black"}}
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })} />
                <br/>
                <Button variant="success" className="mt-3" onClick={()=>addRole()}>Add Role</Button>
                <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Roles</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Roles.map((perm,index) =>
                                <tr key={"role-editor-roles-"+index}>
                                    <td>
                                    
                                        <select value={perm} onChange={(e)=>setRole(e,index)} style={{border: "1px solid black"}}>
                                            <option value="">Select Roles</option>
                                            {RolesOpt.map((opt,sindex) => 
                                            <option value={opt.name} style={{border:"black solid 1px"}} 
                                            key={"role-editor-roles-select-"+sindex}>{opt.name}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={()=>removeRole(index)}>Remove</Button>
                                    </td>
                                </tr>)}
                            </tbody>
                </Table>
                <Button variant="success" className="mt-3" onClick={()=>updateUserToServer()}>Create User</Button>
            </div>
        )
    }
}

export default AdminRegister;