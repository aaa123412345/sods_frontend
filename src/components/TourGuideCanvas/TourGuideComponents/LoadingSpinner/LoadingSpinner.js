import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react';
import { connect } from 'react-redux';

const LoadingSpinner = (props) => {

    const { tourguide } = props
    const { themeColor } = tourguide

    return (
        <Flex alignItems='center' justifyContent="center" w="100%" h="100%">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color={themeColor}
                size='xl'
            />
        </Flex>
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
)(LoadingSpinner)