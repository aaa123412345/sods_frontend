import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

const RoleEditor = ({data,setCurrentEditRole,currentEditRole,permsChoice,updateRole}) => {

    function setCurrentEditRoleFunc(e){

            var roleName = e.target.value
            if(roleName === "") return setCurrentEditRole(null)
            var role = data.find(e => e.roles.name === roleName)

            setCurrentEditRole(cloneDeep(role))
        
    }

    function setPermission(e,index){
        var tmp = cloneDeep(currentEditRole)
        tmp.permissions[index] = e.target.value
        console.log("tmp")
        console.log(tmp)
        console.log(e.target.value)
        setCurrentEditRole(tmp)
    }

    function removePermission(index){
        var tmp = cloneDeep(currentEditRole)
        tmp.permissions.splice(index,1)
        setCurrentEditRole(tmp)
    }

    function addPermission(){
        var tmp = cloneDeep(currentEditRole)
        tmp.permissions.push("")
        setCurrentEditRole(tmp)
    }

    function setRoleName(e){
        var tmp = cloneDeep(currentEditRole)
        tmp.roles.name = e.target.value
        setCurrentEditRole(tmp)
    }

    useEffect(()=>{
        console.log("currentEditRole")
        console.log(currentEditRole)
    },[currentEditRole])

   

    useEffect(()=>{
        console.log("pageConfigChoice")
        console.log(data)
    },[data])

    if(data?.length > 0){
        return (
        <>
        <select style={{border:"black solid 1px"}} className="mt-3" onChange={(e)=>setCurrentEditRoleFunc(e)}>
            <option value={""}>Select Role</option>
            
            {data.map((e,index) => <option key={"role-editor-select-"+index}>{e.roles.name}</option>)}
        </select>
        {currentEditRole!== null ?
            <div className="mt-3">
               
                <h1 style={{fontSize:"1.5vw"}}>Role ID: {currentEditRole.roles.id}</h1>
                <h1 style={{fontSize:"1.5vw"}}>Role: 
                    <input type="text" value={currentEditRole.roles.name} onChange={(e)=>setRoleName(e)}></input>
                </h1>
                <div className="mt-3">
                    <Button onClick={()=>addPermission()}>Add Permission</Button>
                    <Table>
                        <thead>
                            <tr>
                                <th>Permission</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEditRole.permissions.map((perm,index) =>
                            <tr key={"role-editor-permission-"+index}>
                                <td>
                                   
                                    <select value={perm} onChange={(e)=>setPermission(e,index)}>
                                        <option value="">Select Permission</option>
                                        {permsChoice.map((opt,sindex) => 
                                        <option value={opt.perms} style={{border:"black solid 1px"}} 
                                        key={"role-editor-permission-select-"+sindex}>{opt.perms}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={()=>removePermission(index)}>Remove</Button>
                                </td>
                            </tr>)}
                        </tbody>
                    </Table>
                    <Button onClick={()=>updateRole("put")}>Update Role</Button>
                   

                </div>
                
            </div>
        :null}
        </>
        )
    }
}

export default RoleEditor;