import React from 'react'
import RectangleIconButton from './RectangleIconButton/RectangleIconButton'
import BoothButton from './BoothButton/BoothButton'

const ItemButton = (props) => {
  
    const { type } = props

    switch(type){

        case 'floorplans':
            return React.createElement(RectangleIconButton,  {...props})
        case 'stories':
            return React.createElement(RectangleIconButton,  {...props})
        case 'booths':
            return React.createElement(BoothButton,  {...props})
        case 'boothGame': 
            return React.createElement(BoothButton,  {isNotUseFunction: true, ...props})
        default: 
            return 
    }
    
}

export default ItemButton