import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Flex, Heading, Text, theme, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { faAlignLeft, faComment, faGlobe, faLocationDot, faPen, faQrcode, faTent } from '@fortawesome/free-solid-svg-icons'
import { langGetter } from '../../../../../../helpers/langGetter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import OptionsMenu from './OptionsMenu/OptionsMenu'
import CardButtons from './CardButtons/CardButtons'
import { useTranslation } from 'react-i18next'

const BoothInfoCard = (props) => {

  const { variant, onClick, data, tourguide } = props 
  const { themeColor } = tourguide

  const animations = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  }

  // const bg = useColorModeValue('white', 'black')
  const bg = useColorModeValue('gray.10', 'gray.100')
  const color = useColorModeValue('black', 'white')
  const lang = langGetter()

  const { t } = useTranslation()
  const [cardLang, setCardLang] = useState(lang)

  const switch_cardLang = () => {
    setCardLang(cardLang === "zh"? "en":"zh")
  }

  const Row = (props) => {
    
    const { icon, text, color="gray" } = props

    return (
      <Flex alignItems='flex-start' color={color} lineHeight="1.5">
        <FontAwesomeIcon icon={icon} />
        <Text marginLeft=".5em">{text}</Text>
      </Flex>
    )

  }

  return (
    <Card variants={animations} initial='initial' animate="animate" exit='exit' transition={{duration: .25}}
        onClick={onClick} bg={variant==="gray"?bg:variant} color={variant==="gray"?"black":"white"} >
        
      <CardHead bg={bg}>
        <Box>
          <Heading size="md" lineHeight="1.5" color={color}>{data.name[cardLang]}</Heading>
          <Row icon={faLocationDot} text={data.venue[cardLang]}/>
        </Box>
        <OptionsMenu data={data}  />
      </CardHead>

      <CardContent>
        <VRImageBox bg='white'>
          <Text p="1em">{t('tourguideEditor.no-vr-image')}</Text>
        </VRImageBox>
        <FontAwesomeIcon icon={faAlignLeft}/>
        <Text color={color}>{data.description[cardLang]} </Text>
        <FontAwesomeIcon icon={faComment}/>
        <Text color={color}>{t('tourguideEditor.no-vr-speech')}</Text>
      </CardContent>

      <CardButtons data={data} switchCardLang={switch_cardLang} />

    </Card>
  )
}

const mapStateToProps = state => {
  return {
      tourguide: state.tourguide,
      modal: state.modal,
      form: state.form
  };
};

export default connect(
  mapStateToProps,
  null
)(BoothInfoCard)

const MotionBox = motion(Box)

const Card = styled(MotionBox)`

  position: relative; margin: 1em; 
  border-radius: 25px;
  box-shadow: 0px 0px 22px rgba(0, 0, 0, .2);
  width: 300px; height: fit-content;
  cursor: pointer;

`

const CardHead = styled(Flex)`

  padding: 1em;
  justify-content: space-between; 
  align-items: flex-start;
  box-shadow: 0px 22px 22px -22px rgba(0, 0, 0, .1);
  border-radius: 25px 25px 0px 0px;

`

const CardContent = styled(Box)`

  height: max-content;
  padding:  1em;
  height: 100%;
`

const VRImageBox = styled(Box)`

  width: 100%;
  border-radius: 25px;
  margin-bottom: .5em;

`