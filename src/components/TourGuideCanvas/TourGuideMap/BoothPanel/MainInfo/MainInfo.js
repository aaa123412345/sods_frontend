import React from 'react'

import styled from 'styled-components'

import { Flex, Heading, Text,} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { connect, useDispatch } from 'react-redux'
import EditorButton from '../../../common/EditorButton/EditorButton'
import { updateVRBoothID } from '../../../../../redux/vrTour/vtTour.action'
import { openQRModal } from '../../../../../redux/modal/modal.action'
import { useTranslation } from 'react-i18next'
import { langGetter } from '../../../../../helpers/langGetter'

const MainInfo = (props) => {
  
    // const { setPage, boothInfo, tourguide } = props
    const { setPage, tourguide } = props
    const { themeColor } = tourguide
    const dispatch = useDispatch()

    const { t } = useTranslation()

    // testing boothInfo
    const boothInfo = {
        name: {
            en: "New Booth",
            zh: "新攤位"
        },
        venue: {
            en: "1/F, Rm 103, 1D Classroom",
            zh: "1樓, 103室, 1D 課室"
        },
        description: {
            en: "NA",
            zh: "NA"
        }
    }

    const goto_scanner = () => {
        dispatch(openQRModal())
    }

    const goto_vrTour = () => {
        dispatch(updateVRBoothID(boothInfo.id))
        window.location.replace('tourguide-vr');
    }

    const lang = langGetter()
    const opendayDate = new Date().toDateString()
    const today = new Date()

    const currentAction = opendayDate !== today.toDateString() ? 'vr' : 'game'

    const actionBtnConfig = {
        game: {
            text: t('floorplan.stamp-btn'),
            onClick: goto_scanner
        }, 
        vr: {
            text: t('floorplan.vr-btn'),
            onClick: goto_vrTour
        }, 
    }


    const IconText = (props) => {

        const {icon, text} = props

        return (

            <Flex mt='.5em' >
                <Text color={themeColor}>
                    <FontAwesomeIcon icon={icon} />
                </Text>
                <Text ml=".5em">{text}</Text>
            </Flex>
           
        )

    }

    // console.log("mainInfo: ", boothInfo)

    if(boothInfo === null || boothInfo === undefined)
    return (
        <Container>
            <Flex alignItems='center' justifyContent="center" flex="1">
                <Text>{t('floorplan.remind-message')}</Text>
            </Flex>
        </Container>
    )

    return (
        <Container overflowY={{base: 'scroll', md: 'hidden'}}>

            <Heading m={'.5em 0'} color={themeColor} size="lg">{boothInfo['name'][lang]}</Heading>
            {/* <IconText icon={faUser} text={boothInfo['visitorNum'] + " visitor(s) now"}/> */}
            <IconText icon={faLocationDot} text={boothInfo['venue'][lang]}/> 
            <Heading size={'sm'} color={themeColor} mt="1.5em">{t('tourguide.description')}</Heading>
            <Text mt=".5em">{boothInfo["description"][lang]}</Text>
            {/* <Button variant={'gray'} borderRadius={25} onClick={()=>setPage(1)}>More</Button> */}
            <EditorButton icon={faVrCardboard} text={actionBtnConfig[currentAction].text} bgColor={themeColor} cssStyle={{margin: '1em 0'}}
                onClick={actionBtnConfig[currentAction].onClick}/>

        </Container>
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
)(MainInfo)

const Container = styled(Flex)`

    flex-direction: column;
    height: 90%;
    min-width: 85%; max-width: 85%;

`