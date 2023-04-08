import React, { useState, useEffect }  from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styled from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { Flex, Heading, FormLabel } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import { langGetter } from '../../../../helpers/langGetter'

const ItemList = (props) => {

  const { 
    dataName, isCategoryList, modalName, heading, method, host, path, name,
    isInputList = false, faIcon, label, names, update,
    tourguide, arTreasure, sysConfig, form
  } = props

  const { config } = sysConfig
  const { themeColor } = config ?? 'gray'
  const { itemIndex, floorplans, stories } = tourguide
  const dispatch = useDispatch()

  const { subsubpath } = useParams()
  const nagvigate = useNavigate()

  const { t } = useTranslation()

  const lang = langGetter() === 'en' ? 'eng' : 'chi'

  const [selectedIndex, setSelectIndex] = useState(null) // input & local use 

  const isNoRegionDefined = path === "booths" && floorplans.length === 0 ? true : false


  const handle_active = (index) => {

    let isSameIndex = (itemIndex === index) 

    if(isInputList)
      return selectedIndex === index
    if(isCategoryList)
      return isSameIndex 
    return false

  }

  const update_page = (index) => {
    dispatch(updateItemIndex(index))

    if(subsubpath !== 'booths'){
      let datalist = path === "floorplans" ? floorplans : stories
      let id = datalist[index].id
      nagvigate(`/server/${lang}/tourguide/editor/${path}/${id}`)
    }
    
  }

  const select_item = (index) => {
  
    if(isCategoryList)
      update_page(index)

    if(isInputList){
      setSelectIndex(index)
      let newData = {...form[names.form]}
      newData[names.field] = arTreasure['booths'][index].id
      dispatch(update({...newData}))
    }
    
  }

  const open_modal = () => {

    let payload = {
      modalName: modalName, 
      host: host, path: path, method: method, 
      name: name,
    }
    dispatch(openModal(payload))
      
  }

  return (
    
    <React.Fragment>

      <Flex flexDir="column" w="100%">
        {

          !isInputList && 
          <React.Fragment>
            <Flex m="1em .5em">
              <CustomButton faIcon={faAdd} bgColor={themeColor} 
                text={t(`tourguideEditor.create-${path}`)}
                isDisabled={isNoRegionDefined} onClick={open_modal}
                />
            </Flex>
      
            <Title size="sm">{t(`${heading}`)}</Title>
          </React.Fragment>

        }

        { 
          isInputList && 
          <FormLabel ml=".5em" fontWeight="bold">
            <FontAwesomeIcon icon={faIcon} style={{marginRight: '.5em'}} />
            {t(`modal.${label}`)}
          </FormLabel>
        }

        <ScrollContent flexDir={{base: isCategoryList ? 'row' : 'column', md: 'column'}} flexWrap="no-wrap" overflowX={{base: 'scroll', md: "hidden"}} overflowY={{base: isCategoryList ? "scroll":"hidden", md: "scroll"}}>
          <AnimatePresence>
          {

            (isInputList ? arTreasure['booths'] : tourguide[dataName])?.map((item, index) => (
              <ItemButton key={index} type={path ?? names?.form} data={item}
                variant={handle_active(index) ? themeColor : 'gray'}
                onClick={()=>(select_item(index))}/>
            )) ?? <></>
          }

          </AnimatePresence>
        </ScrollContent>

      </Flex>


    </React.Fragment>
    
  )
}

const mapStateToProps = state => {
  return {
      tourguide: state.tourguide,
      sysConfig: state.sysConfig,
      arTreasure: state.arTreasure,
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
