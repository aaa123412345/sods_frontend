import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { Flex, Text, Heading, Grid, GridItem } from '@chakra-ui/react'
import styled from 'styled-components'
import { faArrowLeft, faMap } from '@fortawesome/free-solid-svg-icons'

import AnimatedPage from '../common/AnimatedPage/AnimatedPage'
import CustomButton from '../common/EditorButton/CustomButton'
import Stamp from './Stamp/Stamp'
import { langGetter } from '../../../helpers/langGetter'
import { mobileBreakPoint } from '../../../constants/constants'
import useWindowSize from '../../../hooks/useWindowSize'


const GameTicket = (props) => {

    const { tourguide } = props
    const { themeColor, booths } = tourguide

    const { t } = useTranslation()

    const navigate = useNavigate()

    const windowSize = useWindowSize()

    const userLang = langGetter().toUpperCase()
    const laptopMode = windowSize.width > mobileBreakPoint

    const back_toMap = () => {
        navigate(`/public/${userLang === 'EN' ? 'eng':'chi'}/tourguide/floorplans`)
    }

    return (
        <AnimatedPage>
            <Flex h='100%' flexDir="column">
                <CustomButton text={laptopMode ? t('floorplan.map') : ""} bgColor={laptopMode ? themeColor : 'gray'} 
                    faIcon={laptopMode ? faMap : faArrowLeft} isCircle={!laptopMode} onClick={back_toMap}
                    cssStyle={{margin: '1em', boxShadow: "1px 5px 5px rgba(0, 0, 0, .1)"}}/> 

                <TicketBody>
                    <CircleHeading bg={themeColor} color="white" size="md">{t('gameTicket.heading-ticket')}</CircleHeading>
                    <Text m="1em 1em" color="gray">{t('gameTicket.hint')}</Text>
                    <Grid templateColumns={{base: 'repeat(2, 1fr)', md:'repeat(4, 1fr)'}} gap={0}>
                        {
                            booths.map((booth, index) => (
                                <GridItem key={index}>
                                    <Stamp label={booth[`title${userLang}`]} isCollected={false}/>
                                </GridItem>
                            ))
                        }
                    </Grid>
                </TicketBody>
            </Flex>
        </AnimatedPage>
    )

}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        modal: state.modal
    };
};

export default connect(
    mapStateToProps,
    null
)(GameTicket)

const CircleHeading = styled(Heading)`

    border-radius: 25px;
    width: fit-content;
    padding: .25em 1em;
    margin: 1em;

`

const TicketBody = styled(Flex)`

    flex: 1; flex-direction: column;
    margin: 1em auto; padding: 1em;
    width: 100%; max-width: 750px;
    box-shadow: 1px 0px 22px rgba(0, 0, 0, .2);
    border-radius: 25px;

`