import React, { useState, useEffect, useRef, createRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Flex, Box, Text, Heading } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import BadgeSlider from './BadgeSlider/BadgeSlider'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'

import { useDispatch, connect } from 'react-redux'
import { updateStories } from '../../../../redux/tourguide/tourguide.action'
import { useTranslation } from 'react-i18next'
import { langGetter } from '../../../../helpers/langGetter'

const MotionBox = motion(Box)

const StorySplider = (props) => {

    const { isPreviewMode = false, tourguide } = props
    const { host, stories, storyProgress, storyIndex, isAdmin } = tourguide
    const dispatch = useDispatch()

    const path = "story"
    const lang = langGetter()
    const { t } = useTranslation()

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [storyList, setStoryList] = useState([])

    const sliderRef = useRef()
    const sectionRef = stories.reduce((arr, value) => {

        arr[value.id] = createRef();
        return arr;

    }, {})  

    const check_isUnlocked = (index) => {
        return index <= storyProgress - 1
    }

    const LockMessage = () => {
        return(
            <Text textAlign='center' lineHeight={2} color="white">
                <FontAwesomeIcon icon={faLock}/>
                <br/>
                {t(`gameTicket.locking-message`)}
            </Text>
        )
    }

    const CoverStory = (props) => {
        const {item} = props
        return (
            <React.Fragment>
                <Heading size="md" mb="1em" color="white">{item.title[lang]}</Heading>
                <Text color="white">{item.content[lang]}</Text>
            </React.Fragment>
        )
    }

    useEffect(()=>{

        if(!isAdmin){
            
            axios.get(host+path)
            .then(res=>{
                let data = res.data.data
                setStoryList([...data])
                setIsLoading(false)
                dispatch(updateStories([...data])) 
            })
            .catch(err=>setError(err))

        }else{
            setStoryList(stories)
            setIsLoading(false)
            setError(null)
        }

    },[isAdmin])

    useEffect(()=>{

        if(isPreviewMode && storyList.length !== 0){

            let viewID = storyList[storyIndex].id
            let target = sectionRef[viewID].current
            let slider = sliderRef.current
            let targetX = target.offsetLeft
            slider.scrollLeft = targetX 

        }

    },[storyIndex])


    if(error !== null)
        return <div>{error.message}</div>    
    
    if(isLoading)
        return <LoadingSpinner/>

    return (
        <StyledCanvas h={isPreviewMode? "100%": '100vh'}>

            <Slider dir='ltr' ref={sliderRef}
                overflowX={isPreviewMode?'hidden':"scroll"}>

            {
                storyList.map((item, index) => (
                    <StorySection 
                        ref={sectionRef[item.id]} key={index}
                        bgImg={check_isUnlocked(index) || isPreviewMode ? `url('/images/${item.bg}')` : 'gray' }>
                        <StoryBox as={motion.div} 
                            initial={{ scale: 0.4, opacity: 0, y: 150}}
                            whileInView={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: .4 }}
                            viewport={{ once: false, amount: 0.5 }} >
                            {check_isUnlocked(index) || isPreviewMode ? <CoverStory item={item}/>:<LockMessage/>}
                        </StoryBox>
                    </StorySection>
                ))
            }

            </Slider>
            { !isPreviewMode && <BadgeSlider sectionRef={sectionRef} sliderRef={sliderRef}/>}
            
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
    // backdrop-filter: blur(15px);

    width: fit-content; max-width: 70%;
    height: fit-content; min-height: 90px;

    border-radius: 25px;

`