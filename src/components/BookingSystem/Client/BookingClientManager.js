import React from "react"

import UserBookingDataCardViewer from "./UserBookingDataCard"
import useSendRequest from "../../../hooks/useSendRequest"
import { Tabs,Tab } from "react-bootstrap"

const BookingClientManager = () =>{

    

    const init = 
    useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST+'booking_activity_information/'+'current','get',{},true)

    
    if(!init.isLoaded){
        if(init.ready){
            const join = init.items.filter((e)=>e.isJoin)
            const notjoin = init.items.filter((e)=>!e.isJoin)

            return(
                <Tabs defaultActiveKey="notjoin"
                id="uncontrolled-tab-example"
                className="mb-3">
                     <Tab eventKey="notjoin" title="Able to join">
                        <UserBookingDataCardViewer items={notjoin} isJoin = {false}></UserBookingDataCardViewer>
                     </Tab>
                     <Tab eventKey="join" title="Joined">
                        <UserBookingDataCardViewer items={join} isJoin = {true}></UserBookingDataCardViewer>
                     </Tab>

                    
                </Tabs>
                
            )
        }
    }
    
   
}

export default BookingClientManager