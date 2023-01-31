import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import { Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionStamp = motion(Flex)

const Stamp = (props) => {

    const { label, isCollected, tourguide } = props
    const { themeColor } = tourguide

    return (
        <StampContainer bg='gray.10'>
            <StampBorder bg={isCollected ? themeColor : 'gray'} whileHover={{scale: 1.1, duration: .2}}>
                <Text textAlign='center' color="white">{label}</Text>
            </StampBorder>
        </StampContainer>
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        modal: state.modal
    };
};

export default connect(
    mapStateToProps,
    null
)(Stamp)

const StampContainer = styled(Flex)`

    align-items: center; justify-content: center;
    width: 100px; height: 100px;
    margin: 1em;
    border-radius: 25px;
    box-shadow: 5px 5px 22px rgba(0, 0, 0, .1);

`

const StampBorder = styled(MotionStamp)`

    align-items: center; justify-content: center;
    width: 80%; height: 80%;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

`