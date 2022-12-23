import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { updateFloorplans, updateRegionIndex } from '../../../../redux/tourguide/tourguide.action'
import axios from 'axios'
import { useDispatch, connect } from 'react-redux'
import EditorButton from '../../common/EditorButton/EditorButton'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next';
import { langGetter } from '../../../../helpers/langGetter'


const FloorSelector = (props) => {

    const { tourguide } = props
    const { host, themeColor, floorplans, regionIndex } = tourguide
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const bg = useColorModeValue('white', 'black')

    const path = 'floorplans'
    const lang = langGetter()

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const select_region = (index) => {

        console.log(index)
        dispatch(updateRegionIndex(index))


    }

    useEffect(()=>{

        axios.get(host+path)
        .then((res)=>{

            let data = res.data.data
            dispatch(updateFloorplans(data))
            setError(null)
            setIsLoading(false)
    
        })
        .catch(err=>{
            setError(error)
            setIsLoading(true)
        })

    },[])


    console.log("regionIndex: ", regionIndex)

    if(error !== null)
        return <div>{error.message}</div>

    if(isLoading)
        return <LoadingSpinner />

    return (
        
        <FloorSelectorPanel bg={bg}>

            <Heading size="sm" m=".5em">
                <FontAwesomeIcon icon={faMap} />
                <br/>
                {t('floorplan.floorplan')}
            </Heading>

            <Scroll>

            {
                floorplans !== undefined 
                &&
                floorplans.map((floorplan, index)=>(
                    <EditorButton key={index} 
                        cssStyle={{width: "150px", minWidth: '150px'}}
                        bgColor={themeColor}
                        isSelected={index === regionIndex}
                        text={floorplan.region[lang]} 
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

const FloorSelectorPanel = styled(Flex)`

    padding: .5em; z-index: 1000;
    width: 100%;
    height: fit-content; 
    box-shadow: 0px 22px 22px -22px rgba(0, 0, 0, .4);
`

const Scroll = styled(Flex)`
    max-width: 90%;
    overflow-y: hidden;
    overflow-x: scroll

`