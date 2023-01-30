import React, { useState, useEffect }  from 'react'
import styled from 'styled-components'

import { Flex, Heading } from '@chakra-ui/react'

import ItemButton from './ItemButton/ItemButton'
import Toolbar from '../Toolbar/Toolbar'
import FunctionalFooter from '../FunctionalFooter/FunctionalFooter'

import useSessionStorage from '../../../../hooks/useSessionStorage'

import { useDispatch, connect } from 'react-redux'
import { updateBooths, updateItemIndex } from '../../../../redux/tourguide/tourguide.action'

import { useTranslation } from 'react-i18next'

import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { updateBooth } from '../../../../redux/form/form.action'

const ItemList = (props) => {

  const { 
    data, isCategoryList, isFloorFilter,
    modalIndex, heading, path, name,
    tourguide, modal
  } = props

  const { host, themeColor, itemIndex, floorplans, page } = tourguide
  const dispatch = useDispatch()

  const { t } = useTranslation()

  // session storage
  const [itemIndexSession, setItemIndexSession] = useSessionStorage('itemIndex', 0)

  // react state
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [items, setItems] = useState()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const handle_active = (index) => {

    let isSameIndex = itemIndex === index

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
    setItemIndexSession(index)
    dispatch(updateItemIndex(index))
  }

  const select_item = (index) => {

    if(isDeleteMode)
      add_to_list(index)
  
    if(isCategoryList)
      update_page(index)
    
  }

  useEffect(()=>{
    update_page(itemIndexSession)
  },[])

  useEffect(()=>{
    setItems(data !== null ? data : [])
  },[page, data])

  useEffect(()=>{

    if(isFloorFilter && floorplans.length !== 0 ){

      const delayID = setTimeout(()=>{
        
        let floorplanID = floorplans[itemIndex].id
        axios.get(host+path+"?floorplan-id="+floorplanID)
        .then(res=>{
          let data = res.data.data
          // console.log(data)
          setItems(data)
          dispatch(updateBooths(data))
          setIsLoading(false)
          setError(null)
        })
        .catch(err=>{
          setIsLoading(true)
          setError(err)
        })

      },1000)

      return () => clearTimeout(delayID)

    }else
      setIsLoading(false)

  }, [itemIndex, modal.isOpen])

  useEffect(()=>{
    setSelectedItems([])
  },[isDeleteMode])


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

      <ScrollContent flexDir={{base: 'column', md: isCategoryList?"column":"row"}}
        flexWrap={{base: "no-wrap", md: isCategoryList ? "no-wrap":"wrap"}}
        overflowX="hidden" overflowY="scroll">
        <AnimatePresence>
        {
          
          items !== undefined && 
          items.map((item, index) => (
            <ItemButton key={index} type={path} data={item}
              variant={handle_active(index) ? isDeleteMode ? 'danger': themeColor : 'gray'}
              onClick={()=>(select_item(index))}/>
          ))
        }
        </AnimatePresence>
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
  width: 100%; flex: 1;
  padding: 1em 0em;

`

const Title = styled(Heading)`

  margin-top: 1em;
  margin-left: 1em;

`
