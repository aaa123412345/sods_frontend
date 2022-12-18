import React from 'react'
import styled from 'styled-components'

import { Flex, Box, Button, Heading, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'


const BoothBadge = (props) => {

  const { isLock, name, sectionRef, sliderRef, tourguide } = props
  const { themeColor } = tourguide

  const bg = useColorModeValue('white', 'black')
  const color = useColorModeValue('black', 'white')

  const handle_scroll = () => {

    let target = sectionRef.current
    let slider = sliderRef.current
    let targetX = target.offsetLeft
    slider.scrollLeft = targetX

  }

  return (

    <BadgeBorder onClick={()=>{handle_scroll()}}
      bg={isLock? 'gray':bg} 
      borderColor={isLock?bg:themeColor} 
      color={color}>

      {
        isLock?
        <FontAwesomeIcon icon={faLock} />
        :
        <Heading size={'md'}>{name}</Heading>
      }

    </BadgeBorder>

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
)(BoothBadge)

const BadgeBorder = styled(Flex)`

  align-items: center; justify-content: center;

  width: 50px; height: 50px;
  padding: 1em;

  border-radius: 50%;
  border-width: 5px; border-style: solid;

  box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, .2);

  cursor: pointer;

`
