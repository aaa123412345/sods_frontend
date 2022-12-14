import React from 'react'
import BoothCard from './BoothCard/BoothCard'
import RectangleIconButton from './RectangleIconButton/RectangleIconButton'

const ItemButton = (props) => {
  
    const { type } = props

    switch(type){

        case 'floorplans':
            return React.createElement(RectangleIconButton,  {...props})
        case 'story':
            return React.createElement(RectangleIconButton,  {...props})
        case 'booths':
            return React.createElement(BoothCard,  {...props})

        default: 
            return 
    }
    
}

export default ItemButton