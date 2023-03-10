import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { Flex, Box, Text, Heading, useColorModeValue } from '@chakra-ui/react'
import { faPen, faQuestion, faTent, faTrash } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'
import { connect, useDispatch } from 'react-redux'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'

import useWindowSize from '../../../../hooks/useWindowSize'
import { openModal } from '../../../../redux/modal/modal.action'
import { updateARGame, updateBoothGame } from '../../../../redux/form/form.action'
import { mobileBreakPoint, tourHost, arGameHost } from '../../../../constants/constants'

const GameItem = (props) => {

    const { isHeader = false, treasure, sysConfig, arTreasure, form } = props
    const { config } = sysConfig
    const { booths, boothGames } = arTreasure

    const [booth, setBooth] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const answers = JSON.parse(treasure?.answers ?? JSON.stringify([]))

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const color = useColorModeValue('white', 'black')
    const bg = useColorModeValue('gray.10', 'gray.100')
    const windowSize = useWindowSize()

    const assign_game = () => {
        console.log('boothGames: ', boothGames)

        let hasRecord = boothGames.filter((boothGame)=>boothGame?.gameId === treasure?.treasureId)
        console.log('hasRecord: ', hasRecord)
        
        dispatch(updateBoothGame({gameId: treasure.treasureId, boothId: booth?.boothId }))

        let payload = {
            modalName: 'boothGame', 
            host: tourHost, path: 'boothGames', method: 'post', 
            name: 'boothGame',
        }
        
        dispatch(openModal(payload))

    }

    const edit_game = () => {

        dispatch(updateARGame(treasure))
        let payload = {
            modalName: 'arTreasure', 
            host: arGameHost, path: 'treasures', method: 'put', 
            name: 'arGame', id: treasure.treasureId
        }

        dispatch(openModal(payload))

    }

    const delete_game = () => {

        let modalPayload = {
            host: arGameHost, path: "treasures", method: "delete",
            name: 'arGame', id: treasure.treasureId
        }
        
        dispatch(openModal(modalPayload))

    }

    const ColumnHeading = ({title}) => {
        return (
            <React.Fragment>
                {
                    (isHeader || (!isHeader && windowSize.width <= mobileBreakPoint)) && 
                    <Heading size="sm" mb=".5em" color="gray">{title}</Heading>
                }
            </React.Fragment>
        )
    }

    const ColumnWrap = ({children}) => {
        return (
            <Box w="100%" p=".5em" boxShadow={{base: 'none', md: "3px 0px 3px -3px rgba(0, 0, 0, .4)"}}>
                {isHeader ? children[0] : children}
            </Box>
        )

    }

    useEffect(()=>{

        if(!isHeader){

            // init card info
            let boothGame = boothGames?.filter((boothGame) => boothGame.gameId === treasure.treasureId)
            
            if(boothGame?.length ?? 0 !== 0){      
                
                let booth = booths?.filter((booth) => booth.id.toString() === boothGame[0].boothId.toString())
                if(booth?.length ?? 0 !== 0)
                    setBooth(booth[0])
            }
        }

        setIsLoaded(true)

    }, [])

    return ((isHeader && windowSize.width > mobileBreakPoint) || !isHeader) && (
        <Record bg={bg} flexDir={{base: "column-reverse", md: 'row'}} boxShadow={{base: '0px 5px 15px rgba(0, 0, 0, .2)', md: '0px 15px 15px -15px rgba(0, 0, 0, .2)'}}> 
            <Flex w={{base:"100%", md: "80%"}} flexDir={{base: "column", md: 'row'}}>
                <ColumnWrap>
                    <ColumnHeading title={t('arTreasureEditor.heading-question')}/>
                    <Text>{treasure?.questionEN ?? ""}</Text>
                    <Text>{treasure?.questionZH ?? ""}</Text>
                </ColumnWrap>
                <ColumnWrap>
                    <ColumnHeading title={t('arTreasureEditor.heading-answer')}/>
                    <Flex flexWrap="wrap">
                        {
                            answers?.map((answer, index)=>(
                                <Tag key={index} color={color}>{answer}</Tag>
                            ))??<></>   
                        }
                    </Flex>
                </ColumnWrap>
                <ColumnWrap>
                    <ColumnHeading title={t('arTreasureEditor.heading-booth')}/>
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
                {
                    isHeader ? 
                    <ColumnHeading title={""}/>
                    :
                    <>
                        <CustomButton bgColor={config.themeColor} faIcon={faPen} onClick={()=>{edit_game()}} isCircle/>
                        <CustomButton bgColor='danger' faIcon={faTrash} onClick={()=>{delete_game()}} isCircle/>
                    </>
                }
            </Flex>
        </Record>
    )
}

const mapStateToProps = state => {
    return {
      sysConfig: state.sysConfig, 
      arTreasure: state.arTreasure, 
      form: state.form
    };
};
  
export default connect(
mapStateToProps,
null
)(GameItem)

const Record = styled(Flex)`

    margin: 1em auto; padding: .5em;
    width: 90%;

`

const Tag = styled(Text)`
  
    width: fit-content;
    margin: .1em;
    padding: .5em .8em; 
    border-radius: 18px;
    backdrop-filter: brightness(.7);
    color:white;
    
`