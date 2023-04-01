import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'
import parse from 'html-react-parser'

import { Flex,Box,Text, SkeletonText, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons'

import SimilarQuestions from './SimilarQuestions/SimilarQuestions'
import BoothRecommendations from './BoothRecommendations/BoothRecommendations'
import { you } from '../../../../../constants/constants'

const Bubble = (props) => {

    const { dialog, sendTime, isBotSent, chatLang, sysConfig, sendMessage, isSkeleton } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const bg = useColorModeValue('gray.10', 'gray.100')
    const shadow = useColorModeValue(0, 255)

    return (
        
        <Message alignItems={isBotSent || isSkeleton?'flex-start':'flex-end'}>


            <Flex alignItems="center">
                <Text m=".5em 0"><FontAwesomeIcon icon={isBotSent||isSkeleton?faRobot:faUser} />&nbsp;{isBotSent||isSkeleton?"O-Bot":you[chatLang]}&nbsp;</Text> 
                <Text color="gray" fontSize=".8rem">&nbsp;{sendTime}</Text>
            </Flex>

            
            <BubbleText bg={isBotSent||isSkeleton?bg:themeColor} color={isBotSent || isSkeleton?"":'white'}
                boxShadow={`0px 0px 16px rgba(${shadow}, ${shadow}, ${shadow}, .2)`}
                borderRadius={`${isBotSent || isSkeleton?0:12}px ${isBotSent || isSkeleton?12:0}px 12px 12px`}>
                
                {
                    isSkeleton?
                    <SkeletonText mt="4" width="30px" noOfLines={1} skeletonHeight="2" spacing="4"/>
                    :
                    parse(dialog?.message??"")
                }

            </BubbleText>

            <BoothRecommendations recommendations={dialog?.payload} color={themeColor} />
            <SimilarQuestions questions={dialog?.predict_questions} color={themeColor} sendMessage={sendMessage}/>

           
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
    z-index: 500;
    position: relative;

`

const BubbleText = styled(Box)`

    padding: .5em .8em;
    width: fit-content; max-width: 80%;

    ol {
        margin: 1em;
    }

    a {
        text-decoration: underline;
        color: blue;
    }

`