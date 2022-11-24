import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilSquare, faPenToSquare, faTicket } from '@fortawesome/free-solid-svg-icons'

import ImageMarker from 'react-image-marker';
import BoothPanel from './BoothPanel/BoothPanel'

const TourGuideMap = (props) => {

    const { themeColor } = props

    const mapRef = useRef(null)


     const [isShowBooth, setIsShowBooth] = useState(true)

    // map original size
    const [mapSize, setMapSize] = useState(null)

    // marker

    const [markerSet, setMarkerSet] = useState([

        [{ top: 45, left: 50 },{ top: 45, left: 25 }],
        [{ top: 35, left: 50 },{ top: 35, left: 40 }]
    
    ])
      
    const [markers, setMarkers] = useState(markerSet[0])


    const handle_showBooth = (boothID) => {

    }

    const update_mapHeight = () => {

        const map = mapRef.current
        const mapStyle = map.style

        if(mapSize !== null){

            let originalWidth = mapSize[0]
            let originalHeight = mapSize[1]
            let currentHeight = map.offsetHeight
            let newWidth =  (currentHeight * originalWidth / originalHeight)
      
            mapStyle.minWidth = `${newWidth}px`

        }

    }

    useEffect(()=>{

        update_mapHeight()

    }, [mapSize, setMapSize])

    useEffect(()=>{

        window.addEventListener('resize', update_mapHeight)
        return () => window.removeEventListener('resize', update_mapHeight)

    },[mapSize])

    const CustomMarker = (props) => {

        return (
          <Button 
            onClick={()=>handle_showBooth(props.itemNumber)}
            colorScheme={themeColor} width={50} height={50}
            borderRadius={"50%"} border={'5px solid white'}
            boxShadow={'0px 0px 22px 0px rgba(0, 0, 0, .8)'}
            >
            {props.itemNumber}
          </Button>
        );

    };

    return (
        
        <ScrollMap>

            <LoadImageSize 
                src="/images/test-floor-plan-1.jpg" 
                onLoad={e=>setMapSize([e.target.clientWidth, e.target.clientHeight])}/>

            <MapContainer ref={mapRef}>

                <ImageMarker
                    src="/images/test-floor-plan-1.jpg"
                    markers={markers}
                    markerComponent={CustomMarker}
                    />

            </MapContainer>

            <BoothPanel
                isShowBooth={isShowBooth}
                setIsShowBooth={setIsShowBooth}
                themeColor={themeColor}
                />

        </ScrollMap>
        
    )
}

export default TourGuideMap

const ScrollMap = styled(Box)`

    width: inherit; max-width: inherit;
    height: inherit; max-height: inherit;
    overflow: scroll;

`

const MapContainer = styled(Box)`

    position: relative;
    height: inherit;
    background: blue;

`

const LoadImageSize = styled(Image)`

    position: absolute;
    opacity: 0;
    z-index: -999;

`
