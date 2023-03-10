import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'

import Wrapper from '../Common/common/Wrapper/Wrapper'
import EditorModal from '../Common/common/EditorModal/EditorModal'
import LoadingSpinner from '../Common/common/LoadingSpinner/LoadingSpinner'
import GameListContainer from './GameListContainer/GameListContainer'

import { arGameHost, tourHost } from '../../constants/constants'
import { updateConfig } from '../../redux/sysConfig/sysConfig.action'
import { clearRefreshFlag } from '../../redux/sysConfig/sysConfig.action'
import { updateARBooths, updateARTreasures, updateBoothGames } from '../../redux/arTreasure/arTreasure.action'
import { useColorModeValue } from '@chakra-ui/react'

const ARTreasureEditor = (props) => {

    const { sysConfig, modal } = props
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const dispatch = useDispatch()

    const { lang } = useParams()

    const navigate = useNavigate()

    const bg = localStorage.getItem('chakra-ui-color-mode') === 'dark' ? 'gray.100' : 'gray.10'

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const get_data = async (host, path, updateFunction) => {

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
            get_data(tourHost, 'boothGames', (data) => updateBoothGames(data)),
            get_data(arGameHost, "treasures", (data) => updateARTreasures(data))
        ])
        .then(()=>{
            console.log('loaded')
            setIsLoading(false)
            dispatch(clearRefreshFlag())
        })
     
    }, [sysConfig.refreshFlag])

    if(error)
        return <div>{error.message}</div>

    return isLoading ? <LoadingSpinner /> : (
        <Wrapper isUseChakra isUseContainer bgColor={bg}>
            <GameListContainer />
            <EditorModal />
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        modal: state.modal, 
        sysConfig: state.sysConfig
    };
};

export default connect(
    mapStateToProps,
    null
)(ARTreasureEditor)