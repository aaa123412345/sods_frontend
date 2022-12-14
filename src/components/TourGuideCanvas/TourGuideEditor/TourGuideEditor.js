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
                right="5px">
                { colorMode === 'light'? "Light":"Dark"} Mode
            </Button>
        )
    }

    return (
        <React.Fragment>
            <EditorHeader bg={bg}>
                <Heading ml=".5em" size="lg">Tour Guideline Editor</Heading>
            </EditorHeader>
            
            <Container bg={bg}
                flexDir={{base: 'column', md: 'row'}}>
            
                <LeftPanel />
                
                <RightPanel />

                <EditorModal assignRequests={tourModalData[modalIndex].assignRequests} pages={tourModalData[modalIndex].pages}/>

                <DarkLightModeButton/>

            </Container>

        </React.Fragment>
    )

}

export default TourGuideEditor

const EditorHeader = styled(Flex)`

    align-items: center;
    width: calc(100% + 0px);
    height: 100%; max-height: 80px;
    padding: 28px 0em;

`

const Container = styled(Flex)`

    height: fit-content; 
    min-height: calc(100% - 80px + 14px);
    position: relative;
    width: inherit;

`