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

export const toast_generator = (code = undefined, method = undefined, name = undefined) => {

    console.log("method: ", method)
    console.log("name: ", name)
    console.log("code: ", code)
    
    if(method === undefined || name === undefined || code >= 400)
        return errorToast
    
    return {
        ...sucessToast,
        title: `${method} ${name}`,
    }
}
