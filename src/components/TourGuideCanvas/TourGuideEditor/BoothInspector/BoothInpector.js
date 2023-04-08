import React from 'react'

import { connect, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Flex, Box, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faLocationDot, faQrcode, faXmark, faXmarkCircle, faXmarksLines } from '@fortawesome/free-solid-svg-icons'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'
import { finishInspect } from '../../../../redux/inspector/inspector.action'

const BoothInspector = (props) => {

    const { tourguide, inspector } = props
    const { isInspecting, data } = inspector
    const { floorplans, markers, itemIndex } = tourguide
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const bg = useColorModeValue('gray.10', 'gray.100')
    const animations = {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 }
    }

    const handle_closeInspector = () => {
        dispatch(finishInspect())
    }

    const StatusBadge = ({isActive}) => {
        const color = isActive ? "success" : "danger"
        return (
            <Status borderColor={color} mt="1em">
                <FontAwesomeIcon icon={faCircle} style={{fontSize: ".8rem", marginRight: ".5em", color: isActive ? "#43d787" : "#f9461c"}}/>
                <Text color={color} fontWeight="bold">{t(`${isActive ? "tourguideEditor.active-booth" : "tourguideEditor.inactive-booth"}`)}</Text> 
            </Status>
        )
    }


    return (markers.filter(marker => marker.floorPlanID === floorplans[itemIndex]?.id).find(marker => marker.boothID === data?.id) !== undefined 
    || markers.filter(marker => marker.floorPlanID === floorplans[itemIndex]?.id).find(marker => marker.boothID === data?.id) === undefined 
    && markers.find(marker => marker.boothID === data?.id) === undefined ) && isInspecting
    && (

        <React.Fragment>
            
            <InspectorWindow variants={animations} initial='initial' animate="animate" exit='exit' transition={{duration: .25}}
                flexDir={{base: "column", md: "column"}} position={{base: "absolute" , md: "relative"}} w={{base: '95%', md: '60%'}} zIndex="50" bg={bg}>

                <CustomButton faIcon={faXmarkCircle} onClick={handle_closeInspector} isCircle cssStyle={{minHeight: '35px', minWidth: '35px', maxHeight: '35px', maxWidth: '35px', position: 'absolute', right: 0, top: 0}} />

                <Image src={data?.imageUrl} h="250px" minH="250px" maxH="250px" w="100%"  objectFit="cover" />

                <StatusBadge isActive={markers.find(marker => marker.boothID === data?.id) ?? false} />

                <Text fontSize="lg" fontWeight="bold">{data?.titleZH}</Text>
                <Text fontSize="md" fontWeight="bold">{data?.titleEN}</Text>

                <Flex>
                    <FontAwesomeIcon icon={faLocationDot} style={{color: 'gray', marginRight: '.5em'}}/>
                    <Text fontSize="sm" color="gray">{data?.venueZH}</Text>
                    <Text fontSize="sm" color="gray"> ({data?.venueEN})</Text>
                </Flex>

                <Box>
                    <Text mt=".5em">{data?.descriptionZH}</Text>
                    <Text m=".5em 0" color="gray">{data?.descriptionEN}</Text>
                </Box>

            </InspectorWindow>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        modal: state.modal,
        form: state.form, 
        inspector: state.inspector
    };
};
  
export default connect(
    mapStateToProps,
    null
)(BoothInspector)

const MotionFlex = motion(Flex)

const InspectorWindow = styled(MotionFlex)`

    height: 100%;
    flex-direction: column;
    margin: 1em; padding: 1em 0.5em;
    box-shadow: 0px 10px 10px -10px rgba(0,0, 0, .2);
    overflow-y: scroll; overflow-x: hidden;
    max-height: 100%;

`

const Status = styled(Flex)`

    margin-bottom: .5em; padding: 0 .25em;
    width: fit-content;
    align-items: center;
    border-radius: 50px;
    border-width: 1px;

`