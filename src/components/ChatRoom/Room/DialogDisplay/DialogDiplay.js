import React, { useState, useRef } from 'react'

import { connect } from 'react-redux'

import styled from 'styled-components'
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react'

import { Canvas } from '@react-three/fiber'

import Bubble from './Bubble/Bubble'
import RobotCanvas from '../RobotCanvas/RobotCanvas'

const DialogDiplay = (props) => {

    const { bottomRef, dialogs, chatLang, sysConfig, sendMessage, isWaiting, animationIndex } = props

    const bg = useColorModeValue('gray.10', 'gray.100')


    return (

        <Box w="100%" h={{base: `calc(100vh - 120px)`, md: `calc(550px - 120px)`}}>

            <DialogDiplayContainer bg={'transparent'} w="90%" m="0 auto"
                h={{base: `calc(100vh - 120px)`, md: `calc(550px - 120px)`}}
                maxH={{base: `calc(100vh - 120px)`, md: `calc(550px - 120px)`}}
                >
                
                {
                    dialogs.map((dialog, index)=>(
                        <Bubble key={index} dialog={dialog} isBotSent={dialog.user_id === 'bot'} chatLang={chatLang} sendTime={dialog.sendTime} sendMessage={sendMessage} />
                    ))
                }

                { isWaiting && <Bubble isSkeleton/>}

                <div ref={bottomRef}/>


            </DialogDiplayContainer>
            <RobotCanvas animationIndex={animationIndex} />
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        sysConfig: state.sysConfig
    };
};

export default connect(
    mapStateToProps,
    null
)(DialogDiplay)

const DialogDiplayContainer = styled(Box)`

    position: absolute;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 1em;


`