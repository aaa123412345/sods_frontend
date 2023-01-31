import React from 'react'
import styled from 'styled-components'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import EditorButton from '../../../../EditorButton/CustomButton'
import { faQrcode, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { updateQRID, openQRModal } from '../../../../../../../redux/modal/modal.action'
import { useDispatch } from 'react-redux'

const CardButtons = (props) => {

    const { switchCardLang, data } = props

    const dispatch = useDispatch()

    const bg = useColorModeValue('gray.10', 'gray.100')

    const open_QRModal = () => {
        console.log('id: ', data.id)
        dispatch(updateQRID(data.id))
        dispatch(openQRModal())
    }

    return (
        
        <FlexContainer bg={bg}>
            <EditorButton faIcon={faQrcode} onClick={open_QRModal} isCircle cssStyle={{boxShadow: "none"}}/>
            <EditorButton faIcon={faGlobe} onClick={switchCardLang} isCircle cssStyle={{boxShadow: "none"}}/>
        </FlexContainer>
        
    )
}

export default CardButtons

const FlexContainer = styled(Flex)`

    position: absolute: bottom: 0;
    box-shadow: 0px -22px 22px -22px rgba(0, 0, 0, .1);
    border-radius: 0px 0px 25px 25px;

`