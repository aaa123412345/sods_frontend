import React, {useState, useEffect} from 'react'

import { useTranslation } from 'react-i18next'
import { Flex, Switch, Text, useColorMode } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'


const DarkModeSwitcher = () => {

    const { t } = useTranslation()
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex mt="1em" alignItems='center'>
            <Text ml=".5em" fontWeight="bold" mr="1em">
                <FontAwesomeIcon icon={colorMode === "dark" ? faMoon : faSun} style={{marginRight: '.5em'}} />
                {t(`tourguideEditor.${colorMode}-mode`)}
            </Text>
            <Switch size='lg' colorScheme="gray" isChecked={colorMode === 'dark'} onChange={()=>{toggleColorMode()}}/>
        </Flex>
    )
}

export default DarkModeSwitcher