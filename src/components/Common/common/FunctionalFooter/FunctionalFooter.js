import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import styled from 'styled-components'
import { Box, Flex, useToast } from '@chakra-ui/react'

import { v4 } from 'uuid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { useTranslation } from 'react-i18next'
import { useDispatch, connect } from 'react-redux'

import { resetData, updateFloorplan } from '../../../../redux/form/form.action'
import { updateItemIndex } from '../../../../redux/tourguide/tourguide.action'
import { closeModal } from '../../../../redux/modal/modal.action'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'

import { toast_generator } from '../../../../helpers/toastGenerator'
import { submitLabel, tourHost } from '../../../../constants/constants'
import { setRefreshFlag } from '../../../../redux/sysConfig/sysConfig.action'
import { UserContext } from '../../../../App'
import { storage } from '../../../../config/firebase'
import { finishInspect } from '../../../../redux/inspector/inspector.action'
import { langGetter } from '../../../../helpers/langGetter'

const FunctionalFooter = (props) => {

    const { 
        isShow, method, path, host, name, onClose, errorChecking, onConfirm,
        tourguide, sysConfig, form, id, assignedItem, file, setFile
    } = props

    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const lang = langGetter() === 'en' ? 'eng' : 'chi'

    
    // chakra hooks
    const toast = useToast({duration: 3000, isClosable: true})

    const [canSubmit, setCanSubmit] = useState(false)
    const [redirectURL, setRedirectURL] = useState(null)

    const {user,clearLoginState} = useContext(UserContext)

    const header = { headers: { token: user.token } }

    const handle_redirect = (code) => {

        let url = `/public/${lang}/about`

        if(code === 401){
            url = `/user/${lang}/login`
            clearLoginState()
        }

        if(code >= 400 && code < 500 )
            setRedirectURL(url)
        else
            setRedirectURL(null)

    }

    const close_and_reset = () => {
    
        setTimeout(()=>{

            setFile()
            dispatch(finishInspect())
            dispatch(resetData())
            dispatch(updateItemIndex(0))
            dispatch(closeModal())
            dispatch(setRefreshFlag())

        }, 1000)

    }

    const trigger_action = (method) => {
        
        if(onConfirm){
            dispatch(closeModal())
            dispatch(resetData())
            onConfirm()
        }

        if(file){
            // upload image
            const imageRef = ref(storage, `image/${file?.file?.name}-${v4()}`);
            uploadBytes(imageRef, file?.file)
            .then(()=>{
                getDownloadURL(imageRef)
                .then((url)=>{
                    method_switcher(method, url)
                })
                .catch((err)=>{console.log(err.message)})
            })
        }
        else
            method_switcher(method)
    }

    const method_switcher = (method, imageUrl = null) => {

        switch (method){

            case "post":
                return handle_create(imageUrl)
            case "delete":
                return handle_delete()
            case "put":
                return handle_update(imageUrl)
            default:
                return;
        }

    }

    const handle_delete = () => {

        console.log('func. footer: ', tourHost+path+'/'+id)
        axios.delete(host+'/'+path+'/'+id, header)
        .then((res)=>{
            let code = res.data.code
            toast(toast_generator(code, t("tourguide.deleted"), t(`tourguide.${path}`)))
            handle_redirect(code)
        })
        .catch(err=>toast(toast_generator()))
        
        close_and_reset()
        
    }

    const handle_create = (imageUrl) => {

        let data = form[name]
        let newData = {...data}

        console.log('push:', data)

        if(imageUrl)
            newData[file?.name] = imageUrl   
            
        axios.post(host + '/' + path, {...newData}, header)
        .then((res)=>{
            let code = res.data.code
            toast(toast_generator(code, t("tourguide.created"), t(`tourguide.${name}`)))
            handle_redirect(code)
        })
        .catch(err=>{toast(toast_generator())})

        close_and_reset()

    }

    const handle_update = (imageUrl) => {

        let data = form[name]
        let newData = {...data}
        let url = host + '/' + path 
        
        if(id)
            url += "/" + id

        if(imageUrl)
            newData[file?.name] = imageUrl     

        console.log('url: ', url)
        console.log('newData: ', newData)

        axios.put(url, {...newData}, header)
        .then((res)=>{
            let code = res.data.code
            toast(toast_generator(code, t("tourguide.updated"), t(`tourguide.${name}`)))
            handle_redirect(code)
        })
        .catch(err=>{toast(toast_generator())})
            
        close_and_reset()

    }    

    const check_validation = (data) => {

        let errorExist = false

        if(method === 'delete')
            errorExist = false
        else if(errorChecking !== null){
                
            Object.entries(data).map(([key, value], index)=>{
                
                if(key.toUpperCase().includes('IMAGEURL'))
                    errorExist = (file === null || file === undefined)
                else if(errorChecking[key]?.(value))
                    errorExist = true
                console.log(key, ": ", value, '; error: ', errorChecking[key]?.(value))
            })

        }
        
        setCanSubmit(!errorExist)

    }

    useEffect(()=>{

        console.log(form[name])
        check_validation(method === 'delete' ? null : form[name])

    },[form])

    useEffect(()=>{
        if(redirectURL !== null)
            setTimeout(()=>{navigate(redirectURL)}, 1000)
    }, [redirectURL])

    return !isShow ? <></> :  (
        <PanelFooter>

            <Flex justifyContent='space-between'>

                <CustomButton text={t('tourguide.cancel')} onClick={onClose}/>
                <CustomButton text={t(`tourguide.${submitLabel[method]??'confirm'}`)} 
                    onClick={()=>{trigger_action(method)}}
                    bgColor={method === 'delete' ? "danger" : themeColor} 
                    isDisabled={!canSubmit}/>

            </Flex>

        </PanelFooter>
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
)(FunctionalFooter)

const PanelFooter = styled(Box)`

    position: relative; z-index: 3;
    width: 100%; max-width: 450px;
    max-height: 120px; height: 100px;
    margin-left: auto;
    bottom: 0em; right: 0;

`