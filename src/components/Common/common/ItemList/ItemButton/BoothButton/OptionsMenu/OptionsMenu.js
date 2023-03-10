import React, { useState, useEffect } from 'react'

import { connect, useDispatch  } from 'react-redux'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Flex, Box } from '@chakra-ui/react'
import { faEllipsisVertical, faLocationDot, faPen, faTrash, faVrCardboard } from '@fortawesome/free-solid-svg-icons'

import CustomButton from '../../../../../../Common/common/CustomButton/CustomButton'
import { openModal, openQRModal, updateQRID } from '../../../../../../../redux/modal/modal.action'
import { updateBooth, updateMarker } from '../../../../../../../redux/form/form.action'
import { tourHost } from '../../../../../../../constants/constants'

const MotionBox = motion(Box)

const OptionsMenu = (props) => {

    const { data, tourguide, form, modal } = props 
    const { markers } = tourguide
    const { booth, marker } = form

    const dispatch = useDispatch()

    const { t } = useTranslation()

    const [isShow, setIsShow] = useState(false)

    const animations = {
        initial: { y: -100, scaleY: 0, opacity: 0 },
        animate: { y: 0, scaleY: 1, opacity: 1 },
        exit: { y: -100, scaleY: 0, opacity: 0 }
    }

    const open_BoothModal = () => {

        let boothPayload = {...data}
        dispatch(updateBooth(boothPayload))

        let payload = {
            modalName: 'booth', 
            host: tourHost, path: 'booths', method: 'put', 
            name: 'booth', id: data.id
        }
        dispatch(openModal(payload))
        
    }

    const open_VRModal = () => {

        console.log("data from menu: ", data)
        let vrPayload = {...data}
        let modalPayload = {
            modalName: 'vrTour', 
            host: tourHost, path: 'booths', method: 'put', 
            name: 'booth', id: data.id
        }
        dispatch(updateBooth(vrPayload))
        dispatch(openModal(modalPayload))

    }

    const open_locationModal = () => {

        let markerFilter = markers?.filter(marker => marker.boothID === data.id)
        if(markerFilter?.length){
            let assignedMarker = markerFilter[0]
            dispatch(updateMarker(assignedMarker))
        }
        let modalPayload = {
            modalName: 'marker', 
            host: tourHost, path: 'markers', method: 'put', 
            name: 'marker', id: `${marker?.y}/${marker?.x}/${marker?.floorID}`, 
            assignItem: data?.id
        }
        dispatch(openModal(modalPayload))
    }

    const open_deleteModal = () => {
        let modalPayload = {
            host: tourHost, path: "booths", method: "delete",
            name: 'booth', id: data.id
        }
        
        dispatch(openModal(modalPayload))
    }

    useEffect(()=>{

        if(isShow)
            setTimeout(()=>{setIsShow(false)}, 5000)

    }, [isShow])

    return (

        <Box position="relative">
            <CustomButton faIcon={faEllipsisVertical} isCircle cssStyle={{margin: '.5em', zIndex: 5, boxShadow: 'none'}} onClick={()=>{setIsShow(!isShow)}}/>
            {
                isShow  &&
                <MotionBox position="absolute" left="-220px" zIndex="15"
                    variants={animations} initial='initial' animate="animate" exit='exit' transition={{duration: .25}}>
                    <CustomButton faIcon={faPen} text={t('tourguideEditor.edit-booth')} onClick={open_BoothModal}/>
                    <CustomButton faIcon={faVrCardboard} text={t('tourguideEditor.edit-vr')} onClick={open_VRModal}/>
                    <CustomButton faIcon={faLocationDot} text={t('tourguideEditor.assign-marker')} onClick={open_locationModal}/>
                    <CustomButton faIcon={faTrash} text={t('tourguideEditor.delete-booth')} onClick={open_deleteModal}/>
                </MotionBox>

            }

        </Box>
    
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
)(OptionsMenu)

const MotionFlex = motion(Flex)

const Bar = styled(MotionFlex)`

    justify-content: flex-end;

`