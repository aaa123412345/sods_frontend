import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import styled from 'styled-components'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { faArrowLeft, faGamepad, faQuestion } from '@fortawesome/free-solid-svg-icons'

import Wrapper from '../../Common/common/Wrapper/Wrapper'
import CustomButton from '../../Common/common/CustomButton/CustomButton'

import Instruction from './Instruction/Instruction'
import PasswordLock from './PasswordLock/PasswordLock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GameInterface = (props) => {

    const { isFound, isLocked, setIsLocked, tourguide } = props
    const { themeColor } = tourguide

    const { lang } = useParams()

    const { t } = useTranslation()
    const navigate = useNavigate()

    const [isShow, setIsShow] = useState(true)
    const [isStart, setIsStart] = useState(false)

    useEffect(()=>{

        if(isStart){
            //do sth
            // post start time
        }

    }, [isStart])

    return (

        <Wrapper isUseChakra>

            <GameInterfaceContainer>

                <GameHeaderContainer bg={themeColor}>

                    <GameHeader>
                        <CustomButton faIcon={faArrowLeft} onClick={()=>{navigate(`/public/${lang}/tourguide/floorplans`)}} isCircle/>
                        <Heading w="80%" color='white'>
                            <FontAwesomeIcon icon={faGamepad} />
                            {' '}
                            {t('arTreasure.title')}
                        </Heading>
                        <CustomButton faIcon={faQuestion} isDisabled={isShow} onClick={()=>{setIsShow(true)}} isCircle/>
                    </GameHeader>
                    { isShow && <Instruction isStart={isStart} setIsStart={setIsStart} isShow={isShow} setIsShow={setIsShow} /> }
                </GameHeaderContainer>

                {
                    !isShow && 
                    <PasswordLock  isLocked={isLocked} setIsLocked={setIsLocked} isFound={isFound}/>

                }
                

            </GameInterfaceContainer>

        </Wrapper>
        

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
)(GameInterface)

const GameInterfaceContainer = styled(Box)`

    position: absolute; z-index: 10;
    top: 0; left: 0; bottom:0;
    overflow: hidden;

    width: 100vw; height: 100%;

`

const GameHeaderContainer = styled(Flex)`

    height: fit-content; width: 100%;
    flex-direction: column; 
    justify-content: center; align-items: center;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, .3);

`
const GameHeader = styled(Flex)`

    height: 90px; width: 100%;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    

`