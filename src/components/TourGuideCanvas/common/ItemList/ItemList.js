import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Flex, Heading, useToast } from '@chakra-ui/react'

import ItemButton from './ItemButton/ItemButton'
import Toolbar from '../Toolbar/Toolbar'
import FunctionalFooter from '../FunctionalFooter/FunctionalFooter'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import useSessionStorage from '../../../../hooks/useSessionStorage'

import { useDispatch, connect } from 'react-redux'
import { updateBooths, updateFloorplans, updateRegionIndex, updateStories, updateStoryIndex } from '../../../../redux/tourguide/tourguide.action'
import { toast_generator } from '../../../../helpers/toastGenerator'

import { useTranslation } from 'react-i18next'

const ItemList = (props) => {

  const { 
    isCategoryList, isRegionFilter = false, 
    modalIndex, heading, path, name,
    tourguide, modal
  } = props

  const { 
    themeColor, host, storyIndex, regionIndex, page, floorplans
  } = tourguide
  const { isOpen } = modal
  const dispatch = useDispatch()

  const { t } = useTranslation()

  // session storage
  const [regionIndexSession, setRegionIndexSession] = useSessionStorage('regionIndex', 0)
  const [storyIndexSession, setStoryIndexSession] = useSessionStorage('storyIndex', 0)

  // chakra hooks
  const toast = useToast({ duration: 3000, isClosable: true })

  // react state
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [items, setItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  const handle_active = (index) => {

    let isSameIndex = (regionIndex === index && path === "floorplans") || (storyIndex === index && path === "story")

    if(isDeleteMode)
      return selectedItems.includes(items[index].id) ? true : false 
    if(isCategoryList)
      return isSameIndex ?  true : false
    return false

  }

  const add_to_list = (index) => {

    let newList = [...selectedItems]
    let current = items[index].id

    if(newList.includes(current))
      newList.splice(newList.indexOf(current), 1)
    else
      newList.push(current)

    setSelectedItems(newList)

  }

  const update_page = (index) => {

    if(path === 'floorplans'){
      setRegionIndexSession(index)
      dispatch(updateRegionIndex(index))
    }

    if(path === 'story'){
      setStoryIndexSession(index)
      dispatch(updateStoryIndex(index))
    }
  }

  const select_item = (index) => {

    if(isDeleteMode)
      add_to_list(index)
  
    if(isCategoryList)
      update_page(index)
    
  }

  const update_data = (data) => {

    if(path==="floorplans")
      dispatch(updateFloorplans(data))
    if(path==="booths")
      dispatch(updateBooths(data))
    if(path==="story")
      dispatch(updateStories(data))
    
    setItems(data)

  }

  useEffect(()=>{

    if(path === "floorplans")
      update_page(regionIndexSession)
    if(path === "story")
      update_page(storyIndexSession)

  },[])

  useEffect(()=>{
    setSelectedItems([])
  },[isDeleteMode])

  useEffect(()=>{
    setItems([])
    setIsLoading(true)
  }, [page])

  useEffect(()=>{
    
    const refreshId = setTimeout(()=>{  

      let targetFloor = floorplans[regionIndex]
      const regionStr = targetFloor !== undefined ? targetFloor.region['en'] : ""
      const queryStr = isRegionFilter ? "?region=" +  regionStr : ""
      axios.get(host+path+queryStr)
      .then((res)=>{
        let data = res.data.data
        update_data(data)
        setError(null)
        setIsLoading(false)
      })
      .catch(err=>{
        toast(toast_generator())
        setError(error)
        setIsLoading(true)
      })

    }, 1000)


    return () => clearTimeout(refreshId)

  },[regionIndex, isOpen, isDeleteMode, page])

  if(error !== null)
    return <div>{error.message}</div>

  if(isLoading)
    return <LoadingSpinner />

  return (
    
    <React.Fragment>

      <Toolbar type={1} 
        modalIndex={modalIndex} 
        path={path} name={name} 
        isDeleteMode={isDeleteMode} 
        setIsDeleteMode={setIsDeleteMode} />

      <Title size="sm">{t(`${heading}`)}</Title>

      <ScrollContent flexDir={{base: 'row', md: isCategoryList?"column":"row"}}
        flexWrap={{md: isCategoryList ? 'no-wrap':"wrap"}}
        overflowX={{base: 'scroll', md: "hidden"}}
        overflowY={{base: 'hidden', md: "scroll"}}>
        {
          items !== undefined && 
          items.map((item, index) => (
            <ItemButton key={index} type={path} data={item}
              variant={handle_active(index) ? isDeleteMode ? 'danger': themeColor : 'gray'}
              onClick={()=>(select_item(index))}/>
          ))
        }
      </ScrollContent>

      <FunctionalFooter 
        isShow={isDeleteMode} 
        onClose={()=>{setIsDeleteMode(false); setSelectedItems([])}}
        path={path} method='delete' data={selectedItems}
        />

    </React.Fragment>
    
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
)(ItemList)

const ScrollContent = styled(Flex)`

  position: relative;
  height: 100%; width: 100%;
  padding: 1em 0em;
  overflow: scroll;

`

const Title = styled(Heading)`

  margin-top: 1em;
  margin-left: 1em;

`
