import React from 'react'
import { 
    Flex, Popover, PopoverTrigger,Box,
    PopoverContent, Button
} from '@chakra-ui/react'
import MyButton from '../../MyButton/MyButton';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import useSessionStorage from '../../../../../hooks/useSessionStorage';
import { useEffect } from 'react';

const CategoryButtons = (props) => {

    const { categoryList, optionList } = props

    const themeColor = useSelector(state => state.themeConfig.themeColor)
    const { page } = useSelector(state => state.tourguide)
    const dispatch = useDispatch()

    const [pageSession, setPageSession] = useSessionStorage('page', 0)

    const handle_onClick = (index)=>{
        setPageSession(index)        
        dispatch({type: 'UPDATE_PAGE', payload: index})
    }

    useEffect(()=>{
        dispatch({type: 'UPDATE_PAGE', payload: pageSession})
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
                <PopoverContent w="100%" h="fit-content" bg="transparent" borderColor="transparent">
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
            <>
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
            </>
        )
    }

    return (

        <Flex alignItems="center" minH="50px">
            {categoryList !== undefined && <CategoryBar categoryList={categoryList}/>}
            <OptionBar optionList={optionList} />
        </Flex>

    )
    
}

export default CategoryButtons