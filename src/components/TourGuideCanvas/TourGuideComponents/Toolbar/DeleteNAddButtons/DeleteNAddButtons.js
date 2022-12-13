import { Flex } from '@chakra-ui/react';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';

import MyButton from '../../MyButton/MyButton';

import { useDispatch, useSelector } from 'react-redux';
import useSessionStorage from '../../../../../hooks/useSessionStorage';

const DeleteNAddButtons = (props) => {

    const { 
        isDeleteMode, setIsDeleteMode,
        modalIndex, path, name
    } = props

    // redux state
    const modalState = useSelector(state=>state.modal)
    const themeColor = useSelector(state => state.themeConfig.themeColor)
    const tourguideState = useSelector(state => state.tourguide)
    const dispatch = useDispatch()

    // session storage
    const [modalSession, setModalSession] = useSessionStorage('modal', modalState)
    const [boothSession, setBoothSession] = useSessionStorage('booth', tourguideState.booth)


    const open_modal = () => {

        let payload = {
            modalIndex: modalIndex, 
            path: path, 
            method: 'post', 
            name: name
        }

        setModalSession({
            ...modalSession, 
            ...payload,
            isOpen: true,
            isError: false,
            page: 0
        })
        setBoothSession({
            ...boothSession, 
            region: tourguideState
                    .floorplans[tourguideState.regionIndex]
                    .region
        })
        dispatch({type: "OPEN_MODAL", payload: payload})

    }

    return (

        <Flex justifyContent={'flex-start'} m="1em .5em">
            <MyButton 
                faIcon={faAdd} 
                isCircle={true} 
                bgColor={themeColor} 
                isDisabled={isDeleteMode}
                onClick = {open_modal}
                />

            <MyButton 
                faIcon={faTrash} 
                isCircle={true} 
                bgColor='danger'
                isSelected={isDeleteMode} 
                onClick={()=>{setIsDeleteMode(!isDeleteMode);}}
            />
        </Flex>
    
    )
}

export default DeleteNAddButtons 