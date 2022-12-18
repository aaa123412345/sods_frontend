import React from 'react'

import styled from 'styled-components'

import { Flex, Heading, Text, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

const MainInfo = (props) => {
  
    const { setPage, boothInfo, tourguide } = props
    const { themeColor } = tourguide

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

    console.log("mainInfo: ", boothInfo)

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