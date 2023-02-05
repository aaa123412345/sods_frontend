

function jsonExtractor(json){
    


    var result={
        response: "",
        data:{}
    }

    if(json === undefined){
        result.response= "undefineerror"
        return result;
    }

    if(!("code" in json) ||!("msg" in json)){
        result.response= "syntaxerror"
        return result
    }
    
    if(json.code>=100 &&json.code<200){
        result.response= "processing"

    }else if(json.code>=200 &&json.code<300){
        result.response= "success"
        

    }else if(json.code>300 &&json.code<400){
        result.response= "redirection"
       
    }else if(json.code>=400 &&json.code<500){
        result.response= "clienterror"
        
       
    }else if(json.code>=500 &&json.code<600){
        result.response= "servererror"
        

    }

    if("data" in json){
        result.data = json.data
    }

    
    return result;
}

export default jsonExtractor;