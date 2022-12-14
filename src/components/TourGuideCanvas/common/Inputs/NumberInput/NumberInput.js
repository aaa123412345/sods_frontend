import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Heading, Input, Button } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons'
import { connect, useDispatch } from 'react-redux'

const NumberInput = (props) => {

    const { 
        needButtons = false, max = 9999, min = 0, 
        names, faIcon, label, placeholder,
        tourguide, form, update
    } = props
    const { themeColor } = tourguide
    const dispatch = useDispatch()

    const data = form[names.form]
    const step = needButtons ? 1 : 0

    // const handle_increment = () => {

    //     let newData = {...data}
    //     let newValue = data[names.field] + step
    //     if(newValue > max)
    //         newValue = max
    //     newData[names.field] = newValue
    //     update(newData)

    // }

    // const handle_decrement = () => {

    //     let newData = {...data}
    //     let newValue = data[names.field] - step
    //     if(newValue < min)
    //         newValue = min
    //     newData[names.field] = newValue
    //     update(newData)

    // }

    const handle_onChange = (e) => {

        const value = e.target.value
        let newData = {...data}
        newData[names.field] = value
        console.log(form[names.form])
        dispatch(update(newData))
        
    }

    const handle_onBlur = (e) => {

        let value = e.target.value
        let newData = {...data}
        if(value > max)
            value = max
        if(value < min)
            value = min
        if(value.length < 4){
            let newValue = ''
            for(var i = 0; i < (4 - value.length); i++)
                newValue += "0"
            value = newValue+value 
        }
        newData[names.field] = value
        dispatch(update(newData))

    }
    
    return (

        <InputContainer>
            <Heading size="sm">
                <FontAwesomeIcon icon={faIcon} style={{marginRight: '1em'}}/>
                {label} 
            </Heading>
            <Margin>
                {/* {

                    needButtons
                    &&
                    <CircleButton bg={themeColor} borderRadius="50% 0% 0% 50%" onClick={handle_decrement}>
                        <FontAwesomeIcon icon={faMinus} />
                    </CircleButton>

                } */}
                <NumInput 
                    borderRadius={needButtons?0:25}
                    textAlign={needButtons?'center':'left'}
                    placeholder={placeholder}
                    type='number' 
                    name={names.field} value={data[names.field]} 
                    onChange={e=>handle_onChange(e)} 
                    onBlur={e=>handle_onBlur(e)} />
                {/* {

                    needButtons
                    &&
                    <CircleButton bg={themeColor} borderRadius="0% 50% 50% 0%" onClick={handle_increment}>
                        <FontAwesomeIcon icon={faAdd} />
                    </CircleButton>

                } */}
            </Margin>
        </InputContainer>

    )
}

const mapStateToProps = state => {
    return {
        tourguide: state.tourguide,
        form: state.form
    };
};
const mapDispatchToProps = dispatch => ({
    // update: (type, payload) => dispatch(({type: type, payload: payload }))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberInput);
  

const InputContainer = styled(Box)`
    
    margin: 1.5em 0em;
    width: 100%;

`

const Margin = styled(Flex)`

    margin: 1em 0em;
    justify-content: space-between;

`

const CircleButton = styled(Button)`

    color: white;
    width: 50px; height: 50px;

`

const NumInput = styled(Input)`

    width: 100%;

`