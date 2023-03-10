import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'

import { updateARTreasure, updateBoothGames, updateARBooths } from '../../redux/arTreasure/arTreasure.action'
import { updateConfig } from '../../redux/sysConfig/sysConfig.action'
import { clearLoadingItem, updateLoadingItem } from '../../redux/tourguide/tourguide.action'

import ARTreasure from './ARTreasure/ARTreasure'
import GameInterface from './GameInterface/GameInterface'
import LoadingSpinner from '../Common/common/LoadingSpinner/LoadingSpinner'

import { arGameHost, tourHost } from '../../constants/constants'

const ARCanvas = () => {

    const [isLocked, setIsLocked] = useState(true)
    const [isFound, setIsFound] = useState(false)

    const { treasures, treasureId } = useSelector(state => state.arTreasure)

    const { lang, id } = useParams()
    const dispatch = useDispatch()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // const testId = 6120100000000000

    const get_data = async (host, path, updateFunction) => {

        dispatch(updateLoadingItem(`tourguide.loading-${path}`))
        let url = `${host}/${path}`
        await axios.get(url)
        .then((res)=>{
            dispatch(updateFunction(res.data.data))
            console.log("updated from " + url + " successfully;")            
        })
        .catch((err)=>{setError(err)})
        
    }

    useEffect(()=>{

        // update language parameter in local storage base on url
        window.localStorage.setItem('i18n-lang', JSON.stringify(lang === 'eng' ? 'en' : 'zh'))

        setError(null)
        setIsLoading(true)
    
        Promise.all([
            get_data(tourHost, "configs", (data) => updateConfig(data)),
            get_data(tourHost, "booths", (data) => updateARBooths(data)),
            get_data(tourHost, "boothGames", (data) => updateBoothGames(data)),
            get_data(arGameHost, `treasures/${id}`, (data) => updateARTreasure(data))
        ])
        .then(()=>{
            console.log('loaded')
            setIsLoading(false)
            dispatch(clearLoadingItem())
        })
     
    }, [])    

    if(error)
        return <div>{error.message}</div>

    if(isLoading)
        return <LoadingSpinner />

    if(treasures === null)
        return <div>No Available Mini Game Found</div>

    return (
        <React.Fragment>
            
            <GameInterface isFound={isFound} isLocked={isLocked} setIsLocked={setIsLocked}  />
            <ARTreasure isLocked={isLocked} setIsFound={setIsFound}/>
                
        </React.Fragment>
    )
}

export default ARCanvas 
