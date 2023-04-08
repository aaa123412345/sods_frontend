import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux'
import axios from 'axios';

import { QrReader } from 'react-qr-reader'
import QRCode from 'qrcode';

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Box, Flex,Heading, Image, useColorModeValue } from '@chakra-ui/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import CustomButton from '../../Common/common/CustomButton/CustomButton'
import { closeQRModal } from '../../../redux/modal/modal.action'
import { langGetter } from '../../../helpers/langGetter'
import { tourHost } from '../../../constants/constants';
import { UserContext } from '../../../App';

const MotionFlex = motion(Flex); 

const QRCodeScanner = (props) => {

    const { modal, tourguide }  = props
    const { isQRCode, qrID, needUpdate } = modal
    const { boothGames } = tourguide

    const lang = langGetter() === 'en' ? 'eng' : 'chi'
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // chakra hooks
    const bg = useColorModeValue("white", "black")

    const [qrCode, setQRCode] = useState(null) 
    const [isSent, setIsSent] = useState(false)
    const [resultObtain, setResultObtain] = useState(null)

    const {user,clearLoginState} = useContext(UserContext)

    const header = { headers: { token: user.token } }

    const handle_redirect = (code) => {

        let url = `/public/${lang}/about`

        if(code === 401){
            url = `/user/${lang}/login`
            clearLoginState()
        }

        if(code >= 400 && code < 500 ){
            window.location.href = url
            window.location.reload(true);

        }

    }

    const update_record = (boothId) => {
        
        let newData = { userId: user.userId, boothId: boothId, visitEndTime: JSON.stringify(new Date().toISOString()) }
        console.log('update: ', newData)

        console.log('url: ', tourHost+ '/boothRecords')
            
        axios.post(tourHost + '/boothRecords', {...newData}, header)
        .then((res)=>{
            let code = res.data.code
            console.log('post record, ', res.data)
            // handle_redirect(code)
        })
        .catch(err=>{console.log(err); setIsSent(false); setResultObtain(null)})        
        
    }

    const close_modal = () => {

        dispatch(closeQRModal())
        if(qrID === null || qrID === undefined) 
            window.location.reload(true); // for stopping the camera

    }

    const onResult = (result, error) => {

        console.log('88 !!result && isQRCode:', !!result && isQRCode)

        if (!!result && isQRCode) {
            let text = result?.text
            console.log('result: ', text)
            // setResultObtain(text)
            console.log('result change, ', resultObtain)
            if(text !== null || text !== undefined){
                
                // update booth visit record
                if(!isSent && needUpdate){
                    setIsSent(true)
                    update_record(text)
                }
    
                // redirect to ar game 
                let gameId = boothGames?.filter(game => game.boothId.toString() === text)?.[0]?.gameId
                console.log('gameId:', gameId, "; isRedirectToGame: ", parseInt(gameId ?? "0") > 61202 * 1000000)
                if(parseInt(gameId ?? "0") > 61202 * 1000000){
                    console.log('needUpdate: ', needUpdate)
                    window.location.replace(`/public/${lang}/ar-treasure/${gameId}`); // result is boothID
                }else{
                    setResultObtain(null)
                }
            }
        }
            
        if (!!error) 
            console.info('err: ', error);
        
    }

    useEffect(()=>{
        setQRCode(null)
    }, [qrID])

    useEffect(()=>{

        if(qrCode === null && qrID !== null){

            QRCode.toDataURL(qrID.toString())
            .then(code => {
                setQRCode(code)
            })
            .catch(err => {console.error(err)})
        }
            
    },[qrCode, qrID])

    // useEffect(()=>{

    //     if(isQRCode){

    //         console.log('result change, ', resultObtain)
    //         if(resultObtain !== null || resultObtain !== undefined){
                
    //             // update booth visit record
    //             if(!isSent && needUpdate){
    //                 setIsSent(true)
    //                 update_record(resultObtain)
    //             }
    
    //             // redirect to ar game 
    //             let gameId = boothGames?.filter(game => game.boothId.toString() === resultObtain)?.[0]?.gameId
    //             console.log('gameId:', gameId, "; isRedirectToGame: ", parseInt(gameId ?? "0") > 61202 * 1000000)
    //             if(parseInt(gameId ?? "0") > 61202 * 1000000){
    //                 console.log('needUpdate: ', needUpdate)
    //                 window.location.replace(`/public/${lang}/ar-treasure/${gameId}`); // result is boothID
    //             }else{
    //                 setResultObtain(null)
    //             }
    //         }

    //     }

    //     console.log('144 isQRCode: ', isQRCode)
            

    // }, [resultObtain])

    return isQRCode && (
        <Overlay as={MotionFlex} initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: .25 }}>

            <Modal as={MotionFlex} initial={{y: 200}} animate={{y: 0}} transition={{ duration: .25 }}
                bg={bg} borderRadius={25}>

                <ModalHeader>
                    <Heading size='lg'>QR Code Scanner</Heading>
                    <CustomButton faIcon={faXmark} isCircle={true} onClick={close_modal}/>
                </ModalHeader>

                {
                    isQRCode &&
                    <Content>

                        {
                            qrID !== null ?
                            <QRCodeImage src={qrCode} borderRadius={25} />
                            :
                            <QrReader delay={300} style={{ width: '100%' }} constraints={{facingMode: 'environment'}}
                                onResult={(result, error) =>{ if(isQRCode) onResult(result, error)}} />
                        }
                    
                    </Content>
                }
            

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

const QRCodeImage = styled(Image)`

    margin: 1em auto; 
    width: 100%; height: 100%;

`