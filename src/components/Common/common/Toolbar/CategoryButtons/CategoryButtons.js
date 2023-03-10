import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, connect } from 'react-redux';

import {  Flex, Heading } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../../../../Common/common/CustomButton/CustomButton';
import Options from '../../../../Common/common/Options/Options'

import useSessionStorage from '../../../../../hooks/useSessionStorage';
import { updatePage } from '../../../../../redux/tourguide/tourguide.action';
import { langGetter } from '../../../../../helpers/langGetter';

const CategoryButtons = (props) => {

    const { categoryList, optionList, heading, tourguide, sysConfig } = props
    const { page } = tourguide
    const { config } = sysConfig
    const { themeColor } = config ?? 'gray'
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const { subsubpath } = useParams()

    const lang = langGetter() === 'en' ? 'eng' : 'chi'

    // const [pageSession, setPageSession] = useSessionStorage('page', 0)

    const handle_onClick = (path) => {
        // setPageSession(index)        
        // dispatch(updatePage(index))
        navigate(`/server/${lang}/tourguide/editor/${path}`)
    }

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
        sysConfig: state.sysConfig,
        modal: state.modal,
        form: state.form
    };
};

export default connect(
    mapStateToProps,
    null
)(CategoryButtons)