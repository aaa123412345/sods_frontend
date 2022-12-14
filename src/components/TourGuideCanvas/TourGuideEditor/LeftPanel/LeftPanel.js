import React from 'react'
import styled from 'styled-components'
import { Flex } from '@chakra-ui/react'
import ItemList from '../../TourGuideComponents/ItemList/ItemList'
import { useSelector } from 'react-redux'

const LeftPanel = () => {

  const { page } = useSelector(state=>state.tourguide)

  const propsList = [
    {
      modalIndex: 0, 
      heading: "Region(s)",
      path: "floorplans",
      name: "floorplan",
      id: "region"
    },
    {
      modalIndex: 4, 
      heading: "Story",
      path: "story",
      name: "story",
      id: "id"
    }
  ]

  const index = page <= 1 ? 0 : 1

  return (
    <Container>

      <ItemList 
          type={0} 
          modalIndex={propsList[index].modalIndex}
          isCategoryList={true}
          heading={propsList[index].heading}
          path={propsList[index].path}
          name={propsList[index].name}
          id={propsList[index].id} />
            
    </Container>
  )
}

export default LeftPanel

const Container = styled(Flex)`

    position: relative;
    flex-direction: column;
    min-width: 220px

`