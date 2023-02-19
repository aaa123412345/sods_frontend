import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
import { updateFloorplans, updateStories, updateBooths, updateMarkers, updateLoadingItem, clearLoadingItem } from '../../redux/tourguide/tourguide.action'
import BoothPage from './BoothPage/BoothPage'
import EditorModal from './common/EditorModal/EditorModal'

const TourGuideCanvas = (props) => {

    const { block } = props
    const { isAdmin } = block

    const { lang, path, subpath } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const render_layout = () => {

        switch(subpath){

            case "floorplans":
                return <TourGuideMap />

            case "booths":
                return <BoothPage />

            case "ticket":
                return <GameTicket />

            case "story": 
                return <StorySlider />

            case "editor":
                return <TourGuideEditor />

            default: 
                return <LoadingSpinner />
    
        }

    }

    const get_data = async (path, updateFunction) => {

        dispatch(updateLoadingItem(`tourguide.loading-${path}`))
        let url = `${tourHost}/${path}`
        await axios.get(url)
        .then((res)=>{
            dispatch(updateFunction(res.data.data))
            console.log("updated from " + url + " successfully;")            
        })
        .catch((err)=>{setError(err)})
        
    }

    useEffect(()=>{

        // update language parameter in local storage base on url
        window.localStorage.setItem('i18n-lang', JSON.stringify(lang === 'eng' ? 'en' : 'zh'))

        setError(null)
        setIsLoading(true)
    
        Promise.all([
            get_data("floorplans", (data) => updateFloorplans(data)),
            get_data("booths", (data) => updateBooths(data)),
            get_data("markers", (data) => updateMarkers(data)),
            get_data("stories", (data) => updateStories(data))
        ])
        .then(()=>{
            console.log('loaded')
            setIsLoading(false)
            dispatch(clearLoadingItem())
        })
     
    }, [])

    useEffect(()=>{
        // redirect case
        if(path === 'tourguide' && (subpath === null || subpath === "" || subpath === undefined))
            navigate(`/${isAdmin ? "server" : "public"}/${lang}/tourguide/${isAdmin ? "editor" : "floorplans"}`)
    }, [subpath])

    if(error)
        return <div>{error.message}</div>

    return isLoading ? <LoadingSpinner /> : (

        <Wrapper isUseChakra isUseContainer>
            {(() => render_layout())()}
            <QRCodeModal />
            <EditorModal />
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
