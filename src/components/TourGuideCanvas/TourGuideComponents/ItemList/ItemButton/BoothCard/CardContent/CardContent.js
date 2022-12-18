import React from 'react'
import { CardBody, Text, Box, useColorModeValue } from '@chakra-ui/react'
import CardIcon from '../CardIcon/CardIcon'
import { useSelector } from 'react-redux'
import { faAlignLeft, faKey, faGamepad } from '@fortawesome/free-solid-svg-icons'

const CardContent = (props) => {

    const { data, currentIndex } = props
    const themeColor = useSelector(state=>state.tourguide.themeColor)


    const color = useColorModeValue("black", "white")

    const infoList = [
        { icon: faAlignLeft, label: "Description", text: data.description },
        { icon: faKey, label: "Passcode", text: data.passcode },
        { icon: faGamepad, label: "Game Type", text: data.gameType }
    ]

    return (

        <CardBody position="relative"
            p="0 1em" overflow='hidden' w="100%"
            textAlign='left'>

            <Box m="0 .5em" color={color}> 
                <Text color={themeColor} fontWeight="bold">
                    <CardIcon icon={infoList[currentIndex].icon} />{infoList[currentIndex].label}
                </Text>
                <Text noOfLines={3}>{infoList[currentIndex].text !== null ? infoList[currentIndex].text : "NA"}</Text>
            </Box>
                
        </CardBody>
        
    )
}

export default CardContent