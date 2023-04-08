import React from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'
import { Flex } from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import ItemList from '../../../Common/common/ItemList/ItemList'
import { tourHost } from '../../../../constants/constants'

const LeftPanel = (props) => {

  const { tourguide } = props

  const { t } = useTranslation()

  const { subsubpath } = useParams()

  const dataDictionary = {
    floorplans: {
      dataName: 'floorplans', 
      modalName: "floorplan",
      heading: t('tourguideEditor.region'),
      path: "floorplans",
      name: "floorplan"
    }, 
    booths: {
      dataName: 'floorplans', 
      modalName: "floorplan",
      heading: t('tourguideEditor.region'),
      path: "floorplans",
      name: "floorplan"
    },
    stories: {
      dataName: 'stories',
      modalName: "story", 
      heading: t('tourguideEditor.cover-story'),
      path: "stories",
      name: "story"
    }
  }

  return (
    <Container>

      <ItemList isCategoryList type={0} 
        dataName={dataDictionary[subsubpath]?.dataName}
        modalName={dataDictionary[subsubpath]?.modalName}
        heading={dataDictionary[subsubpath]?.heading}
        method={'post'}
        host={tourHost}
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
  min-width: 220px;
  height: 100%;

`