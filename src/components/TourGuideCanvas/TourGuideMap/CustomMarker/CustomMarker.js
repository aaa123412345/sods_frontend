import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

import CustomButton from '../../../Common/common/CustomButton/CustomButton';
import { langGetter } from '../../../../helpers/langGetter';

const CustomMarker = (props) => {

    const { itemNumber, floorPlanID, boothID, top, left } = props

    const { themeColor } = useSelector(state => state.tourguide)

    const navigate = useNavigate()

    const userLang = langGetter() === 'en' ? 'eng' : 'chi'


    // const markerID = {floorID: props.floorID, y: props.top, x: props.left}

    // const check_active = () => {

    //     let isActive = false
    //     booths.forEach(booth => {
    //         if(_.isEqual(booth.marker.markerID, markerID))
    //             isActive = true
    //     })

    //     return isActive
    // }

    // const handle_onClick = () => {
    //     setSelectedMarker(itemNumber)
    //     if(isMarkable)
    //         delete_marker(itemNumber)
    //     else if(isAssignBooth)
    //         dispatch(updateMarker({...markerID}))
    //     else
    //         handle_showBooth(props)
    // }

    const handle_onClick = () => {

        navigate(`/public/${userLang}/tourguide/booths/${boothID ?? ""}`)

    }

    return (
        // <EditorButton text={itemNumber} onClick={handle_onClick} isCircle={true}
        //     bgColor={selectedMarker === itemNumber || !isAssignBooth || assignedMarker === itemNumber ? themeColor: 'gray'}
        //     isWhiteBorder={true} isDisabled={isAssignBooth ? check_active():false}/>

        <CustomButton text={itemNumber} onClick={handle_onClick} isCircle
            bgColor={themeColor}
            isWhiteBorder={true} isDisabled={false}/>
    );

}

export default CustomMarker