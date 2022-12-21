import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardIcon = (props) => {

    const {icon, isNoPadding = false} = props

    return (
        <FontAwesomeIcon icon={icon} 
            style={{marginRight: isNoPadding? '0':'1em'}}/>
    )
}

export default CardIcon
