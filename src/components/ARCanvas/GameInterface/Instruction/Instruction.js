import React from 'react'
import { Flex, Heading, List, ListItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../Common/common/CustomButton/CustomButton'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

const Instruction = (props) => {

    const { isStart, setIsStart, isShow, setIsShow } = props

    const { t } = useTranslation()

    const totalStep = ['1', '2', '3']

    return isShow && (
        <Flex flexDir="column" justifyContent="center" h="calc(100vh - 90px)">
            <Heading>{t('arTreasure.instruction')}</Heading>
            <List>
                {
                    totalStep.map((stepNum, index)=>(
                        <ListItem key={index}>{stepNum}: {t(`arTreasure.step-${stepNum}`)}</ListItem>
                    ))
                }
            </List>
            <CustomButton faIcon={faFlag} text={t(`arTreasure.${!isStart ? "start":"continue"}`)}
                onClick={()=>{setIsShow(false); setIsStart(true)}} cssStyle={{position: 'fixed', bottom: 20, zIndex: 12}}/>
        </Flex>
    )
}

export default Instruction