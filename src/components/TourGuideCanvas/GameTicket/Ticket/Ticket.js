import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Heading, useColorModeValue } from '@chakra-ui/react'
import { connect } from 'react-redux'
import axios from 'axios'
import Stamp from './Stamp/Stamp'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Grid, GridItem } from '@chakra-ui/react'

const MotionBox = motion(Box)
const MotionHeading = motion(Heading)
const MotionFlex = motion(Flex)

const Ticket = (props) => {
    
    const { isPreviewMode, tourguide } = props
    const { host, themeColor } = tourguide
    
    const [booths, setBooths] = useState([])
    const [isShow, setIsShow] = useState(true)
    
    const { t } = useTranslation()

    const bg = useColorModeValue('white', 'black')
    const simData = [1, 2]
    

    const slide = {
        hidden: {  width: 0, opacity: 0 },
        visible: { width: 'fit-content', opacity: 1, transition:{width: {duration: .5, type:"spring"}}},
        exit: { width: 0, opacity: 0 }
    }

    const toggle_ticket = () => {
        setIsShow(!isShow)
    }

    useEffect(()=>{

        axios.get(host + "booths")
        .then(res=>{
            let data = res.data.data
            setBooths([...data])
            console.log(res.data.data)
        }).catch(err=>console.log(err))

    },[])

    const MotionContent = (props) => {

        const {booths} = props

        return (
        
            <Content variants={slide} initial="hidden" animate="visible" exit="exit" transition={{duration: .5}}>
                <Grid templateColumns={{base: 'repeat(2, 1fr)', md:'repeat(4, 1fr)'}} gap={0}>
                        {booths.map((booth, index)=>(
                            <GridItem>
                                <Stamp key={index} boothData={booth} isCollected={simData.includes(booth.id)}/>
                            </GridItem>
                        ))}
                </Grid>
            </Content>
        
                
        )
    }

    return isPreviewMode ? <></> : (
        <Card layout transition={{duration: 1, type:"spring"}} whileHover={{rotate: -2 ,transition: { duration: .2 }}}
            onClick={toggle_ticket} bg={bg}>
            <Title layout="position" size="sm">{t('gameTicket.heading-ticket')}</Title>
            <AnimatePresence mode="wait">
                {isShow && <MotionContent booths={booths}  /> }
            </AnimatePresence>
        </Card>
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
)(Ticket)

const Card = styled(MotionBox)`

    position: absolute; z-index: 1000; right: -15px;
    width: fit-content; height: 80vh;
    border-radius: 25px 0px 0px 25px;
    box-shadow: 0px 5px 22px rgba(0, 0, 0, .4);
    cursor: pointer;

`

const Title = styled(MotionHeading)`

    margin: 10px;


`

const Content = styled(MotionBox)`

    height: 80vh; max-height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;

`
