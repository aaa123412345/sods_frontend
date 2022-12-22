import React from 'react'

import styled from 'styled-components'

import { Flex, Heading, Text, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faUser, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { connect, useDispatch } from 'react-redux'
import EditorButton from '../../../common/EditorButton/EditorButton'
import { updateVRBoothID } from '../../../../../redux/vrTour/vtTour.action'
import { openQRModal } from '../../../../../redux/modal/modal.action'

const MainInfo = (props) => {
  
    // const { setPage, boothInfo, tourguide } = props
    const { setPage, tourguide } = props
    const { themeColor } = tourguide
    const dispatch = useDispatch()

    // testing boothInfo
    const boothInfo = {
        name: "New Booth",
        venue: "1 Floor, rm 102",
        description: "na"
    }

    const goto_scanner = () => {
        dispatch(openQRModal())
    }

    const goto_vrTour = () => {
        dispatch(updateVRBoothID(boothInfo.id))
        window.location.replace('tourguide-vr');
    }

    const opendayDate = new Date().toDateString()
    const today = new Date()

    const currentAction = opendayDate !== today.toDateString() ? 'vr' : 'game'

    const actionBtnConfig = {
        game: {
            text: "Let's get a stamp",
            onClick: goto_scanner
        }, 
        vr: {
            text: "Let's Start VR Tour",
            onClick: goto_vrTour
        }, 
    }


    const IconText = (props) => {

        const {icon, text} = props

        return (

            <Flex mt='.5em' >
                <Text color={themeColor}>
                    <FontAwesomeIcon icon={icon} />
                </Text>
                <Text ml=".5em">{text}</Text>
            </Flex>
           
        )

    }

    // console.log("mainInfo: ", boothInfo)

    if(boothInfo === null || boothInfo === undefined)
    return (
        <Container>
            <Flex alignItems='center' justifyContent="center" flex="1">
                <Text>Please select a booth within the floor plan. </Text>
            </Flex>
        </Container>
    )

    return (
        <Container overflowY={{base: 'scroll', md: 'hidden'}}>

            <Heading m={'.5em 0'} color={themeColor} size="lg">{boothInfo['name']}</Heading>
            {/* <IconText icon={faUser} text={boothInfo['visitorNum'] + " visitor(s) now"}/> */}
            <IconText icon={faLocationDot} text={boothInfo['venue']}/> 
            <Heading size={'sm'} color={themeColor} mt="1.5em">Description</Heading>
            <Text mt=".5em">{boothInfo["description"]}</Text>
            {/* <Button variant={'gray'} borderRadius={25} onClick={()=>setPage(1)}>More</Button> */}
            <EditorButton icon={faVrCardboard} text={actionBtnConfig[currentAction].text} bgColor={themeColor} cssStyle={{margin: '1em 0'}}
                onClick={actionBtnConfig[currentAction].onClick}/>

        </Container>
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide
    };
};

export default connect(
    mapStateToProps,
    null
)(MainInfo)

const Container = styled(Flex)`

    flex-direction: column;
    height: 90%;
    min-width: 85%; max-width: 85%;

`