import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Box, Image } from '@chakra-ui/react'

import ImageMarker from 'react-image-marker';
import BoothPanel from './BoothPanel/BoothPanel'
import axios from 'axios';
import MyButton from '../MyButton/MyButton';
import { useDispatch, useSelector } from 'react-redux';

const TourGuideMap = (props) => {

    const { isMarkable = false, isAssignBooth = false, height } = props

    const themeColor = useSelector(state => state.themeConfig.themeColor)
    const link = useSelector(state => state.themeConfig.link)
    const { regionIndex, floorplans } = useSelector(state => state.tourguide)

    const path = 'markers'

    const mapRef = useRef(null)

    // map original size
    const [mapSize, setMapSize] = useState(null)
    const [isShowBooth, setIsShowBooth] = useState(true)
    
    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null)

    const dispatch = useDispatch()

    const add_marker = (marker) => {

        if(isMarkable){
            
            let newMarkers = [...markers, marker]
            let newData = { region: floorplans[regionIndex].region, booth: null, ...marker }

            axios.post(link+path, newData)
            .then(res=>setMarkers(newMarkers))
            .catch(err=>console.log(err))

        }

    }

    const delete_marker = (index) => {

        if(isMarkable){

            // let markerToDelete = markers[index]
            // markerToDelete = { region: floorplans[regionIndex].region, ...markerToDelete}
            // let newMarkers = markers

            // newMarkers.splice(index, 1)

            // let url = link+path+`?region=${region}&top=${markerToDelete.top}&left=${markerToDelete.left}`

            // // should delete with region, top, left column later
            // axios.get(url)
            // .then(res=>{
            //     let markerID = res.data[0]['id']
            //     console.log(markerID)
            //     axios.delete(link+markerPath+'/'+markerID)
            //     .then(res=>setMarkers(newMarkers))
            //     .catch(err=>console.log(err))
            // })
            // .catch(err=>console.log(err))

        }

    }

    const handle_showBooth = (boothID) => {

    }

    const update_mapHeight = () => {

        const map = mapRef.current
        const mapStyle = map.style

        if(mapSize !== null){

            let originalWidth = mapSize[0]
            let originalHeight = mapSize[1]
            let currentHeight = height === null || height === undefined ? map.offsetHeight : height
            let newWidth =  (currentHeight * originalWidth / originalHeight)
      
            mapStyle.minWidth = `${newWidth}px`

            // for debug
            // console.log('ori width: ', originalWidth)
            // console.log('ori height: ', originalHeight)
            // console.log('current height: ', currentHeight)
            // console.log('new width: ', newWidth)

        }

    }

    const store_marker_value = (marker) => {

        let payload = {
            region: marker.region,
            top: marker.top,
            left: marker.left,
            boothID: null
        }

        console.log(payload)

        dispatch({type: "UPDATE_MARKER", payload: payload})
    }

    useEffect(()=>{

        update_mapHeight()

    }, [mapSize, setMapSize, height])

    useEffect(()=>{

        window.addEventListener('resize', update_mapHeight)
        return () => window.removeEventListener('resize', update_mapHeight)

    },[mapSize, height])

    useEffect(()=>{

        if(floorplans.length !== 0){
            
            const queryStr = "?region=" + floorplans[regionIndex].region
    
            axios.get(link+path+queryStr)
            .then((res)=>{
    
                let data = res.data
                setMarkers(data)
        
            })

        }    

    }, [regionIndex, floorplans])

    const CustomMarker = (props) => {

        const { itemNumber } = props

        const handle_onClick = () => {
            setSelectedMarker(itemNumber)
            if(isMarkable)
                delete_marker(props.itemNumber)
            else if(isAssignBooth)
                store_marker_value(props)
            else
                handle_showBooth(props.itemNumber)
        }

        return (
            <MyButton
                text={itemNumber}
                onClick={handle_onClick}
                isCircle={true}
                bgColor={selectedMarker === props.itemNumber || !isAssignBooth ? themeColor: 'gray'}
                isWhiteBorder={true}
            />
        );

    };

    return (
        
        <ScrollMap borderRadius={isAssignBooth && 25}>

            <LoadImageSize 
                src="/images/test-floor-plan-1.jpg" 
                w="50%"
                onLoad={e=>setMapSize([e.target.clientWidth, e.target.clientHeight])}/>

            <MapContainer ref={mapRef}>

                <ImageMarker
                    src="/images/test-floor-plan-1.jpg"
                    markers={markers}
                    markerComponent={CustomMarker}
                    onAddMarker={(marker)=>add_marker(marker)}
                    />

            </MapContainer>

            {
                !isMarkable && !isAssignBooth
                &&
                <BoothPanel
                    isShowBooth={isShowBooth}
                    setIsShowBooth={setIsShowBooth}
                    themeColor={themeColor}
                    />

            }

        </ScrollMap>
        
    )
}

export default TourGuideMap

const ScrollMap = styled(Box)`

    width: 100%; max-width: 100%;
    height: 100%; max-height: 100%;
    overflow: scroll;

`

const MapContainer = styled(Box)`

    position: relative;
    height: 100%;

`

const LoadImageSize = styled(Image)`

    position: absolute;
    opacity: 0;
    z-index: -999;

`
