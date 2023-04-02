import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { Box } from '@chakra-ui/react'

import axios from 'axios'
import { connect, useDispatch } from 'react-redux'


import { clearRefreshFlag, updateConfig } from '../../redux/sysConfig/sysConfig.action'
import { tourHost } from '../../constants/constants'

import Wrapper from '../Common/common/Wrapper/Wrapper'
import CustomButton from '../Common/common/CustomButton/CustomButton'
import Room from './Room/Room'
import { updateBooths } from '../../redux/tourguide/tourguide.action'
import { greet } from '../../constants/constants'

const Chatroom = (props) => {

    const { sysConfig, tourguide } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const dispatch = useDispatch()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [animationIndex, setAnimationIndex] = useState(0)

    const [isShowChat, setIsShowChat] = useState(false)
    const [chatLang, setChatLang] = useState('en')

    const get_data = async (host, path, updateFunction) => {

        let url = `${host}/${path}`
        await axios.get(url)
        .then((res)=>{
            console.log("updated from " + url + " successfully;")            
            if(res.data.code < 400)
                dispatch(updateFunction(res.data.data))
            else
                setError({message:'(Error) status code : '+ res.data.code})
        })
        .catch((err)=>{setError(err)})
        
    }

    const handle_chatDisplay = () => {
        setIsShowChat(true)
        console.log('click')
    }

    const close_chat = () => {
        setIsShowChat(false)
    }

    const switch_chatLanguage = () => {
        let newLang = chatLang === 'en' ? 'en' : 'en'
        setChatLang(newLang)
    }

    useEffect(()=>{
        Promise.all([
            get_data(tourHost, "configs", (data) => updateConfig(data)),
            get_data(tourHost, "booths", (data) => updateBooths(data))
        ])
        .then(()=>{
            console.log('loaded')
            setIsLoading(false)
            dispatch(clearRefreshFlag())
        })
    }, [])

    if(error || isLoading)
        return <></>

    return (
        
        <Wrapper isUseChakra>

            <ChatRoomContainer p={{base: 0, md: '1em'}}>
                {
                    isShowChat?
                    <Room closeChat={close_chat} switchLang={switch_chatLanguage} chatLang={chatLang} isShowChat={isShowChat} 
                        animationIndex={animationIndex} setAnimationIndex={setAnimationIndex}/>
                    :
                    <CustomButton faIcon={faCommentDots} bgColor={themeColor} cssStyle={{margin: '.5em', fontSize: '1.5rem', boxShadow: '0px 5px 12px rgba(0, 0, 0, .2)'}} 
                        onClick={()=>{handle_chatDisplay()}}
                        circleDiameter={60} isCircle />
                }

            </ChatRoomContainer>

        </Wrapper>

    )
}

const mapStateToProps = state => {
    return {
        sysConfig: state.sysConfig,
        tourguide: state.tourguide
    };
};

export default connect(
    mapStateToProps,
    null
)(Chatroom)

const ChatRoomContainer = styled(Box)`
    position: fixed; z-index: 2000;
    bottom: 0; right: 0;

`
