import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components'
import { Flex, Box, Image, Text, useColorModeValue } from '@chakra-ui/react'

import { useDispatch, connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import _ from 'lodash';
import axios from 'axios';
import ImageMarker from 'react-image-marker';

import EditorButton from '../common/EditorButton/CustomButton';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import AnimatedPage from '../common/AnimatedPage/AnimatedPage';
import FloorSelector from './FloorSelector/FloorSelector';
import CustomMarker from './CustomMarker/CustomMarker';
import { updateMarker } from '../../../redux/form/form.action';
import useWindowSize from '../../../hooks/useWindowSize';

import { refreshTime, tourHost } from '../../../constants/constants';
import { updateFloorplans } from '../../../redux/tourguide/tourguide.action';
import CustomButton from '../common/EditorButton/CustomButton';
import { faGift, faTicket } from '@fortawesome/free-solid-svg-icons';
import { langGetter } from '../../../helpers/langGetter';

const TourGuideMap = (props) => {

    const { isMarkable = false, isAssignBooth = false, height, tourguide, form, modal } = props
    const { themeColor, itemIndex, floorplans, booths, markers } = tourguide
    const { marker } = form
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const bg = useColorModeValue('white', 'black')

    const isClientView = !isMarkable && !isAssignBooth 

    const windowSize = useWindowSize()

    const navigate = useNavigate()
    const userLang = langGetter() === 'en' ? 'eng' : 'chi'

    const { subsubpath } = useParams()

    const containerRef = useRef(null)
    const mapRef = useRef(null)
    const selectorRef = useRef(null)

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // map original size
    const [mapSize, setMapSize] = useState(null)
    const [isShowBooth, setIsShowBooth] = useState(false)
    const [currentBooth, setCurrentBooth] = useState(null)
    
    const [markerList, setMarkerList] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [assignedMarker, setAssignedMarker] = useState(null)
    const [loadedMarker, setLoadedMarker] = useState(false)


    const add_marker = (marker) => {

        // if(isMarkable){
            
        //     let newMarkers = [...markerList, marker]
        //     let newData = { markerID: {floorID:floorplans[itemIndex].id, y: marker.top, x: marker.left}}

        //     axios.post(host+"markers", newData)
        //     .then(res=>setMarkerList(newMarkers))
        //     .catch(err=>console.log(err))

        // }

    }

    // const delete_marker = (index) => {

    //     if(isMarkable){

    //         let markerToDelete = markerList[index]
    //         let newMarkers = markerList
    //         newMarkers.splice(index, 1)

    //         console.log("markerToDelete: ", `/${floorplans[itemIndex].id}/${markerToDelete.top}/${markerToDelete.left}`)
    //         axios.delete(host+"markers"+`/${floorplans[itemIndex].id}/${markerToDelete.top}/${markerToDelete.left}`)
    //         .then(res=>setMarkerList(newMarkers))
    //         .catch(err=>console.log(err))

    //     }

    // }

    // const handle_showBooth = (marker) => {

    //     axios.get(host+"booths")
    //     .then(res=>{
    //         let data = res.data.data
    //         data.forEach(booth=>{
    //             let boothMarkerID = booth.marker.markerID
    //             if(boothMarkerID.floorID === marker.floorID && boothMarkerID.y === marker.top && boothMarkerID.x === marker.left){
    //                 setCurrentBooth(booth)
    //                 setIsShowBooth(true)
    //             }
    //         })
    //     })

    // }

    // useEffect(()=>{

    //     const refreshId = setInterval(()=>{
    //         update_mapHeight()
    //         console.log('height: ', windowSize.height)
    //         console.log('width: ', windowSize.width)
    //     }, 1000)

    //     return () => clearInterval(refreshId)

    // }, [mapSize, setMapSize, height])


    // useEffect(()=>{

    //     setMarkerList([])
    //     setIsShowBooth(false)
    //     setCurrentBooth(null)
    //     if(floorplans[itemIndex] !== undefined){

    //         let floorplanID = floorplans[itemIndex].id
    //         axios.get(host+"markers?floorplan-id="+floorplanID)
    //         .then(res => {
    //             let markerList = res.data.data
    //             let list  = markerList.map(marker => ({
    //                 top: marker.markerID.y,
    //                 left: marker.markerID.x,
    //                 floorID: marker.markerID.floorID
    //             }))
    //             setMarkerList(list)
    //             setIsLoading(false)
    //         })
    //         .catch(err => {
    //             setIsLoading(true)
    //             setError(err)
    //         })

    //     }else
    //         setIsLoading(false)
        
    // },[itemIndex])

    // useEffect(()=>{
    
    //     if(marker.x !== null && marker.y !== null && marker.floorID !== null && isAssignBooth && assignedMarker === null){
    //         markerList.forEach((markerInList, index) => {
    //             let assigned = {floorID: marker.floorID, top: marker.y, left: marker.x}
    //             if(_.isEqual(markerInList, assigned)){
    //                 setAssignedMarker(index)
    //             }
    //         })
    //     }

    // }, [modal.isOpen, marker, assignedMarker, markerList.length])

    useEffect(()=>{

        // update map height

        if(mapRef.current !== null && mapSize !== null){
            
            const mapStyle = mapRef.current.style
            const selector = selectorRef.current
            const container = containerRef.current
    
            let { originalWidth, originalHeight } = mapSize 
            let currentHeight = height ?? (container.offsetHeight - selector?.offsetHeight ?? 0) 

            let newWidth =  (currentHeight * originalWidth / originalHeight)
        
            mapStyle.minWidth = `${newWidth}px`

        }

    })

    useEffect(()=>{

        if(subsubpath === "" || subsubpath === undefined || subsubpath === null)
            navigate(`/public/${userLang}/tourguide/floorplans/${floorplans[itemIndex]?.id ?? ""}`)

    }, [])

    const BoothMarker = (props) => { return <CustomMarker {...props} /> };
    const FloatingButtons = () => {

        const url = `/public/${userLang}/tourguide/`

        return (
            <FloatingContainer bg={bg}>
                <CustomButton faIcon={faTicket} onClick={()=>{navigate(url+"ticket")}} bgColor={themeColor} isCircle />
                <CustomButton faIcon={faGift} onClick={()=>{navigate(url+"story")}} bgColor={themeColor} isCircle /> 
            </FloatingContainer>
        )
    }


    
    return (

        <AnimatedPage>

            <OuterContainer ref={containerRef}>

                { isClientView && <div ref={selectorRef}><FloorSelector /></div> }

                { isClientView && <FloatingButtons /> }

                <ScrollMap borderRadius={isAssignBooth && 25}>

                    {
                        floorplans[itemIndex] !== undefined ? 
                        <LoadImageSize w="50%"
                            src={floorplans[itemIndex]?.imageUrl ?? ""}
                            onLoad={e=>setMapSize({ originalWidth: e.target.clientWidth, originalHeight: e.target.clientHeight })}/>
                        :
                        <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
                            <Text>{t(`floorplan.map-not-ready`)}</Text>
                        </Flex>

                    }

                    <MapContainer ref={mapRef}>

                        {

                            markerList !== undefined && floorplans[itemIndex] !== undefined && 
                            <ImageMarker
                                src={floorplans[itemIndex]?.imageUrl ?? ""}
                                markers={
                                    markers
                                        .filter(marker=>marker.floorPlanID === floorplans[itemIndex].id)
                                        .map(marker=>({top: marker.y, left: marker.x, ...marker}))
                                } markerComponent={BoothMarker} onAddMarker={(marker)=>add_marker(marker)}
                                />

                        }

                    </MapContainer>            

                </ScrollMap>

            </OuterContainer>

        </AnimatedPage>
    
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        form: state.form, 
        modal: state.modal
    };
};

export default connect(
    mapStateToProps,
    null
)(TourGuideMap)


const OuterContainer = styled(Box)`

    position: relative; 
    height: 100%;
    width: 100%;
    overflow-y:hidden;

`

const ScrollMap = styled(Box)`

    width: 100%; max-width: 100%;
    height: fit-content; max-height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;

`

const MapContainer = styled(Box)`

    position: relative;

`

const LoadImageSize = styled(Image)`

    position: absolute;
    opacity: 0;
    z-index: -999;

`

const FloatingContainer = styled(Flex)`

    flex-direction: column;
    position: absolute; z-index: 100; right: 1em; 
    border-radius: 25px;
    box-shadow: 0px 5px 22px rgba(0, 0, 0, .25);

`