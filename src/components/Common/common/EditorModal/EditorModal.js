import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Box, Flex,FormControl,Heading, useColorModeValue } from '@chakra-ui/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'

import { useDispatch, connect } from 'react-redux'
import { resetData, updateBooth, updateFloorplan } from '../../../../redux/form/form.action'
import { clearErrorList, closeModal, updateModal } from '../../../../redux/modal/modal.action'

import CustomButton from '../CustomButton/CustomButton'
import FunctionalFooter from '../FunctionalFooter/FunctionalFooter'

import { tourModalData } from '../../../../data/tourModalData'
import { booth as boothTemplate , floorplan as floorplanTemplate } from '../../../../data/formTemplates'

// import useSessionStorage from '../../../../hooks/useSessionStorage'

const EditorModal = (props) => {

    const { form, modal }  = props
    const { floorplan, booth } = form
    const { isOpen, modalName, path, method, name, id } = modal

    const dispatch = useDispatch()

    const { t } = useTranslation()

    // chakra hooks
    const bg = useColorModeValue("white", "black")
    // const progressBg = useColorModeValue("gray", "gray.100")

    // const isShowSession = false

    // // session storage
    // const [modalSession, setModalSession] = useSessionStorage('modal', modal)
    // const [floorplanSession, setFloorplanSession] = useSessionStorage('floorplan', floorplan)
    // const [boothSession, setBoothSession] = useSessionStorage('booth', booth)

    // const [file, setFile] = useState(null)

    const close_modal = () => {

        // setModalSession({ ...modalSession, isOpen: false})
        // setFloorplanSession(floorplanTemplate)

        // if(path === "booth")
        //     setBoothSession(boothTemplate)

        dispatch(resetData())
        dispatch(clearErrorList())
        dispatch(closeModal())

        // avoid compiled warnings
        // if(isShowSession){
        //     console.log(floorplanSession)
        //     console.log(boothSession)
        // }

    }

    // useEffect(()=>{

    //     dispatch(updateModal(modalSession))
    //     dispatch(updateFloorplan(floorplanSession))
    //     dispatch(updateBooth(boothSession))

    // },[])

    // useEffect(()=>{setFloorplanSession(floorplan)}, [floorplan])

    // useEffect(()=>{setBoothSession(booth)}, [booth])

    return !isOpen ? <></> : (

        <Overlay alignItems={{base: 'flex-end', md: 'center'}} 
            as={MotionFlex} initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: .25 }}>

            <Modal as={MotionFlex} initial={{y: 200}} animate={{y: 0}} transition={{ duration: .25 }}
                bg={bg} borderRadius={{base: '18px 18px 0px 0px', md: 25}}
                w={method==="delete"?"fit-content":{base: '100%', md: '80%'}} 
                h={method==="delete"?"fit-content":{base: '90%', md: '70%'}}>

                {/* <ProgressBar bg={progressBg} w="100%">
                    <Progress h="10px" w={`${(page + 1)/pages.length * 100}%`} bg={themeColor}></Progress>
                </ProgressBar> */}

                <ModalHeader>
                    <Heading size='md'>{t(`modal.${tourModalData[modalName].heading}`)}</Heading>
                    <CustomButton faIcon={faXmark} onClick={close_modal} isCircle/>
                </ModalHeader>

                {

                    <Content w={{base: '90%', md: '70%'}}>
                        
                        <FormControl>
                        
                        {
                            tourModalData[modalName].components.map((modalElement, index) => {
                                return React.createElement(modalElement.type, {
                                    key: index, index: index,
                                    ...modalElement.props    
                                })
                            })
                        }
                        </FormControl>
                        
                    </Content>

                }

                <FunctionalFooter isShow={isOpen} onClose={close_modal}
                    method={method} path={path} name={name} id={id}                    />

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
)(EditorModal)

const MotionFlex = motion(Flex); 

const Overlay = styled(MotionFlex)`

    position: fixed; z-index: 1000;
    top: 0; left: 0;
    justify-content: center;
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

`

const ModalHeader = styled(Flex)`
    
    width: 100%;
    padding: 1em;
    align-items: center;
    justify-content: space-between;

`

const Content = styled(Box)`

    margin: 1em auto;
    // width: calc(100% - 2.5em);
    height: 100%;
    max-height: calc(100% - 90px - 60px);
    overflow-y: scroll;
    box-shadow: 0px -25px 25px -25px rgba(0, 0, 0, .2) inset;

`

// const ProgressBar = styled(Flex)``
// const Progress = styled(Flex)`

//     transition: all .1s linear .25s;

// `