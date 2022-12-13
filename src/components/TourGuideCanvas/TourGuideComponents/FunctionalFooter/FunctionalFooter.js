import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Box, Flex, useToast } from '@chakra-ui/react'
import MyButton from '../MyButton/MyButton'
import { useDispatch, useSelector } from 'react-redux'

const FunctionalFooter = (props) => {

    const { 
        isShow, onClose, 
        assignRequests,
        path, method, name, 
        data = null, updateID, 
        totalLength, 
        page, totalPage 
     } = props

    // redux state
    const themeColor = useSelector(state=>state.themeConfig.themeColor)
    const tourguideState = useSelector(state=>state.tourguide)
    const link = useSelector(state=>state.themeConfig.link)
   
    const dispatch = useDispatch()

    // chakra hooks
    const toast = useToast({
        duration: 3000,
        isClosable: true,
    })

    const handle_methodText = (method) => {

        switch (method){
            case "post":
                return "Create"
            case "delete":
                return "Delete"
            case "put":
                return "Update"
            default:
                return;

        }
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


        if(data !== null){
    
            data.forEach((item)=>{
                
                axios.delete(link+path+'/'+item.toString())
                .then((res)=>toast({
                    title: 'Deleted Region',
                    status: 'success',
                    containerStyle:{bg:"success"}
                }))
                .catch(err=>toast({
                    title: 'Delete Region Error',
                    description: "Please try again.",
                    status: 'error',
                    containerStyle:{bg:"error"}
                }))
    
            })

            onClose()

        }

        dispatch({type: "HIDE_FOOTER"})
        
    }

    const assign_item = (id) => {

        assignRequests.forEach(request => {

            axios.put(link+request.path + `/${path}/`+ id)
            .then(res=>console.log(res))
            .then(err=>console.log(err))
        })

    }

    const handle_create = () => {

        let data = tourguideState[name]
        console.log('data: ', data)
        console.log('path: ', path)
        console.log('name: ', name)

        axios.post(link+path, {...data})
        .then((res)=>{

            toast({
                title: 'Created '+ name,
                status: 'success',
                containerStyle:{bg:"success"}
            })
        
        })
        .catch(err=>{
            console.log(err)
            toast({
            title: "Error",
            description: "Please try again.",
            status: 'error',
            containerStyle:{bg:"error"}
        })})

        dispatch({type: "RESET_DATA"})
        dispatch({type: "HIDE_FOOTER"})
        dispatch({type: "CLOSE_MODAL"})

    }

    const handle_update = () => {

        let data = tourguideState[name]
        
        axios.put(link+path+`?${updateID.name}=${updateID.value}`, {...data})
        .then((res)=>toast({
            title: 'Updated Region',
            status: 'success',
            containerStyle:{bg:"success"}
        }))
        .catch(err=>toast({
            title: 'Update Region Error',
            description: "Please try again.",
            status: 'error',
            containerStyle:{bg:"error"}
        }))

        dispatch({type: "HIDE_FOOTER"})

    }

    const goto_page = (type) => {
        if(type === "next" && page < totalPage - 1)
            dispatch({type: "GOTO_NEXT_PAGE"})
        if(type === "back" && page > 0)
            dispatch({type: "GOTO_PREVIOUS_PAGE"})
    }
    

    return !isShow ? <></> :  (
        <PanelFooter>
            {/*             
            {
                totalLength && <Text m="0em 1em">Selected {data.length}/{totalLength}</Text>
            }
             */}
            <Flex justifyContent='space-between'>

                <MyButton text={page === 0 ? 'Cancel' : "Back"} onClick={page === 0 ? onClose : ()=>{goto_page("back")}}/>
                <MyButton text={page === totalPage - 1 ? handle_methodText(method) : "Next"} onClick={()=>{ page === totalPage - 1 ? handle_method(method) : goto_page('next')}}
                    bgColor={handle_methodText(method) === "Delete" ? "danger" : themeColor} />

            </Flex>

        </PanelFooter>
    )
}

export default FunctionalFooter

const PanelFooter = styled(Box)`

    position: relative; z-index: 3;
    width: 100%; max-width: 450px;
    max-height: 120px; height: 100px;
    justify-content: space-around;
    margin-left: auto;
    bottom: 0em; right: 0;

`