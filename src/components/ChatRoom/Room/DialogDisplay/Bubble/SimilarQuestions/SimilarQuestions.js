import React from 'react'
import styled from 'styled-components'
import { List, ListItem, Box, Text } from '@chakra-ui/react'

const SimilarQuestions = (props) => {


    const { questions, color, sendMessage } = props

    return questions?.length ? (
        <Box maxW="80%" m="1em .5em">
            <Text fontWeight={'bold'} color={'white'}>Questions you may want to ask:</Text>
            <List>
                {
                    questions.map((question, index) => (
                        <Question key={index} borderColor={color} color={color} onClick={()=>{sendMessage(question)}}>{question}</Question>
                    ))
                }
            </List>

        </Box>
    ) : <></>
}

export default SimilarQuestions

const Question = styled(ListItem)`


    border-radius: 50px;
    border-width: 1.5px;
    margin: .5em 0;
    padding: .5em .75em;
    cursor: pointer;
    font-size: .9rem;
    box-shadow: 0px 2.5px 18px rgba(0, 0, 0, .1);
    background: rgba(255, 255, 255, .5);
    font-weight: bold;




`