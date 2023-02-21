import React,{useState} from "react"
import BookingActivityTable from "./BookingActivityTable"
import { Tabs,Tab } from "react-bootstrap"
import BookingChecker from "./BookingChecker"

const BookingAdminManager = () =>{
    const [key, setKey] = useState('activitytable');
    return(
        <Tabs
        activeKey={key}
        onSelect={(k)=> setKey(k)}
        id="controlled-tab"
        className="mb-3"
        >
            <Tab eventKey="activitytable" title="Activity Table">
                <BookingActivityTable/>
            </Tab>
            <Tab eventKey="qrCodeReader" title="Booking Check">
                {key==="qrCodeReader"?<BookingChecker/>:''}
            </Tab>
        
        </Tabs>
    )
}

export default BookingAdminManager