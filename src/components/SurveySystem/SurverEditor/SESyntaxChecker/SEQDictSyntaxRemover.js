import { conditions } from "./SEQSyntaxConstant"

//Check single question Dict
function SEQDictSyntaxRemover(qDict){
    var newDict = {}
    newDict.qid = qDict.qid
    newDict.msg = qDict.msg
    newDict.type = qDict.type
    var tArr = conditions[qDict.type]
    for(var i=0;i<tArr.length;i++){
        newDict[tArr[i].name]=qDict[tArr[i].name]
    }
    return newDict;
}

export default SEQDictSyntaxRemover