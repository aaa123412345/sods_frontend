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

const BoothRecord = (props) => {

    const { data, tourguide } = props
    const { floorplans, markers, itemIndex } = tourguide
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const animations = {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 }
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

    return (markers.filter(marker => marker.floorPlanID === floorplans[itemIndex]?.id).find(marker => marker.boothID === data.id) !== undefined 
    || markers.filter(marker => marker.floorPlanID === floorplans[itemIndex]?.id).find(marker => marker.boothID === data.id) === undefined 
    && markers.find(marker => marker.boothID === data.id) === undefined)
    && (

        <React.Fragment>
            <Flex justifyContent='flex-end'>
                {/** QR Code */}
                <CustomButton faIcon={faQrcode} onClick={open_QRModal} isCircle cssStyle={{boxShadow: "none"}}/>
                {/** VR Preview */}
                {/** More Button */}
                <OptionsMenu data={data }/>
            </Flex>
            <Record variants={animations} initial='initial' animate="animate" exit='exit' transition={{duration: .25}}
                flexDir={{base: "column", md: "row"}}>

                

                <Image src="/images/test-school-photo.jpg" h="100%" maxH="300px" w={{base: "100%", md: "150px"}} objectFit="cover" />

                <InfoBox m={{base: 0, md: "0em 1em"}}>

                    <StatusBadge isActive={markers.find(marker => marker.boothID === data.id) ?? false} />

                    <Text fontSize="lg" fontWeight="bold">{data.titleZH}</Text>
                    <Text fontSize="md" fontWeight="bold">{data.titleEN}</Text>

                    <Flex>
                        <FontAwesomeIcon icon={faLocationDot} style={{color: 'gray', marginRight: '.5em'}}/>
                        <Text fontSize="sm" color="gray">{data.venueZH}</Text>
                        <Text fontSize="sm" color="gray"> ({data.venueEN})</Text>
                    </Flex>

                    <Box>
                        <Text mt=".5em">{data.descriptionZH}</Text>
                        <Text m=".5em 0" color="gray">{data.descriptionEN}</Text>
                    </Box>

                </InfoBox>

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
)(BoothRecord)

const MotionFlex = motion(Flex)

const Record = styled(MotionFlex)`

    height: fit-content; min-height: 90px; 
    margin: 1em;
    box-shadow: 0px 10px 10px -10px rgba(0,0, 0, .2);

`

const InfoBox = styled(Box)`

    width: 100%;

`

const Status = styled(Flex)`

    margin-bottom: .5em; padding: 0 .25em;
    width: fit-content;
    align-items: center;
    border-radius: 50px;
    border-width: 1px;

`