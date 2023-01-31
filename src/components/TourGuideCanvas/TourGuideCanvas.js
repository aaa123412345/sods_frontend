import React, { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import { connect, useDispatch } from 'react-redux'

import axios from 'axios'

import TourGuideEditor from './TourGuideEditor/TourGuideEditor'
import TourGuideMap from './TourGuideMap/TourGuideMap'
import GameTicket from './GameTicket/GameTicket'
import StorySlider from './StorySplider/StorySplider'
import QRCodeModal from './QRCodeModal/QRCodeModal'
import Wrapper from './common/Wrapper/Wrapper'
import LoadingSpinner from './common/LoadingSpinner/LoadingSpinner'
import { tourHost } from '../../constants/constants'
import { updateFloorplans, updateStories, updateBooths, updateMarkers } from '../../redux/tourguide/tourguide.action'
import BoothPage from './BoothPage/BoothPage'

const TourGuideCanvas = (props) => {

    const { block, tourguide, modal } = props
    const { isAdmin } = block

    const { lang, path, subpath } = useParams()

    const dispatch = useDispatch()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const render_feature = () => {

        switch(subpath){

            case "floorplans":
                return <TourGuideMap />

            case "booths":
                return <BoothPage />

            case "ticket":
                return <GameTicket />

            case 'story': 
                return <StorySlider />

            case "floorplan-editor" || "booth-editor" || "story-editor":
                return <TourGuideEditor />

            default: 
                return path === 'tourguide' && <Navigate replace to={`/public/${lang}/tourguide/${isAdmin?"floorplan-editor":"floorplans"}`} /> 
    
        }

    }

    const get_data = (path, updateFunction) => {

        setIsLoading(true)
        let url = `${tourHost}/${path}`
        axios.get(url)
        .then((res)=>{
            dispatch(updateFunction(res.data.data))
            // console.log("updated from " + url + " successfully;")
        })
        .catch((err)=>{setError(err)})
    }

    useEffect(()=>{

        setError(null)
        // load all data first
        get_data("floorplans", (data) => updateFloorplans(data))
        get_data("booths", (data) => updateBooths(data))
        get_data("markers", (data) => updateMarkers(data))
        get_data("stories", (data) => updateStories(data))
        setIsLoading(false)
        
    }, [])

    useEffect(()=>{

        window.localStorage.setItem('i18n-lang', JSON.stringify(lang === 'eng' ? 'en' : 'zh'))

    }, [])

    if(error)
        return <div>{error.message}</div>

    if(isLoading)
        return <LoadingSpinner />

    return (

        <Wrapper isUseChakra={subpath !== "vr-tour"} isUseContainer>
            {(() => render_feature())()}
            <QRCodeModal />
        </Wrapper>

    )

}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide, 
        modal: state.modal
    };
};

export default connect(
    mapStateToProps,
    null
)(TourGuideCanvas)
