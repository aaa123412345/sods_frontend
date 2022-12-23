import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch } from 'react-redux'
import { updateIsError } from '../../../../../redux/modal/modal.action'
import { useTranslation } from 'react-i18next'

const TextInput = (props) => {

    const { 
        index, isTextArea = false, 
        faIcon, label, names, placeholder, 
        form, update
    } = props
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const data = form[names.form]

    const [isErr, setIsErr] = useState(false)
    const border = isErr ? 'red' : 'gray'

    const handle_onChange = (e) => {

        const value = e.target.value
        let newData = {...data}
        newData[names.field] = value
        dispatch(update(newData))
        setIsErr(value.length === 0)
        
    }

    return (

        <TextFieldContainer>

            <Flex alignItems='center'>
                <FontAwesomeIcon icon={faIcon} />
                <Text ml=".5em" fontWeight="bold">{t(`modal.${label}`)}</Text>
            </Flex>
            
            {

                isTextArea?
                <Textarea m="1em 0"
                    borderColor={border}
                    borderRadius={25}
                    name={names.field}
                    value={data[names.field]} 
                    onChange={e=>handle_onChange(e)}
                    placeholder={t(`modal.${placeholder}`)} 
                />
                :
                <CustomInputField
                    borderColor={border}
                    borderRadius={25}
                    name={names.field}
                    value={data[names.field]} 
                    onChange={e=>handle_onChange(e)}
                    placeholder={t(`modal.${placeholder}`)} 
                    />
            }
           
        </TextFieldContainer>

    )
}

const mapStateToProps = state => {
    return {
      form: state.form,
      modal: state.modal
    };
};
const mapDispatchToProps = dispatch => ({
    // update: (type, payload) => dispatch(({type: type, payload: payload }))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInput);
  
const TextFieldContainer = styled(Flex)`

    margin-top: 1em; 
    flex-direction: column; 
    align-items: flex-start;


`

const CustomInputField = styled(Input)`

    margin: 1em 0;
    width: 100%; height: fit-content; 
    padding: .5em 1em; 

`