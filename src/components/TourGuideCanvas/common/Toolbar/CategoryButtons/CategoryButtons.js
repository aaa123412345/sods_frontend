import React from 'react'
import { 
    Flex, Popover, PopoverTrigger, Heading,
    PopoverContent, Button
} from '@chakra-ui/react'
import MyButton from '../../EditorButton/CustomButton';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, connect } from 'react-redux';
import useSessionStorage from '../../../../../hooks/useSessionStorage';
import { useEffect } from 'react';
import { updatePage } from '../../../../../redux/tourguide/tourguide.action';

const CategoryButtons = (props) => {

    const { categoryList, optionList, heading, tourguide } = props
    const { themeColor, page } = tourguide
    const dispatch = useDispatch()

    const [pageSession, setPageSession] = useSessionStorage('page', 0)

    const handle_onClick = (index)=>{
        setPageSession(index)        
        dispatch(updatePage(index))
    }

    useEffect(()=>{
        dispatch(updatePage(pageSession))
    },[])

    const OptionBar = (props) => {

        const TriggerButton = () => {
            return (
                <PopoverTrigger>
                    <Button w="45px" h="45px" borderRadius={50} variant="gray">
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </Button>
                </PopoverTrigger>
            )
        }

        const Options= (OptionList) => {
            return (
                <PopoverContent w="100%" h="fit-content" bg="transparent" borderColor="transparent" boxShadow='none'>
                {
                    optionList.map((option, index)=>{

                        return React.createElement(MyButton, {
                            key: index, 
                            ...option
                                
                        })
                    })
                }
                </PopoverContent>
            )
        }

        return (
            <Popover>
                <TriggerButton />
                <Options optionList={props.optionList} />
            </Popover>
        )

    }

    const CategoryBar = (props) => {
        
        return (
            <React.Fragment>
            {
                props.categoryList.map((category, index) => (
                    <MyButton
                        key={index}
                        isSelected={page === index}
                        bgColor={themeColor}
                        text={category.label}
                        faIcon={category.icon}
                        onClick={()=>handle_onClick(index)}
                        />

                ))

            }
            </React.Fragment>
        )
    }

    return (

        <Flex alignItems="center" minH="50px">
            <OptionBar optionList={optionList} />
            {categoryList !== undefined && heading === undefined && <CategoryBar categoryList={categoryList}/>}
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