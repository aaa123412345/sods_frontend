import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ChakraProvider,Box } from '@chakra-ui/react'
import { connect,  } from 'react-redux'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { newTheme } from '../../theme/theme'

const Chatroom = (props) => {

    const { tourguide } = props
    const { themeColor, host } = tourguide

    const pathname = window.location.pathname

    // const isShow = window.location.pathname.slice(1, 2) === 'p'

    return  (
        
        <></>
        // <ChakraProvider resetCSS theme={newTheme}>

        //     <Container bottom={{base: '90px', md: '50px'}}>

        //         <CustomButton faIcon={faCircleQuestion} bgColor={themeColor} isCircle circleDiameter={60} />                               

        //     </Container>
   
        // </ChakraProvider>
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
)(Chatroom)

const Container = styled(Box)`

    position: fixed;
    z-index: 2000;
    right: 5px;

`