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
    dataName, isCategoryList,
    modalIndex, heading, path, name,
    tourguide, modal
  } = props

  const { host, themeColor, itemIndex, floorplans, page, markers } = tourguide
  const dispatch = useDispatch()

  const { t } = useTranslation()

  // session storage
  const [itemIndexSession, setItemIndexSession] = useSessionStorage('itemIndex', 0)

  // react state
  // const [items, setItems] = useState()

  const handle_active = (index) => {

    let isSameIndex = itemIndex === index

    // if(isDeleteMode)
    //   return selectedItems.includes(items[index].id) ? true : false 
    if(isCategoryList)
      return isSameIndex ?  true : false
    return false

  }

  const update_page = (index) => {
    setItemIndexSession(index)
    dispatch(updateItemIndex(index))
  }

  const select_item = (index) => {
  
    if(isCategoryList)
      update_page(index)
    
  }

  return (
    
    <React.Fragment>

      <Toolbar type={1} 
        modalIndex={modalIndex} 
        path={path} name={name} />

      <Title size="sm">{t(`${heading}`)}</Title>

      <ScrollContent flexDir="column" flexWrap="no-wrap" overflowX="hidden" overflowY="scroll">
        <AnimatePresence>
        {
          tourguide[dataName]?.map((item, index) => (
            <ItemButton key={index} type={path} data={item}
              variant={handle_active(index) ? themeColor : 'gray'}
              onClick={()=>(select_item(index))}/>
          )) ?? <></>
        }
        </AnimatePresence>
      </ScrollContent>

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
