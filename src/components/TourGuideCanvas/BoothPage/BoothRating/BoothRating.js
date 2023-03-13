import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Rating from 'react-rating'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Text, Box } from '@chakra-ui/react'

import { colorPalette } from '../../../../theme/theme'
import { tourHost } from '../../../../constants/constants'
import axios from 'axios'


const BoothRating = (props) => {

    const { userId, boothId, isShow, themeColor, initScore } = props
    
    const { t } = useTranslation()
    const [score, setScore] = useState(initScore)
    const [isDisplayThanks, setIsDisplayThanks] = useState(false)

    const gray = '#333'

    const handle_updateRating = (newRating) => {
        setScore(newRating)
        setIsDisplayThanks(true)
        let data = { userId: userId, boothId: boothId, ratingScore: newRating }
        axios.put(`${tourHost}/boothRecords`, data)
        .then(res=>console.log('boothRating: ', res.data.data.code))
        .catch(err=>console.log(err))
    }

    return isShow && initScore > 0 (
        <Box>
            <Rating emptySymbol={<FontAwesomeIcon icon={faStar} />} fullSymbol={<FontAwesomeIcon icon={faStar} color={colorPalette[themeColor] ?? gray} />}
                initialRating={score} onClick={(newRating)=>{handle_updateRating(newRating)}} readonly={score!==0}/>
            {isDisplayThanks && <Text color="gray">{t(`tourguide.thanks`)}</Text>}
        </Box>
    )
}

export default BoothRating