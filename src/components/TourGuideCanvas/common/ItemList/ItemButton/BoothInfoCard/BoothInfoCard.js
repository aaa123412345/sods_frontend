import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Flex, Heading, Text, theme, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { faAlignLeft, faGlobe, faLocationDot, faPen, faQrcode, faTent } from '@fortawesome/free-solid-svg-icons'
import { langGetter } from '../../../../../../helpers/langGetter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import HeaderBar from './HeaderBar/HeaderBar'

const BoothInfoCard = (props) => {

  const { variant, onClick, data, tourguide } = props 
  const { themeColor } = tourguide

  const animations = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  }

  const bg = useColorModeValue('white', 'black')
  const lang = langGetter()

  const [cardLang, setCardLang] = useState(lang)

  const switch_cardLang = () => {
    setCardLang(cardLang === "zh"? "en":"zh")
  }

  const Row = (props) => {
    
    const { icon, text, isHeading } = props

    return (
      <Flex alignItems={isHeading?'center':""}>
        { !isHeading && <FontAwesomeIcon icon={icon} />}
        {
          isHeading ? <Heading>{text}</Heading>
          : <Text marginLeft=".5em">{text}</Text>
        }
      </Flex>
    )

  }

  return (
    <Card variants={animations} initial='initial' animate="animate" exit='exit' transition={{duration: .25}}
        whileHover={{scale: 1.05}} whileTap={{scale: .95}}
        onClick={onClick} bg={variant==="gray"?bg:variant} color={variant==="gray"?"black":"white"} >
        <HeaderBar data={data} switchCardLang={switch_cardLang} />
        <Box p=".5em">
          <Row icon={faTent} text={data.name[cardLang]} isHeading/>
          <Line bg={themeColor}/>
          <Row icon={faLocationDot} text={data.venue[cardLang]}/>
          <Row icon={faAlignLeft} text={data.description[cardLang]}/>
        </Box>
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

const MotionFlex = motion(Flex)
const MotionBox = motion(Box)

const Card = styled(MotionBox)`

  margin: 1em; padding: .5em;
  border-radius: 8px;
  box-shadow: 5px 5px 22px rgba(0, 0, 0, .15);
  width: 300px;
  overflow: hidden; 
  cursor: pointer;

`

const Line = styled(Flex)`

  height: 5px; flex: 1;
  margin: .5em 0;

`