import React from 'react'
import BoothCard from './BoothCard/BoothCard'
import RegionButton from './RegionButton/RegionButton'

const ItemButton = (props) => {
  
    const { type } = props

    switch(type){

        case 'floorplans':
            return React.createElement(RegionButton,  {...props})
        case 'booths':
            return React.createElement(BoothCard,  {...props})

        default: 
            return 
    }
    
}

export default ItemButton