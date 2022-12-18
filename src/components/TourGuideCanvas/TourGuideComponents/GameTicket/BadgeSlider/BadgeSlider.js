import React, { useState, createRef, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react'
import BoothBadge from './BoothBadge/BoothBadge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

const BadgeSlider = (props) => {

    const { sectionRef, sliderRef, tourguide } = props
    const { themeColor, stories, storyProgress } = tourguide

    const color = useColorModeValue('white', 'black')

    const level = "理大知識大王"

    const BadgeLevelBar = () => {

        return (
            <LevelContainer>
                <Text m="0.5em 1em" fontWeight={'bold'}>
                    <FontAwesomeIcon icon={faTrophy} />{' '}Your Level: {" "} {level} 
                </Text>
            </LevelContainer>
        )

    }

    const BadgeProgress = (props) => {

        const { item, index, sectionRef, sliderRef } = props

        const isLock = index > storyProgress - 1

        return (
            <BadgeContainer>
                <Line bg={isLock ? color : themeColor} ></Line>
                <BoothBadge 
                    key={item.id} 
                    name={index+1} 
                    isLock={isLock} 
                    sectionRef={sectionRef}
                    sliderRef={sliderRef} />
            </BadgeContainer>
        )
    }

    return (
       <Container>

            <BadgeLevelBar />

            <Slide>
            {
                stories.map((item, index) => (
                    <BadgeProgress key={index} 
                        item={item} 
                        index={index}
                        sectionRef={sectionRef[item.id]}
                        sliderRef={sliderRef} />
                ))
            }
            </Slide>

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
)(BadgeSlider)


const Container = styled(Box)`

    position: absolute;
    z-index: 100;
    bottom: 0px;
    width: 100%;

`

const LevelContainer = styled(Flex)`

    height: inherit; width: 100%;
    color: white;
    background: rgba(0, 0, 0, .3);
    clip-path: polygon(0 0, 81% 0, 100% 97%, 0% 100%);


`

const Slide = styled(Flex)`

    padding-bottom: .5em; padding-top: .5em;
    padding-right: 10%;
    background: rgba(0, 0, 0, .3);
    box-shadow: 0px -8px 22px 0px rgba(0,0,0, .5);

    overflow-x: scroll;

`

const BadgeContainer = styled(Flex)`

    width: 100%;
    margin: .5em 0;
    align-items: center;
    flex-basis: 20%; flex-grow: 0; flex-shrink: 0;

`

const Line = styled(Box)`

    width: 100%; height: 10px;
    box-shadow: 0px 12px 12px -12px rgba(255, 255, 255, .5);
    
`
