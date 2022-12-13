import React from 'react'
import styled from 'styled-components'

import { Flex, Heading, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'

import RightPanel from './RightPanel/RightPanel'
import EditorModal from '../TourGuideComponents/EditorModal/EditorModal'
import LeftPanel from './LeftPanel/LeftPanel'

import tourModalData from '../../../data/tourModalData'
import { useSelector } from 'react-redux'
 
const TourGuideEditor = (props) => {

    // redux state
    const { modalIndex } = useSelector(state => state.modal)

    // chakra hooks
    const bg = useColorModeValue("white", "black")
    const { colorMode, toggleColorMode } = useColorMode()

    const DarkLightModeButton = () => {
        return (
            <Button onClick={toggleColorMode}
                variant="gray"
                position="absolute" zIndex="999"
                bottom="1em" right="1em">
                { colorMode === 'light'? "Light":"Dark"} Mode
            </Button>
        )
    }

    return (
        <>
            <EditorHeader bg={bg}>
                <Heading ml=".5em" size="lg">Tour Guideline Editor</Heading>
            </EditorHeader>
            
            <Container bg={bg}
                overflow={{base: 'scroll', md: 'hidden'}}
                flexDir={{base: 'column', md: 'row'}}>
            
                <LeftPanel />
                
                <RightPanel />

                <EditorModal assignRequests={tourModalData[modalIndex].assignRequests} pages={tourModalData[modalIndex].pages}/>

                <DarkLightModeButton/>

            </Container>

        </>
    )

}

export default TourGuideEditor

const EditorHeader = styled(Flex)`

    flex: 1;
    align-items: center;
    height: 80px; max-height: 80px;

`

const Container = styled(Flex)`

    height: calc(100% - 80px); 
    width: inherit;

`