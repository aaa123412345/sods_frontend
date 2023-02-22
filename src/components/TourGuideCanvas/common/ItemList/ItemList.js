import React, { useState, useEffect }  from 'react'

import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { Flex, Heading } from '@chakra-ui/react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useDispatch, connect } from 'react-redux'

import { updateBooths, updateItemIndex } from '../../../../redux/tourguide/tourguide.action'
import { updateBooth } from '../../../../redux/form/form.action'
import { openModal } from '../../../../redux/modal/modal.action'

import ItemButton from './ItemButton/ItemButton'
import CustomButton from '../../../Common/common/CustomButton/CustomButton'

import useSessionStorage from '../../../../hooks/useSessionStorage'

const ItemList = (props) => {

  const { 
    dataName, isCategoryList, modalName, heading, path, name,
    tourguide, modal
  } = props

  const { host, themeColor, itemIndex, floorplans, page, markers } = tourguide
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const isNoRegionDefined = path === "booths" && floorplans.length === 0 ? true : false
  

  // session storage
  // const [itemIndexSession, setItemIndexSession] = useSessionStorage('itemIndex', 0)

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
    // setItemIndexSession(index)
    dispatch(updateItemIndex(index))
  }

  const select_item = (index) => {
  
    if(isCategoryList)
      update_page(index)
    
  }

  const open_modal = () => {

      let payload = {
          modalName: modalName, 
          path: path, method: 'post', 
          name: name,
      }
      
      // setModalSession({...modalSession, ...payload})
      dispatch(openModal(payload))
      
  }

  return (
    
    <React.Fragment>

      <Flex m="1em .5em">
        <CustomButton faIcon={faAdd} bgColor={themeColor} 
          text={t(`tourguideEditor.create-${path}`)}
          isDisabled={isNoRegionDefined} onClick={open_modal}
          />
      </Flex>

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
