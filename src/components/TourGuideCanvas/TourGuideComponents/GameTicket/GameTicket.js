import React, { useState, useEffect, useRef, createRef } from 'react'
import styled from 'styled-components'

import { Flex, Box, Text, Heading } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, connect } from 'react-redux'
import axios from 'axios'

import BadgeSlider from './BadgeSlider/BadgeSlider'
import { updateStories } from '../../../../redux/tourguide/tourguide.action'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const GameTicket = (props) => {

    const { isPreviewMode = false, tourguide, modal } = props
    const { host, stories, storyProgress, storyIndex, page, themeColor, isAdmin } = tourguide
    const { isOpen } = modal
    const dispatch = useDispatch()

    const path = "story"
  

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
                Let's visit booths & play mini games to unlock. 
            </Text>
        )
    }

    const CoverStory = (props) => {
        const {item} = props
        return (
            <React.Fragment>
                <Heading size="md" mb="1em" color="white">{item.title}</Heading>
                <Text color="white">{item.content}</Text>
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

    },[])

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
                    <StorySection ref={sectionRef[item.id]} key={index}
                        bgImg={check_isUnlocked(index) || isPreviewMode ? `url('/images/${item.bg}')` : 'gray' }>
                        <StoryBox>
                            
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
)(GameTicket)

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
    flex-direction: column;
    align-items: center; justify-content: center;

    background-color: rgba(0, 0, 0, .4);
    backdrop-filter: blur(1rem);
    box-shadow: 5px 5px 22px rgba(0, 0, 0, .3);
    opacity: .9;

    width: fit-content; max-width: 70%;
    height: fit-content; min-height: 90px;

    border-radius: 25px;

`