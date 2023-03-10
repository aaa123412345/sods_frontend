import React from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react'

import { useDispatch, connect } from 'react-redux'
import { updateItemIndex } from '../../../../redux/tourguide/tourguide.action'
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'
import { langGetter } from '../../../../helpers/langGetter'
import { scrollbarCSS } from '../../../../constants/constants'


const FloorSelector = (props) => {

    const { tourguide, sysConfig } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'
    const { floorplans, itemIndex} = tourguide
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const navigate = useNavigate()

    const bg = useColorModeValue('white', 'black')
    const lang = langGetter().toUpperCase()

    const select_region = (index) => {

        dispatch(updateItemIndex(index))
        navigate(`/public/${lang === "EN" ? "eng" : "chi"}/tourguide/floorplans/${floorplans[itemIndex]?.id ?? ""}`)

    }

    return (
        
        <FloorSelectorPanel bg={bg} >

            <Heading size="sm" p=".5em">
                <FontAwesomeIcon icon={faMap} />{" "}{t('floorplan.floorplan')}
            </Heading>

            <Scroll sx={scrollbarCSS}>

            {
                floorplans?.map((floorplan, index)=>(
                    <CustomButton key={index} 
                        cssStyle={{width: 'fit-content', minWidth: 'fit-content'}}
                        bgColor={themeColor}
                        isSelected={index === itemIndex}
                        text={floorplan[`region${lang}`]} 
                        onClick={()=>{select_region(index)}} 
                        isDisableToHideText />
                )) ?? <></>
            }

            </Scroll>

        </FloorSelectorPanel>
        
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide, 
        sysConfig: state.sysConfig
    };
};

export default connect(
    mapStateToProps,
    null
)(FloorSelector)

const FloorSelectorPanel = styled(Box)`

    margin: 0; 
    z-index: 1000;
    width: 100%;
    height: fit-content; 
`

const Scroll = styled(Flex)`

    max-width: 100vw;
    min-height: 50px;
    overflow-y: hidden;
    overflow-x: scroll;

`