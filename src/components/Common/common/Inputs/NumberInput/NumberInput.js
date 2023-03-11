import React from 'react'

import { useTranslation } from 'react-i18next'
import { connect, useDispatch } from 'react-redux'

import styled from 'styled-components'
import { Flex, Box, FormLabel, Input, Button } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons'

const NumberInput = (props) => {

    const { 
        needButtons = false, max = 9999, min = 0, 
        names, faIcon, label, placeholder, update,
        tourguide, form, sysConfig
    } = props

    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const dispatch = useDispatch()

    const { t } = useTranslation()

    const data = form[names.form]

    const step = 1

    const update_value = (value) => {
        let newData = {...data}
        newData[names.field] = value
        dispatch(update(newData))
    } 

    const handle_increment = () => {

        let newValue = parseInt(data[names.field]) + step
        if(newValue > max)
            newValue = max
        update_value(newValue)
        
    }

    const handle_decrement = () => {

        let newValue = parseInt(data[names.field]) - step
        if(newValue < min)
            newValue = min
        update_value(newValue)

    }

    const handle_change = (e) => {

        let value = e.target.value
        update_value(value)

    }

    return (

        <FieldContainer>
                
            <FormLabel ml=".5em" fontWeight="bold">
                <FontAwesomeIcon icon={faIcon} style={{marginRight: '.5em'}} />
                {t(`modal.${label}`)}
            </FormLabel>
   
            <Flex>

                <CircleButton bg={themeColor} borderRadius="50% 0% 0% 50%"  h="50px" onClick={handle_decrement}>
                    <FontAwesomeIcon icon={faMinus} isDisabled={parseInt(data[names.field]) <= min} />
                </CircleButton>

                <NumInput type='number' borderRadius={0} textAlign={'center'} h="50px" placeholder={placeholder}
                    name={names.field} value={data[names.field]} 
                    onChange={e=>handle_change(e)} onBlur={e=>handle_change(e)} />
                
                <CircleButton bg={themeColor} borderRadius="0% 50% 50% 0%"  h="50px" onClick={handle_increment}>
                    <FontAwesomeIcon icon={faAdd} isDisabled={parseInt(data[names.field]) > max}/>
                </CircleButton>
            </Flex>
                
            
        </FieldContainer>

    )
}

const mapStateToProps = state => {
    return {
      form: state.form,
      sysConfig: state.sysConfig,
      modal: state.modal
    };
};
const mapDispatchToProps = dispatch => ({
    // update: (type, payload) => dispatch(({type: type, payload: payload }))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberInput);
  

const InputContainer = styled(Box)`
    
    margin: 1.5em 0em;
    width: 100%;

`

const Margin = styled(Flex)`

    margin: 1em 0em;
    justify-content: space-between;

`

const CircleButton = styled(Button)`

    color: white;
    width: 50px; height: 50px;

`

const NumInput = styled(Input)`

    width: 100%;

`

const FieldContainer = styled(Flex)`

    margin-top: 1em; 
    flex-direction: column; 
    align-items: flex-start;

`