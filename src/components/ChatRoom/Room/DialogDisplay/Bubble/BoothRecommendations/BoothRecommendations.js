import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BoothRecommendations = (props) => {

    const { recommendations, themeColor, sysConfig, tourguide } = props

    const navigate = useNavigate()

    const goto_booth = (id) => {
        const lang = window.location.pathname.split('/')
        navigate(`/public/${lang}/tourguide/booths/${id}`)
    }

    return (Array.isArray(recommendations) && recommendations?.length ) ? (
        <Box>

            { 
                tourguide?.booths?.filter(booth=>recommendations?.includes(booth?.id)).map((booth, index) => (
                    <SuggestCard key={index} onClick={()=>{goto_booth(booth.id)}}>
                        <BoothImage src={booth.imageUrl}/>
                        <SuggestedContent>
                            <Heading size='sm'>{booth.titleEN}</Heading>
                            <Text fontSize=".8rem">{booth.venueEN}</Text>
                        </SuggestedContent>
                    </SuggestCard>
                ))
            }

        </Box>
    ) : <></>
}

const mapStateToProps = state => {
    return {
        sysConfig: state.sysConfig,
        tourguide: state.tourguide
    };
};

export default connect(
    mapStateToProps,
    null
)(BoothRecommendations)

const SuggestCard = styled(Box)`

    margin: 1em .5em;
    height: 100px;
    width: 200px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0px 5px 12px rgba(0, 0, 0, .2);
    color: white;
    background: rgba(0, 0, 0, .5);

`

const BoothImage = styled(Image)`

    width: 100%;
    height: 50%;
    object-fit: cover;

`

const SuggestedContent = styled(Box)`

    padding: .5em;

`