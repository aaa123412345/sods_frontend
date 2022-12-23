import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Button, Heading, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, connect } from 'react-redux'
import { updateLanguage, updateThemeColor } from '../../../redux/tourguide/tourguide.action'


const DevModePanel = (props) => {

    const { tourguide } = props
    const { themeColor, language } = tourguide

    const dispatch = useDispatch()

    const { i18n } = useTranslation()

    const { colorMode, toggleColorMode } = useColorMode()

    const bg = useColorModeValue('white', 'black')

    const [isShow, setIsShow] = useState(false)

    const toggle_devConfig = () => {
        setIsShow(!isShow)
    }

    const switch_lang = (currentLang) => {

        let lang = currentLang === 'zh' ? 'en' : 'zh'
        i18n.changeLanguage(lang);
        dispatch(updateLanguage(lang))

    }

    const switch_color = (color) => {
        dispatch(updateThemeColor(color))
    }

    const SwitchLanuageButton = () => {
        return (
            <Button variant={themeColor} w="90px" h="50px"
                onClick={()=>switch_lang(language)}>
                    <FontAwesomeIcon icon={faGlobe} style={{marginRight: 5}} />
                    {language === "zh" ? "Eng" : "繁"}
            </Button>
        )
    }

    const SwitchColorPanel = () => {

        const variants = ['red', 'blue', 'green', 'orange', 'purple', 'pink']

        return (
            <>
            <Heading size="md">Color: </Heading>
            <Flex w="90%" flexWrap={'wrap'} >
                {
                    variants.map((color, index) => (
                        <Button h='50' w="100%" variant={color} 
                            flexBasis="30%" flexGrow="0" flexShrink="0"
                            onClick={()=>switch_color(color)}>
                            {color}
                        </Button>
                    ))
                }
            </Flex>
            </>
        )
    }

    const DarkLightModeButton = () => {
        return (
            <Button onClick={toggleColorMode} variant="gray">
                { colorMode === 'light'? "Light":"Dark"} Mode
            </Button>
        )
    }

    return (
        <React.Fragment>
            <Panel bg={bg} 
                borderRadius={"0px 0px 0px 25px"}>
                    <ShowButton variant="gray" onClick={toggle_devConfig}>
                        <FontAwesomeIcon icon={faGear} style={{marginRight: 5}} />
                        Dev Mode Only
                    </ShowButton>
                    {
                        isShow &&
                        <Box boxShadow="0px -5px 5px -5px rgba(0, 0, 0, .2)">
                            <Heading size="md">Config: </Heading>
                            <Flex>
                                <DarkLightModeButton />
                                <SwitchLanuageButton />
                            </Flex>
                            <SwitchColorPanel/>
                        </Box>

                    }

            </Panel>
        </React.Fragment>        
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide
    };
};

export default connect(
    mapStateToProps,
    null
)(DevModePanel)


const Panel = styled(Flex)`

    flex-direction: column;
    align-items: flex-end;
    position: absolute; z-index: 1000;
    top: 0; right: 0;
    padding: 1em;
    box-shadow: -5px 5px 22px -22px rgba(0, 0, 0, .8);

`

const ShowButton = styled(Button)`


`