import React from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'
import { Flex } from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import ItemList from '../../common/ItemList/ItemList'

const LeftPanel = (props) => {

  const { tourguide } = props
  const { floorplans, stories } = tourguide

  const { t } = useTranslation()

  const { subsubpath } = useParams()

  const dataDictionary = {
    floorplans: {
      dataName: 'floorplans', 
      modalIndex: 0,
      heading: t('tourguideEditor.region'),
      path: "floorplans",
      name: "floorplan"
    }, 
    booths: {
      dataName: 'floorplans', 
      modalIndex: 0,
      heading: t('tourguideEditor.region'),
      path: "floorplans",
      name: "floorplan"
    },
    stories: {
      dataName: 'stories',
      modalIndex: 4, 
      heading: t('tourguideEditor.cover-story'),
      path: "story",
      name: "story"
    }
  }

  return (
    <Container>

      <ItemList isCategoryList type={0} 
        dataName={dataDictionary[subsubpath]?.dataName}
        modalIndex={dataDictionary[subsubpath]?.modalIndex}
        heading={dataDictionary[subsubpath]?.heading}
        path={dataDictionary[subsubpath]?.path}
        name={dataDictionary[subsubpath]?.name} />
          
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