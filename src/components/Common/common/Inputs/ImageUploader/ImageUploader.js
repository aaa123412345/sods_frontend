import React, { useState } from 'react'
import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

import { Flex, FormLabel, Text, Image, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'
import { useEffect } from 'react'


const ImageUploader = (props) => {

    const { faIcon, label, names, file, setFile, form } = props

    const { t } = useTranslation()
    const [previewUrl, setPreviewUrl] = useState(form[names.form]?.[names.field] ?? "")

    const bg = useColorModeValue("gray.10", "gray.100")

    const upload_image = (e) => {

        if(e.target.files && e.target.files.length === 1)
            setFile({name: names.field, file:e.target.files[0]})

    }

    useEffect(()=>{

        if(!file)
            return 

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result)
        }
        reader.readAsDataURL(file.file)

    }, [file])

    return (
        
        <Flex mt='1em' flexDir='column'>

            <FormLabel ml=".5em" fontWeight="bold">
                <FontAwesomeIcon icon={faIcon} style={{marginRight: '.5em'}} />
                {t(`modal.${label}`)}
            </FormLabel>

            <ImagePreview bg={bg} borderRadius={25}>
                <Image src={previewUrl} cursor="pointer"/>
                <ImageInput type="file" name="image-upload" id="image-input" accept="image/*"
                    onChange={e=>upload_image(e)}/>
                <Label htmlFor="image-input">
                    {
                        (previewUrl === null || previewUrl === undefined || previewUrl === "" )
                        &&
                        <>
                            <FontAwesomeIcon icon={faUpload} size={'7x'}/>
                            <Text mt="1em">{t('modal.hint-upload')}</Text>
                        </>

                    }
                </Label>
            </ImagePreview>

        </Flex>
        
    )
}

const mapStateToProps = state => {
    return {
      form: state.form,
      modal: state.modal
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageUploader)

const ImageInput = styled.input.attrs({ type: 'file' })`

   display: none;

`

const Label = styled.label`

    position: absolute; 
    z-index: 2;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    width: 100%; height: 100%;

`

const ImagePreview = styled(Flex)`

    position: relative;
    flex-direction: column; align-items: center;
    width: 100%; 
    height: fit-content; min-height: 250px;
    cursor: pointer;
    margin: 1em 0em;
    overflow: hidden;


`