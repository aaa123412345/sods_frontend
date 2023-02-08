import { Flex } from '@chakra-ui/react';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';

import MyButton from '../../EditorButton/CustomButton';

import useSessionStorage from '../../../../../hooks/useSessionStorage';
import { useDispatch, connect } from 'react-redux';
import { updateBooth } from '../../../../../redux/form/form.action';
import { openModal } from '../../../../../redux/modal/modal.action';
import { useTranslation } from 'react-i18next';

const DeleteNAddButtons = (props) => {

    const { 
        modalIndex, path, name, tourguide, form, modal
    } = props

    const { themeColor, floorplans, regionIndex } = tourguide
    const { booth } = form
    const dispatch = useDispatch()

    const { t } = useTranslation()

    // session storage
    const [modalSession, setModalSession] = useSessionStorage('modal', modal)
    const [boothSession, setBoothSession] = useSessionStorage('booth', booth)

    const isNoRegionDefined = path === "booths" && floorplans.length === 0 ? true : false

    const open_modal = () => {

        let payload = {
            modalIndex: modalIndex, 
            path: path, 
            method: 'post', 
            name: name,
            isOpen: true,
            isError: false,
            page: 0
        }
        
        setModalSession({...modalSession, ...payload})
        dispatch(openModal(payload))
        
    }

    return (

        <Flex justifyContent={'flex-start'} m="1em .5em">
            <MyButton 
                faIcon={faAdd} 
                text={t(`tourguideEditor.create-${path}`)}
                bgColor={themeColor} 
                isDisabled={isNoRegionDefined}
                onClick = {open_modal}
                />
        </Flex>
    
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
)(DeleteNAddButtons)