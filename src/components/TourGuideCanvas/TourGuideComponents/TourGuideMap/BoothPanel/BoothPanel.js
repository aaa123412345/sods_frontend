import React, {useEffect, useState} from 'react'

import styled from 'styled-components'

import { Flex, Button, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'

import samplePara from '../../../../../helpers/SampleParagraph'
import MainInfo from './MainInfo/MainInfo'
import MoreInfo from './MoreInfo/MoreInfo'

const BoothPanel = (props) => {
    
    const { isShowBooth, setIsShowBooth } = props

    const themeColor = useSelector(state => state.themeConfig.themeColor)

    const [page, setPage] = useState(0)

    const [boothInfo, setBoothInfo] = useState({

        'name': "I Love HardCode", 
        'venue': "G/F, School Hall",
        'description': samplePara,
        'moreInfo': [
            {heading: "custom heading", paragraph: samplePara},
            {heading: "custom heading", paragraph: samplePara},
            {heading: "custom heading", paragraph: samplePara},
            {heading: "custom heading", paragraph: samplePara},
            {heading: "custom heading", paragraph: samplePara}
        ],
        'visitorNum': 100

    })

    const [moreInfo, setMoreInfo] = useState(boothInfo.moreInfo)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const update_windowWidth = () => {

        const width = window.innerWidth
        setWindowWidth(width)
    
    }

    useEffect(()=>{

        window.addEventListener("resize", update_windowWidth);
        return () => window.removeEventListener("resize", update_windowWidth) 

    }, [])

    const ShowButton = () => {

        const arrowForLaptop = isShowBooth?faAngleRight:faAngleLeft
        const arrowForMobile = isShowBooth?faAngleDown:faAngleUp 

        return (
            <Button 
                onClick={()=>{setIsShowBooth(!isShowBooth)}}
                variant={themeColor} m={0}
                mt="50px" h={{base: '50px', md: "100px"}} w={{base: '100px', md: "50px"}}
                borderRadius={{base:'25px 25px 0px 0px', md:'25px 0px 0px 25px'}}
                >
                <FontAwesomeIcon icon={windowWidth > 16 * 55 ? arrowForLaptop:arrowForMobile}/>
            </Button>
        )

    }

    const bg = useColorModeValue("white", "black")

    return (
        
        <Float direction={{base: 'column', md: 'row'}}
            alignItems={{base: 'flex-end', md: "flex-start"}}
            height={{base: 'fit-content', md: '100%'}}
            width={{base: 'inherit', md: 'fit-content'}}>
            
            <ShowButton/>
            <Panel bg={bg}
                w={{base: 'calc(100% - 200px)', md: isShowBooth?'350px':'0px'}}
                h={{base: isShowBooth?"350px":"0px", md: '100%'}}
            >

                {   page === 0 && <MainInfo setPage={setPage} boothInfo={boothInfo} themeColor={themeColor} /> }
                {   page === 1 && <MoreInfo setPage={setPage} moreInfo={moreInfo} themeColor={themeColor} /> }

            </Panel>

        </Float>
        
    )
}

export default BoothPanel

const Float = styled(Flex)`

    position: absolute;
    right: 0; bottom: 0;

`

const Panel = styled(Flex)`

    position: relative;
    align-items: center; justify-content: center;
    box-shadow: -10px 0px 22px rgba(0, 0, 0, .4);
    border-radius: 25px 0px 0px 0px;


`