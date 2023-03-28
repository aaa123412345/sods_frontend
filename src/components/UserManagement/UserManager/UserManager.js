import { Tabs,Tab } from "react-bootstrap";
import UserTable from './UserTable'
import UserEditor from './UserEditor'

const UserManager = () => {
    return (
    <Tabs defaultActiveKey="searcher" id="uncontrolled-tab-example">
        <Tab eventKey="searcher" title="Searcher">
            <UserTable/>
        </Tab>
        <Tab eventKey="editor" title="Editor">
            <UserEditor/>
        </Tab>
    </Tabs>
    )
}

export default UserManager;