import React from "react"

import UserBookingDataCardViewer from "./UserBookingDataCard"
import useSendRequest from "../../../hooks/useSendRequest"
import { Tabs,Tab } from "react-bootstrap"
import { useTranslation } from 'react-i18next'

const BookingClientManager = (props) =>{
    const { t } = useTranslation()
    const init = 
    useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST+'booking_activity_information/'+'current','get',{},true)

    
    if(!init.isLoaded){
        if(init.ready){
            //console.log(init)
            const join = init.items.filter((e)=>e.isJoin)
            const notjoin = init.items.filter((e)=>!e.isJoin)

            return(
                <Tabs defaultActiveKey="notjoin"
                id="uncontrolled-tab-example"
                className="mb-3">
                     <Tab eventKey="notjoin" title={t('bookingSystem.ableJoin')}>
                        <UserBookingDataCardViewer items={notjoin} isJoin = {false} lang={props.lang}></UserBookingDataCardViewer>
                     </Tab>
                     <Tab eventKey="join" title={t('bookingSystem.joined')}>
                        <UserBookingDataCardViewer items={join} isJoin = {true} lang={props.lang}></UserBookingDataCardViewer>
                     </Tab>

                    
                </Tabs>
                
            )
        }
    }
    
   
}

export default BookingClientManager