import React, { useState, useEffect, useRef } from 'react'
import ARTreasure from './ARTreasure/ARTreasure'
import GameInterface from './GameInterface/GameInterface'

const ARCanvas = () => {

    const [isLocked, setIsLocked] = useState(true)
    const [isFound, setIsFound] = useState(false)

    return (
        <React.Fragment>
            <GameInterface isFound={isFound} isLocked={isLocked} setIsLocked={setIsLocked} />
            <ARTreasure isLocked={isLocked} setIsFound={setIsFound}/>
        </React.Fragment>
    )
}

export default ARCanvas 
