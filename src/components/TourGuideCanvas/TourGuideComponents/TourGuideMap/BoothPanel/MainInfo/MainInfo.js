import React from 'react'

import styled from 'styled-components'

import { Flex, Heading, Text, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const MainInfo = (props) => {
  
    const { setPage, boothInfo } = props

    const themeColor = useSelector((state) => state.themeConfig.themeColor)

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

    return (
        <Container>
            <Heading m={'.5em 0'} color={themeColor} size="lg">{boothInfo['name']}</Heading>
            <IconText icon={faUser} text={boothInfo['visitorNum'] + " visitor(s) now"}/>
            <IconText icon={faLocationDot} text={boothInfo['venue']}/>
            <Heading size={'sm'} color={themeColor} mt="1.5em">Description</Heading>
            <Text mt=".5em">{boothInfo["description"]}</Text>
            <Button variant={'gray'} borderRadius={25} onClick={()=>setPage(1)}>More</Button>
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