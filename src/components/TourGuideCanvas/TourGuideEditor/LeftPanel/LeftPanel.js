import React from 'react'
import styled from 'styled-components'
import { Flex } from '@chakra-ui/react'
import ItemList from '../../TourGuideComponents/ItemList/ItemList'
import { useSelector } from 'react-redux'

const LeftPanel = () => {

  const { page } = useSelector(state => state.tourguide)

  const propsList = [
    {
      modalIndex: 0, 
      heading: "Region(s)",
      path: "floorplans",
      name: "floorplan"
    },
    {
      modalIndex: 4, 
      heading: "Cover Story",
      path: "story",
      name: "story"
    }
  ]

  const index = page <= 1 ? 0 : 1

  return (
    <Container>

      <ItemList 
          type={0} 
          isCategoryList={true}
          modalIndex={propsList[index].modalIndex}
          heading={propsList[index].heading}
          path={propsList[index].path}
          name={propsList[index].name} />
            
    </Container>
  )
}

export default LeftPanel

const Container = styled(Flex)`

    position: relative;
    flex-direction: column;
    min-width: 220px

`