import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Box, Flex, Heading, Text, theme, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import EditorButton from '../../../../EditorButton/EditorButton'
import { faAlignLeft, faGlobe, faLocationDot, faPen, faQrcode, faTent } from '@fortawesome/free-solid-svg-icons'
import { langGetter } from '../../../../../../../helpers/langGetter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch  } from 'react-redux'
import { openModal, openQRModal, updateQRID } from '../../../../../../../redux/modal/modal.action'
import { updateBooth } from '../../../../../../../redux/form/form.action'
import useSessionStorage from '../../../../../../../hooks/useSessionStorage'

const HeaderBar = (props) => {

    const { data, switchCardLang, tourguide, form, modal } = props 
    const { host } = tourguide
    const { booth } = form

    const dispatch = useDispatch()

    // session storage
    const [boothSession, setBoothSession] = useSessionStorage('booth', booth)
    const [modalSession, setModalSession] = useSessionStorage('modal', modal)

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

    const open_QRModal = () => {
        console.log('id: ', data.id)
        dispatch(updateQRID(data.id))
        dispatch(openQRModal())
    }

    return (
      <Bar initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}}>
        <EditorButton faIcon={faPen} isCircle onClick={open_BoothModal}/>
        <EditorButton faIcon={faQrcode} isCircle onClick={open_QRModal}/>
        <EditorButton faIcon={faGlobe} onClick={switchCardLang} isCircle/>
      </Bar>
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
)(HeaderBar)

const MotionFlex = motion(Flex)

const Bar = styled(MotionFlex)`

    justify-content: flex-end;


`