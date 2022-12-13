import React, { useRef } from 'react'
import styled from 'styled-components'

import { Flex, useColorModeValue } from '@chakra-ui/react'
import { faMapLocationDot, faPen, faTent } from '@fortawesome/free-solid-svg-icons'

import tourPageData from '../../../../data/tourPageData'
import Toolbar from '../../TourGuideComponents/Toolbar/Toolbar'
import { useDispatch, useSelector } from 'react-redux'
import useSessionStorage from '../../../../hooks/useSessionStorage'

const RightPanel = (props) => {

    // redux state
    const modalState = useSelector(state => state.modal)
    const tourguideState = useSelector(state => state.tourguide)
    const { regionIndex, page, floorplans } = tourguideState
    const dispatch = useDispatch()

    // session storage
    const [floorplanSession, setFloorplanSession] = useSessionStorage('floorplan', tourguideState.floorplan)
    const [modalSession, setModalSession] = useSessionStorage('modal', modalState)

    // chakra hooks
    const bg = useColorModeValue('gray.10', 'gray.100')
    
    // constants
    const categories = [{label: "Floor Plan", icon: faMapLocationDot}, {label: "Booth", icon: faTent}]

    // react hooks
    const contentRef = useRef(null)

    const onOpen = () => {

        let floorplanPayload = {...floorplans[regionIndex]}

        let modalPayload = {

            modalIndex: 0,
            path: 'floorplans',
            method: "put",
            name: 'floorplan',
            updateID: {
                name: 'region',
                value: floorplanPayload.region
            }

        }
        
        setFloorplanSession(floorplanPayload)
        setModalSession({...modalSession, ...modalPayload})
        dispatch({type: "UPDATE_FLOORPLAN", payload: floorplanPayload})
        dispatch({type: "OPEN_MODAL", payload: modalPayload})

    }

    return (
        
        <Container maxW={{base: "100%", md: "calc(100% - 250px)"}}>
            
        
            <Toolbar type={2} 
                categoryList={categories}
                optionList={[{
                    text:"Edit Region", faIcon: faPen, 
                    onClick: onOpen
                }]} />


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

export default RightPanel

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

// const ScrollableContent = styled(Flex)`

//     position: relative;
//     flex-direction: column;
//     overflow: scroll;
//     // max-height: calc(100% - 90px);

// `