import React, { useRef } from 'react'

import styled from 'styled-components'
import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'
import { connect, useDispatch } from 'react-redux'

import { openModal } from '../../../redux/modal/modal.action'

import CustomButton from '../../Common/common/CustomButton/CustomButton'
import GameItem from './GameItem/GameItem'
import { arGameHost } from '../../../constants/constants'

const GameListContainer = (props) => {

  const { sysConfig, arTreasure, form } = props
  const { config } = sysConfig
  const { treasures } = arTreasure

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const headerRef = useRef()
  const bg = useColorModeValue('gray.10', 'gray.100')

  const add_game = () => {
    console.log(form.boothGame)
    let payload = {
      modalName: 'arTreasure', 
      host: arGameHost, path: 'treasures', method: 'post', 
      name: 'arGame'
    }
    dispatch(openModal(payload))
    
  }

  return (
    
    <Flex flexDir='column' bg={bg}>

      <div ref={headerRef}>
        <Flex m="1em" justifyContent='space-between' alignItems="center">
          <Heading size="lg" m=".5em 0">{t('arTreasureEditor.heading')}</Heading>
          <CustomButton faIcon={faAdd} text={t(`arTreasureEditor.add-game`)} onClick={()=>{add_game()}} bgColor={config.themeColor} cssStyle={{margin: '1em 0'}}/>
        </Flex>

        <Text m="0 1.5em" color="gray"><FontAwesomeIcon icon={faQuestionCircle}/> {' ' + t('arTreasureEditor.remark')}</Text>
      </div>

      <ScrollContent bg={bg} maxH={`calc(100vh - ${(headerRef?.current?.offsetHeight) + 16 * 3 }px)` ?? '100vh'} h={`calc(100vh - ${(headerRef?.current?.offsetHeight) + 16 * 3 }px)` }>

        <GameItem isHeader/>
        
        {
          treasures?.map((treasure, index)=>(
            <GameItem treasure={treasure} key={index} />
          ))??<></>
        }

      </ScrollContent>

    </Flex>

    
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
)(GameListContainer)

const ScrollContent = styled(Flex)`

  position: relative;
  margin-top: 1em; padding: 1em 0;
  flex-direction: column; flex: 1;
  border-radius: 50px 50px 0px 0px;
  overflow-y: scroll;
  overflow-x: hidden;

`