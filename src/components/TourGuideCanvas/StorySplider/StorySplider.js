import React, { useRef, createRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Flex, Box, Text, Heading } from '@chakra-ui/react'
import { faMap, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import CustomButton from '../common/EditorButton/CustomButton'
import { langGetter } from '../../../helpers/langGetter'
import { mobileBreakPoint, scrollbarCSS } from '../../../constants/constants'
import useWindowSize from '../../../hooks/useWindowSize'

const StorySplider = (props) => {

    const { isPreviewMode = false, tourguide } = props
    const { themeColor, stories, itemIndex } = tourguide

    const { t } = useTranslation()

    const navigate = useNavigate()

    const windowSize = useWindowSize()

    const lang = langGetter().toUpperCase()
    const laptopMode = windowSize.width > mobileBreakPoint

    const sliderRef = useRef()
    const sectionRef = stories.reduce((arr, value) => {

        arr[value.id] = createRef();
        return arr;

    }, {})  

    console.log('sotries', stories)

    const back_toMap = () => {
        navigate(`/public/${lang === 'EN' ? 'eng':'chi'}/tourguide/floorplans`)
    }

    const CoverStory = (props) => {
        const { item } = props
        return (
            <React.Fragment>
                <Heading size="md" mb="1em" color="white">{item[`title${lang}`]}</Heading>
                <Text color="white">{item[`content${lang}`]}</Text>
            </React.Fragment>
        )
    }

    return (
        <StyledCanvas h={isPreviewMode? "100%": '100vh'}>

            <CustomButton text={laptopMode ? t('floorplan.map') : ""} bgColor={laptopMode ? themeColor : 'gray'} 
                faIcon={laptopMode ? faMap : faArrowLeft} isCircle={!laptopMode} onClick={back_toMap}
                cssStyle={{position: "absolute", zIndex: 3, top: 0, margin: '1em', boxShadow: "1px 5px 5px rgba(0, 0, 0, .1)"}}/> 


            <Slider dir='ltr' ref={sliderRef} sx={scrollbarCSS}
                overflowX={isPreviewMode?'hidden':"scroll"}>

            {
                stories.filter(story => isPreviewMode && story.id === stories[itemIndex].id || !isPreviewMode).map((item, index) => (
                    <StorySection 
                        ref={sectionRef[item.id]} key={index}
                        bgImg={`url(${item.imageUrl})`}>
                        <StoryBox as={motion.div} 
                            initial={{ scale: 0.4, opacity: 0, y: 150}}
                            whileInView={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: .4 }}
                            viewport={{ once: false, amount: 0.5 }}>
                                <CoverStory item={item}/>
                        </StoryBox>
                    </StorySection>
                ))
            }

            </Slider>

        </StyledCanvas>
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
)(StorySplider)

const StyledCanvas = styled(Flex)`

    position: relative;
    width: 100%;

`

const Slider = styled(Flex)`

    position: relative;
    height: inherit; width: 100%;

    scroll-behaviour: smooth;
    scroll-snap-type: x mandatory;

`

const StorySection = styled(Box)`

    position: relative;
    height: 100%; 

    scroll-snap-align: center;
    flex-basis: 100%; flex-grow: 0; flex-shrink: 0;

    background: ${props => props.bgImg} no-repeat fixed;
    background-size: cover;

`

const StoryBox = styled(Flex)`

    margin: 100px auto; padding: 1.5em;
    flex-direction: column;
    align-items: center; justify-content: center;

    background-color: rgba(0, 0, 0, 1);
    box-shadow: 10px 10px 50px rgba(0, 0, 0, 1);
    opacity: .9;

    width: fit-content; max-width: 70%;
    height: fit-content; min-height: 90px;

    border-radius: 25px;

`