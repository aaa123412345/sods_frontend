import React from 'react'
import styled from 'styled-components'
import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMap } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const RectangleIconButton = (props) => {

    const { variant, onClick, data } = props

    const { page } = useSelector(state => state.tourguide)

    return (
        <StyledButton maxH="50px"
            variant={variant}
            borderRadius={8}
            onClick={onClick}
            boxShadow={'0px 5px 12px rgba(0, 0, 0, .1)'}>

            <FontAwesomeIcon 
                icon={page <= 1 ? faMap : faBook} 
                style={{position: 'absolute', left: '1em'}}/>

            {data[page <= 1 ? 'region' : 'title']}

        </StyledButton>
    )
}

export default RectangleIconButton

const StyledButton = styled(Button)`

  position: relative;
  margin: .5em 1em;
  flex-basis: 40%; flex-grow: 0; flex-shrink: 0;
  min-height: 60px;

`
