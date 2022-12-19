


const types = ['sparttips','stext','sselect','sradio','schecker','srange']
const conditions = {
    'basic':[
        {name:"qid",type:"number"},
        {name:"type",type:"string"},
        {name:"msg",type:"string"}
    ]
    ,'sparttips':[


    ]
    ,'stext':[

    ]
    ,'sselect':[

    ]
    ,'sradio':[

    ]
    ,'schecker':[

    ]
    ,'srange':[

    ]
}
 //Check whole question Dict
 function SurveyEditorChecker(Dict){
    var Dictlv1 = Dict
    var dictlv2 = Dict['questionset']
    var parts = Dict.info.partKey

    var result = {ready:true,msg:''}
    var tempMsg = {serious:[],normal:[]}


    //Storing the index for upper element to bottom
    var sindex = 0

    //loop element from start part
    for(var i=0; i<parts.length; i++){

        //Get Arr for specfic part
        var partInQuestionset = dictlv2[parts[i]]

            if(partInQuestionset.length===0){
                result.ready=false
                result.msg="Part no question"
                return result
            }
            //loop part arr and sort with index
            for(var j=0; j<partInQuestionset.length;j++,sindex++){
                //Get Dict and set index
                var qDict = partInQuestionset[j]

                //Check common syntax for all question element
                if(!syntaxQChecker(qDict,'basic')){
                    tempMsg.serious.push(qDict.qid)
                    result.ready=false
                }else{
                    //Check specfic question type syntax for question element
                    if('type' in qDict){
                        if(!syntaxQChecker(qDict,qDict.type)){
                            tempMsg.normal.push(qDict.qid)
                            result.ready=false
                        }
                    }
                }

                sindex++
                
            }

    }

    if(sindex==0){
        result.ready=false
        result.msg="No question"
    }

    if(result.ready!=true){
        result.msg= errorMsgBuilder(tempMsg)
    }


    
    return result

}

//Check single question Dict
function syntaxQChecker(qDict,checkType){
    var cType = conditions[checkType]
    console.log(cType,qDict,checkType)
    for(var i=0;i<cType.length;i++){
        if(cType[i].name in qDict){
            if (typeof qDict[cType[i].name] != cType[i].type){
                return false
            }
        }else{
            return false
        }
    }
    return true
}

function errorMsgBuilder(tempMsg){
    var msg=''
    if(tempMsg.serious.length>0){
        msg+= 'No setting Error[Qid]: ['
        for(var i=0;i<tempMsg.serious.length;i++){
            msg+= tempMsg.serious[i]
            if(i===tempMsg.serious.length-1){
                msg+=']'
            }else{
                msg+=','
            }
        }   
    }
    if(tempMsg.normal.length>0){
        for(var i=0;i<tempMsg.normal.length;i++){
            msg+= 'Setting parameter Error[Qid]: ['
            for(var i=0;i<tempMsg.normal.length;i++){
                msg+= tempMsg.normal[i]
                if(i===tempMsg.normal.length-1){
                    msg+=']'
                }else{
                    msg+=','
                }
            }  
        }
    }

    return msg
}

export default SurveyEditorChecker;