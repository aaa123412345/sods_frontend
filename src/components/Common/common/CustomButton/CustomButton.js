import React, { useState, useEffect, useRef } from 'react'
import { Button, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useWindowSize from '../../../../hooks/useWindowSize'

const CustomButton = (props) => {

    const { 
        text, faIcon, onClick, 
        isSelected = null, 
        isDisabled = false, 
        bgColor = "gray", 
        isCircle = false,
        isOutline = false,
        isWhiteBorder = false,
        cssStyle = null,
        circleDiameter = 45, 
        isDisableToHideText = false
    } = props

    const outline = isOutline ? "Outline" : ""
    var currentColor = isSelected || isSelected === null ? bgColor:"gray"

    const buttonRef = useRef(null)
    const [isHide, setIsHide] = useState(false)

    const windowSize = useWindowSize()

    const update_buttonFont = () => {
        
        let button = buttonRef.current

        if(!isDisableToHideText && button !== undefined && button.offsetWidth < 150)
            setIsHide(true)
        else
            setIsHide(false)
        
    }

    useEffect(()=>{ 
        
        if(!isCircle)
            update_buttonFont()

     }, [isHide, windowSize])

    return (
        <Button ref={buttonRef}
            w={isCircle? circleDiameter+"px":"100%"} maxW="250px" h={isCircle ? circleDiameter+"px" : '40px' } 
            borderRadius={isCircle ? "50%":25}
            border={isWhiteBorder?'5px solid white': ""}
            variant={currentColor.concat(outline)}
            isDisabled={isDisabled}
            style={cssStyle}
            onClick={onClick}>

            <Text mr={text && faIcon && !isHide ? ".5em": '0'}>
                { faIcon && <FontAwesomeIcon icon={faIcon} /> }
            </Text>

            { !isHide && <Text>{text}</Text>}

        </Button>
    )
}

export default CustomButton

