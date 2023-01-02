import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

import { Flex, Text, Image, useColorModeValue } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const ImageUploader = (props) => {

    const { faIcon, label } = props

    const { t } = useTranslation()

    const [image, setImage] = useState("")

    const upload_image = (e) => {

        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result)
            }else(
                setImage("")
            )
        }
        reader.readAsDataURL(e.target.files[0])

        console.log(e.target.files[0])

        // axios.post('http://localhost:8080/images', {image: e.target.files[0]})
        // .then(res=>console.log('succuess'))
        // .catch(err=>console.log('error'))

    }

    const bg = useColorModeValue("gray.10", "gray.100")

    return (
        
        <Flex mt='1em' flexDir='column'>

            <Flex alignItems='center'>
                <FontAwesomeIcon icon={faIcon} />
                <Text ml=".5em" fontWeight="bold">{t(`modal.${label}`)}</Text>
            </Flex>

            <ImagePreview bg={bg} borderRadius={25}>
                <Image src={image}/>
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

export default ImageUploader

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