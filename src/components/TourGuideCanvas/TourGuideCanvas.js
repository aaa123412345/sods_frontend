import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { ChakraProvider } from '@chakra-ui/react'
import { newTheme } from '../../theme/theme'
import { Flex, Box, Button } from '@chakra-ui/react'

import { useSelector } from 'react-redux'

import TourGuideEditor from './TourGuideEditor/TourGuideEditor'
import TourGuideMap from './TourGuideComponents/TourGuideMap/TourGuideMap'
import useSessionStorage from '../../hooks/useSessionStorage'
import GameTicket from './TourGuideComponents/GameTicket/GameTicket'

const TourGuideCanvas = () => {

    // session storage
    const [mapModeSession, setMapModeSession] = useSessionStorage('mapMode', false)

    // chakra hooks
    const themeColor = useSelector(state => state.themeConfig.themeColor)

    // react hooks
    const [isAdmin, setIsAdmin] = useState(false) // for development use
    const [isMap, setIsMap] = useState(true)

    const update_AdminMode = (pathname) => { 
        return pathname.slice(1, 7) === "public" ? false : true 
    }

    const change_editMode = () => {
        setMapModeSession(!isMap)
        setIsMap(!isMap)
    }

    const render_label = () => {

        if(isAdmin)
            return isMap ? "Edit" : "Preview" 
        else
            return isMap ? "My Ticket" : "Map"

    }

    useEffect(()=>{

        let canEdit = update_AdminMode(window.location.pathname)
        setIsAdmin(canEdit) // for development use
        setIsMap(mapModeSession)

    }, [window.location.pathname])

    return (
        <ChakraProvider resetCSS theme={newTheme}>

            <OuterContainer w={{base: "100%", md: "calc(100vw - 210px)"}}>

                { isMap && <TourGuideMap /> }

                { !isMap && !isAdmin && <GameTicket /> }

                { !isMap && isAdmin && <TourGuideEditor /> }

                <Float> 
                    <EditButton
                        variant={themeColor}
                        borderRadius={25}
                        onClick={change_editMode}>
                            {render_label()}
                    </EditButton>
                    
                </Float>

            </OuterContainer>
            
        </ChakraProvider>
    )

}

export default TourGuideCanvas

const OuterContainer = styled(Flex)`

    flex-direction: column;
    position: absolute;
    height: 100vh;
    max-width: 100vw;
    right: 0; margin-top: -12px;

`
const Float = styled(Box)`

    position: absolute;
    z-index: 3;
    left: 0;
    

`

const EditButton = styled(Button)``