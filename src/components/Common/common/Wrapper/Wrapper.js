import React from "react"
import { useParams } from "react-router-dom"

import { v4 } from 'uuid'

import styled from 'styled-components'

import { ChakraProvider, useColorModeValue } from '@chakra-ui/react'
import { newTheme } from '../../../../theme/theme'
import { Flex } from '@chakra-ui/react'

import { AnimatePresence } from 'framer-motion';

const Wrapper = ({ children, isUseChakra = false, isUseContainer = false, bgColor }) => {

    const { path, subpath } = useParams() 

    const ChakraWrapper = ({children}) => {
        return (
            <ChakraProvider resetCSS theme={newTheme}>
                {children}
            </ChakraProvider>
        )
    }

    const ContainerWrapper = ({children, bgColor}) => {
        return (
            <AnimatePresence>
                <OuterContainer key={path + "-" + subpath + "-" + v4()} bg={bgColor ?? ""}>{children}</OuterContainer>
            </AnimatePresence>    
        )
    }

    return isUseChakra ? 
    (
        <ChakraWrapper>
            { isUseContainer ? <ContainerWrapper bgColor={bgColor}>{children}</ContainerWrapper> : children}
        </ChakraWrapper>
    ): children

}

export default Wrapper

const OuterContainer = styled(Flex)`

    position: relative;
    flex-direction: column;
    height: 100vh;
    max-width: 100vw; width: 100%;

`