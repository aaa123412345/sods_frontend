import React from 'react'

import styled from 'styled-components'

import { Flex, Button, Heading, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const MoreInfo = (props) => {

    const { setPage, moreInfo, themeColor } = props

    return (
        <Container>
            <Flex alignItems='center' marginBottom=".5em">
                <Button w={50} h={50} borderRadius={'50%'} variant="gray"
                    onClick={()=>setPage(0)}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </Button>
                <Heading size="md" w="100%" textAlign="center" color={themeColor}>More Details</Heading>
            </Flex>
            {
                moreInfo.map((info, index)=>(
                    <div key={index}>
                        <Heading size="sm" mt="1em">{info.heading}</Heading>
                        <Text mt=".5em" color='gray'>{info.paragraph}</Text>
                    </div>
                ))
            }
        </Container>
    )
}

export default MoreInfo

const Container = styled(Flex)`

    flex-direction: column;

    height: 90%;
    min-width: 85%; max-width: 85%;
    overflow-y: scroll;

`