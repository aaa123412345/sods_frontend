import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Flex, Input, FormLabel } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DateTimePicker = (props) => {

    const { faIcon, label, names, update, form } = props

    const dispatch = useDispatch()

    const { t } = useTranslation()

    const [isErr, setIsErr] = useState(false)
    
    const border = isErr ? 'red' : 'gray'
    const data = form[names.form]
    const tempDate = new Date().toISOString()
    console.log(JSON.parse(data[names.field]))

    const handle_onChange = (e) => {
        setIsErr(false)
        let newData = {...data}
        let value = e.target.value
        newData[names.field] = JSON.stringify(value)
        dispatch(update({...newData}))
        if(new Date(value).getTime() < new Date().getTime())
            setIsErr(true)
    }

    return (
        <FieldContainer>

            <FormLabel ml=".5em" fontWeight="bold">
                <FontAwesomeIcon icon={faIcon} style={{marginRight: '.5em'}} />
                {t(`modal.${label}`)}
            </FormLabel>
            <Input m=".5em 0" borderColor={border} borderRadius={25} placeholder="Select Date and Time" size="md" type="datetime-local" 
                defaultValue={(data[names.field] ?? tempDate).substring(1, 17)}
                onChange={(e)=>{handle_onChange(e)}}/>

        </FieldContainer>
    )
}

const mapStateToProps = state => {
    return {
      form: state.form,
      modal: state.modal,
      sysConfig: state.sysConfig
    };
};
const mapDispatchToProps = dispatch => ({
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DateTimePicker)

const FieldContainer = styled(Flex)`

    margin-top: 1em; 
    flex-direction: column; 
    align-items: flex-start;

`