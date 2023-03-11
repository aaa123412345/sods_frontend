import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import { Flex, Button, FormLabel } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { updateConfig, updateOriginalThemeColor } from '../../../../../redux/sysConfig/sysConfig.action'

const ColorPicker = (props) => {

    const { label, faIcon, names, form, sysConfig, update } = props
    const { config, originalThemeColor } = sysConfig

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const variants = ['red', 'blue', 'green', 'orange', 'purple', 'pink']

    const switch_color = (color) => {
        dispatch(updateConfig({...config, themeColor: color}))
        let data = form[names.form]
        let newData = {...data}
        newData[names.field] = color
        console.log(data)
        dispatch(update({...newData}))
    }

    return (
        <FieldContainer>
            <FormLabel ml=".5em" fontWeight="bold">
                <FontAwesomeIcon icon={faIcon} style={{marginRight: '.5em'}} />
                {t(`modal.${label}`)}
            </FormLabel>
            <Flex w="90%" flexWrap={'wrap'} >
                {
                    variants.map((color, index) => (
                        <Button h='45' w="100%" key={index} variant={color} 
                            flexBasis="30%" flexGrow="0" flexShrink="0"
                            onClick={()=>switch_color(color)}>
                            {t(`tourguideEditor.color-${color}`)}
                        </Button>
                    ))
                }
            </Flex>
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
)(ColorPicker)

const FieldContainer = styled(Flex)`

    margin-top: 1em; 
    flex-direction: column; 
    align-items: flex-start;

`