import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import styled from 'styled-components'
import { Box, Flex, Input, Heading, Text } from '@chakra-ui/react'
import { faExclamationCircle, faUnlock, faRotateBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'
import { arGameHost } from '../../../../constants/constants'
import { UserContext } from '../../../../App'


const PasswordLock = (props) => {

    const { setIsLocked, isLocked, isFound, tourguide, sysConfig, arTreasure } = props
    const { treasure } = arTreasure
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'

    const { lang } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()
    
    const [currentStep, setCurrentStep] = useState("1")
    const [password, setPassword] = useState('')

    const { user } = useContext(UserContext)
    
    const startTime = JSON.parse(localStorage.getItem('treasure_startTime'))
    const data = { user: user.userId, treasureId: treasure.treasureId, startTime: startTime }


    const unlock_treasure = () => {

        let score = 0
        
        if(startTime !== undefined && treasure){

            if(treasure.answers.includes(password)){
                setIsLocked(false)
                setCurrentStep("3")
                score = 1
            }

            data = { ...data, userAnswer: password, score: score, endTime: new Date().toISOString() }

            const header = { headers: { token: user.token } }

            axios.post(arGameHost + "/" + "treasureStatistics", data, header)
                .then(res=>localStorage.removeItem('treasure_startTime'))
                .catch(err=>console.log(err.message))

        }
    
    }
    const leave = () => {

        navigate(`/public/${lang}/tourguide/ticket`)

    }

    useEffect(()=>{

        if(!isLocked)
            setCurrentStep('3')

        if(isFound && isLocked)
            setCurrentStep("2")

    }, [isFound])

    return (
        <LockContainer bg={themeColor}>

            <Box w="90%" m="0 auto">

                <Heading size="sm">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {" " + t(`arTreasure.hint-${currentStep}`)}
                </Heading>

                {
                    currentStep === '2'
                    &&
                    <React.Fragment>
                        <Heading mt=".5em" size="sm">{t('arTreasure.question')}</Heading>
                        <Text>{treasure.question}</Text>

                        <Flex mt=".5em">

                            <Input value={password} onChange={(e)=>{setPassword(e.target.value)}}
                                placeholder={t('arTreasure.placeholder-password')}/>
                            <CustomButton faIcon={faUnlock} text={t('arTreasure.unlock')} cssStyle={{width: 'fit-content'}} 
                                onClick={()=>{unlock_treasure()}} />

                        </Flex>
                    </React.Fragment>
                }

                {
                    currentStep === '3'
                    &&
                    <CustomButton text={t('arTreasure.back')} faIcon={faRotateBackward}
                        onClick={()=>{leave()}}/>
                }

            </Box>

        </LockContainer>
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide, 
        modal: state.modal, 
        sysConfig: state.sysConfig,
        arTreasure: state.arTreasure
    };
};

export default connect(
    mapStateToProps,
    null
)(PasswordLock)

const LockContainer = styled(Flex)`

    flex-direction: column; 
    justify-content: center; align-items: space-around;

    position: fixed;
    bottom: 0; left: 0;

    height: 200px; width: 100%;
    box-shadow: 0px -10px 10px rgba(0, 0, 0, .3);

    border-radius: 50px 50px 0px 0px;

`