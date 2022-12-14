
function jsonExtractor(json){
    var result={
        response: "",
        data:{}
    }
    if(!("code" in json) ||!("msg" in json)||!("data" in json)){
        result.response= "syntaxerror"
        return result
    }
    
    if(json.code>=100 &&json.code<200){
        result.response= "processing"
        alert(json.msg)
        return result
    }else if(json.code>=200 &&json.code<300){
        result.response= "success"
        result.data=json.data
        return result
    }else if(json.code>300 &&json.code<400){
        result.response= "redirection"
        result.data=json.data
        return result
    }else if(json.code>=400 &&json.code<500){
        result.response= "clienterror"
        alert(json.msg)
        return result
    }else if(json.code>=500 &&json.code<600){
        result.response= "servererror"
        alert(json.msg)
        return result
    }
}

export default jsonExtractor;