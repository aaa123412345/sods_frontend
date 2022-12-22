import React, { useEffect } from 'react'
import styled from 'styled-components'

import { Flex, Box, Heading, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'

import EditorModal from '../common/EditorModal/EditorModal'
import RightPanel from './RightPanel/RightPanel'
import LeftPanel from './LeftPanel/LeftPanel'

import tourModalData from '../../../data/tourModalData'
import { useDispatch, connect } from 'react-redux'
import useSessionStorage from '../../../hooks/useSessionStorage'
import { updatePage } from '../../../redux/tourguide/tourguide.action'
import { useTranslation } from 'react-i18next'

 
const TourGuideEditor = (props) => {

    const { tourguide, modal } = props
    const { themeColor, page } = tourguide
    const { modalIndex } = modal
    const dispatch = useDispatch()

    const { t, i18n } = useTranslation()

    // chakra hooks
    const bg = useColorModeValue("white", "black")
    const headerBg = useColorModeValue("gray.10", "gray.100")
    const { colorMode, toggleColorMode } = useColorMode()

    // session storage
    const [pageSession, setPageSession] = useSessionStorage('page', 0)


    const change_page = (page) => {
        dispatch(updatePage(page))
        setPageSession(page)
    }

    useEffect(()=>{
        dispatch(updatePage(pageSession))
    },[])

    const DarkLightModeButton = () => {
        return (
            <ModeButton onClick={toggleColorMode} variant="gray" position="absolute">
                { colorMode === 'light'? "Light":"Dark"} Mode
            </ModeButton>
        )
    }

    const EditorHeader = () => {
        return (
            <HeaderContainer bg={headerBg}>
                <Heading size="sm" mr="1em">{t('tourguideEditor.editor-type')}</Heading>
                <Button variant={page <= 1 ? themeColor : 'gray'} onClick={()=>change_page(0)}>{t('tourguideEditor.tourguide')}</Button> 
                <Button variant={page === 2 ? themeColor : 'gray'} onClick={()=>change_page(2)}>{t('tourguideEditor.cover-story')}</Button>
            </HeaderContainer>
        )
    }

    return (
        <React.Fragment>
            
            <EditorHeader />
            
            <Container bg={bg} flexDir={{base: 'column', md: 'row'}}>
            
                <LeftPanel />
                
                <RightPanel />

                <EditorModal pages={tourModalData[modalIndex].pages}/>

                <DarkLightModeButton/>

            </Container>

        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        modal: state.modal,
        form: state.form
    };
};

export default connect(
    mapStateToProps,
    null
)(TourGuideEditor)

const HeaderContainer = styled(Flex)`

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

const ModeButton = styled(Button)`

    z-index: 999;
    right: 5px;
    bottom: 5px;

`