import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import { connect, useDispatch } from 'react-redux'
import { updateBooths, updateBoothGames, updateARTreasures } from '../../redux/arTreasure/arTreasure.action' 

import { useColorModeValue } from '@chakra-ui/react'

import LoadingSpinner from '../Common/common/LoadingSpinner/LoadingSpinner'
import Wrapper from '../Common/common/Wrapper/Wrapper'
import GameListContainer from '../ARTreasureEditor/GameListContainer/GameListContainer'
import EditorModal from '../Common/common/EditorModal/EditorModal'

import { arGameHost, tourHost } from '../../constants/constants'
import { updateConfig } from '../../redux/sysConfig/sysConfig.action'
import AnimatedPage from '../Common/common/AnimatedPage/AnimatedPage'
// import ARTreasureEditorbk from '../ARTreasureEditorbk/ARTreasureEditorbk'

const ARTreasureEditorbk = (props) => {

  // const { lang } = useParams()
  
  // const dispatch = useDispatch()

  // const [error, setError] = useState(null)
  // const [isLoading, setIsLoading] = useState(true)


  // const bg = localStorage.getItem('chakra-ui-color-mode') === 'dark' ? 'gray.100' : 'gray.10'

  // const get_data = async (host, path, updateFunction) => {

  //   let url = `${host}/${path}`
  //   await axios.get(url)
  //   .then((res)=>{
  //     dispatch(updateFunction(res.data.data))
  //     console.log("updated from " + url + " successfully;")     
  //     if(path === 'treasures')
  //       console.log(res.data.data)   
  //   })
  //   .catch((err)=>{setError(err)})
      
  // }

  // useEffect(()=>{

  //   // update language parameter in local storage base on url
  //   window.localStorage.setItem('i18n-lang', JSON.stringify(lang === 'eng' ? 'en' : 'zh'))

  //   setError(null)
  //   setIsLoading(true)

  //   Promise.all([
  //     get_data(tourHost, "configs", (data)=>updateConfig(data)),
  //     get_data(tourHost, "booths", (data)=>updateBooths(data)),
  //     get_data(tourHost, "boothGames", (data)=>updateBoothGames(data)),
  //     get_data(arGameHost, "treasures", (data)=>updateARTreasures(data))
  //   ])
  //   .then(()=>{
  //     console.log('loaded')
  //     setIsLoading(false)
  //   })
  
  // }, [])

  // if(error)
  //   return <div>{error.message}</div>

  // return isLoading ? <LoadingSpinner /> : (
  return (
    <></>
    // <ARTreasureEditorbk />
    // <Wrapper isUseChakra >

    //   <GameListContainer />
    //   <EditorModal />

    // </Wrapper>
  )
}

const mapStateToProps = state => {
  return {
    sysConfig: state.sysConfig, 
    form: state.form, 
    modal: state.modal
  };
};

export default connect(
  mapStateToProps,
  null
)(ARTreasureEditorbk)
