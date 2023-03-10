import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

const MotionBox = motion(Box)

const AnimatedPage = ({children, bg}) => {

    const animations = {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 }, 
        exit: {opacity: 0, x: -100 }
    }


    return (
        <AnimatePresence>
            <MotionBox 
            // variants={animations} initial='initial' animate="animate" exit="exit" transition={{duration: 1}}
                style={{width: "100%", height: "100%"}} bg={bg??""}>
                {children}
            </MotionBox>
        </AnimatePresence>
    )
}

export default AnimatedPage