import React from 'react'

import styled from 'styled-components'

import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons'

const MainInfo = (props) => {
  
    const { setPage, boothInfo, themeColor } = props

    const IconText = (props) => {

        const {icon, text} = props

        return (

            <Flex mt='.2em'>
                <FontAwesomeIcon icon={icon} color={themeColor}/>
                <Text ml=".5em">{text}</Text>
            </Flex>
           
        )

    }

    return (
        <Container>
            <Heading color={themeColor} textAlign="center" size="lg">{boothInfo['name']}</Heading>
            <Flex direction='column' alignItems="center">
               <IconText icon={faLocationDot} text={boothInfo['venue']}/>
               <IconText icon={faUser} text={boothInfo['visitorNum'] + " visitor(s) now"}/>
            </Flex>
            <Heading size={'sm'} color={themeColor} mt=".2em">Description</Heading>
            <Text mt=".2em">{boothInfo["description"]}</Text>
            <Button borderRadius={25} onClick={()=>setPage(1)}>More</Button>
        </Container>
    )
}

export default MainInfo

const Container = styled(Flex)`

    flex-direction: column;

    height: 90%;
    min-width: 85%; max-width: 85%;
    overflow-y: scroll;

`