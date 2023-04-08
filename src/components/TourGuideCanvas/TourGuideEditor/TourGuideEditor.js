import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styled from 'styled-components'
import { Flex, Heading, Button, useColorModeValue } from '@chakra-ui/react'

import { useDispatch, connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import AnimatedPage from '../../Common/common/AnimatedPage/AnimatedPage'
import RightPanel from './RightPanel/RightPanel'
import LeftPanel from './LeftPanel/LeftPanel'

import { langGetter } from '../../../helpers/langGetter'
import CustomButton from '../../Common/common/CustomButton/CustomButton'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { openModal } from '../../../redux/modal/modal.action'
import { tourHost } from '../../../constants/constants'
import { updateConfigInput } from '../../../redux/form/form.action'
import { updateOriginalThemeColor } from '../../../redux/sysConfig/sysConfig.action'
 
const TourGuideEditor = (props) => {

    const { tourguide, modal, sysConfig, form } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'
    const { floorplans, stories, itemIndex } = tourguide
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
        floorplans: floorplans[itemIndex]?.id, 
        stories: stories[itemIndex]?.id
    }

    const change_page = (type) => {
        navigate(`/server/${lang}/tourguide/editor/${type}`)
    }

    const open_setting_modal = () => {
        dispatch(updateOriginalThemeColor(config?.themeColor))
        dispatch(updateConfigInput({
            themeColor: config?.themeColor, 
            opendayDate: config?.opendayDate??JSON.stringify(new Date().toISOString()), 
            minStampNum: config?.minStampNum
        }))
        let payload = {
            modalName: 'configs', 
            host: tourHost, path: 'configs', method: 'put', 
            name: 'configs'
        }
        dispatch(openModal(payload))
    }

    useEffect(()=>{

        const excludeCase = subsubpath === 'booths'

        if(subsubpath === undefined || subsubpath === null)
            navigate(`/server/${lang}/tourguide/editor/${defaultEditorPath}/${pathIdDictionary[defaultEditorPath] ?? "None"}`)
        else {
    
            if((subsubsubpath === undefined || subsubsubpath === null) && !excludeCase)
                navigate(`/server/${lang}/tourguide/editor/${subsubpath}/${pathIdDictionary[subsubpath] ?? "None"}`)

        }

    },[])

    const EditorHeader = () => {
        return (
            <HeaderContainer bg={headerBg}>
                <CustomButton faIcon={faGear} onClick={open_setting_modal} isCircle/>
                <Heading size="sm" mr="1em">{t('tourguideEditor.editor-type')}</Heading>
                <Button variant={tourguideScope.includes(subsubpath) ? themeColor : 'gray'} onClick={()=>change_page('floorplans')}>{t('tourguideEditor.tourguide')}</Button> 
                <Button variant={storiesScope.includes(subsubpath) ? themeColor : 'gray'} onClick={()=>change_page('stories')}>{t('tourguideEditor.cover-story')}</Button>
            </HeaderContainer>
        )
    }

    return (

        <AnimatedPage>
            
            <EditorHeader />
        
            <Container bg={bg} flexDir={{base: 'column', md: 'row'}}
                maxH={{base: "fit-content", md: "calc(100% - 80px)"}}>
                <LeftPanel />
                <RightPanel />
            </Container>

        </AnimatedPage>

    )

}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        sysConfig: state.sysConfig,
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
    position: relative;
    width: inherit;
    
`
