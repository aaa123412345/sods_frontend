import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Flex, Popover, PopoverTrigger, PopoverContent, PopoverBody, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import CustomButton from '../../../../EditorButton/CustomButton'
import { faAlignLeft, faEllipsisVertical, faGlobe, faLocationDot, faPen, faQrcode, faTent, faTrash, faVrCardboard } from '@fortawesome/free-solid-svg-icons'
import { langGetter } from '../../../../../../../helpers/langGetter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch  } from 'react-redux'
import { openModal, openQRModal, updateQRID } from '../../../../../../../redux/modal/modal.action'
import { updateBooth, updateMarker } from '../../../../../../../redux/form/form.action'
import useSessionStorage from '../../../../../../../hooks/useSessionStorage'
import { useTranslation } from 'react-i18next'

const OptionsMenu = (props) => {

    const { data, tourguide, form, modal } = props 
    const { host } = tourguide
    const { booth } = form

    const dispatch = useDispatch()

    const { t } = useTranslation()

    // session storage
    const [boothSession, setBoothSession] = useSessionStorage('booth', booth)
    const [modalSession, setModalSession] = useSessionStorage('modal', modal)

    const open_BoothModal = () => {
        
        let boothPayload = {
            nameZH: data.nameZH, 
            nameEN: data.nameEN,
            venueZH: data.venueZH, 
            venueEN: data.venueEN,
            descriptionZH: data.descriptionZH, 
            descriptionEN: data.descriptionEN,
        }
        let modalPayload = {
            modalIndex: 3,
            path: 'booths',
            method: "put",
            name: 'booth',
            id: data.id, 
            byteData: null
        }
        setBoothSession(boothPayload)
        setModalSession({
            ...modalSession, 
            ...modalPayload,
            page: 0,
            isOpen: true,
            isError: false
        })
            
        dispatch(updateBooth(boothPayload))
        dispatch(openModal(modalPayload))

    }

    const open_VRModal = () => {

        console.log("data from menu: ", data)
        let vrPayload = {
            nameZH: data.nameZH, 
            nameEN: data.nameEN,
            venueZH: data.venueZH, 
            venueEN: data.venueEN,
            descriptionZH: data.descriptionZH, 
            descriptionEN: data.descriptionEN,
            speechEN: data.speechEN, 
            speechZH: data.speechZH 
        }
        let modalPayload = {
            modalIndex: 6,
            path: 'booths',
            method: "put",
            name: 'booth',
            id: data.id,
            byteData: data.imageData
        }
        setBoothSession({...vrPayload})
        setModalSession({
            ...modalSession, 
            ...modalPayload,
            page: 0,
            isOpen: true,
            isError: false
        })
        dispatch(updateBooth(vrPayload))
        dispatch(openModal(modalPayload))

    }

    const open_locationModal = () => {

        let markerID = data.marker.markerID
        let marker = { floorID: markerID.floorID, y: markerID.y, x: markerID.x }
        dispatch(updateMarker(marker))
        let modalPayload = {
            modalIndex: 2,
            path: 'booths',
            method: "put",
            name: 'marker',
            id: data.id, 
            byteData: null
        }
        setModalSession({
            ...modalSession, 
            ...modalPayload,
            page: 0,
            isOpen: true,
            isError: false
        })
        dispatch(openModal(modalPayload))
    }

    const open_deleteModal = () => {
        let modalPayload = {
            page: 0, modalIndex: 5,
            path: "booths", method: "delete",
            name: 'booth', id: data.id, 
            byteData: null
        }
        setModalSession({
            ...modalSession, 
            ...modalPayload,
            page: 0,
            isOpen: true,
            isError: false
        })
        dispatch(openModal(modalPayload))
    }

    return (
        <Box position="relative">
            <Popover>
                <PopoverTrigger>
                    <CustomButton faIcon={faEllipsisVertical} isCircle cssStyle={{margin: 0, zIndex: 1000}}/>
                </PopoverTrigger>
                <PopoverContent mt="45px" right="50%" w="250px" bg="transparent" borderColor="transparent">
                    <PopoverBody>
                        <CustomButton faIcon={faPen} text={t('tourguideEditor.edit-booth')} onClick={open_BoothModal}/>
                        <CustomButton faIcon={faVrCardboard} text={t('tourguideEditor.edit-vr')} onClick={open_VRModal}/>
                        <CustomButton faIcon={faLocationDot} text={t('tourguideEditor.assign-marker')} onClick={open_locationModal}/>
                        <CustomButton faIcon={faTrash} text={t('tourguideEditor.delete-booth')} onClick={open_deleteModal}/>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
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