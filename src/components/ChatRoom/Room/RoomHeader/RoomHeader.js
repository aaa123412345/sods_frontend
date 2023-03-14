import React from 'react'

import styled from 'styled-components'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { faAngleDown, faArrowAltCircleDown, faArrowCircleDown, faArrowDown, faGlobe, faLanguage } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'

const RoomHeader = (props) => {

    const { closeChat, switchLang, chatLang, sysConfig } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const title = {
        en: 'AI ChatBot',
        zh: 'AI 聊天機械人'
    }

    return (
        <HeaderContainer bg={themeColor} h="60px" color="white">
            <CustomButton faIcon={faGlobe} onClick={switchLang} isCircle/>
            <Heading w="100%" textAlign="center" size="lg">{title[chatLang]}</Heading>
            <CustomButton faIcon={faAngleDown} onClick={closeChat} isCircle/>
        </HeaderContainer>
    )
}

const mapStateToProps = state => {
    return {
        sysConfig: state.sysConfig
    };
};

export default connect(
    mapStateToProps,
    null
)(RoomHeader)

const HeaderContainer = styled(Flex)`

    position: relative;
    align-items: center;
    justify-content: space-around;
    padding: .5em;
    box-shadow: 0px 15px 15px -15px rgba(0, 0, 0, .4);

`