import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import { Flex,Box,Text, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons'

const Bubble = (props) => {

    const { text, sendTime, isBotSent, chatLang, sysConfig } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const you = {
        en: "You",
        zh: '您'
    }

    const bg = useColorModeValue('gray.10', 'gray.100')
    const shadow = useColorModeValue(0, 255)

    return (
        <Message alignItems={isBotSent?'flex-start':'flex-end'}>
            <Flex alignItems="center">
                <Text m=".5em 0"><FontAwesomeIcon icon={isBotSent?faRobot:faUser} />&nbsp;{isBotSent?"AI":you[chatLang]}&nbsp;</Text> 
                <Text color="gray" fontSize=".8rem">&nbsp;{sendTime}</Text>
            </Flex>
            
            <BubbleText bg={!isBotSent?themeColor:bg} color={!isBotSent?'white': ""}
                boxShadow={`0px 0px 16px rgba(${shadow}, ${shadow}, ${shadow}, .2)`}>
                {text}
            </BubbleText>
        </Message>
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
)(Bubble)

const Message = styled(Flex)`
    
    flex-direction: column;
    margin: .5em 1em; 

`

const BubbleText = styled(Box)`

    padding: .5em .8em;
    width: fit-content; max-width: 80%;
    border-radius: 8px;

`