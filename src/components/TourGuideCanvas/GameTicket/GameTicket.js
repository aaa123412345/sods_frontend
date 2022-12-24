import React from 'react'

import { connect } from 'react-redux'
import StorySplider from './StorySplider/StorySplider'
import Ticket from './Ticket/Ticket'

const GameTicket = (props) => {

    const { isPreviewMode = false } = props

    return (
        <React.Fragment>
            <Ticket isPreviewMode={isPreviewMode} />
            <StorySplider isPreviewMode={isPreviewMode} />
        </React.Fragment>
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
