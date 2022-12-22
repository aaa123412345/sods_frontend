import React, { useState, useEffect } from 'react'
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
import { useTranslation } from 'react-i18next'

const FunctionalFooter = (props) => {

    const { 
        isShow, path, method, name, 
        data = null, onClose, 
        tourguide, form, id
    } = props

    const { themeColor, host } = tourguide 
    const dispatch = useDispatch()

    const { t, i18n } = useTranslation()

    // chakra hooks
    const toast = useToast({duration: 3000, isClosable: true})

    const [canSubmit, setCanSubmit] = useState(false)

    const check_validation = (data) => {

        let errorExist = false

        if(method === 'delete')
            errorExist = data === null || data.length === 0
        else{

            Object.entries(data).map(([key, value], index)=>{
                // WILL CHECK OTHER TYPE LATER
                if(value.length === 0)
                    errorExist = true
            })

        }

        setCanSubmit(!errorExist)

    }

    const close_and_reset = () => {
    
        dispatch(resetData())
        dispatch(closeModal())

    }

    const handle_method = (method) => {

        switch (method){

            case "post":
                return handle_create()
            case "delete":
                return handle_delete()
            case "put":
                return handle_update()
            default:
                return;
        }  

    }

    const handle_delete = () => {

        // delete action only occurs in iteml list instead of modal.

        if(data !== null){
    
            data.forEach((id)=>{
                
                axios.delete(host+path+'/'+id)
                .then((res)=>toast(toast_generator(t("tourguide.deleted"), t(`${path}`))))
                .catch(err=>toast(toast_generator()))
    
            })

            onClose()

        }
        
    }

    const handle_create = () => {

        let data = form[name]

        axios.post(host+path, {...data})
        .then((res)=>{toast(toast_generator(t("trouguide.created"), t(`${name}`)))})
        .catch(err=>{toast(toast_generator())})

        close_and_reset()

    }

    const handle_update = () => {

        let data = form[name]

        axios.put(host+path+`/${id}`, {...data})
        .then((res)=>toast(toast_generator(t("tourguide.updated"), t(`${path}`))))
        .catch(err=>toast(toast_generator()))

        close_and_reset()

    }    

    useEffect(()=>{

        check_validation(method === 'delete' ? data : form[name])

    },[form])

    return !isShow ? <></> :  (
        <PanelFooter>

            <Flex justifyContent='space-between'>

                <MyButton text={t('cancel')} onClick={onClose}/>
                <MyButton text={t(`${submitLabel[method]}`)} 
                    onClick={()=>{handle_method(method)}}
                    bgColor={method === 'delete' ? "danger" : themeColor} 
                    isDisabled={!canSubmit}/>

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