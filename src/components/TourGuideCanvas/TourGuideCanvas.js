import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next';

import styled from 'styled-components'

import { ChakraProvider } from '@chakra-ui/react'
import { newTheme } from '../../theme/theme'
import { Flex, Box, Button, Text } from '@chakra-ui/react'

import { connect, useDispatch } from 'react-redux'
import { updateHost, updateLanguage, updateThemeColor } from '../../redux/tourguide/tourguide.action'

import useSessionStorage from '../../hooks/useSessionStorage'

import TourGuideEditor from './TourGuideEditor/TourGuideEditor'
import TourGuideMap from './TourGuideMap/TourGuideMap'
import GameTicket from './GameTicket/GameTicket'
import QRCodeModal from './QRCodeModal/QRCodeModal'
import DevModePanel from './DevModePanel/DevModePanel'
import { faEdit, faEye, faMap, faTicket, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TourGuideCanvas = (props) => {

    const { block, tourguide } = props
    const { themeColor, isAdmin } = block

    // redux
    const { page } = tourguide
    const dispatch = useDispatch()

    const { t } = useTranslation()

    // session storage
    const [mapModeSession, setMapModeSession] = useSessionStorage('mapMode', !isAdmin)

    // react hooks
    const [isMap, setIsMap] = useState(true)

    // constant 
    const host = process.env.REACT_APP_TOURGUIDE_REST_HOST 
    // const host = "https://150fdc63-ebcf-489f-b8c1-5f868cc433e3.mock.pstmn.io/"

    const change_editMode = () => {

        setIsMap(!isMap)
        setMapModeSession(!isMap)

    }

    const render_label = () => {

        if(isAdmin)
            return isMap ? "edit": "preview" 
        return isMap ? "my-ticket" : "map"

    }

    const render_icon = () => {

        if(isAdmin)
            return isMap ? faEdit : faEye
        return isMap ? faTicket : faMap

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
                    <Float right={isAdmin&&5} bottom={isAdmin&&5}
                        left={!isAdmin&&-5} top={!isAdmin&&200} 
                        transform={`rotateZ(${isAdmin?'0':'-90'}deg)`}>

                        <Button variant={tourguide.themeColor} borderRadius={25} m="0"
                            w="150ppx" minW="150px" maxW="150px"
                            onClick={change_editMode}>
                                <Text>{t(`floorplan.${render_label()}`)}</Text>
                                <FontAwesomeIcon icon={render_icon()} style={{marginLeft: 16}}/>
                        </Button>
                        
                    </Float>

                }

                <DevModePanel />

                <QRCodeModal />

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

    position: relative;
    flex-direction: column;
    height: 100vh;
    max-width: 100vw; width: 100%;


`
const Float = styled(Box)`

    position: absolute; z-index: 999;
    
`