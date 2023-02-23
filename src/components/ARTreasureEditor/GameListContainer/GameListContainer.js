import React, { useRef } from 'react'

import styled from 'styled-components'
import { Flex, Heading } from '@chakra-ui/react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import CustomButton from '../../Common/common/CustomButton/CustomButton'
import GameItem from './GameItem/GameItem'

const GameListContainer = (props) => {

  const { sysConfig, arTreasure } = props
  const { config } = sysConfig
  const { arTreasures } = arTreasure

  const { t } = useTranslation()

  const contentRef = useRef()

  const add_game = () => {
    
  }

  return (
    <React.Fragment>

      <CustomButton faIcon={faAdd} text={t(`arTreasureEditor.add-game`)} onClick={()=>{add_game()}} bgColor={config.themeColor} cssStyle={{margin: '1em'}}/>

      <Heading size="lg" m=".5em 1em">{t('arTreasureEditor.heading')}</Heading>

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