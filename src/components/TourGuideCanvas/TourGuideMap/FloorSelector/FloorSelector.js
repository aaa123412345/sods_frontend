import React from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react'

import { useDispatch, connect } from 'react-redux'
import { updateItemIndex } from '../../../../redux/tourguide/tourguide.action'
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'

import CustomButton from '../../common/EditorButton/CustomButton'
import { langGetter } from '../../../../helpers/langGetter'


const FloorSelector = (props) => {

    const { tourguide } = props
    const { themeColor, floorplans, itemIndex} = tourguide
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
        
        <FloorSelectorPanel bg={bg} paddingRight={{base: '90px', md: "180px"}}>

            <Heading size="sm" p=".5em">
                <FontAwesomeIcon icon={faMap} />{" "}{t('floorplan.floorplan')}
            </Heading>

            <Scroll>

            {
                floorplans !== undefined 
                &&
                floorplans.map((floorplan, index)=>(
                    <CustomButton key={index} 
                        cssStyle={{minWidth: '70px'}}
                        bgColor={themeColor}
                        isSelected={index === itemIndex}
                        text={floorplan[`region${lang}`]} 
                        onClick={()=>{select_region(index)}} />
                ))
            }

            </Scroll>

        </FloorSelectorPanel>
        
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
)(FloorSelector)

const FloorSelectorPanel = styled(Box)`

    margin: 0;
    z-index: 1000;
    width: 100%;
    height: fit-content; 
    box-shadow: 0px 22px 22px -22px rgba(0, 0, 0, .4);
`

const Scroll = styled(Flex)`

    max-width: 90%;
    overflow-y: hidden;
    overflow-x: scroll

`