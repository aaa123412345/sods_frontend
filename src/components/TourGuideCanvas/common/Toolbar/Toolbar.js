import React from 'react'
import DeleteNAddButtons from './DeleteNAddButtons/DeleteNAddButtons';
import CategoryButtons from './CategoryButtons/CategoryButtons';

const Toolbar = (props) => {

    const { 
        type = 1, 
        modalIndex, 
        path, name,
        categoryList, optionList, heading
    } = props

    switch(type){

        case 1: 
            return <DeleteNAddButtons 
                        path={path} name={name} modalIndex={modalIndex} />
        case 2:
            return <CategoryButtons 
                        heading={heading} 
                        categoryList={categoryList} 
                        optionList={optionList} />

        default:
            <></>

    }

}

export default Toolbar