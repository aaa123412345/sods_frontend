import React from 'react'
import { Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

const TextInput = (props) => {

    const { 
        isTextArea = false, 
        faIcon, label, names, placeholder, 
        updateType, tourguideData, updateData
    } = props

    const data = tourguideData[names.form]

    const handle_onChange = (e) => {

        const value = e.target.value
        let newData = {...data}
        newData[names.field] = value
        updateData(updateType, newData)

    }

    return (

        <Flex
            mt="1em" 
            flexDir="column" 
            alignItems='flex-start' >

            <Flex alignItems='center'>
                <FontAwesomeIcon icon={faIcon} />
                <Text ml=".5em" fontWeight="bold">{label}</Text>
            </Flex>
            
            {

                isTextArea?
                <Textarea m="1em 0"
                    w="100%" h="fit-content" p=".5em 1em" 
                    borderRadius={25}
                    name={names.field}
                    value={data[names.field]} 
                    onChange={e=>handle_onChange(e)}
                    placeholder={placeholder} 
                    />
                :
                <Input m="1em 0"
                    w="100%" h="fit-content" p=".5em 1em" 
                    borderRadius={25}
                    name={names.field}
                    value={data[names.field]} 
                    onChange={e=>handle_onChange(e)}
                    placeholder={placeholder} 
                    />
            }
           
        </Flex>

    )
}

const mapStateToProps = state => {
    return {
      tourguideData: state.tourguide
    };
};
const mapDispatchToProps = dispatch => ({
    updateData: (type, payload) => dispatch(({type: type, payload: payload }))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInput);
  