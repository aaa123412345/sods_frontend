import React from "react"
import useFetch from "../../../hooks/useFetch"

const RealTime123 = () => {
    const {items,isLoaded,ready,error,redirection} = useFetch(process.env.REACT_APP_VOTING_SYSTEM_HOST+'/ABCDEF')
    var i =100
}

export default RealTime123