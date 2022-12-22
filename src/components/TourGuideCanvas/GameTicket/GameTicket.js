import React, { useState, useEffect, useRef, createRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Flex, Box, Text, Heading, useColorModeValue, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleDown, faArrowCircleUp, faLock, faStamp } from '@fortawesome/free-solid-svg-icons'

import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner'

import { useDispatch, connect } from 'react-redux'
import { updateStories } from '../../../redux/tourguide/tourguide.action'
import StorySplider from './StorySplider/StorySplider'

const GameTicket = (props) => {

    const { isPreviewMode = false, tourguide } = props
    const { host, stories, storyProgress, storyIndex, isAdmin, themeColor } = tourguide
    const dispatch = useDispatch()

    const bg = useColorModeValue('white', 'black')

    const [isShowTicket, setIsShowTicket] = useState(true)

    const ShowHideButton = () => {
        return (
            <FloatButton borderRadius={'0 0 50px 50px'} variant={themeColor}>
                <FontAwesomeIcon icon={isShowTicket ? faArrowCircleUp : faArrowCircleDown}/>                
            </FloatButton>
        )
    }

    return (
        <React.Fragment>
            {/* {
                !isPreviewMode &&
                
                <Ticket>

                    <Content bg={bg} borderRadius={'0 0 25px 25px'}>

                        <Heading><FontAwesomeIcon icon={faStamp} style={{marginRight: '.5em'}}/>Your Ticket</Heading>
                    </Content>

                    <ShowHideButton/>
                </Ticket>

            } */}
            <StorySplider isPreviewMode={isPreviewMode} />
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        modal: state.modal
    };
};

export default connect(
    mapStateToProps,
    null
)(GameTicket)

const Ticket = styled(Box)`

    margin: 0em;
    width: 100%;
    height: 80vh;
    position: relative; 
    z-index: 1000; top: 0;

`

const Content = styled(Box)`

    position: relative;
    margin: 5% auto;
    width: 100%; height: 100%;

`

const FloatButton = styled(Button)`

    position: relative; z-index: 1001;
    bottom: 0; 
    margin: 0 auto !important; 


`