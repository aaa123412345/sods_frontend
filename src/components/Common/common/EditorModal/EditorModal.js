import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { Box, Flex, FormControl, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'

import { useDispatch, connect } from 'react-redux'
import { resetData, updateBooth, updateFloorplan } from '../../../../redux/form/form.action'
import { clearErrorList, closeModal, updateModal } from '../../../../redux/modal/modal.action'

import CustomButton from '../CustomButton/CustomButton'
import FunctionalFooter from '../FunctionalFooter/FunctionalFooter'

import { tourModalData } from '../../../../data/tourModalData'
import { booth as boothTemplate , floorplan as floorplanTemplate } from '../../../../data/formTemplates'
import { updateConfig } from '../../../../redux/sysConfig/sysConfig.action'

// import useSessionStorage from '../../../../hooks/useSessionStorage'

const MotionFlex = motion(Flex); 

const EditorModal = (props) => {

    const { form, modal, sysConfig }  = props
    const { config, originalThemeColor } = sysConfig
    const { isOpen, modalName, host, path, method, name, id, assignedItem, onConfirm, messageName } = modal

    const dispatch = useDispatch()

    const { t } = useTranslation()

    // chakra hooks
    const bg = useColorModeValue("white", "black")
    // const progressBg = useColorModeValue("gray", "gray.100")

    const [file, setFile] = useState()

    const close_modal = () => {

        dispatch(resetData())
        if(originalThemeColor){
            if(originalThemeColor !== config?.color)
                dispatch(updateConfig({...config, themeColor: originalThemeColor}))
        }
        dispatch(closeModal())

    }

    
    return isOpen &&  (
            
        <Overlay alignItems={{base: 'flex-end', md: 'center'}} >
                {/* initial={{opacity: 0}} animate={{opacity: 1}} transition={{ duration: .25 }} */}
            

                {/* // initial={{y: 200}} animate={{y: 0}} transition={{ duration: .25 }} */}
                <Modal 
                    bg={bg} borderRadius={{base: '18px 18px 0px 0px', md: 25}}
                    w={method==="delete"?"fit-content":{base: '100%', md: '80%'}} 
                    h={method==="delete"||onConfirm?"fit-content":{base: '90%', md: '70%'}}>

                {/* <ProgressBar bg={progressBg} w="100%">
                    <Progress h="10px" w={`${(page + 1)/pages.length * 100}%`} bg={themeColor}></Progress>
                </ProgressBar> */}

                <ModalHeader>
                    <Heading size='md'>{t(`modal.${method === 'delete' ? 'heading-delete' : tourModalData[modalName]?.heading}`)}</Heading>
                    <CustomButton faIcon={faXmark} onClick={close_modal} isCircle/>
                </ModalHeader>

                {

                    method !== 'delete' && 

                    <Content w={{base: '90%', md: '70%'}} h={onConfirm?'fit-content':'100%'}>
                        
                        
                        {
                            tourModalData[modalName].components?.map((modalElement, index) => {
                                return React.createElement(modalElement.type, {
                                    key: index, index: index,
                                    file: file, setFile: setFile,
                                    ...modalElement.props
                                })
                            }) ?? <Text>{t(`modal.message-${messageName}`)}</Text>
                        }
                        
                    </Content>

                }

                <FunctionalFooter isShow={isOpen} onClose={close_modal} errorChecking={tourModalData[modalName]?.errorChecking}
                    method={method} host={host} path={path} name={name} id={id} assignedItem={assignedItem}
                    file={file} setFile={setFile} 
                    onConfirm={onConfirm === "CLOSE_MODAL" ? close_modal : onConfirm}/>

            </Modal>
        </Overlay>

           
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        sysConfig: state.sysConfig,
        modal: state.modal,
        form: state.form
    };
};

export default connect(
    mapStateToProps,
    null
)(EditorModal)

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
    max-height: calc(100% - 90px - 60px);
    overflow-y: scroll;

`

// const ProgressBar = styled(Flex)``
// const Progress = styled(Flex)`

//     transition: all .1s linear .25s;

// `