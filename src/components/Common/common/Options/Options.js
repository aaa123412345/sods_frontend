import React, { useState } from 'react'

import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import CustomButton from "../CustomButton/CustomButton"

const MotionBox = motion(Box)

const Options = (props) => {

    const { buttons, align } = props

    const animations = {
        initial: { y: -100, scaleY: 0, opacity: 0 },
        animate: { y: 0, scaleY: 1, opacity: 1 },
        exit: { y: -100, scaleY: 0, opacity: 0 }
    }

    const [isShow, setIsShow] = useState(false)

    const handle_position = () => {
        switch(align){

            case "left" : 
                return {left: '0px'}
            case "right":
                return {left: '-220px'}
            default: 
                return {left: '0px'}

        }
    }

    const toggle_options = () => {
        if(buttons.length !== 0)
            setIsShow(!isShow)
    }

    console.log(buttons)

    return (
        <Box position="relative" zIndex={10}>

            <CustomButton faIcon={faEllipsisVertical} isCircle cssStyle={{margin: '.5em', zIndex: 1000, boxShadow: 'none'}} onClick={toggle_options}/>
            {
                isShow  &&
                <MotionBox position="absolute" left={handle_position().left}
                    variants={animations} initial='initial' animate="animate" exit='exit' transition={{duration: .25}}>
                    {
                        buttons?.map(button => (
                            <CustomButton faIcon={button.faIcon} text={button.text} onClick={button.onClick}/>
                        ))?? <></>
                    }
                </MotionBox>

            }
                    
        </Box>
    )
}

export default Options