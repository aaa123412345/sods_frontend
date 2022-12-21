import React, { useRef } from 'react'
import styled from 'styled-components'

import { Flex, useColorModeValue } from '@chakra-ui/react'
import { faMapLocationDot, faPen, faTent } from '@fortawesome/free-solid-svg-icons'

import tourPageData from '../../../../data/tourPageData'
import Toolbar from '../../common/Toolbar/Toolbar'
import { useDispatch, connect } from 'react-redux'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import { updateFloorplan, updateStory } from '../../../../redux/form/form.action'
import { openModal } from '../../../../redux/modal/modal.action'

const RightPanel = (props) => {

    const { tourguide, modal, form } = props
    const { page, regionIndex, storyIndex, floorplans, stories } = tourguide
    const { floorplan, story } = form
    const dispatch = useDispatch()

    // session storage
    const [floorplanSession, setFloorplanSession] = useSessionStorage('floorplan', floorplan)
    const [storySession, setStorySession] = useSessionStorage('story', story)
    const [modalSession, setModalSession] = useSessionStorage('modal', modal)

    // chakra hooks
    const bg = useColorModeValue('gray.10', 'gray.100')
    
    // constants
    const categories = [{label: "Floor Plan", icon: faMapLocationDot}, {label: "Booth", icon: faTent}]
    const isTicketEditor = page === 2

    // react hooks
    const contentRef = useRef(null)

    const onOpen = () => {

        let floorplanPayload = {...floorplans[regionIndex]}
        let storyPayload = {...stories[storyIndex]} 

        let modalPayload = {

            page: 0,
            modalIndex: isTicketEditor ? 4 : 0,
            path: isTicketEditor ? 'story':'floorplans',
            method: "put",
            name: isTicketEditor ? 'story' : 'floorplan',
            id: isTicketEditor ? storyPayload.id : floorplanPayload.id

        }
        
        if(isTicketEditor){
            setStorySession(storyPayload)
            dispatch(updateStory(storyPayload))
        }else{
            setFloorplanSession(floorplanPayload)
            dispatch(updateFloorplan(floorplanPayload))
        }

        setModalSession({...modalSession, ...modalPayload})
        dispatch(openModal(modalPayload))

    }

    return (
        
        <Container maxW={{base: "100%", md: "calc(100% - 250px)"}}>
            
        
            <Toolbar type={2} 
                categoryList={isTicketEditor ? undefined : categories}
                heading={isTicketEditor ? "Preview Ticket Cover" : undefined}
                optionList={ [{text: `Edit ${isTicketEditor ? "Story" : 'Region'}`, faIcon: faPen, onClick: onOpen}]} />


            <Content bg={bg} ref={contentRef}>
  
                {
                    tourPageData[page].components.map((component, index) => {

                        var props = {

                            key: index, 
                            ...component.props,
                            
                        }

                        // extra properties
                        if(page === 0){
                            props['height'] = contentRef.current === null ? null : contentRef.current.offsetHeight
                            props['regionIndex'] = regionIndex
                        }

                        return React.createElement(component.type, {...props})

                    })
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