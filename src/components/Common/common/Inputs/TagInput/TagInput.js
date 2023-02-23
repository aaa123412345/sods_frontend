import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { Flex, Box, Heading, Text, Input, FormLabel } from '@chakra-ui/react'
import { faA, faAdd, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTranslation } from 'react-i18next'
import { useDispatch, connect } from 'react-redux'

import CustomButton from '../../CustomButton/CustomButton'

const TagInput = (props) => {

    const { faIcon, label, names, placeholder, update, form } = props

    const [tagInput, setTagInput] = useState('')
    const [tagList, setTagList] = useState([])
    const [isErr, setIsErr] = useState(false)
    const border = isErr ? 'red' : 'gray'

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const add_tag = () => {

        setIsErr(false)

        if(tagInput.length !== 0){

            let newList = [...tagList]
            newList.push(tagInput)
            setTagList([...newList])
            setTagInput('')

        }else{
            setIsErr(true)
        }

    }

    const remove_tag = (removeIndex) => {

        let newList = [...tagList]
        newList = newList.filter((item, index)=> index !== removeIndex)
        setTagList([...newList])

    }

    useEffect(()=>{

        let answers = JSON.stringify(tagList)
        let data = form[names.form][names.field]
        let newData = {...data}
        newData['answers'] = answers
        dispatch(update(newData))

    }, [tagList])

    const Tag = ({text, onClick}) => {
        return (
            <Flex w="fit-content" m=".5em" paddingRight=".5em" borderRadius="25px" boxShadow="0px 1px 5px rgba(0, 0, 0, .2)" alignItems="center" justifyContent="space-around"
                onClick={onClick}>
                <Text m="0 .5em">{text}</Text>
                <FontAwesomeIcon icon={faXmarkCircle} />
            </Flex>
        )
    }

    return (
        <Box>
            
            <FormLabel ml=".5em" fontWeight="bold">
                <FontAwesomeIcon icon={faIcon} style={{marginRight: '.5em'}} />
                {t(`modal.${label}`)}
            </FormLabel>

            <Flex>
                <CustomInputField borderColor={border} borderRadius={25} w="90%"
                    value={tagInput} 
                    onChange={(e)=>{setTagInput(e.target.value)}}
                    placeholder={placeholder['zh'] + '/' + placeholder['en']} />

                <CustomButton faIcon={faAdd} onClick={add_tag} isCircle/>
            </Flex>

            <Flex>
                {
                    tagList.map((tag, index)=>(
                        <Tag key={index} text={tag} onClick={()=>{remove_tag(index)}}/>
                    ))
                }
            </Flex>

        </Box>
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
)(TagInput)


const CustomInputField = styled(Input)`

    margin: .5em 0;
    width: 100%; height: fit-content; 
    padding: .5em 1em; 

`
