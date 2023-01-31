const sucessToast = {

    status: 'success',
    containerStyle:{bg:"success"}
    
}

const errorToast = {

    title: "Error",
    description: "Please Try Again",
    status: 'error',
    containerStyle:{bg:"error"}

}

export const toast_generator = (method = undefined, name = undefined) => {

    console.log("method: ", method)
    console.log("name: ", name)
    
    if(method === undefined || name === undefined)
        return errorToast
    
    return {
        ...sucessToast,
        title: `${method} ${name}`,
    }
}
