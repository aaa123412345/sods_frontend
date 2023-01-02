import React, { useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Flex, Popover, PopoverTrigger, PopoverContent, PopoverBody, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import EditorButton from '../../../../EditorButton/EditorButton'
import { faAlignLeft, faEllipsisVertical, faGlobe, faLocationDot, faPen, faQrcode, faTent } from '@fortawesome/free-solid-svg-icons'
import { langGetter } from '../../../../../../../helpers/langGetter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch  } from 'react-redux'
import { openModal, openQRModal, updateQRID } from '../../../../../../../redux/modal/modal.action'
import { updateBooth } from '../../../../../../../redux/form/form.action'
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

    const initRef = useRef()

    const open_BoothModal = () => {

        axios.get(host+'booths/'+data.id)
        .then(res=>{
            let data = res.data.data
            let boothPayload = {
                region: data.region,
                name: data.name,
                venue: data.venue,
                description: data.description,
                passcode: data.passcode
            }
            let modalPayload = {
                modalIndex: 1,
                path: 'booths',
                method: "put",
                name: 'booth',
                id: data.id
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
    
        })
        .catch(err=>console.log(err))
    
    }



    return (
        <Box position="relative">
            <Popover>
                <PopoverTrigger>
                    <EditorButton faIcon={faEllipsisVertical} isCircle cssStyle={{margin: 0, zIndex: 1000}}/>
                </PopoverTrigger>
                <PopoverContent mt="45px" right="50%" w="fit-content" bg="transparent" borderColor="transparent">
                    <PopoverBody>
                        <EditorButton faIcon={faPen} text={t('tourguideEditor.edit-booth')} onClick={open_BoothModal}/>
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