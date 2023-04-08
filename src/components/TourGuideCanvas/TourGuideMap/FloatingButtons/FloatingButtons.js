import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { Flex, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { faGift, faMoon, faStamp, faSun, faTicket } from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../../../Common/common/CustomButton/CustomButton';
import { langGetter } from '../../../../helpers/langGetter'
import { UserContext } from '../../../../App';

const FloatingButtons = (props) => {

    const { sysConfig, tourguide } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'
    const { minStampNum } = config ?? 0
    const { boothRecords } = tourguide

    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue('white', 'black')

    const userLang = langGetter() === 'en' ? 'eng' : 'chi' 
    const url = `/public/${userLang}/tourguide/`

    return (
        <FloatingContainer bg={bg} mt="1em">
            <CustomButton faIcon={faStamp} onClick={()=>{navigate(url+"ticket")}} bgColor={themeColor} isCircle 
                isDisabled={(user.userId ?? (-1)) <= 0}/>
            <CustomButton faIcon={faGift} onClick={()=>{navigate(url+"story")}} bgColor={themeColor} isCircle 
                isDisabled={boothRecords?.length < minStampNum || (user.userId ?? (-1)) <= 0} /> 
            <CustomButton faIcon={colorMode === 'light' ? faMoon : faSun} onClick={toggleColorMode} bgColor={themeColor} isCircle /> 
        </FloatingContainer>
    )
}

const mapStateToProps = state => {
    return {
        sysConfig: state.sysConfig, 
        tourguide: state.tourguide,
    };
};

export default connect(
    mapStateToProps,
    null
)(FloatingButtons)

const FloatingContainer = styled(Flex)`

    flex-direction: column;
    position: absolute; z-index: 100; right: 1em; 
    border-radius: 25px;
    box-shadow: 0px 5px 22px rgba(0, 0, 0, .25);

`