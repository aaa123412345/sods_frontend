import React, { useState } from 'react'
import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

import { Flex, FormLabel, Text, Image, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { updateFile } from '../../../../../redux/form/form.action'
import { connect } from 'react-redux'

const ImageUploader = (props) => {

    const { faIcon, label, modal, setFile } = props
    const { byteData } = modal

    const { t } = useTranslation()

    const base64str = 'data:image/*;base64,'
    const [image, setImage] = useState(byteData !== null ? base64str+byteData : "")

    const upload_image = (e) => {

        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result)
            }else
                setImage("")
        }
        reader.readAsDataURL(e.target.files[0])
        // update(e.target.files[0])
        setFile(e.target.files[0])

        console.log(image)

    }

    const bg = useColorModeValue("gray.10", "gray.100")

    return (
        
        <Flex mt='1em' flexDir='column'>

            <FormLabel ml=".5em" fontWeight="bold">
                <FontAwesomeIcon icon={faIcon} style={{marginRight: '.5em'}} />
                {t(`modal.${label}`)}
            </FormLabel>

            <ImagePreview bg={bg} borderRadius={25}>
                <Image src={image} cursor="pointer"/>
                <ImageInput type="file" name="image-upload" id="image-input" accept="image/*"
                    onChange={e=>upload_image(e)}/>
                <Label htmlFor="image-input">
                    {
                        (image === null || image === undefined || image === "" )
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

const mapDispatchToProps = dispatch => ({
    update: (file) => dispatch(updateFile(file))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageUploader)

const ImageInput = styled.input.attrs({ 
    type: 'file'
})`

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