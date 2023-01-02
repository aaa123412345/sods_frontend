import React, {useEffect, useState} from 'react'

import styled from 'styled-components'

import { Flex, Button, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'

import MainInfo from './MainInfo/MainInfo'
import MoreInfo from './MoreInfo/MoreInfo'

const BoothPanel = (props) => {
    
    const { isShowBooth, setIsShowBooth, currentBooth, tourguide } = props
    const { themeColor } = tourguide 

    const bg = useColorModeValue("white", "black")

    const [page, setPage] = useState(0)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const toggle_booth = () => {

        setIsShowBooth(!isShowBooth)
        window.scrollTo(0, document.body.scrollHeight)
    
    }

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
            <Button m={0} mt="50px" transition={"all .1s linear .25s"}
                variant={themeColor} 
                onClick={toggle_booth} 
                h={{base: '50px', md: "100px"}} 
                w={{base: '100px', md: "50px"}}
                boxShadow="0px 0px 22px rgba(0, 0, 0, .5)"
                borderRadius={{base:'25px 25px 0px 0px', md:'25px 0px 0px 25px'}}>

                <FontAwesomeIcon icon={windowWidth > 16 * 55 ? arrowForLaptop:arrowForMobile}/>

            </Button>
        )

    }

    return (
        
        <Float direction={{base: 'column', md: 'row'}}
            alignItems={{base: 'flex-end', md: "flex-start"}}
            height={{base: 'fit-content', md: 'calc(100% - 90px)'}}
            width={{base: 'inherit', md: 'fit-content'}}>
            
            <ShowButton/>

            <Panel bg={bg}  overflow="hidden"
                transform={{base: `translateY(${isShowBooth? "0" : "350"}px)`, md:`translateX(${isShowBooth? "0" : "350"}px)`}}
                w={{base: '100%', md: isShowBooth?'350px':'0px'}}
                h={{base: isShowBooth?"350px":"0px", md: '100vh'}}>

                {   page === 0 && <MainInfo setPage={setPage} boothInfo={currentBooth} themeColor={themeColor} /> }

            </Panel>

        </Float>
        
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
)(BoothPanel)

const Float = styled(Flex)`

    position: absolute;
    right: 0; bottom: 0;

`

const Panel = styled(Flex)`

    position: relative; 
    align-items: center; justify-content: center;
    box-shadow: -10px 0px 22px rgba(0, 0, 0, .4);
    border-radius: 25px 0px 0px 0px;
    transition: all .1s linear .25s;


`