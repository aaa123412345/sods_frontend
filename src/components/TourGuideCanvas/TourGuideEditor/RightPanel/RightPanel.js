import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import { faMapLocationDot, faPen, faTent, faTrash } from '@fortawesome/free-solid-svg-icons'

import Toolbar from '../../../Common/common/Toolbar/Toolbar'
import { tourEditorData } from '../../../../data/tourEditorData'

import { updateFloorplan, updateStory } from '../../../../redux/form/form.action'
import { openModal } from '../../../../redux/modal/modal.action'
import { tourHost } from '../../../../constants/constants'

const RightPanel = (props) => {

    const { tourguide, modal, form } = props
    const { itemIndex, floorplans, stories } = tourguide
    const { floorplan, story } = form
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const { subsubpath } = useParams()

    // chakra hooks
    const bg = useColorModeValue('gray.10', 'gray.100')
    
    // constants
    const categories = [{path: "floorplans", label: t('tourguide.floorplan'), icon: faMapLocationDot}, {path: "booths", label: t('tourguide.booth'), icon: faTent}]
    const isStoryEditor = subsubpath === "stories"

    // react hooks
    const contentRef = useRef(null)

    const onOpen = (isDelete = false) => {

        let floorplanPayload = {...floorplans[itemIndex]}
        let storyPayload = {...stories[itemIndex]} 
        let payload = isStoryEditor ? storyPayload : floorplanPayload

        let path = isStoryEditor ? 'stories':'floorplans'
        let name = isStoryEditor ? 'story' : 'floorplan'
        let method = isDelete ? "delete" : "put"

        let modalPayload = {
            modalName: name,
            host: tourHost, path: path, method: method,
            name: name, id: payload.id
        }
        
        if(isStoryEditor)
            dispatch(updateStory(storyPayload))
        else
            dispatch(updateFloorplan(floorplanPayload))

        dispatch(openModal(modalPayload))

    }

    return (
        
        <Container maxW={{base: "100%", md: "calc(100% - 250px)"}}>
            
        
            <Toolbar type={2} 
                heading={isStoryEditor ? t('tourguideEditor.preview-ticket') : undefined}
                categoryList={isStoryEditor ? undefined : categories}
                optionList={ [
                    {text: t(`tourguideEditor.edit-${isStoryEditor ? "story" : 'region'}`), faIcon: faPen, onClick: ()=>onOpen(false)},
                    {text: t(`tourguideEditor.delete-${isStoryEditor ? "story" : 'region'}`), faIcon: faTrash, onClick: ()=>onOpen(true)}]} />


            <Content bg={bg} ref={contentRef} minH={{base: "80vh", md: "calc(100% - 2em)"}}>
  
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
    flex-direction: row; 
    height: calc(100% - 2em); 
    width: 100%; 
    border-radius: 25px;
    overflow: hidden;

`