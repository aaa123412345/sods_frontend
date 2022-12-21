import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Heading, CardHeader, Popover, PopoverTrigger, PopoverContent, Button, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import MyButton from '../../../../EditorButton/EditorButton'
import CardIcon from '../CardIcon/CardIcon'
import useSessionStorage from '../../../../../../../hooks/useSessionStorage'
import { faTent, faPen, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { updateModal, openModal } from '../../../../../../../redux/modal/modal.action'
import { updateBooth } from '../../../../../../../redux/form/form.action'


const CardHeaderBar = (props) => {

    const { variant, data, tourguide, form, modal } = props
    const { themeColor, host } = tourguide
    const { booth } = form
    const dispatch = useDispatch()

    // session storage
    const [boothSession, setBoothSession] = useSessionStorage('booth', booth)
    const [modalSession, setModalSession] = useSessionStorage('modal', modal)
    // constant
    const borderRadius = 25

    const bg = useColorModeValue("white", "black")
    const color = useColorModeValue("black", "white")

    const open_BoothModal = () => {

        axios.get(host+'booths/'+data.id)
        .then(res=>{
            let data = res.data.data
            let boothPayload = {
                region: data.region,
                name: data.name,
                venue: data.venue,
                description: data.description,
                passcode: data.passcode
            }
            let modalPayload = {
                modalIndex: 1,
                path: 'booths',
                method: "put",
                name: 'booth',
                id: data.id
            }
            setBoothSession(boothPayload)
            setModalSession({
                ...modalSession, 
                ...modalPayload,
                page: 0,
                isOpen: true,
                isError: false
            })
            
            dispatch(updateBooth(boothPayload))
            dispatch(openModal(modalPayload))
    
        })
        .catch(err=>console.log(err))
    
    }
    
    // const open_MarkerModal = () => {
    
    //     // continue later
    //     // axios.get(link+'markers/'+data.id)
    //     // .then(res=>{
    //     //     let data = res.data
    //     //     console.log(data)
    //         let modalPayload = {
    //             modalIndex: 2,
    //             path: 'markers',
    //             method: "put",
    //             name: 'marker',
    //             id: data.id
    //         }
    //         setModalSession({
    //             ...modalSession, 
    //             ...modalPayload,
    //             page: 0,
    //             isOpen: true,
    //             isError: false
    //         })
    //         dispatch({type: "OPEN_MODAL", payload: modalPayload})
    //     // })
    //     // .catch(err=>console.log(err))
    
    // }
    
    // const open_GameModal = () => {
    
    //     // continue later
    //     // axios.get(link+`${data.gameType}/`+data.id)
    //     // .then(res=>{
    //     //     let data = res.data
    //     //     console.log(data)
    //         let modalPayload = {
    //             modalIndex: 3,
    //             path: data.gameType,
    //             method: "put",
    //             name: 'game',
    //             id: data.id
    //         }
    //         setModalSession({
    //             ...modalSession, 
    //             ...modalPayload,
    //             page: 0,
    //             isOpen: true,
    //             isError: false
    //         })
    //         dispatch({type: "OPEN_MODAL", payload: modalPayload})
    //     // })
    //     // .catch(err=>console.log(err))
    
    // }
    
    const TopBar = () => {
    
        return (
            <Flex justifyContent='flex-end'>
    
                <IconContainer bg={bg}>
                    <Text color={color} m="auto">
                        <CardIcon icon={faTent} isNoPadding/>
                    </Text>
                </IconContainer>
    
    
                <Popover>
                    <PopoverTrigger>
                        <Button bg={bg} color={color} 
                            m={0} borderRadius={50}>
                                <CardIcon icon={faPen} />Edit 
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent w="100%" h="fit-content" bg="transparent" borderColor="transparent">
                        {/* <MyButton text='Marker' faIcon={faMapPin} onClick={open_MarkerModal}/> */}
                        <MyButton text='Booth' faIcon={faTent} onClick={open_BoothModal}/>
                        {/* <MyButton text='Mini Game' faIcon={faGamepad} onClick={open_GameModal}/> */}
                    </PopoverContent>
                </Popover>
                
            </Flex>
        )
    
    }

    return (
        <CardHeader w="100%"
            position='relative'
            bg={variant === 'gray'?themeColor:variant} 
            borderRadius={`${borderRadius}px ${borderRadius}px 0px 0px`}
            boxShadow={'0px -22px 22px -22px rgba(0, 0, 0, .7) inset'}>
            
            <TopBar />

            <Heading p=".5em 0" size="md" color="white" noOfLines={1}>
                {data.name}
            </Heading>
            <Text p=".5em 0" color="white" noOfLines={2}>
                <CardIcon icon={faLocationDot} />
                {data.venue.length !== 0? data.venue : "NA"}
            </Text>

        </CardHeader>
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
)(CardHeaderBar)


const IconContainer = styled(Flex)`

    position: absolute;
    left: 0; top: 0;
    align-items: center; justify-content: center;
    border-radius: 24px 0px 50% 0px;
    width: 50px; height: 50px;
    box-shadow: 0px -5px 12px rgba(0, 0, 0, .2) inset;

`