import React, { useState, useEffect, useRef, createRef } from 'react'
import styled from 'styled-components'

import { Flex, Box, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import BadgeSlider from './BadgeSlider/BadgeSlider'


const GameTicket = (props) => {

    const { isPreviewMode = false } = props

    const link = useSelector(state=>state.themeConfig.link)
    const { isOpen } = useSelector(state => state.modal)
    const { stories, storyProgress, storyIndex, page } = useSelector(state=>state.tourguide)
    const dispatch = useDispatch()
    const path = "story"

    const [storyList, setStoryList] = useState([])

    const sliderRef = useRef()
    const sectionRef = stories.reduce((arr, value) => {

        arr[value.id] = createRef();
        return arr;

    }, {})  

    const LockMessage = () => {
        return(
            <Text textAlign='center' lineHeight={2}>
                <FontAwesomeIcon icon={faLock}/>
                <br/>
                Let's visit booths & play mini games to unlock. 
            </Text>
        )
    }

    useEffect(()=>{

        axios.get(link+path)
        .then(res=>{
            let data = res.data
            setStoryList([...data])
            dispatch({type: "UPDATE_STORIES", payload: [...data]})
        })
        .catch(err=>console.log(err))

        if(isPreviewMode && storyList.length !== 0){

            let viewID = storyList[storyIndex].id

            let target = sectionRef[viewID].current
            let slider = sliderRef.current
            let targetX = target.offsetLeft
            slider.scrollLeft = targetX

        }

    },[storyIndex, page, isOpen])


    return (
        <StyledCanvas h={isPreviewMode? "100%": '100vh'}>
            <Slider dir='ltr' ref={sliderRef}
                overflowX={isPreviewMode?'hidden':"scroll"}>

            {
                storyList.map((item, index) => (
                    <StorySection ref={sectionRef[item.id]} key={index}
                        bgImg={index <= storyProgress - 1 || isPreviewMode ? `url('/images/${item.bg}')` : 'gray' }>
                        <StoryBox>
                            {index <= storyProgress - 1 || isPreviewMode ?<Text>{item.content}</Text>:<LockMessage/>}
                        </StoryBox>
                    </StorySection>
                ))
            }
            </Slider>
            { !isPreviewMode && <BadgeSlider sectionRef={sectionRef} sliderRef={sliderRef}/>}
            
        </StyledCanvas>
    )
}

export default GameTicket

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
    height: 100%; min-height: 100%;

    scroll-snap-align: center;
    flex-basis: 100%; flex-grow: 0; flex-shrink: 0;

    background: ${props => props.bgImg} no-repeat fixed;
    background-size: cover;

`

const StoryBox = styled(Flex)`

    margin: 100px auto; padding: 1.5em;
    align-items: center; justify-content: center;

    background-color: rgba(0, 0, 0, .4);
    backdrop-filter: blur(1rem);
    box-shadow: 5px 5px 22px rgba(0, 0, 0, .3);
    opacity: .9;

    width: fit-content; max-width: 70%;
    height: fit-content; min-height: 90px;

    border-radius: 25px;

`