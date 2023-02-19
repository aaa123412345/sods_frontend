import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, connect } from 'react-redux';

import { 
    Flex, Popover, PopoverTrigger, Heading,
    PopoverContent, Button
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../../EditorButton/CustomButton';
import useSessionStorage from '../../../../../hooks/useSessionStorage';
import { updatePage } from '../../../../../redux/tourguide/tourguide.action';
import { langGetter } from '../../../../../helpers/langGetter';
import Options from '../../Options/Options';

const CategoryButtons = (props) => {

    const { categoryList, optionList, heading, tourguide } = props
    const { themeColor, page } = tourguide
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const { subsubpath } = useParams()

    const lang = langGetter() === 'en' ? 'eng' : 'chi'

    // const [pageSession, setPageSession] = useSessionStorage('page', 0)

    const handle_onClick = (path) => {
        // setPageSession(index)        
        // dispatch(updatePage(index))
        navigate(`/public/${lang}/tourguide/editor/${path}`)
    }

    // useEffect(()=>{
    //     dispatch(updatePage(pageSession))
    // },[])

    // const OptionBar = (props) => {

    //     const TriggerButton = () => {
    //         return (
    //             <PopoverTrigger>
    //                 <Button w="45px" h="45px" borderRadius={50} variant="gray">
    //                     <FontAwesomeIcon icon={faEllipsisV} />
    //                 </Button>
    //             </PopoverTrigger>
    //         )
    //     }

    //     const Options= (OptionList) => {
    //         return (
    //             <PopoverContent w="100%" h="fit-content" bg="transparent" borderColor="transparent" boxShadow='none'>
    //             {
    //                 optionList.map((option, index)=>{

    //                     return React.createElement(CustomButton, {
    //                         key: index, 
    //                         ...option      
    //                     })
    //                 })
    //             }
    //             </PopoverContent>
    //         )
    //     }

    //     return (
    //         <Popover>
    //             <TriggerButton />
    //             <Options optionList={props.optionList} />
    //         </Popover>
    //     )

    // }

    const CategoryBar = (props) => {
        
        return (
            <React.Fragment>
            {
                props.categoryList.map((category, index) => (
                    <CustomButton
                        key={index}
                        isSelected={subsubpath === category.path}
                        bgColor={themeColor}
                        text={category.label}
                        faIcon={category.icon}
                        onClick={()=>handle_onClick(category.path)}
                        />

                ))
            }
            </React.Fragment>
        )
    }

    return (

        <Flex alignItems="center" minH="50px">
            <Options buttons={optionList} />
            {/* <OptionBar optionList={optionList} /> */}
            {categoryList !== undefined && heading === undefined && <CategoryBar categoryList={categoryList} />}
            {heading !== undefined && <Heading ml="1em" size={'lg'}>{heading}</Heading>}
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
)(CategoryButtons)