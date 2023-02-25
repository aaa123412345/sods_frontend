import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import { faMapLocationDot, faPen, faTent, faTrash } from '@fortawesome/free-solid-svg-icons'

import Toolbar from '../../../Common/common/Toolbar/Toolbar'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import { tourEditorData } from '../../../../data/tourEditorData'

import { updateFloorplan, updateStory } from '../../../../redux/form/form.action'
import { openModal } from '../../../../redux/modal/modal.action'

const RightPanel = (props) => {

    const { tourguide, modal, form } = props
    const { itemIndex, floorplans, stories } = tourguide
    const { floorplan, story } = form
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const { subsubpath } = useParams()

    const isShowSession = false

    // session storage
    const [floorplanSession, setFloorplanSession] = useSessionStorage('floorplan', floorplan)
    const [storySession, setStorySession] = useSessionStorage('story', story)
    const [modalSession, setModalSession] = useSessionStorage('modal', modal)

    // chakra hooks
    const bg = useColorModeValue('gray.10', 'gray.100')
    
    // constants
    const categories = [{path: "floorplans", label: t('tourguide.floorplan'), icon: faMapLocationDot}, {path: "booths", label: t('tourguide.booth'), icon: faTent}]
    const isTicketEditor = subsubpath === "tickets"

    // react hooks
    const contentRef = useRef(null)

    const onOpen = (isDelete = false) => {

        // let floorplanPayload = {...floorplans[itemIndex]}
        // let storyPayload = {...stories[itemIndex]} 
        // let payload = isTicketEditor ? storyPayload : floorplanPayload

        // let modalIndex = isTicketEditor ? 4 : 0
        // let path = isTicketEditor ? 'story':'floorplans'
        // let name = isTicketEditor ? 'story' : 'floorplan'

        // let modalPayload = {

        //     page: 0, modalIndex: isDelete?5:modalIndex,
        //     path: path, method: isDelete?"delete":"put",
        //     name: name, id: payload.id, 
        //     byteData: payload.imageData

        // }
        
        // if(isTicketEditor){
        //     setStorySession(storyPayload)
        //     dispatch(updateStory(storyPayload))
        // }else{
        //     setFloorplanSession(floorplanPayload)
        //     dispatch(updateFloorplan(floorplanPayload))
        // }

        // // avoid compiled warnings
        // if(isShowSession){
        //     console.log(floorplanSession)
        //     console.log(storySession)
        // }

        // setModalSession({...modalSession, ...modalPayload})
        // dispatch(openModal(modalPayload))

    }

    return (
        
        <Container maxW={{base: "100%", md: "calc(100% - 250px)"}}>
            
        
            <Toolbar type={2} 
                heading={isTicketEditor ? t('tourguideEditor.preview-ticket') : undefined}
                categoryList={isTicketEditor ? undefined : categories}
                optionList={ [
                    {text: t(`tourguideEditor.edit-${isTicketEditor ? "story" : 'region'}`), faIcon: faPen, onClick: ()=>onOpen(false)},
                    {text: t(`tourguideEditor.delete-${isTicketEditor ? "story" : 'region'}`), faIcon: faTrash, onClick: ()=>onOpen(true)}]} />


            <Content bg={bg} ref={contentRef}>
  
                {
                    tourEditorData[subsubpath ?? ""]?.components?.map((component, index) => {

                        return React.createElement(
                            component.type, 
                            { 
                                key: index, 
                                height: contentRef?.current?.offsetHeight, 
                                itemIndex: itemIndex, 
                                ...component.props
                            })

                    }) ?? <></>
                }
                
            </Content>
            
        </Container>

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
)(RightPanel)

const Container = styled(Flex)`

    position: relative;
    flex-direction: column;
    flex: 1;
    margin: 1em; 
    border-radius: 25px;

`

const Content = styled(Flex)`

    position: relative; 
    margin: 1em auto;
    flex-direction: column; 
    height: calc(100% - 2em); 
    width: 100%; 
    border-radius: 25px;
    overflow: hidden;

`