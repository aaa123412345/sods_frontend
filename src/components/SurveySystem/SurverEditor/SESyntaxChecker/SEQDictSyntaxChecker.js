


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

//Check single question Dict
function SEQDictSyntaxChecker(qDict,checkType){
    var cType = conditions[checkType]
    if(cType === undefined) {
        console.log("Undefine Type")
        return false
    }
    for(var i=0;i<cType.length;i++){
        if(cType[i].name in qDict){
            
            if (typeof qDict[cType[i].name] != cType[i].type){
                //console.log("Type " +typeof qDict[cType[i].name] + "Require: "+cType[i].type)
                console.log("Type problem in "+qDict+" "+checkType+" Parameter:"+
                cType[i].name+" "+typeof qDict[cType[i].name]+' require: '+cType[i].type )
                return false
            }
        }else{
            console.log("Not in dict")
            return false
        }
    }
    return true
}

export default SEQDictSyntaxChecker