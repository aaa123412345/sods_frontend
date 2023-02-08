import React from 'react'
import RectangleIconButton from './RectangleIconButton/RectangleIconButton'
import BoothInfoCard from './BoothInfoCard/BoothInfoCard'
import BoothRecord from './BoothRecord/BoothRecord'

const ItemButton = (props) => {
  
    const { type } = props

    switch(type){

        case 'floorplans':
            return React.createElement(RectangleIconButton,  {...props})
        case 'story':
            return React.createElement(RectangleIconButton,  {...props})
        case 'booths':
            return React.createElement(BoothRecord,  {...props})

        default: 
            return 
    }
    
}

export default ItemButton