import React from 'react'

import { connect } from 'react-redux'
import AnimatedPage from '../common/AnimatedPage/AnimatedPage'
import StorySplider from './StorySplider/StorySplider'
import Ticket from './Ticket/Ticket'

const GameTicket = (props) => {

    const { isPreviewMode = false } = props

    return (
        <AnimatedPage>
            <Ticket isPreviewMode={isPreviewMode} />
            <StorySplider isPreviewMode={isPreviewMode} />
        </AnimatedPage>
    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        modal: state.modal
    };
};

export default connect(
    mapStateToProps,
    null
)(GameTicket)
