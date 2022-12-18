import React from 'react'
import CardIcon from '../CardIcon/CardIcon'
import { Button, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { faFont, faKey, faGamepad } from '@fortawesome/free-solid-svg-icons'


const ButtonBar = (props) => {

    const { currentIndex, setCurrentIndex } = props

    const buttons = [faFont, faKey, faGamepad]

    const themeColor = useSelector(state => state.tourguide.themeColor)

    return (

        <Flex position="relative" top="-20px" zIndex={5}>
            {
                buttons.map((button,index)=>(
                    <Button key={index} w={35} h={35}
                        m="0 .5em" bg={currentIndex === index ? themeColor : 'gray'}
                        color={'white'} borderRadius="50%"
                        boxShadow={'0px -5px 22px rgba(0, 0, 0, .2)'}
                        onClick={()=>setCurrentIndex(index)}>
                        <CardIcon icon={button} isNoPadding/>
                    </Button>

                ))
            }
        </Flex>

    )
}

export default ButtonBar