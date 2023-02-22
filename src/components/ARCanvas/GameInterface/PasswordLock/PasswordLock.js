import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import { Box, Flex, Input, Heading, Text } from '@chakra-ui/react'
import { faExclamationCircle, faUnlock, faRotateBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux'

import CustomButton from '../../../Common/common/CustomButton/CustomButton'


const PasswordLock = (props) => {

    const { setIsLocked, isLocked, isFound, tourguide } = props
    const { themeColor } = tourguide

    const { lang, id } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()
    
    const [currentStep, setCurrentStep] = useState("1")
    const [password, setPassword] = useState('')

    const question = "What is name of college?"
    const answer = "polyu"

    const unlock_treasure = () => {
        if(answer === password){
            setIsLocked(false)
            setCurrentStep("3")
        }

        // post record 
    }

    useEffect(()=>{

        console.log('currentStep: ', currentStep)
        if(!isLocked){
            setCurrentStep('3')
            console.log('step 3')
        }

        if(isFound && isLocked){
            console.log('step 2')
            setCurrentStep("2")
        }

    }, [isFound])

    return (
        <LockContainer bg={themeColor}>

            <Box w="90%" m="0 auto">

                <Heading size="sm">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {" "}
                    {t(`arTreasure.hint-${currentStep}`)}
                </Heading>

                {
                    currentStep === '2'
                    &&
                    <React.Fragment>
                        <Heading mt=".5em" size="sm">{t('arTreasure.question')}</Heading>
                        <Text>{question}</Text>

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
                        onClick={()=>{navigate(`/public/${lang}/tourguide/ticket`)}}/>
                }

            </Box>

        </LockContainer>
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide, 
        modal: state.modal
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