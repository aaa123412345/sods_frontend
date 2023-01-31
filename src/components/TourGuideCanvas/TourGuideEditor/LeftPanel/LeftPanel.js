import React from 'react'
import styled from 'styled-components'
import { Flex } from '@chakra-ui/react'
import ItemList from '../../common/ItemList/ItemList'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

const LeftPanel = (props) => {

  const { tourguide } = props
  const { page, floorplans, stories } = tourguide

  const { t, i18n } = useTranslation()

  const propsList = [
    {
      modalIndex: 0, 
      heading: t('tourguideEditor.region'),
      path: "floorplans",
      name: "floorplan"
    },
    {
      modalIndex: 4, 
      heading: t('tourguideEditor.cover-story'),
      path: "story",
      name: "story"
    }
  ]

  const index = page <= 1 ? 0 : 1

  return (
    <Container>

      <ItemList 
        data={page <= 1 ? floorplans : stories}
        type={0} 
        isCategoryList={true}
        modalIndex={propsList[index].modalIndex}
        heading={propsList[index].heading}
        path={propsList[index].path}
        name={propsList[index].name} />
          
    </Container>
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
)(LeftPanel)

const Container = styled(Flex)`

  position: relative;
  flex-direction: column;
  min-width: 220px

`