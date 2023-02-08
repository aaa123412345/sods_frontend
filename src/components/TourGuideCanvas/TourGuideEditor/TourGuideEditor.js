import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styled from 'styled-components'
import { Flex, Heading, Button, useColorModeValue } from '@chakra-ui/react'

import { useDispatch, connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import AnimatedPage from '../common/AnimatedPage/AnimatedPage'
import EditorModal from '../common/EditorModal/EditorModal'
import RightPanel from './RightPanel/RightPanel'
import LeftPanel from './LeftPanel/LeftPanel'

import tourModalData from '../../../data/tourModalData'
import useSessionStorage from '../../../hooks/useSessionStorage'
import { updateItemIndex, updatePage } from '../../../redux/tourguide/tourguide.action'
import { langGetter } from '../../../helpers/langGetter'

 
const TourGuideEditor = (props) => {

    const { tourguide, modal } = props
    const { themeColor, floorplans, stories } = tourguide
    const { modalIndex } = modal
    const dispatch = useDispatch()

    const { subsubpath, subsubsubpath } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const lang = langGetter() === 'en' ? 'eng' : 'chi'

    // chakra hooks
    const bg = useColorModeValue("white", "black")
    const headerBg = useColorModeValue("gray.10", "gray.100")

    // handle url 
    const defaultEditorPath = 'floorplans'
    const tourguideScope = ['floorplans', 'booths']
    const storiesScope = ['stories']
    const pathIdDictionary = {
        floorplans: floorplans[0]?.id, 
        stories: stories[0]?.id
    }

    const change_page = (type) => {
        navigate(`/public/${lang}/tourguide/editor/${type}`)
    }

    useEffect(()=>{

        const excludeCase = subsubpath === 'booths'

        if(subsubpath === undefined || subsubpath === null)
            navigate(`/public/${lang}/tourguide/editor/${defaultEditorPath}/${pathIdDictionary[defaultEditorPath] ?? " "}`)
        else {
    
            if((subsubsubpath === undefined || subsubsubpath === null) && !excludeCase)
                navigate(`/public/${lang}/tourguide/editor/${subsubpath}/${pathIdDictionary[subsubpath] ?? " "}`)

        }

    },[])

    const EditorHeader = () => {
        return (
            <HeaderContainer bg={headerBg}>
                <Heading size="sm" mr="1em">{t('tourguideEditor.editor-type')}</Heading>
                <Button variant={tourguideScope.includes(subsubpath) ? themeColor : 'gray'} onClick={()=>change_page('floorplans')}>{t('tourguideEditor.tourguide')}</Button> 
                <Button variant={storiesScope.includes(subsubpath) ? themeColor : 'gray'} onClick={()=>change_page('stories')}>{t('tourguideEditor.cover-story')}</Button>
            </HeaderContainer>
        )
    }

    return (
        <AnimatedPage>
            
             <EditorHeader />
            
             <Container bg={bg} flexDir={{base: 'column', md: 'row'}}>
                 <LeftPanel />
                 <RightPanel />
                 {/* <EditorModal pages={tourModalData[modalIndex].pages}/> */}
             </Container>

        </AnimatedPage>

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
    min-height: calc(100% - 80px);
    max-height: calc(100% - 80px);
    position: relative;
    width: inherit;

`
