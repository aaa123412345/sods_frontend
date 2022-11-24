import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { Flex, Box, Button } from '@chakra-ui/react'

import TourGuideEditor from './TourGuideEditor/TourGuideEditor'
import TourGuideMap from './TourGuideMap/TourGuideMap'

const TourGuideCanvas = (props) => {

    const { themeColor } = props.block

    const [isEditMode, setIsEditMode] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const update_mode = (pathname) => { return pathname.slice(1, 7) === "public" ? false : true }

    useEffect(()=>{

        setIsAdmin(update_mode(window.location.pathname))

    }, [window.location.pathname])

    return (
        <OuterContainer isAdmin={isAdmin}>

            { isEditMode && isAdmin ? <TourGuideEditor/> : <TourGuideMap themeColor={themeColor} /> }

            <Float>
                <EditButton
                    colorScheme={themeColor}
                    borderRadius={'0 25px 0 0'}
                    onClick={()=>setIsEditMode(!isEditMode)}>Edit</EditButton>
            </Float>

        </OuterContainer>
    ) 
    
}

export default TourGuideCanvas

const OuterContainer = styled(Flex)`

    background: red;
    position: fixed;
    width: calc(100vw - 200px); 
    height: ${props=>props.isAdmin? '100%' : 'calc(100vh - 200px)'};
    bottom: 0;

`
const Float = styled(Box)`

    position: fixed;
    bottom: inherit;

`

const EditButton = styled(Button)``