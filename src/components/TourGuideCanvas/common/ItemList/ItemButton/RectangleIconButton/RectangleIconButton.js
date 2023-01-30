import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMap } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { langGetter } from '../../../../../../helpers/langGetter'
import { motion } from 'framer-motion'


const MotionButton = motion(Button)

const RectangleIconButton = (props) => {

    const { variant, onClick, data } = props

    const { page } = useSelector(state => state.tourguide)

    const isFloorEditor = page <= 1 

    const lang = langGetter().toUpperCase()

    const name = isFloorEditor ? 'region' : 'title'

    const [text, setText] = useState('')

    useEffect(()=>{
        setText('')
        if(data[name + lang] !== undefined)
            setText(data[name + lang])
    }, [data, lang, name])

    return (
        <StyledButton initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 50, opacity: 0}}
            variant={variant}
            borderRadius={8}
            onClick={onClick}
            boxShadow={'0px 5px 12px rgba(0, 0, 0, .1)'}>

            <FontAwesomeIcon 
                icon={isFloorEditor ? faMap : faBook} 
                style={{position: 'absolute', left: '1em'}}/>

            <StyledText>{text}</StyledText>

        </StyledButton>
    )
}

export default RectangleIconButton

const StyledButton = styled(MotionButton)`

  position: relative;
  margin: .5em 1em;
  flex-basis: 40%; flex-grow: 0; flex-shrink: 0;
  min-height: 50px;
  max-height: 60px;
  max-width: 300px;

`

const StyledText = styled(Text)`

    max-width: 90px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

`
