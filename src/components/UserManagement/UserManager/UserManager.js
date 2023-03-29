import { Tabs,Tab } from "react-bootstrap";
import UserTable from './UserTable'
import UserEditor from './UserEditor'

import useSendRequest from "../../../hooks/useSendRequest";
import { useEffect,useState } from "react";

const UserManager = () => {
    const [userTableState, setUserTableState] = useState({
        active: true, 
    });

    const userTableHook = useSendRequest(process.env.REACT_APP_SECURITY_HOST+"users",'get',{},userTableState.active,false,true)
    const [userData, setUserData] = useState([]);

    useEffect(() => {
      if(userTableState.active){
        if(!userTableHook.isLoaded){
          if(userTableHook.ready){
            setUserTableState({
              ...userTableState,
              active: false
            })
            setUserData(userTableHook.items)
          }else if(userTableHook.errMsg !== ""){
            alert(userTableHook.errMsg)
            setUserTableState({
              ...userTableState,
              active: false
            })
          }
        }
      }
    }, [userTableHook])
    
    useEffect(() => {
        console.log(userData)
    }, [userData])

    return (
    <Tabs defaultActiveKey="searcher" id="uncontrolled-tab-example">
        <Tab eventKey="searcher" title="Searcher">
            <UserTable data={userData}/>
        </Tab>
        
    </Tabs>
    )
}

export default UserManager;