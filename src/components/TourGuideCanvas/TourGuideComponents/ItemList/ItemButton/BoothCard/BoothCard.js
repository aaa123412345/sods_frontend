import React, { useState } from 'react'
import styled from 'styled-components'
import { 
    Card, CardHeader, Heading, CardBody, Text, Button, 
    Flex, Box, Popover, PopoverTrigger,
    PopoverContent, useColorModeValue 
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft, faFont, faGamepad, faKey, faLocationDot, faMapPin, faPen, faTent } from '@fortawesome/free-solid-svg-icons'
import MyButton from '../../../MyButton/MyButton'
import axios from 'axios'
import useSessionStorage from '../../../../../../hooks/useSessionStorage'


const BoothCard = (props) => {

    const { variant, onClick, data } = props 

    // redux states
    const { themeColor, link } = useSelector(state=>state.themeConfig)
    const tourguideState = useSelector(state => state.tourguide)
    const modalState = useSelector(state => state.modal)
    const dispatch = useDispatch()

    // session storage
    const [boothSession, setBoothSession] = useSessionStorage('booth', tourguideState.booth)
    const [modalSession, setModalSession] = useSessionStorage('modal', modalState)

    // chakra hooks
    const bg = useColorModeValue("white", "black")
    const color = useColorModeValue("black", "white")

    // constant
    const borderRadius = 25

    // react state
    const [currentIndex, setCurrentIndex] = useState(0)

    const open_BoothModal = () => {

        axios.get(link+'booths/'+data.id)
        .then(res=>{
            let data = res.data
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
                updateID: {
                    name: 'id',
                    value: data.id
                }
            }
            setBoothSession(boothPayload)
            setModalSession({
                ...modalSession, 
                ...modalPayload,
                page: 0,
                isOpen: true,
                isError: false
            })
            dispatch({type: 'UPDATE_BOOTH', payload: boothPayload})
            dispatch({type: "OPEN_MODAL", payload: modalPayload})
        })
        .catch(err=>console.log(err))

    }

    const open_MarkerModal = () => {

        // continue later
        // axios.get(link+'markers/'+data.id)
        // .then(res=>{
        //     let data = res.data
        //     console.log(data)
            let modalPayload = {
                modalIndex: 2,
                path: 'markers',
                method: "put",
                name: 'marker',
                updateID: {
                    name: 'id',
                    value: data.id
                }
            }
            setModalSession({
                ...modalSession, 
                ...modalPayload,
                page: 0,
                isOpen: true,
                isError: false
            })
            dispatch({type: "OPEN_MODAL", payload: modalPayload})
        // })
        // .catch(err=>console.log(err))

    }

    const open_GameModal = () => {

        // continue later
        // axios.get(link+`${data.gameType}/`+data.id)
        // .then(res=>{
        //     let data = res.data
        //     console.log(data)
            let modalPayload = {
                modalIndex: 3,
                path: data.gameType,
                method: "put",
                name: 'game',
                updateID: {
                    name: 'id',
                    value: data.id
                }
            }
            setModalSession({
                ...modalSession, 
                ...modalPayload,
                page: 0,
                isOpen: true,
                isError: false
            })
            dispatch({type: "OPEN_MODAL", payload: modalPayload})
        // })
        // .catch(err=>console.log(err))

    }

    const Icon = (props) => {

        const {icon, isNoPadding = false} = props

        return (
            <FontAwesomeIcon icon={icon} 
                style={{marginRight: isNoPadding? '0':'1em'}}/>
        )
    }

    const TopBar = () => {

        return (
            <Flex justifyContent='flex-end'>

                <CardIcon bg={bg}>
                    <Text color={color} m="auto">
                        <Icon icon={faTent} isNoPadding/>
                    </Text>
                </CardIcon>


                <Popover>
                    <PopoverTrigger>
                        <Button bg={bg} color={color} 
                            m={0} borderRadius={50}>
                                <Icon icon={faPen} />Edit 
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent w="100%" h="fit-content" bg="transparent" borderColor="transparent">
                        <MyButton text='Marker' faIcon={faMapPin} onClick={open_MarkerModal}/>
                        <MyButton text='Booth' faIcon={faTent} onClick={open_BoothModal}/>
                        <MyButton text='Mini Game' faIcon={faGamepad} onClick={open_GameModal}/>
                    </PopoverContent>
                </Popover>
                
            </Flex>
        )

    }

    const Header = (props) => {
        return (
            <CardHeader w="100%"
                position='relative'
                bg={variant === 'gray'?themeColor:variant} 
                borderRadius={`${borderRadius}px ${borderRadius}px 0px 0px`}
                boxShadow={'0px -22px 22px -22px rgba(0, 0, 0, .7) inset'}>
                
                <TopBar />

                <Heading p=".5em 0" size="md" color="white" noOfLines={1}>
                    {props.text}
                </Heading>
                <Text p=".5em 0" color="white" noOfLines={2}>
                    <Icon icon={faLocationDot} />
                    {data.venue.length !== 0? data.venue : "NA"}
                </Text>

            </CardHeader>
        )
    }

    const ButtonBar = () => {

        const buttons = [
            faFont, faKey, faGamepad
        ]

        return (

            <Flex position="relative" top="-20px" zIndex={5}>
                {
                    buttons.map((button,index)=>(
                        <Button key={index} w={35} h={35}
                            m="0 .5em" bg={currentIndex === index ? themeColor : 'gray'}
                            color={'white'} borderRadius="50%"
                            boxShadow={'0px -5px 22px rgba(0, 0, 0, .2)'}
                            onClick={()=>setCurrentIndex(index)}>
                            <Icon icon={button} isNoPadding/>
                        </Button>

                    ))
                }
            </Flex>

        )

    }

    const Body = (props) => {

        const { data } = props

        const infoList = [
            { icon: faAlignLeft, label: "Description", text: data.description },
            { icon: faKey, label: "Passcode", text: data.passcode },
            { icon: faGamepad, label: "Game Type", text: data.gameType }
        ]

        return (

            <CardBody position="relative"
                p="0 1em" overflow='scroll' w="100%"
                textAlign='left'>

                <Box m="0 .5em" color={color}> 
                    <Text color={themeColor} fontWeight="bold">
                        <Icon icon={infoList[currentIndex].icon} />{infoList[currentIndex].label}
                    </Text>
                    <Text noOfLines={3}>{infoList[currentIndex].text !== null ? infoList[currentIndex].text : "NA"}</Text>
                </Box>
                    
            </CardBody>
            
        )
    }

    return (

        <CardButton bg={variant==="gray"?bg:variant} 
            color={variant==="gray"?"black":"white"} 
            onClick={onClick}
            borderRadius={borderRadius} 
            boxShadow={'0px 5px 12px rgba(0, 0, 0, .2)'}
            >
            
            <Header text={data.name}/>
            <ButtonBar currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            <Body data={data}/>

        </CardButton>

    )
}

export default BoothCard

const CardButton = styled(Card)`

    margin: 1em 1em;
    height: 350px;
    width: 250px; min-width: 250px; max-width: 250px;
    flex-basis: 100%; flex-grow: 0; flex-shrink: 0;
    cursor: pointer;

`
const CardIcon = styled(Flex)`

    position: absolute;
    left: 0; top: 0;
    align-items: center; justify-content: center;
    border-radius: 24px 0px 50% 0px;
    width: 50px; height: 50px;
    box-shadow: 0px -5px 12px rgba(0, 0, 0, .2) inset;

`