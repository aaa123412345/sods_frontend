import React from 'react'
import BoothCard from './BoothCard/BoothCard'
import RectangleIconButton from './RectangleIconButton/RectangleIconButton'
import BoothInfoCard from './BoothInfoCard/BoothInfoCard'

const ItemButton = (props) => {
  
    const { type } = props

    switch(type){

        case 'floorplans':
            return React.createElement(RectangleIconButton,  {...props})
        case 'story':
            return React.createElement(RectangleIconButton,  {...props})
        case 'booths':
            return React.createElement(BoothInfoCard,  {...props})

        default: 
            return 
    }
    
}

export default ItemButton