import React from 'react'
import { Button, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MyButton = (props) => {

    const { 
        text, faIcon, onClick, 
        isSelected = null, 
        isDisabled = false, 
        bgColor = "gray", 
        isCircle = false,
        isOutline = false,
        isWhiteBorder = false
    } = props

    const outline = isOutline ? "Outline" : ""
    var currentColor = isSelected || isSelected === null ? bgColor:"gray"

    return (
        <Button 
            w={isCircle? '45px':"100%"} maxW="250px" h="42.5px"
            borderRadius={isCircle ? "50%":25}
            border={isWhiteBorder?'5px solid white': ""}
            variant={currentColor.concat(outline)}
            isDisabled={isDisabled}
            onClick={onClick}>

            <Text mr={text && faIcon ? ".5em": '0'}>
            {
                faIcon && 
                <FontAwesomeIcon icon={faIcon} />
            }
            </Text>

            {text}

        </Button>
    )
}

export default MyButton

