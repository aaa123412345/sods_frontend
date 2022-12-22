import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Box, Flex, useToast } from '@chakra-ui/react'
import MyButton from '../EditorButton/EditorButton'
import { useDispatch, connect } from 'react-redux'
import { resetData } from '../../../../redux/form/form.action'
import { updateErrorList } from '../../../../redux/modal/modal.action'
import { closeModal } from '../../../../redux/modal/modal.action'
import { toast_generator } from '../../../../helpers/toastGenerator'
import { submitLabel } from '../../../../constants/constants'

const FunctionalFooter = (props) => {

    const { 
        isShow, onClose, 
        path, method, name, data = null, 
        tourguide, form, modal, id
    } = props

    const { themeColor, host } = tourguide   
    const { isError } = modal
    const dispatch = useDispatch()

    // chakra hooks
    const toast = useToast({duration: 3000, isClosable: true})

    const [canSubmit, setCanSubmit] = useState(false)

    const check_validation = (data) => {

        let errorList = []
        let errorExist = false

        console.log(data)
        Object.entries(data).map(([key, value], index)=>{
            console.log(key, ": ", value)
            if(value.length === 0){
                errorList.push(index)
                errorExist = true
            }
        })

        setCanSubmit(!errorExist)
        dispatch(updateErrorList(errorList))

    }

    const handle_method = (method, isText = false) => {

        check_validation(form[name])

        if(canSubmit){
            console.log('submit')
        }else{
            console.log('invalid')
        }

        // if(isError && isText === false)
        //     return 
        // else {
            
        //     switch (method){
        //         case "post":
        //             return isText ? "Create" : handle_create()
        //         case "delete":
        //             return isText ? "Delete" : handle_delete()
        //         case "put":
        //             return isText ? "Update" : handle_update()
        //         default:
        //             return;

        //     }  

        // }
    }

    const handle_delete = () => {

        if(data !== null){
    
            data.forEach((id)=>{
                
                axios.delete(host+path+'/'+id)
                .then((res)=>toast(toast_generator("Deleted", path)))
                .catch(err=>toast(toast_generator()))
    
            })

            onClose()

        }
        
    }

    const handle_create = () => {

        let data = form[name]

        axios.post(host+path, {...data})
        .then((res)=>{toast(toast_generator("Created", name))})
        .catch(err=>{toast(toast_generator)})

        dispatch(resetData())
        dispatch(closeModal())

    }

    const handle_update = () => {

        let data = form[name]

        axios.put(host+path+`/${id}`, {...data})
        .then((res)=>toast(toast_generator("Updated", path)))
        .catch(err=>toast(toast_generator))
        
        dispatch(resetData())
        dispatch(closeModal())

    }    

    return !isShow ? <></> :  (
        <PanelFooter>

            <Flex justifyContent='space-between'>

                <MyButton text={'Cancel'} onClick={onClose}/>
                <MyButton text={submitLabel[method]} onClick={()=>{handle_method(method)}}
                    bgColor={method === 'delete' ? "danger" : themeColor} />

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