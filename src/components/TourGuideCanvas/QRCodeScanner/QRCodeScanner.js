import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Box, Flex,Heading, useColorModeValue } from '@chakra-ui/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import EditorButton from '../common/EditorButton/EditorButton'
import { useDispatch, connect } from 'react-redux'
import { closeQRScanner } from '../../../redux/tourguide/tourguide.action'

import { QrReader } from 'react-qr-reader'

const MotionFlex = motion(Flex); 

const QRCodeScanner = (props) => {

    const { tourguide }  = props
    const { isOpenScanner } = tourguide

    const dispatch = useDispatch()

    // chakra hooks
    const bg = useColorModeValue("white", "black")

    const close_modal = () => {

        dispatch(closeQRScanner())

    }

    const onResult = (result, error) => {
        if (!!result) 
            window.location.replace('game/'+result?.text); // result is boothID
        if (!!error) 
          console.info(error);
      }

    return !isOpenScanner ? <></> : (
        <Overlay as={MotionFlex} initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: .25 }}>

            <Modal as={MotionFlex} initial={{y: 200}} animate={{y: 0}} transition={{ duration: .25 }}
                bg={bg} borderRadius={25}>

                <ModalHeader>
                    <Heading size='lg'>QR Code Scanner</Heading>
                    <EditorButton faIcon={faXmark} isCircle={true} onClick={close_modal}/>
                </ModalHeader>

                <Content>

                    <QrReader
                        delay={300}
                        style={{ width: '100%' }}
                        onResult={(result, error) => onResult(result, error)}
                        />
                
                </Content>

            </Modal>
        </Overlay>
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
)(QRCodeScanner)

const Overlay = styled(MotionFlex)`

    position: fixed; z-index: 1000;
    top: 0; left: 0;
    justify-content: center; align-items: center;
    height: 100vh; width: 100vw;
    overflow: hidden;
    background: rgba(0, 0, 0, .5);

`

const Modal = styled(MotionFlex)`

    align-items: flex-end;
    flex-direction: column;
    position: fixed; z-index: 1000;
    box-shadow: 5px -5px 25px rgba(0, 0, 0, .4);
    overflow: hidden;
    width: fit-content; height: fit-content;

`

const ModalHeader = styled(Flex)`
    
    width: 100%;
    padding: 1em;
    align-items: center;
    justify-content: space-between;

`

const Content = styled(Box)`

    position: relative;
    padding: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px -25px 25px -25px rgba(0, 0, 0, .2) inset;

`
