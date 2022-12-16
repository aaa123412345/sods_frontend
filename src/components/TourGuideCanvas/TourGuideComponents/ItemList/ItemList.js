import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Flex, Heading, useToast } from '@chakra-ui/react'

import ItemButton from './ItemButton/ItemButton'
import Toolbar from '../../TourGuideComponents/Toolbar/Toolbar'
import FunctionalFooter from '../../TourGuideComponents/FunctionalFooter/FunctionalFooter'
import { useDispatch, useSelector } from 'react-redux'
import useSessionStorage from '../../../../hooks/useSessionStorage'

const ItemList = (props) => {

  const { 
    isCategoryList, isRegionFilter = false, 
    modalIndex, 
    heading, path, name, 
    id = "id" 
  } = props

  // redux state
  const themeColor = useSelector(state => state.themeConfig.themeColor)
  const link = useSelector(state => state.themeConfig.link)
  const { storyIndex, regionIndex, floorplans, page } = useSelector(state => state.tourguide)
  const { isOpen } = useSelector(state => state.modal)
  const dispatch = useDispatch()

  // session storage
  const [regionIndexSession, setRegionIndexSession] = useSessionStorage('regionIndex', 0)
  const [storyIndexSession, setStoryIndexSession] = useSessionStorage('storyIndex', 0)

  // chakra hooks
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })

  // react state
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [items, setItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  const handle_active = (index) => {

    return isDeleteMode ? 
      selectedItems.includes(items[index][id]) ? true : false 
      :
      isCategoryList ? (regionIndex === index && path === "floorplans") || (storyIndex === index && path === "story") ?  true : false
      :
      false

  }

  const add_to_list = (index) => {

    let newList = [...selectedItems]
    let current = items[index]

    if(newList.includes(current[id]))
      newList.splice(newList.indexOf(current[id]), 1)
    else
      newList.push(current[id])
      
    setSelectedItems(newList)

  }

  const update_page = (index) => {
    if(path === 'floorplans'){
      setRegionIndexSession(index)
      dispatch({type: "UPDATE_REGION_INDEX", payload: index})
    }

    if(path === 'story'){
      setStoryIndexSession(index)
      dispatch({type: "UPDATE_STORY_INDEX", payload: index})
    }
  }

  const select_item = (index) => {

    if(isDeleteMode)
      add_to_list(index)
  
    if(isCategoryList)
      update_page(index)
    

  }

  const update_data = (data) => {

    let type = ""
    
    if(path==="floorplans")
      type = "UPDATE_FLOORPLANS"
    if(path==="booths")
      type = "UPDATE_BOOTHS"
    if(path==="story")
      type = "UPDATE_STORIES"
    
    setItems(data)
    dispatch({type: type, payload: data})

  }

  useEffect(()=>{

    setSelectedItems([])

  },[isDeleteMode])

  useEffect(()=>{

    update_page(regionIndexSession)

  },[])

  useEffect(()=>{

    const regionStr = floorplans[regionIndex] !== undefined ? floorplans[regionIndex]['region'] : ""

    const queryStr = isRegionFilter ? "?region=" +  regionStr : ""

    // console.log(floorplans) // for debug use
    axios.get(link+path+queryStr)
    .then((res)=>{
      let data = res.data
      update_data(data)
    })
    .catch(err=>toast({
        title: 'Error',
        description: "Please try again.",
        status: 'error',
        containerStyle:{bg:"error"}
    }))

  },[regionIndex, isDeleteMode, isOpen, page])

  return (
    
    <React.Fragment>

      <Toolbar 
        type={1} 
        modalIndex={modalIndex} 
        path={path} 
        name={name} 
        isDeleteMode={isDeleteMode} 
        setIsDeleteMode={setIsDeleteMode} />

      <Heading size="sm" mt="1em" ml="1em">{heading}</Heading>

      <ScrollContent flexDir={{base: 'row', md: isCategoryList?"column":"row"}}
        flexWrap={{md: isCategoryList ? 'no-wrap':"wrap"}}
        overflowX={{base: 'scroll', md: "hidden"}}
        overflowY={{base: 'hidden', md: "scroll"}}>
        {
          items.length !== 0 && 
          items.map((item, index) => (
            <ItemButton key={index}
              type={path} 
              variant={handle_active(index) ? isDeleteMode ? 'danger': themeColor : 'gray'}
              onClick={()=>(select_item(index))}
              data={item}/>
          ))
        }
      </ScrollContent>

      <FunctionalFooter 
        isShow={isDeleteMode} 
        onClose={()=>{setIsDeleteMode(false); setSelectedItems([])}}
        path={path} method='delete'
        data={selectedItems}
        />

    </React.Fragment>
    
  )
}

export default ItemList

const ScrollContent = styled(Flex)`

  position: relative;
  height: 100%; width: 100%;
  padding: 1em 0em;
  overflow: scroll;

`
