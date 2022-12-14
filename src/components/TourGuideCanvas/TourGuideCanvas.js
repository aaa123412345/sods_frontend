import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import { ChakraProvider } from '@chakra-ui/react'
import { newTheme } from '../../theme/theme'
import { Flex, Box, Button } from '@chakra-ui/react'

import { useSelector } from 'react-redux'

import TourGuideEditor from './TourGuideEditor/TourGuideEditor'
import TourGuideMap from './TourGuideComponents/TourGuideMap/TourGuideMap'
import useSessionStorage from '../../hooks/useSessionStorage'

const TourGuideCanvas = () => {

    // session storage
    const [editorModeSession, setEditorModeSession] = useSessionStorage('editorMode', false)

    // chakra hooks
    const themeColor = useSelector(state => state.themeConfig.themeColor)

    // react hooks
    const [isAdmin, setIsAdmin] = useState(false) // for development use
    const [isEditMode, setIsEditMode] = useState(true)

    const update_mode = (pathname) => { 
        return pathname.slice(1, 7) === "public" ? true : true 
    }

    const change_editMode = () => {
        setEditorModeSession(!isEditMode)
        setIsEditMode(!isEditMode)
    }

    useEffect(()=>{

        let canEdit = update_mode(window.location.pathname)
        setIsAdmin(canEdit) // for development use
        setIsEditMode(editorModeSession)

    }, [window.location.pathname])

    return (
        <ChakraProvider resetCSS theme={newTheme}>

            <OuterContainer w={{base: "100%", md: "calc(100vw - 200px)"}}>

                { isEditMode && isAdmin ? <TourGuideEditor /> : <TourGuideMap /> }

                <Float> 
                    <EditButton
                        variant={themeColor}
                        borderRadius={25}
                        onClick={change_editMode}>
                            {isAdmin?isEditMode?"Preview":"Edit":"My Ticket"}
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
    right: 0;

`

const EditButton = styled(Button)``