import React,{useState,useEffect} from "react"
import BookingActivityForm from "./BookingActivityForm"
import useSendRequest from "../../../hooks/useSendRequest"
const BookingActivityEditor = () =>{
    const [activityData, setActivityData] = useState({})
    const [ActivityID, setActivityID] = useState('')
    

    const [ready, setReady] = useState(false)

    const [uploadMode, setUploadMode] = useState('post')
    const [uploadHookActive,setUploadHookActive] = useState(false)
    const upload = useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST+'booking_activity_information/'+ActivityID,uploadMode,activityData,uploadHookActive)
    

    const [getDataHook, setGetDataHook] = useState(false)
    const init = useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST+'booking_activity_information/'+ActivityID,'get',{},getDataHook)
    
    const urlParams = new URLSearchParams(window.location.search);

    function handleActivityDataSubmit(){
        if(!("information" in activityData || "location" in activityData 
        || "startTime" in activityData|| "endTime" in activityData)){
            alert("Please fill in all field for creating new activity")
        }else{
            setUploadHookActive(true)
        }
    }
    useEffect(()=>{
        if(urlParams.has('ActivityID')){
            setActivityID(urlParams.get('ActivityID'))
            setUploadMode('put')
        }else{
            setReady(true)
        }
        
    },[])

    useEffect(()=>{
        if(ActivityID !== ''){
            setGetDataHook(true)
        }
    },[ActivityID])

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

    useEffect(()=>{
        if(!init.isLoaded){
            if(init.ready){
                setActivityData(init.items)
                setReady(true)
            }

            if(init.errMsg !== ''){
                alert(init.errMsg)
                window.location.href = "/server/eng/booking_manager"
            }

        }
    },[init])

    if(ready){
        return(
            <BookingActivityForm setDictUP={setActivityData} dict={activityData} handleSubmit={handleActivityDataSubmit}/>
        )
    }
}

export default BookingActivityEditor