import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Box, Flex, useToast } from '@chakra-ui/react'
import MyButton from '../EditorButton/EditorButton'
import { useDispatch, connect } from 'react-redux'
import { errorToast } from '../../../../constants/constants'
import { resetData } from '../../../../redux/form/form.action'
import { closeModal } from '../../../../redux/modal/modal.action'

const FunctionalFooter = (props) => {

    const { 
        isShow, onClose, 
        path, method, name, data = null, 
        tourguide, form, id
    } = props

    const { themeColor, host } = tourguide   
    const dispatch = useDispatch()

    // chakra hooks
    const toast = useToast({duration: 3000, isClosable: true})

    const generate_toast = (method, name) => {
        return {
            title: `${method} ${name}`,
            status: 'success',
            containerStyle:{bg:"success"}
        }
    }

    const handle_method = (method, isText = false) => {

        switch (method){
            case "post":
                return isText ? "Create" : handle_create()
            case "delete":
                return isText ? "Delete" : handle_delete()
            case "put":
                return isText ? "Update" : handle_update()
            default:
                return;

        }
    }

    const handle_delete = () => {

        if(data !== null){
    
            data.forEach((id)=>{
                
                axios.delete(host+path+'/'+id)
                .then((res)=>toast(generate_toast("Deleted", path)))
                .catch(err=>toast(errorToast))
    
            })

            onClose()

        }
        
    }

    const handle_create = () => {

        let data = form[name]

        axios.post(host+path, {...data})
        .then((res)=>{toast(generate_toast("Created", name))})
        .catch(err=>{toast(errorToast)})

        dispatch(resetData())
        dispatch(closeModal())

    }

    const handle_update = () => {

        let data = form[name]

        axios.put(host+path+`/${id}`, {...data})
        .then((res)=>toast(generate_toast("Updated", path)))
        .catch(err=>toast(errorToast))
        
        dispatch(resetData())
        dispatch(closeModal())

    }    

    return !isShow ? <></> :  (
        <PanelFooter>

            <Flex justifyContent='space-between'>

                <MyButton text={'Cancel'} onClick={onClose}/>
                <MyButton text={handle_method(method, true)} onClick={()=>{handle_method(method)}}
                    bgColor={handle_method(method, true) === "Delete" ? "danger" : themeColor} />

            </Flex>

        </PanelFooter>
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
)(FunctionalFooter)

const PanelFooter = styled(Box)`

    position: relative; z-index: 3;
    width: 100%; max-width: 450px;
    max-height: 120px; height: 100px;
    margin-left: auto;
    bottom: 0em; right: 0;

`