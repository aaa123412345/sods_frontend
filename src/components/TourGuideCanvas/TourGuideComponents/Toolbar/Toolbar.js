import React from 'react'
import DeleteNAddButtons from './DeleteNAddButtons/DeleteNAddButtons';
import CategoryButtons from './CategoryButtons/CategoryButtons';

const Toolbar = (props) => {

    const { 
        type = 1, 
        modalIndex, 
        path, name, 
        isDeleteMode, setIsDeleteMode, 
        categoryList, optionList, heading
    } = props

    switch(type){

        case 1: 
            return <DeleteNAddButtons 
                        isDeleteMode={isDeleteMode} 
                        setIsDeleteMode={setIsDeleteMode}
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