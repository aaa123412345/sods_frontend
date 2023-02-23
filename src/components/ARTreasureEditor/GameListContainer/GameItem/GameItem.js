import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { Flex, Box, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import { faPen, faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'

const GameItem = (props) => {

    const { treasure, sysConfig, arTreasure } = props
    const { config } = sysConfig
    const { booths, boothGames } = arTreasure

    const [booth, setBooth] = useState(null)

    const answers = JSON.parse(treasure?.answers)

    const { t } = useTranslation()

    const color = useColorModeValue('white', 'black')
    const bg = useColorModeValue('gray.10', 'gray.100')

    const edit_game = () => {

    }

    const delete_game = () => {


    }

    const ColumnWrap = ({children}) => {
        return (
            <Box w="100%" p=".5em" boxShadow="3px 0px 3px -3px rgba(0, 0, 0, .4)">
                {children}
            </Box>
        )

    }

    useEffect(()=>{

        // init card info
        let boothGame = boothGames?.filter((boothGame) => boothGame.gameId !== treasure.id)
        if(boothGame?.length ?? 0 !== 0){
            
            let booth = booths?.filter((booth) => booth.id !== boothGame[0].boothId)
            if(booth?.length ?? 0 !== 0)
                setBooth(booth[0])

        } 

    }, [])

    return (
        <Record bg={bg} flexDir={{base: "column-reverse", md: 'row'}}> 
            <Flex w={{base:"100%", md: "80%"}} flexDir={{base: "column", md: 'row'}}>
                <ColumnWrap>
                    <Heading size="sm" mb=".5em">{t('arTreasureEditor.heading-question')}</Heading>
                    <Text>{treasure?.questionEN ?? ""}</Text>
                    <Text>{treasure?.questionZH ?? ""}</Text>
                </ColumnWrap>
                <ColumnWrap>
                    <Heading size="sm" mb=".5em">{t('arTreasureEditor.heading-answer')}</Heading>
                    {
                    answers?.map((answer, index)=>(
                        <Tag key={index} bg="gray" color={color}>{answer}</Tag>
                    ))??<></>   
                    }
                </ColumnWrap>
                <ColumnWrap>
                    <Heading size="sm" mb=".5em">{t('arTreasureEditor.heading-booth')}</Heading>
                    <Text>{booth?.titleEN ?? ""}</Text>
                    <Text>{booth?.titleZH ?? ""}</Text>
                </ColumnWrap>
            </Flex>
            <Flex w={{base:"100%", md: "20%"}} justifyContent="space-evenly">
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