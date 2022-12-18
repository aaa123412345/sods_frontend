import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { ChakraProvider } from '@chakra-ui/react'
import { newTheme } from '../../theme/theme'
import { Flex, Box, Button } from '@chakra-ui/react'

import { connect, useDispatch } from 'react-redux'
import { updateHost, updateThemeColor } from '../../redux/tourguide/tourguide.action'

import useSessionStorage from '../../hooks/useSessionStorage'

import TourGuideEditor from './TourGuideEditor/TourGuideEditor'
import TourGuideMap from './TourGuideComponents/TourGuideMap/TourGuideMap'
import GameTicket from './TourGuideComponents/GameTicket/GameTicket'
import axios from 'axios'

const TourGuideCanvas = (props) => {

    const { block, tourguide } = props
    const { themeColor, isAdmin } = block

    // redux
    const { page } = tourguide
    const dispatch = useDispatch()

    // session storage
    const [mapModeSession, setMapModeSession] = useSessionStorage('mapMode', !isAdmin)

    // react hooks
    const [isMap, setIsMap] = useState(true)

    // constant 
    const host = isAdmin ? process.env.REACT_APP_SERVER_REST_HOST : process.env.REACT_APP_PUBLIC_REST_HOST

    const change_editMode = () => {

        setIsMap(!isMap)
        setMapModeSession(!isMap)

    }

    const render_label = () => {

        if(isAdmin)
            return isMap ? "Edit" : "Preview" 
        return isMap ? "My Ticket" : "Map"

    }

    useEffect(()=>{

        setIsMap(mapModeSession)
        dispatch(updateThemeColor(themeColor))
        dispatch(updateHost(host))

    }, [window.location.pathname])

    return (
        <ChakraProvider resetCSS theme={newTheme}>

            <OuterContainer>

                { isMap && <TourGuideMap /> }

                { !isMap && !isAdmin && <GameTicket /> }

                { !isMap && isAdmin && <TourGuideEditor /> }

                {

                    ((page !== 2 && isAdmin) || !isAdmin)
                    &&
                    <Float>
                        <Button variant={themeColor} borderRadius={25}
                            onClick={change_editMode}>
                                {render_label()}
                        </Button>
                    </Float>

                }
                
            </OuterContainer>
            
        </ChakraProvider>
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
)(TourGuideCanvas)

const OuterContainer = styled(Flex)`

    flex-direction: column;
    position: relative;
    height: 100vh;
    max-width: 100vw; width: 100%;


`
const Float = styled(Box)`

    position: absolute; z-index: 3;
    right: 1em; top: 1em;
    
`