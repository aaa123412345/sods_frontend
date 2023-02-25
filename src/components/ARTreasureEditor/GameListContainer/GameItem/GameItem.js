import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { Flex, Box, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import { faPen, faQuestion, faTent, faTrash } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'
import { connect, useDispatch } from 'react-redux'

import { openModal } from '../../../../redux/modal/modal.action'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'

const GameItem = (props) => {

    const { treasure, sysConfig, arTreasure } = props
    const { config } = sysConfig
    const { booths, boothGames } = arTreasure

    const [booth, setBooth] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const answers = JSON.parse(treasure?.answers)

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const color = useColorModeValue('white', 'black')
    const bg = useColorModeValue('gray.10', 'gray.100')

    const assign_game = () => {

        let payload = {
            modalName: 'boothGame', 
            path: 'boothGames', method: 'post', 
            name: 'boothGame',
        }
        
        // setModalSession({...modalSession, ...payload})
        dispatch(openModal(payload))

    }

    const edit_game = () => {

    }

    const delete_game = () => {


    }

    const ColumnWrap = ({children}) => {
        return (
            <Box w="100%" p=".5em" boxShadow={{base: 'none', md: "3px 0px 3px -3px rgba(0, 0, 0, .4)"}}>
                {children}
            </Box>
        )

    }

    useEffect(()=>{

        // init card info
        let boothGame = boothGames?.filter((boothGame) => boothGame.gameId !== treasure.treasureId)
        
        if(boothGame?.length ?? 0 !== 0){      

            let booth = booths?.filter((booth) => booth.id !== boothGame[0].boothId)
            if(booth?.length ?? 0 !== 0)
                setBooth(booth[0])

        }

        setIsLoaded(true)

    }, [])

    return (
        <Record bg={bg} flexDir={{base: "column-reverse", md: 'row'}}> 
            <Flex w={{base:"100%", md: "80%"}} flexDir={{base: "column", md: 'row'}}>
                <ColumnWrap>
                    <Heading size="sm" mb=".5em" color="gray">{t('arTreasureEditor.heading-question')}</Heading>
                    <Text>{treasure?.questionEN ?? ""}</Text>
                    <Text>{treasure?.questionZH ?? ""}</Text>
                </ColumnWrap>
                <ColumnWrap>
                    <Heading size="sm" mb=".5em" color="gray">{t('arTreasureEditor.heading-answer')}</Heading>
                    {
                        answers?.map((answer, index)=>(
                            <Tag key={index} bg="gray" color={color}>{answer}</Tag>
                        ))??<></>   
                    }
                </ColumnWrap>
                <ColumnWrap>
                    <Heading size="sm" mb=".5em" color="gray">{t('arTreasureEditor.heading-booth')}</Heading>
                    {
                        !isLoaded ? <Text>{t('arTreasureEditor.loading')}</Text>
                        :
                        booth !== undefined && booth !== null ?
                        <React.Fragment>
                            <Text>{booth?.titleEN ?? ""}</Text>
                            <Text>{booth?.titleZH ?? ""}</Text>
                        </React.Fragment>
                        :
                        <CustomButton faIcon={faTent} text={t('arTreasureEditor.assign')} onClick={assign_game} cssStyle={{width: "fit-content"}} isDisableToHideText/>
                    }
                </ColumnWrap>
            </Flex>
            <Flex w={{base:"100%", md: "20%"}} justifyContent={{base: 'flex-end', md: "space-evenly"}}>
                <CustomButton bgColor={config.themeColor} faIcon={faPen} onClick={()=>{edit_game()}} isCircle/>
                <CustomButton bgColor='danger' faIcon={faTrash} onClick={()=>{delete_game()}} isCircle/>
            </Flex>
        </Record>
    )
}

const mapStateToProps = state => {
    return {
      sysConfig: state.sysConfig, 
      arTreasure: state.arTreasure
    };
};
  
export default connect(
mapStateToProps,
null
)(GameItem)

const Record = styled(Flex)`

    margin: 1em auto; padding: .5em;
    width: 90%;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, .2);
    border-radius: 25px;

`

const Tag = styled(Text)`
  
    width: fit-content;
    padding: .5em; 
    border-radius: 25px;
    
`