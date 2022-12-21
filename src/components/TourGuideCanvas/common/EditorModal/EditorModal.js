import React, { useEffect } from 'react'
import styled from 'styled-components'

import { Box, Flex,Heading, useColorModeValue } from '@chakra-ui/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import MyButton from '../EditorButton/EditorButton'
import FunctionalFooter from '../FunctionalFooter/FunctionalFooter'
import { useDispatch, connect } from 'react-redux'
import useSessionStorage from '../../../../hooks/useSessionStorage'
import { booth as boothTemplate , floorplan as floorplanTemplate } from '../../../../data/formTemplates'
import { resetData } from '../../../../redux/form/form.action'
import { closeModal, updateModal } from '../../../../redux/modal/modal.action'

const EditorModal = (props) => {

    const { pages, form, modal }  = props
    const { floorplan, booth } = form
    const { isOpen, path, method, name, id, page } = modal

    const dispatch = useDispatch()

    // session storage
    const [modalSession, setModalSession] = useSessionStorage('modal', modal)
    const [floorplanSession, setFloorplanSession] = useSessionStorage('floorplan', floorplan)
    const [boothSession, setBoothSession] = useSessionStorage('booth', booth)

    // chakra hooks
    const bg = useColorModeValue("white", "black")
    const progressBg = useColorModeValue("gray", "gray.100")

    const close_modal = () => {

        setModalSession({ ...modalSession, isOpen: false})
        setFloorplanSession(floorplanTemplate)

        if(path === "booth")
            setBoothSession(boothTemplate)

        dispatch(resetData())
        dispatch(closeModal())

    }

    useEffect(()=>{

        dispatch(updateModal(modalSession))

    },[])

    return !isOpen ? <></> : (
        <Overlay alignItems={{base: 'flex-end', md: 'center'}}>

            <Modal bg={bg} borderRadius={{base: '18px 18px 0px 0px', md: 25}}
                w={{base: '100%', md: '80%'}} h={{base: '90%', md: '70%'}}>

                {/* <ProgressBar bg={progressBg} w="100%">
                    <Progress h="10px" w={`${(page + 1)/pages.length * 100}%`} bg={themeColor}></Progress>
                </ProgressBar> */}

                <ModalHeader>
                    <Heading>{pages[page].heading}</Heading>
                    <MyButton faIcon={faXmark} isCircle={true} onClick={close_modal}/>
                </ModalHeader>

                <Content w={{base: '90%', md: '70%'}}>
                    
                {
                    pages[page].components.map((modalElement, index) => {
                        return React.createElement(modalElement.type, {
                            key: index,
                            ...modalElement.props      
                        })
                    })
                }
                </Content>

                <FunctionalFooter 
                    isShow={isOpen} onClose={close_modal}
                    totalPage={pages.length} page={page}
                    method={method} path={path} name={name} id={id}
                    />

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

const Overlay = styled(Flex)`

    position: fixed; z-index: 1000;
    top: 0; left: 0;
    justify-content: center;
    height: 100vh; width: 100vw;
    overflow: hidden;
    background: rgba(0, 0, 0, .5);

`

const Modal = styled(Flex)`

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

const ProgressBar = styled(Flex)``
const Progress = styled(Flex)`

    transition: all .1s linear .25s;

`