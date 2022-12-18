import React from 'react'
import styled from 'styled-components'
import { Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch } from 'react-redux'

const TextInput = (props) => {

    const { 
        isTextArea = false, 
        faIcon, label, names, placeholder, 
        form, update
    } = props
    const dispatch = useDispatch()

    const data = form[names.form]

    const handle_onChange = (e) => {

        const value = e.target.value
        let newData = {...data}
        newData[names.field] = value
        dispatch(update(newData))

    }


    return (

        <TextFieldContainer>

            <Flex alignItems='center'>
                <FontAwesomeIcon icon={faIcon} />
                <Text ml=".5em" fontWeight="bold">{label}</Text>
            </Flex>
            
            {

                isTextArea?
                <CustomInputField
                    borderRadius={25}
                    name={names.field}
                    value={data[names.field]} 
                    onChange={e=>handle_onChange(e)}
                    placeholder={placeholder} 
                    />
                :
                <CustomInputField
                    borderRadius={25}
                    name={names.field}
                    value={data[names.field]} 
                    onChange={e=>handle_onChange(e)}
                    placeholder={placeholder} 
                    />
            }
           
        </TextFieldContainer>

    )
}

const mapStateToProps = state => {
    return {
      form: state.form
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