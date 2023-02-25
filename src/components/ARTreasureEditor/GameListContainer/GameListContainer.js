import React, { useRef } from 'react'

import styled from 'styled-components'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'
import { connect, useDispatch } from 'react-redux'

import { openModal } from '../../../redux/modal/modal.action'

import CustomButton from '../../Common/common/CustomButton/CustomButton'
import GameItem from './GameItem/GameItem'

const GameListContainer = (props) => {

  const { sysConfig, arTreasure } = props
  const { config } = sysConfig
  const { arTreasures } = arTreasure

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const contentRef = useRef()

  const add_game = () => {
    let payload = {
      modalName: 'arTreasure', 
      path: 'arTreasures', method: 'post', 
      name: 'arTreasure',
    }
  
    // setModalSession({...modalSession, ...payload})
    dispatch(openModal(payload))
  }

  return (
    <React.Fragment>

      <Flex m="1em" justifyContent='space-between' alignItems="center">
        <Heading size="lg" m=".5em 0">{t('arTreasureEditor.heading')}</Heading>
        <CustomButton faIcon={faAdd} text={t(`arTreasureEditor.add-game`)} onClick={()=>{add_game()}} bgColor={config.themeColor} cssStyle={{margin: '1em 0'}}/>
      </Flex>


      <Text m="0 1.5em" color="gray"><FontAwesomeIcon icon={faQuestionCircle}/> {' '} {t('arTreasureEditor.remark')}</Text>

      <ScrollContent ref={contentRef} maxH={contentRef?.current?.offsetHeight ?? '100%'}>
        
        {
          arTreasures?.map((treasure, index)=>(
            <GameItem treasure={treasure} key={index} />
          ))??<></>
        }

      </ScrollContent>

    </React.Fragment>
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
)(GameListContainer)

const ScrollContent = styled(Flex)`

  margin-top: 1em; padding: 1em 0;
  flex-direction: column; flex: 1;
  border-radius: 50px 50px 0px 0px;
  overflow-y: scroll;
  overflow-x: hidden;


`