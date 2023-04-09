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

    const emptyArray = JSON.stringify([])
    const data = form[names.form]
    const [tagInput, setTagInput] = useState('')
    const [tagList, setTagList] = useState(JSON.parse(data[names.field] ??emptyArray))

    const [isErr, setIsErr] = useState(false)
    const border = isErr ? 'red' : 'gray'


    const { t } = useTranslation()
    const dispatch = useDispatch()

    const get_newData = (list) => {
        let answers = JSON.stringify(list)
        let data = form[names.form]
        let newData = {...data}
        newData[names.field] = answers
        return {...newData}
    }

    const add_tag = () => {

        setIsErr(false)

        if(tagInput.length !== 0 && !tagList.includes(tagInput)){

            let newList = [...tagList]
            newList.push(tagInput)
            setTagList([...newList])
            setTagInput('')
            dispatch(update(get_newData([...newList])))

        }else{
            setIsErr(true)
        }

    }

    const remove_tag = (removeIndex) => {

        let newList = [...tagList]
        newList = newList.filter((item, index)=> index !== removeIndex)
        setTagList([...newList])
        dispatch(update(get_newData([...newList])))

    }

    const handle_onChange = (e) => {
        
        setTagInput(e.target.value)

    }

    const Tag = ({text, onClick}) => {
        return (
            
                <StyledTag
                    onClick={()=>{onClick()}}>
                    <Text m="0 .5em">{text}</Text>
                    <FontAwesomeIcon icon={faXmarkCircle} />
                </StyledTag>
            
        )
    }

    useEffect(()=>{
        console.log('reload')
    }, [])

    return (

        <Box mt=".5em">
            
            <FormLabel ml=".5em" fontWeight="bold">
                <FontAwesomeIcon icon={faIcon} style={{marginRight: '.5em'}} />
                {t(`modal.${label}`)}
            </FormLabel>

            <Flex>
                <CustomInputField borderColor={border} borderRadius={25} w="90%"
                    value={tagInput} 
                    onChange={(e)=>{handle_onChange(e)}}
                    placeholder={placeholder['zh'] + '/' + placeholder['en']} />

                <CustomButton faIcon={faAdd} onClick={()=>{add_tag()}} isCircle/>
            </Flex>

            <Flex wrap="wrap">
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
      form: state.form
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

const StyledTag = styled(Flex)`

    align-items: center; justify-content: space-around;
    margin: .5em; padding: .5em;
    padding-right: 1em;
    width: fit-content;
    border-radius: 16px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, .2);
    cursor: pointer;
    backdrop-filter: brightness(.7);
    color: white;

`
