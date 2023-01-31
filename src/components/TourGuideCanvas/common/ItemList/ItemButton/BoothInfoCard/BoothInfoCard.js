import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Box, Flex, Heading, Text, useColorModeValue, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { faAlignLeft, faBan, faCircle, faComment, faGlobe, faLocationDot, faPen, faQrcode, faTent } from '@fortawesome/free-solid-svg-icons'
import { langGetter } from '../../../../../../helpers/langGetter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import OptionsMenu from './OptionsMenu/OptionsMenu'
import CardButtons from './CardButtons/CardButtons'
import { useTranslation } from 'react-i18next'
import _ from 'lodash';

const BoothInfoCard = (props) => {

  const { variant, onClick, data, tourguide } = props 
  const { markers } = tourguide

  const animations = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  }

  const bg = useColorModeValue('gray.10', 'gray.100')
  const color = useColorModeValue('black', 'white')
  const lang = langGetter().toUpperCase()

  const { t } = useTranslation()
  const [cardLang, setCardLang] = useState(lang)
  const [isActive, setIsActive] = useState(false)

  const switch_cardLang = () => {
    setCardLang(cardLang === "ZH"? "EN":"ZH")
  }

  useEffect(()=>{

    let hasMarker = false
    markers.forEach(markerList => {
      markerList.forEach(marker=>{
        if(_.isEqual(marker.booth, data))
          hasMarker = true
      })
    })
    setIsActive(hasMarker)
    console.log("booth card: ", data)
  }, [])

  const Row = (props) => {
    
    const { icon, text, color="gray" } = props

    return (
      <Flex alignItems='flex-start' color={color} lineHeight="1.5">
        <Text>
        <FontAwesomeIcon icon={icon} style={{marginRight: ".5em"}}/>{text}</Text>
      </Flex>
    )

  }

  return (
    <Card variants={animations} initial='initial' animate="animate" exit='exit' transition={{duration: .25}}
        onClick={onClick} bg={variant==="gray"?bg:variant} color={variant==="gray"?"black":"white"} >
        
      <CardHead bg={bg}>
        <Box>
          <Heading size="md" lineHeight="1.5" color={color}>{data[`name${cardLang}`]}</Heading>
          <Row icon={faLocationDot} text={data[`venue${cardLang}`]}/>
          {/* <Row icon={faCircle} color={isActive?"success":"gray"} text={t(`tourguideEditor.${isActive?"active":"inactive"}-booth`)}/> */}
        </Box>
        <OptionsMenu data={data}  />
      </CardHead>

      <CardContent>
        {
          data.imageData !== null && data.speechEN !== null && data.speechZH !== null ?
          
          <React.Fragment>
            <VRImageBox bg='white'>
              <Image src={"data:image/*;base64,"+data.imageData} w="100%" h="100%" objectFit="contain" />
            </VRImageBox>
            <FontAwesomeIcon icon={faComment}/>
            <Text color={color}>{data[`speech${cardLang}`]}</Text>
          </React.Fragment>
          :
          <WarningBox bg='warning'>
            <Text color={color}><FontAwesomeIcon icon={faBan} style={{marginRight: '.5em'}}/>{t(`tourguideEditor.no-vr-available`)} </Text>
          </WarningBox>

        }
        
        <FontAwesomeIcon icon={faAlignLeft}/>
        <Text color={color}>{data[`description${cardLang}`]} </Text>
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
  overflow:hidden;

`

const WarningBox = styled(Box)`

  border-radius: 25px;
  padding: .5em; margin: .5em 0;

`