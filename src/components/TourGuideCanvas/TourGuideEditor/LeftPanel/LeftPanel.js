import React from 'react'
import styled from 'styled-components'
import { Flex } from '@chakra-ui/react'
import ItemList from '../../TourGuideComponents/ItemList/ItemList'

const LeftPanel = () => {
  return (
    <Container>

        <ItemList 
            type={0} 
            modalIndex={0}
            isCategoryList={true}
            heading='Region(s)'
            path='floorplans' 
            name="floorplan"
            labelName="region"
            id="region" />
            
    </Container>
  )
}

export default LeftPanel

const Container = styled(Flex)`

    position: relative;
    flex-direction: column;
    min-width: 220px

`