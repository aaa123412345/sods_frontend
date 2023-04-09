import React from 'react'

import { connect, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'


import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Flex, Box, Image, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faLocationDot, faQrcode } from '@fortawesome/free-solid-svg-icons'

import CustomButton from '../../../../../Common/common/CustomButton/CustomButton'
import { openQRModal, updateQRID } from '../../../../../../redux/modal/modal.action'
import OptionsMenu from './OptionsMenu/OptionsMenu'
import { inspectBooth } from '../../../../../../redux/inspector/inspector.action'


const BoothButton = (props) => {

    const { data, isNotUseFunction, onClick, variant, tourguide } = props
    const { floorplans, markers, itemIndex } = tourguide

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const animations = {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 }
    }

    const handle_click = () => {

        if(isNotUseFunction)
            onClick()
        else{
            console.log('clicked')
            dispatch(inspectBooth(data))
        }

    }

    const open_QRModal = () => {
        console.log('id: ', data.id)
        dispatch(updateQRID(data.id))
        dispatch(openQRModal())
    }


    const StatusBadge = ({isActive}) => {
        const color = isActive ? "success" : "danger"
        return (
            <Status borderColor={color}>
                <FontAwesomeIcon icon={faCircle} style={{fontSize: ".8rem", marginRight: ".5em", color: isActive ? "#43d787" : "#f9461c"}}/>
                <Text color={color} fontWeight="bold">{t(`${isActive ? "tourguideEditor.active-booth" : "tourguideEditor.inactive-booth"}`)}</Text> 
            </Status>
        )
    }

    return ((markers.filter(marker => marker.floorPlanID === floorplans[itemIndex]?.id).find(marker => marker.boothID === data.id) !== undefined 
    || markers.filter(marker => marker.floorPlanID === floorplans[itemIndex]?.id).find(marker => marker.boothID === data.id) === undefined 
    && markers.find(marker => marker.boothID === data.id) === undefined)
    || (isNotUseFunction ?? false)) && (
        <React.Fragment>

            
            <Record variants={animations} initial='initial' animate="animate" exit='exit' transition={{duration: .25}}
                flexDir="row" bg={isNotUseFunction && variant !== 'gray' ? variant : ''}>

                <Flex onClick={handle_click} w="100%">

                    {
                        
                        !isNotUseFunction && 
                        <StatusBadge isActive={markers.find(marker => marker.boothID === data.id) ?? false} />

                    }
                    
                    <Flex flexDir="column">
                        <Text fontSize="lg" fontWeight="bold" noOfLines={1}>{data.titleZH}</Text> 
                        <Text fontSize="sm" fontWeight="bold" color="gray" noOfLines={1}>{data.titleEN}</Text>
                    </Flex>
                </Flex>
                    
                
                    {
                        !isNotUseFunction && 
                        <>
                        <Flex justifyContent='flex-end' flex="1" position="relative" right="0">
                            {/** QR Code */}
                            <CustomButton faIcon={faQrcode} onClick={open_QRModal} isCircle cssStyle={{boxShadow: "none"}}/>
                            {/** VR Preview */}
                            {/** More Button */}
                            <OptionsMenu data={data}/>
                        </Flex>
                        </>

                    }                    

            </Record>

        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        modal: state.modal,
        form: state.form
    };
};
  
export default connect(
    mapStateToProps,
    null
)(BoothButton)

const MotionFlex = motion(Flex)


const Record = styled(MotionFlex)`

    height: fit-content; 
    margin: 0.1em 1em;
    padding: .5em;
    box-shadow: 0px 10px 10px -10px rgba(0,0, 0, .2),
    0px -10px 10px -10px rgba(0,0, 0, .2);
    align-items: center;
    cursor: pointer;
    position: relative;

`

const InfoBox = styled(Box)`

    width: 100%;
    min-height: 90px; height: fit-content;

`

const Status = styled(Flex)`

    margin-right: 1em;
    padding: 0 .25em;
    width: fit-content;
    align-items: center;
    border-radius: 50px;
    border-width: 1px;
    height: fit-content;

`