import React, { useState, useEffect, useRef } from 'react'
import { Button, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditorButton = (props) => {

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

    const buttonRef = useRef(null)
    const [isHide, setIsHide] = useState(false)

    const update_buttonFont = () => {

        let button = buttonRef.current

        if(!isCircle){
            if(button !== undefined && button.offsetWidth < 150)
                setIsHide(true)
            else
                setIsHide(false)
        }

    }

    useEffect(()=>{

        window.addEventListener('resize', update_buttonFont)
        return () => window.removeEventListener('resize', update_buttonFont)


    }, [isHide])

    return (
        <Button ref={buttonRef}
            w={isCircle? '45px':"100%"} maxW="250px" h="42.5px" 
            borderRadius={isCircle ? "50%":25}
            border={isWhiteBorder?'5px solid white': ""}
            variant={currentColor.concat(outline)}
            isDisabled={isDisabled}
            onClick={onClick}>

            <Text mr={text && faIcon && !isHide ? ".5em": '0'}>
            {
                faIcon && 
                <FontAwesomeIcon icon={faIcon} />
            }
            </Text>

            { !isHide && <Text>{text}</Text>}

        </Button>
    )
}

export default EditorButton

