import React from 'react'
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Flex, Box, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import Wrapper from '../Wrapper/Wrapper';

const LoadingSpinner = (props) => {

    const { tourguide, sysConfig } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'
    const { loadingItem } = tourguide
    const { t } = useTranslation()
    const bg = localStorage.getItem('chakra-ui-color-mode') === 'dark' ? 'black' : 'white'
    const color = localStorage.getItem('chakra-ui-color-mode') !== 'dark' ? 'black' : 'white'
    
    return (
        <Wrapper isUseChakra>
            <Flex alignItems='center' justifyContent="center" w="100%" h="100vh" bg={bg}>
                <Box textAlign="center" bg={bg}>
                    <Spinner w="60px" h="60px" color={themeColor} thickness='4px' emptyColor={bg} size='xl'/>
                    <Text mt=".25em" color={color}>{t(loadingItem)}</Text>
                </Box>
            </Flex>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        sysConfig: state.sysConfig
    };
};
  
export default connect(
    mapStateToProps,
    null
)(LoadingSpinner)