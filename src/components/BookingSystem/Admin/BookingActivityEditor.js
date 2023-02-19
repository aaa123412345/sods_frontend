import React,{useState,useEffect} from "react"
import BookingActivityForm from "./BookingActivityForm"
import useSendRequest from "../../../hooks/useSendRequest"
const BookingActivityEditor = () =>{
    const [activityData, setActivityData] = useState({})
    const [uploadHookActive,setUploadHookActive] = useState(false)
    const upload = useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST,'post',activityData,uploadHookActive)

    function handleActivityDataSubmit(){
        if(!("information" in activityData || "location" in activityData 
        || "startTime" in activityData|| "endTime" in activityData)){
            alert("Please fill in all field for creating new activity")
        }else{
            setUploadHookActive(true)
        }
    }

    useEffect(()=>{
        if(!upload.isLoaded){
            if(upload.ready){
                if(uploadHookActive){
                    alert("Activity creted success")
                    setUploadHookActive(false)
                    window.location.href = "/server/eng/booking_manager"
                }
            }
        }
    },[upload])

    return(
        <BookingActivityForm setDictUP={setActivityData} dict={activityData} handleSubmit={handleActivityDataSubmit}/>
    )
}

export default BookingActivityEditor