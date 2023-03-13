import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Flex, Box, Image, Text, useColorModeValue } from '@chakra-ui/react'

import { refreshTime, monthDictionary  } from '../../../../constants/constants'
import { langGetter } from '../../../../helpers/langGetter'

const StatusBar = (props) => {

    const { config } = useSelector(state => state.sysConfig)
    const { themeColor, opendayDate } = config ?? {themeColor: 'gray', opendayDate: JSON.stringify(new Date().getTime() - 24 * 60 * 60 * 1000)}

    const bg = useColorModeValue('white', 'black')

    const { t } = useTranslation()
    const lang = langGetter() === 'en' ? 'en' : 'tc'

    const tempDate = JSON.stringify(new Date().getTime() - 24 * 60 * 60 * 1000)
    const date = new Date(JSON.parse(opendayDate ?? tempDate))
    const [timeLeft, setTimeLeft] = useState(null)

    const [iconNum, setIconNum] = useState(null)
    const [temperature, setTemperature] = useState(null)

    const format_time = (time) => {
        return time < 10 ? '0'+time : time
    }

    const perform_timeToUnit = (time) => {
        let dayLeft = Math.floor(time / 24 / 60 / 60 / 1000)
        let minus = dayLeft * 24 * 60 * 60 * 1000
        let hourLeft = Math.floor((time - minus) / 60 / 60 / 1000)
        minus += hourLeft * 60 * 60 * 1000 
        let minLeft = Math.floor((time - minus) / 60 / 1000)
        minus += minLeft * 60 * 1000
        let secLeft = Math.floor((time - minus) / 1000)
        dayLeft = format_time(dayLeft)
        hourLeft = format_time(hourLeft)
        minLeft = format_time(minLeft)
        secLeft = format_time(secLeft)
        return { dayLeft: dayLeft, hourLeft: hourLeft, minLeft: minLeft, secLeft: secLeft }
    }

    const get_weatherReport = () => {
        axios.get(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=${lang}`)
        .then((res)=>{
            let data = res.data
            setIconNum(data.icon)
            setTemperature(data.temperature.data[1].value)
        })
        .catch(err=> console.log(err))
    }

    const update_timeLeft = () => {
        let left = date.getTime() - new Date().getTime()
        setTimeLeft(left > 0 ? left ?? null : null)
    }

    useEffect(()=>{
        get_weatherReport()
        update_timeLeft()
    }, [])

    useEffect(()=>{

        const refreshId = setInterval(()=>{
            // get weather
            get_weatherReport()
        }, refreshTime)

        return () => clearInterval(refreshId)

    }, [])

    useEffect(()=>{

        const refreshClockId = setInterval(()=>{
            update_timeLeft()
        }, 1000)

        return () => clearInterval(refreshClockId)

    }, [])

    return (
        <Box bg={bg} height="50px">
            <Flex alignItems="center" justifyContent="space-between" height="50px" w={{base: '95%', md: "90%"}} m="0 auto">
                <Box>
                    <Text fontSize='sm' fontWeight="bold">{t('floorplan.openday')}</Text>
                    <Text fontSize="16px">{date.getDate()} {monthDictionary[date.getMonth()]} {date.getFullYear()}</Text>
                </Box>

                {
                    timeLeft!==null && timeLeft!==undefined && timeLeft > 0
                    &&
                    <Box>
                        <Text fontSize="sm" fontWeight="bold">{t('floorplan.count-down')}</Text>
                        <Text fontSize="16px">
                            {perform_timeToUnit(timeLeft).dayLeft} D {" "}
                            {perform_timeToUnit(timeLeft).hourLeft} H {" "}
                            {perform_timeToUnit(timeLeft).minLeft} M {" "}
                        </Text>
                    </Box>
                }
                
                { 
                    iconNum !== null && iconNum !== undefined && temperature !== null && temperature !== undefined && 
                    <Flex bg={'black'} borderRadius={25} p=".5em">
                        <Image src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${iconNum}.png`} h="24px" mr=".5em"/>
                        <Text color="white">{temperature} &#8451;</Text>
                    </Flex>
                }
            </Flex>
        </Box>
    )
}

export default StatusBar