import React from 'react'
import { connect } from 'react-redux';

const Test = (props) => {
  return (
    <div>Test</div>
  )
}

const mapStateToProps = state => {
    return {
      tourguide: state.tourguide,
      vrTour: state.vrTour
    };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(Test)