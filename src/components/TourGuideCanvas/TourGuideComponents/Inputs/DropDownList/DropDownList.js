import React, { useState, useEffect } from 'react'
import { Flex, Text, Select } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch } from 'react-redux'
import axios from 'axios'

const DropDownList = (props) => {

  const { 
    faIcon, label,
    defaultList, names, placeholder,  
    fetchTarget = null,
    updateType, tourguide, form, update,
  } = props

  const { host } = tourguide
  const data = form[names.form]
  const dispach = useDispatch()

  const [itemList, setItemList] = useState(defaultList)
  const [selectedItem, setSelecteditem] = useState(null)

  const handle_onChange = (e) => {

      const value = e.target.value
      let newData = {...data}
      newData[names.field] = value
      setSelecteditem(value)
      update(updateType, newData)
      
  }

  useEffect(()=>{

    // if(defaultList !== undefined){

    //   console.log(selectedItem)
    //   if(selectedItem != null){
    //     const path = selectedItem.toLowerCase().split(' ').join('-')
    //     axios.get(link+path)
    //     .then((res)=>{
    //       let tempData = res.data
    //       dispach({type: fetchTarget.type, payload: tempData})
    //     }).catch((err)=>console.log(err))
    //   }

    // }else{

    //   setItemList(tourguideData[fetchTarget.name])

    // }

  },[selectedItem])
  
  return (
    
    <Flex
      mt="1em" 
      flexDir="column" 
      alignItems='flex-start' >

      <Flex alignItems='center'>
          <FontAwesomeIcon icon={faIcon} />
          <Text ml=".5em" fontWeight="bold">{label}</Text>
      </Flex>
        
        <Select m="1em 0em "
          borderRadius={25}
          placeholder={placeholder} 
          onChange={(e)=>{handle_onChange(e)}}>
          {
              itemList !== undefined &&
              itemList.map((item, index)=>(

                <option key={index}>{defaultList === undefined? item.name:item}</option>

              ))
          }
        </Select>
    </Flex>

  )
}

const mapStateToProps = state => {
  return {
    tourguide: state.tourguide,
    form: state.form
  };
};
const mapDispatchToProps = dispatch => ({
  update: (type, payload) => dispatch(({type: type, payload: payload }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDownList);