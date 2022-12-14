import React from 'react'
import styled from 'styled-components'

import { Flex, Heading, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'

import RightPanel from './RightPanel/RightPanel'
import EditorModal from '../TourGuideComponents/EditorModal/EditorModal'
import LeftPanel from './LeftPanel/LeftPanel'

import tourModalData from '../../../data/tourModalData'
import { useDispatch, useSelector } from 'react-redux'
import useSessionStorage from '../../../hooks/useSessionStorage'
import { useEffect } from 'react'
 
const TourGuideEditor = (props) => {

    // redux state
    const { themeColor } = useSelector(state => state.themeConfig)
    const { page } = useSelector(state => state.tourguide)
    const { modalIndex } = useSelector(state => state.modal)
    const dispatch = useDispatch()

    // chakra hooks
    const bg = useColorModeValue("white", "black")
    const headerBg = useColorModeValue("gray.10", "gray.100")
    const { colorMode, toggleColorMode } = useColorMode()

    // session storage
    const [pageSession, setPageSession] = useSessionStorage('page', 0)


    const change_page = (page) => {
        dispatch({type: "UPDATE_PAGE", payload: page})
        setPageSession(page)
    }

    useEffect(()=>{
        dispatch({type: "UPDATE_PAGE", payload: pageSession})
    },[])

    const DarkLightModeButton = () => {
        return (
            <Button onClick={toggleColorMode}
                variant="gray"
                position="absolute" zIndex="999"
                right="5px" bottom="5px">
                { colorMode === 'light'? "Light":"Dark"} Mode
            </Button>
        )
    }

    return (
        <React.Fragment>
            <EditorHeader bg={headerBg}>
                <Heading size="sm" mr="1em">Editor Type</Heading>
                <Button variant={page <= 1 ? themeColor : 'gray'} onClick={()=>change_page(0)}>Tour Guide</Button> 
                <Button variant={page === 2 ? themeColor : 'gray'} onClick={()=>change_page(2)}>Game Ticket</Button>
            </EditorHeader>
            
            <Container bg={bg}
                flexDir={{base: 'column', md: 'row'}}>
            
                <LeftPanel />
                
                <RightPanel />

                <EditorModal pages={tourModalData[modalIndex].pages}/>

                <DarkLightModeButton/>

            </Container>

        </React.Fragment>
    )

}

export default TourGuideEditor

const EditorHeader = styled(Flex)`

    align-items: center; 
    width: 100%; 
    height: 100%; max-height: 80px;
    padding: 0px 1em;

`

const Container = styled(Flex)`

    height: fit-content; 
    min-height: calc(100% - 80px + 14px);
    position: relative;
    width: inherit;

`