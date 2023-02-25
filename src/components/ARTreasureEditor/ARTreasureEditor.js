import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import { connect, useDispatch } from 'react-redux'
import { updateBooths, updateBoothGames, updateARTreasures } from '../../redux/arTreasure/arTreasure.action' 

import LoadingSpinner from '../Common/common/LoadingSpinner/LoadingSpinner'
import Wrapper from '../Common/common/Wrapper/Wrapper'
import GameListContainer from './GameListContainer/GameListContainer'

import { arGameHost, tourHost } from '../../constants/constants'
import { updateConfig } from '../../redux/sysConfig/sysConfig.action'
import EditorModal from '../Common/common/EditorModal/EditorModal'

const ARTreasureEditor = (props) => {
  
  const { sysConfig } = props
  const { config } = sysConfig

  const { lang } = useParams()
  
  const dispatch = useDispatch()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  console.log(config)

  const get_data = async (host, path, updateFunction) => {

    // dispatch(updateLoadingItem(`tourguide.loading-${path}`))
    let url = `${host}/${path}`
    await axios.get(url)
    .then((res)=>{
      dispatch(updateFunction(res.data.data))
      console.log("updated from " + url + " successfully;")            
    })
    .catch((err)=>{setError(err)})
      
  }

  useEffect(()=>{

    // update language parameter in local storage base on url
    window.localStorage.setItem('i18n-lang', JSON.stringify(lang === 'eng' ? 'en' : 'zh'))

    setError(null)
    setIsLoading(true)

    Promise.all([
      get_data(tourHost, "configs", (data)=>updateConfig(data)),
      get_data(tourHost, "booths", (data)=>updateBooths(data)),
      get_data(tourHost, "boothGames", (data)=>updateBoothGames(data)),
      get_data(arGameHost, "treasures", (data)=>updateARTreasures(data))
    ])
    .then(()=>{
      console.log('loaded')
      setIsLoading(false)
      // dispatch(clearLoadingItem())
    })
  
  }, [])

  if(error)
    return <div>{error.message}</div>

  return isLoading ? <LoadingSpinner /> : (
    <Wrapper isUseChakra isUseContainer>

      <GameListContainer />
      <EditorModal />

    </Wrapper>
  )
}

const mapStateToProps = state => {
  return {
    sysConfig: state.sysConfig
  };
};

export default connect(
  mapStateToProps,
  null
)(ARTreasureEditor)
