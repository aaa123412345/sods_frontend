import { Heading } from '@chakra-ui/react'
import React from 'react'

const Title = (props) => {

    const { title } = props

    return (
        <Heading size="lg">{title}</Heading>
    )
}

export default Title