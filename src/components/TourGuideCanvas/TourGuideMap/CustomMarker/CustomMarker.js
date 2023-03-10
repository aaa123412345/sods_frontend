import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

import { updateMarkers } from '../../../../redux/tourguide/tourguide.action';
import CustomButton from '../../../Common/common/CustomButton/CustomButton';
import { langGetter } from '../../../../helpers/langGetter';
import { UserContext } from '../../../../App';
import { tourHost } from '../../../../constants/constants';
import { updateMarker } from '../../../../redux/form/form.action';
import { updateModal } from '../../../../redux/modal/modal.action';


const CustomMarker = (props) => {

    const { itemNumber, floorPlanID, boothID, top, left, index, isAssignBooth, isMarkable, markers, marker} = props

    const { modal, sysConfig } = useSelector(state => state)
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const userLang = langGetter() === 'en' ? 'eng' : 'chi'
    
    const { user } = useContext(UserContext)

    const header = { headers: { token: user.token } }

    const check_active = () => {
        
        return marker.x === left && marker.y === top && marker.floorPlanID === floorPlanID
        
    }

    const delete_marker = () => {
        let newList = [...markers]
        let markerToDelete = newList[index]
        console.log('markerToDelete: ', markerToDelete)
        newList.splice(index, 1)
        console.log(user)
        let url = tourHost+`/markers/${markerToDelete.y}/${markerToDelete.x}/${markerToDelete.floorPlanID}`
        axios.delete(url, header)
        .then(res=>{ 
            if(res.data.code < 400){
                console.log('deleted marker')
                dispatch(updateMarkers(newList)) 
            }else
                console.log(res.data)
        })
        .catch(err=>console.log(err))
    }

    const handle_onClick = () => {

        if(!isMarkable && !isAssignBooth)
            navigate(`/public/${userLang}/tourguide/booths/${boothID ?? ""}`)

        if(isMarkable && !isAssignBooth)
            delete_marker()

        if(isAssignBooth && !isMarkable){
            dispatch(updateMarker({floorPlanID: floorPlanID, y: top, x: left, boothID: modal.assignItem}))
            dispatch(updateModal({...modal, id: `${top}/${left}/${floorPlanID}`}))
        }

    }

    return (
        // <EditorButton text={itemNumber} onClick={handle_onClick} isCircle={true}
        //     bgColor={selectedMarker === itemNumber || !isAssignBooth || assignedMarker === itemNumber ? themeColor: 'gray'}
        //     isWhiteBorder={true} isDisabled={isAssignBooth ? check_active():false}/>

        <CustomButton text={itemNumber} onClick={handle_onClick} isCircle
            bgColor={(!isAssignBooth && !isMarkable) || isMarkable || (isAssignBooth && check_active()) ? themeColor : 'gray'}
            isWhiteBorder={true} isDisabled={isAssignBooth && boothID !== undefined ? true : false}/>
    );

}

export default CustomMarker