import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Input, Text, FormLabel, Textarea } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { placeholderLang } from '../../../../../constants/constants'

const TextInput = (props) => {

    const { 
        isTextArea = false, faIcon, label, names, placeholder, form, update
    } = props
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const data = form[names.form]

    const [isErr, setIsErr] = useState(false)
    const supportedLang = ['zh', 'en']
    const border = isErr ? 'red' : 'gray'

    const handle_onChange = (e, lang) => {

        const value = e.target.value
        let newData = {...data}
        let name = names.field + lang.toUpperCase()
        newData[name] = value
        dispatch(update(newData))
        setIsErr(value.length === 0)
        
    }

    return (

        <TextFieldContainer>
                
            <FormLabel ml=".5em" fontWeight="bold">
                <FontAwesomeIcon icon={faIcon} style={{marginRight: '.5em'}} />
                {t(`modal.${label}`)}
            </FormLabel>
            
            {

                supportedLang.map((lang, index) => {

                    return isTextArea?
                    <Textarea key={index} m=".5em 0" borderColor={border} borderRadius={25}
                        value={data[names.field + lang.toUpperCase()]} 
                        onChange={e=>handle_onChange(e, lang)}
                        placeholder={placeholderLang[lang]+placeholder[lang]} />
                    :
                    <CustomInputField key={index} borderColor={border} borderRadius={25}
                        value={data[names.field + lang.toUpperCase()]} 
                        onChange={e=>handle_onChange(e, lang)}
                        placeholder={placeholderLang[lang]+placeholder[lang]} />
                })

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

    margin: .5em 0;
    width: 100%; height: fit-content; 
    padding: .5em 1em; 

`