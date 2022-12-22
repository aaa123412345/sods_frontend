import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Flex, Box, Image } from '@chakra-ui/react'

import axios from 'axios';
import { useDispatch, connect } from 'react-redux';
import { updateFloorplans } from '../../../redux/tourguide/tourguide.action';

import ImageMarker from 'react-image-marker';
import BoothPanel from './BoothPanel/BoothPanel'
import EditorButton from '../common/EditorButton/EditorButton';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import FloorSelector from './FloorSelector/FloorSelector';
import { markerConvertor } from '../../../helpers/markerJsonConvertor';

const TourGuideMap = (props) => {

    const { isMarkable = false, isAssignBooth = false, height, tourguide } = props
    const { themeColor, host, regionIndex, floorplans } = tourguide

    const path = 'markers'
    const isClientView = !isMarkable && !isAssignBooth 

    const mapRef = useRef(null)

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // map original size
    const [mapSize, setMapSize] = useState(null)
    const [isShowBooth, setIsShowBooth] = useState(false)
    const [currentBooth, setCurrentBooth] = useState(null)
    
    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null)

    const dispatch = useDispatch()

    const add_marker = (marker) => {

        if(isMarkable){
            
            let newMarkers = [...markers, marker]
            let newData = { region: floorplans[regionIndex].region, booth: null, ...marker }
            newData = markerConvertor(newData, false)

            // axios.post(host+path, newData)
            // .then(res=>setMarkers(newMarkers))
            // .catch(err=>console.log(err))

        }

    }

    const delete_marker = (index) => {

        if(isMarkable){

            let markerToDelete = markerConvertor(markers[index], false)
            let newMarkers = markers
            newMarkers.splice(index, 1)

            // console.log("markerToDelete: ", `/${markerToDelete.region}/${markerToDelete.y}/${markerToDelete.x}`)
            // axios.delete(host+path+`/${markerToDelete.region}/${markerToDelete.y}/${markerToDelete.x}`)
            // .then(res=>setMarkers(newMarkers))
            // .catch(err=>console.log(err))

        }

    }

    const handle_showBooth = (marker) => {

        // axios.get(host+path+`/${marker.region}/${marker.top}/${marker.left}`)
        // .then(res=>{
        //     let booth = res.data.data[0].booth
        //     setCurrentBooth(res.data.data[0].booth)
        //     setIsShowBooth(true)
        //         axios.post(host+'booth-visit-record', {id: booth.id, startTime: Date.now()})
        //         .then(res=>console.log(res))
        //         .catch(err=>console.log(err))

        // })
        // .catch(err=>console.log(err))

    }

    const update_mapHeight = () => {

        if(mapRef.current !== null){
            
            const map = mapRef.current
            const mapStyle = map.style
    
            if(mapSize !== null){
    
                let originalWidth = mapSize[0]
                let originalHeight = mapSize[1]
                let currentHeight = height === null || height === undefined ? map.offsetHeight : height
                let newWidth =  (currentHeight * originalWidth / originalHeight)
          
                mapStyle.minWidth = `${newWidth}px`

            }
        }

    }

    useEffect(()=>{

        const refreshId = setInterval(()=>{
            update_mapHeight()
        }, 100)

        return () => clearInterval(refreshId)

    }, [mapSize, setMapSize, height])

    useEffect(()=>{

        window.addEventListener('resize', update_mapHeight)
        return () => window.removeEventListener('resize', update_mapHeight)

    },[mapSize, height])

    useEffect(()=>{

        if(floorplans.length === 0){
            axios.get(host+'floorplans')
            .then((res)=>{
                let data = res.data.data
                dispatch(updateFloorplans(data))
                console.log('get floorplans')
            })
            .catch(err=>{
                setError(error)
                setIsLoading(true)
            })

        }
        else{
            const refreshId = setTimeout(()=>{
                const regionStr = floorplans[regionIndex] !== undefined ? floorplans[regionIndex].region : ""
                const queryStr = "?region=" + regionStr
    
                console.log(floorplans)
                console.log(floorplans[regionIndex] !== undefined ? floorplans[regionIndex].image : "")
    
                axios.get(host+path+queryStr)
                .then((res)=>{
    
                    let data = res.data.data
                    data = markerConvertor(data)
                    setMarkers(data)
                    setError(null)
                    setIsLoading(false)
            
                })
                .catch(err=>{
                    setMarkers([])
                    setError(error)
                    setIsLoading(true)
                })
            }, 1000)

            return ()=> clearTimeout(refreshId)
        }



    }, [regionIndex, floorplans])

    useEffect(()=>{

        setIsLoading(true)
        setMarkers([])
    

    },[regionIndex])

    const CustomMarker = (props) => {

        const { itemNumber } = props

        const handle_onClick = () => {
            setSelectedMarker(itemNumber)
            if(isMarkable)
                delete_marker(itemNumber)
            // else if(isAssignBooth)
            //     ()=>{}
            else
                handle_showBooth(props)
        }

        return (
            <EditorButton
                text={itemNumber}
                onClick={handle_onClick}
                isCircle={true}
                bgColor={selectedMarker === itemNumber || !isAssignBooth ? themeColor: 'gray'}
                isWhiteBorder={true}
            />
        );

    };

    if(error !== null)
        return <div>{error.message}</div>

    if(isLoading)
        return <LoadingSpinner />

    return (

        <React.Fragment>

            { isClientView && <FloorSelector />}

            <ScrollMap borderRadius={isAssignBooth && 25}>

                <LoadImageSize 
                    src={floorplans[regionIndex] !== undefined ? floorplans[regionIndex].image: ""}
                    w="50%"
                    onLoad={e=>setMapSize([e.target.clientWidth, e.target.clientHeight])}/>

                <MapContainer ref={mapRef}>

                    {

                        markers !== undefined 
                        && 
                        <ImageMarker
                            src={floorplans[regionIndex] !== undefined ? floorplans[regionIndex].image: ""}
                            markers={markers}
                            markerComponent={CustomMarker}
                            onAddMarker={(marker)=>add_marker(marker)}
                            />

                    }

                </MapContainer>

                    
            {
                isClientView
                &&
                <React.Fragment>
            
                    <BoothPanel
                        isShowBooth={isShowBooth}
                        setIsShowBooth={setIsShowBooth}
                        currentBooth={currentBooth}
                        themeColor={themeColor}
                        />
            
                    
                </React.Fragment>
                
            }

            </ScrollMap>
        </React.Fragment>
    

    
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide
    };
};

export default connect(
    mapStateToProps,
    null
)(TourGuideMap)

const ScrollMap = styled(Box)`

    width: 100%; max-width: 100%;
    height: 100%; max-height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;

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
