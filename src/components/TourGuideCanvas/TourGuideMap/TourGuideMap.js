import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import ImageMarker from 'react-image-marker';
import axios from 'axios';

import styled from 'styled-components'
import { Flex, Box, Image, Text } from '@chakra-ui/react'

import { useDispatch, connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AnimatedPage from '../../Common/common/AnimatedPage/AnimatedPage';
import FloorSelector from './FloorSelector/FloorSelector';
import CustomMarker from './CustomMarker/CustomMarker';
import StatusBar from './StatusBar/StatusBar';
import FloatingButtons from './FloatingButtons/FloatingButtons';

import { updateMarkers } from '../../../redux/tourguide/tourguide.action';
import { tourHost } from '../../../constants/constants';
import { langGetter } from '../../../helpers/langGetter';
import { UserContext } from '../../../App';

const TourGuideMap = (props) => {

    const { isMarkable = false, isAssignBooth = false, height, tourguide, form, modal, sysConfig } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'
    const { itemIndex, floorplans, booths, markers } = tourguide
    const { marker } = form
    const dispatch = useDispatch()

    const { t } = useTranslation()
    const navigate = useNavigate()
    const userLang = langGetter() === 'en' ? 'eng' : 'chi' 
    
    const { path, subpath, subsubpath } = useParams()
    
    const containerRef = useRef(null)
    const mapRef = useRef(null)
    const selectorRef = useRef(null)
    
    // map original size
    const [mapSize, setMapSize] = useState(null)

    const {user} = useContext(UserContext)

    const header = { headers: { token: user.token } }

    const add_marker = (marker) => {

        if(isMarkable){
            
            let newData = { floorPlanID: floorplans[itemIndex].id, y: marker.top, x: marker.left }
            let newMarkers = [...markers, newData]
            
            axios.post(tourHost+"/markers", newData, header)
            .then(res=>{ 
                if(res.data.code < 400){
                    console.log('added marker')
                    dispatch(updateMarkers(newMarkers)) 
                }
            })
            .catch(err=>console.log(err))

        }

    }

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

        if(subpath !== "editor" && path === 'tourguide' && 
            (subsubpath === "" || subsubpath === undefined || subsubpath === null)){
                navigate(`/public/${userLang}/tourguide/floorplans/${floorplans[itemIndex]?.id ?? "None"}`)
            }

    }, [])

    const BoothMarker = (props) => { return <CustomMarker {...props} /> };
    
    return (

        <AnimatedPage>

            <OuterContainer ref={containerRef}>

                { 
                    (!isMarkable && !isAssignBooth) && 
                    <div ref={selectorRef}>
                        <FloorSelector />
                        <StatusBar />
                    </div> 
                }

                { (!isMarkable && !isAssignBooth) && <FloatingButtons /> }

                <ScrollMap borderRadius={isAssignBooth ? 25 : 0} >

                    {
                        floorplans?.[itemIndex] !== undefined ? 
                        <LoadImageSize w="50%"
                            src={floorplans[itemIndex]?.imageUrl ?? ""}
                            onLoad={e=>setMapSize({ originalWidth: e.target.clientWidth, originalHeight: e.target.clientHeight })}/>
                        :
                        <Flex w="100%" h="100%" minH="100vh" alignItems="center" justifyContent="center">
                            <Text m="1em">{t(`floorplan.map-not-ready`)}</Text>
                        </Flex>

                    }

                    <MapContainer ref={mapRef}>

                        {

                            markers !== undefined && floorplans?.[itemIndex] !== undefined && 
                            <ImageMarker src={floorplans[itemIndex]?.imageUrl ?? ""}
                                markers={
                                    markers
                                        .filter(marker=>marker.floorPlanID === floorplans[itemIndex].id)
                                        .map((currentMarker, index)=>({top: currentMarker.y, left: currentMarker.x, index: index, isAssignBooth: isAssignBooth, isMarkable: isMarkable, markers: markers, marker: marker, ...currentMarker }))
                                } markerComponent={BoothMarker} onAddMarker={(marker)=>{add_marker(marker)}}
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
        sysConfig: state.sysConfig,
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
