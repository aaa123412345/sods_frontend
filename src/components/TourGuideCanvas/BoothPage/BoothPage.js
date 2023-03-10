import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { connect, useDispatch } from 'react-redux'
import { openQRModal } from '../../../redux/modal/modal.action'

import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import { Flex, Box, Heading, Text, Image, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignCenter, faArrowLeft, faLocationDot, faMap, faStamp, faTent, faVrCardboard } from '@fortawesome/free-solid-svg-icons'

import CustomButton from '../../Common/common/CustomButton/CustomButton'
import AnimatedPage from '../../Common/common/AnimatedPage/AnimatedPage'
import useWindowSize from '../../../hooks/useWindowSize'
import { langGetter } from '../../../helpers/langGetter'
import { mobileBreakPoint } from '../../../constants/constants'
import { updateTreasureId } from '../../../redux/arTreasure/arTreasure.action'

const BoothPage = (props) => {

    const { tourguide, sysConfig } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'
    const { booths, boothGames } = tourguide

    const dispatch = useDispatch()

    const { subsubpath } = useParams()
    const navigate = useNavigate()

    const { t } = useTranslation()

    const windowSize = useWindowSize()
    const bg = useColorModeValue('gray.10', 'gray.100')

    const userLang = langGetter().toUpperCase()
    const laptopMode = windowSize.width > mobileBreakPoint

    const booth = booths.filter(booth => booth.id !== subsubpath)[0]

    const opendayDate = new Date()
    const isOpendayToday = new Date() > opendayDate

    const userLangFormatter = (lang) => {
        return lang === 'EN' ? 'eng':'chi'
    }

    const back_toMap = () => {
        navigate(`/public/${userLangFormatter(userLang)}/tourguide/floorplans`)
    }

    const goto_VrMode = () => {
        navigate(`/public/${userLangFormatter(userLang)}/tourguide-vr/${booth.id}`)
    }

    const goto_QRScanner = () => {
        dispatch(openQRModal())
    }

    useEffect(()=>{

        if(subsubpath === "" || subsubpath === undefined || subsubpath === null)
            navigate(`/public/${userLang  === 'EN' ? 'eng' : 'chi'}/tourguide/floorplans`)
            
    }, [])


    const CustomText = ({icon, text}) => {
        return (
            <Flex m=".5em 0">
                <Text mr=".5em" color={themeColor}><FontAwesomeIcon icon={icon}/></Text>
                <Text>{text}</Text>
            </Flex>
        ) 
    }

    return booth !== undefined && (

        <AnimatedPage bg={bg}>
            <ImageContainer>

                <CustomButton text={laptopMode ? t('floorplan.map') : ""} bgColor={laptopMode ? themeColor : 'gray'} 
                    faIcon={laptopMode ? faMap : faArrowLeft} isCircle={!laptopMode} onClick={back_toMap}
                    cssStyle={{position: 'absolute', zIndex: 2, margin: '1em', boxShadow: "1px 5px 5px rgba(0, 0, 0, .1)"}}/> 

                <CoverImage src={booth['imageUrl']}/>

            </ImageContainer>

            <Content bg={bg}>

                <Flex alignItems="center">
                    <CircleIcon bg={themeColor}>
                        <Text color="white"><FontAwesomeIcon icon={faTent}/></Text>
                    </CircleIcon>
                    <Heading m=".5em 0">{booth[`title${userLang}`]}</Heading>
                </Flex>

                <CustomText icon={faLocationDot} text={booth[`venue${userLang}`]}/>

                <Box mt="2em">
                    <CustomText isHeading icon={faAlignCenter} text={t('tourguide.description')}/>
                    <Text>
                        {booth[`description${userLang}`]}
                    </Text>
                </Box>

                <Flex mt="2em" >
                    <CustomButton text={t('floorplan.vr-btn')} faIcon={faVrCardboard} onClick={goto_VrMode}/>
                    <CustomButton text={t('floorplan.stamp-btn')} faIcon={faStamp} onClick={goto_QRScanner}/>
                </Flex>
                
                
            </Content>
        </AnimatedPage>

    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide, 
        sysConfig: state.sysConfig
    };
};

export default connect(
    mapStateToProps,
    null
)(BoothPage)

const ImageContainer = styled(Box)`

    position: relative;
    width: 100%; height: 50%;
    overflow: hidden;

`

const CircleIcon = styled(Flex)`

    align-items: center; justify-content: center;
    border-radius: 50%;
    width: 50px; height: 50px;
    margin-right: 1em;

`

const CoverImage = styled(Image)`

    width: 100%; 
    height: 100%;
    object-fit: cover

`

const Content = styled(Box)`

    margin: 1em auto;
    width: 90%; height: fit-content;
    max-width: 611px;


`