const sucessToast = {

    status: 'success',
    containerStyle:{bg:"success"}
    
}

const errorToast = {

    title: 'Error',
    description: "Please try again.",
    status: 'error',
    containerStyle:{bg:"error"}

}

export const toast_generator = (method = undefined, name = undefined) => {
    
    if(method === undefined || name === undefined)
        return errorToast
    
    return {
        ...sucessToast,
        title: `${method} ${name}`,
    }
}
