import React from 'react'
import styled from 'styled-components'
import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'

const RegionButton = (props) => {

    const { variant, onClick, data } = props

    return (
        <StyledButton maxH="50px"
            variant={variant}
            borderRadius={8}
            onClick={onClick}
            boxShadow={'0px 5px 12px rgba(0, 0, 0, .1)'}>

            <FontAwesomeIcon 
                icon={faMap} 
                style={{position: 'absolute', left: '1em'}}/>

            {data['region']}

        </StyledButton>
    )
}

export default RegionButton

const StyledButton = styled(Button)`

  position: relative;
  margin: .5em 1em;
  flex-basis: 40%; flex-grow: 0; flex-shrink: 0;
  min-height: 60px;

`
