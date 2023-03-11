import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { connect, useDispatch } from 'react-redux'

import axios from 'axios'

import TourGuideEditor from './TourGuideEditor/TourGuideEditor'
import TourGuideMap from './TourGuideMap/TourGuideMap'
import GameTicket from './GameTicket/GameTicket'
import StorySlider from './StorySplider/StorySplider'
import QRCodeModal from './QRCodeModal/QRCodeModal'
import Wrapper from '../Common/common/Wrapper/Wrapper'
import LoadingSpinner from '../Common/common/LoadingSpinner/LoadingSpinner'
import BoothPage from './BoothPage/BoothPage'
import EditorModal from '../Common/common/EditorModal/EditorModal'
import { tourHost } from '../../constants/constants'
import { updateFloorplans, updateStories, updateBooths, updateMarkers, updateLoadingItem, clearLoadingItem, updateBoothGames, updateBoothRecords } from '../../redux/tourguide/tourguide.action'
import { clearRefreshFlag, updateConfig } from '../../redux/sysConfig/sysConfig.action'
import { UserContext } from '../../App'

const TourGuideCanvas = (props) => {

    const { block, sysConfig } = props
    const { isAdmin } = block

    const { lang, path, subpath } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useContext(UserContext)

    const render_layout = () => {

        switch(subpath){

            case "floorplans":
                return <TourGuideMap isAssignBooth={false} isMarkable={false} />

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
            // console.log("updated from " + url + " successfully;")            
        })
        .catch((err)=>{setError(err)})
        
    }

    useEffect(()=>{

        // update language parameter in local storage base on url
        window.localStorage.setItem('i18n-lang', JSON.stringify(lang === 'eng' ? 'en' : 'zh'))

        setError(null)
        setIsLoading(true)
    
        Promise.all([
            get_data("configs", (data) => updateConfig(data)),
            get_data("floorplans", (data) => updateFloorplans(data)),
            get_data("boothGames", (data) => updateBoothGames(data)),
            get_data("booths", (data) => updateBooths(data)),
            get_data("markers", (data) => updateMarkers(data)),
            get_data("stories", (data) => updateStories(data)), 
            get_data(`boothRecords?userId=${user.userId}`, (data) => updateBoothRecords(data))
        ])
        .then(()=>{
            console.log('loaded')
            setIsLoading(false)
            dispatch(clearLoadingItem())
            dispatch(clearRefreshFlag())
            console.log('floorplans: ', floorplans)
        })
     
    }, [sysConfig.refreshFlag])

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
        modal: state.modal, 
        sysConfig: state.sysConfig
    };
};

export default connect(
    mapStateToProps,
    null
)(TourGuideCanvas)
