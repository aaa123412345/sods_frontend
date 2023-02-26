import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { conforms } from 'lodash'

import styled from 'styled-components'
import { Box, Flex, useToast } from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import { useDispatch, connect } from 'react-redux'

import { resetData } from '../../../../redux/form/form.action'
import { closeModal } from '../../../../redux/modal/modal.action'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'

import useSessionStorage from '../../../../hooks/useSessionStorage'
import { toast_generator } from '../../../../helpers/toastGenerator'
import { submitLabel, tourHost } from '../../../../constants/constants'
import { UserContext } from '../../../../App'

const FunctionalFooter = (props) => {

    const { 
        isShow, path, method, name, onClose, 
        tourguide, form, id, file, modal
    } = props

    const { themeColor, host } = tourguide 
    const dispatch = useDispatch()

    const { t } = useTranslation()

    // chakra hooks
    const toast = useToast({duration: 3000, isClosable: true})
    
    const { user } = useContext(UserContext)

    const [modalSession, setModalSession] = useSessionStorage('modal', modal)
    const [canSubmit, setCanSubmit] = useState(false)

    const config = {
        headers: {
            token: user.token
        }
    }

    const check_validation = (data) => {

        let errorExist = false

        if(method === 'delete')
            errorExist = false
        else if(name === "marker")
            errorExist = form['marker'].x === null || form['marker'].y === null || form['marker'].floorID === null
        else{

            // Object.entries(data).map(([key, value], index)=>{
            //     // WILL CHECK OTHER TYPE LATER
            //     console.log(key, ": ", value)
            //     if(value.length === 0)
            //         errorExist = true
            // })

        }

        // console.log('errorExist: ', errorExist)
        setCanSubmit(!errorExist)

    }

    const close_and_reset = () => {
    
        dispatch(resetData())
        setModalSession({...modalSession, isOpen: false, btyeData: null})
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

        axios.delete(host+path+'/'+id)
        .then((res)=>toast(toast_generator(t("tourguide.deleted"), t(`tourguide.${path}`))))
        .catch(err=>toast(toast_generator()))
        
        close_and_reset()
        
    }

    const handle_create = () => {

        let data = form[name]
        let extraPath = path === 'booths' ? `markers/${form['marker'].y}/${form['marker'].x}/${form['marker'].floorID}/`:"/"     

        let url = tourHost+extraPath+path
        console.log(url)

        axios.post(url, data, config)
        .then((res)=>{toast(toast_generator(t("tourguide.created"), t(`tourguide.${name}`)))})
        .catch(err=>{console.log(err.message); toast(toast_generator())})

        close_and_reset()

    }

    const handle_update = () => {

        let data = form[name]

        if(name === "marker"){
            axios.put(host+path+`/${id}/tourguide-markers/${data.floorID}/${data.y}/${data.x}`)
            .then((res)=>toast(toast_generator(t("tourguide.updated"), t(`tourguide.${path}`))))
            .catch(err=>toast(toast_generator()))
        }
        else{
            let formData = new FormData()
            formData.append(name, JSON.stringify({...data}))
            formData.append("image", file)
    
            axios.put(host+path+`/${id}`, formData)
            .then((res)=>toast(toast_generator(t("tourguide.updated"), t(`tourguide.${path}`))))
            .catch(err=>toast(toast_generator()))
        }
            
        close_and_reset()

    }    

    useEffect(()=>{

        check_validation(method === 'delete' ? null : form[name])

    },[form])

    return !isShow ? <></> :  (
        <PanelFooter>

            <Flex justifyContent='space-between'>

                <CustomButton text={t('tourguide.cancel')} onClick={onClose}/>
                <CustomButton text={t(`tourguide.${submitLabel[method]}`)} 
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