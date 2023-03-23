import useSendRequest from "../../../../hooks/useSendRequest"
import React,{useState} from 'react'
import { useEffect } from 'react'
import { Button } from "react-bootstrap"

const borderStyle = {
    borderStyle:'solid',
    borderWidth:'1px',
    borderColor:'black',
}

const PageUploader = ({data,routing}) =>{
    const [pageDataState,setPageDataState] = useState({
        domain:'public',
        lang:'',
        path:'',
        active:false
    })
    const uploadHook = useSendRequest(getRequestURL() ,'put',data,pageDataState.active,false,false)
    function getRequestURL(){
        var url = process.env.REACT_APP_CMS_PAGE_EDITOR_HOST
        if(pageDataState.domain !== '' || pageDataState.lang !== '' || pageDataState.path !== ''){
            url += "?"
        }
        if(pageDataState.domain !== ''){
            url += "domain=" + pageDataState.domain+"&"
        }
        if(pageDataState.lang !== ''){
            url += "language=" + pageDataState.lang+"&"
        }
        if(pageDataState.path !== ''){
            url += "pathVariable=" + pageDataState.path+"&"
        }
        return url

    }


    const [simpleFormHookState,setSimpleFormHookState] = useState(true)
    const simpleFormHook = useSendRequest(process.env.REACT_APP_LANGUAGE_HOST+'/simpleform','get',{},simpleFormHookState,false,false)
    const [langData,setLangData] = useState([])
    const [ready,setReady] = useState(false)

    function changePageDataState(value,target){
        setPageDataState({
            ...pageDataState,
            [target]:value
        })
    }

    function upload(){
        setPageDataState({
            ...pageDataState,
            active:true
        })
    }

    useEffect(()=>{
        setPageDataState({
            ...pageDataState,
            domain:routing.domain,
            lang:routing.language,
            path:routing.path
        })
        console.log(routing)
    },[routing])

    useEffect(()=>{
       
        console.log(pageDataState)
    },[pageDataState])

    useEffect(()=>{
        if(simpleFormHookState){
            if(!simpleFormHook.isLoaded){
                if(simpleFormHook.ready){
                    setReady(true)
                    setLangData(simpleFormHook.items.languageData)
                    setSimpleFormHookState(false)
                }else if(simpleFormHook.errMsg !==""){
                    alert(simpleFormHook.errMsg)
                    setSimpleFormHookState(false)

                }
            }
        }
    },[simpleFormHook])

    useEffect(()=>{
        if(pageDataState.active){
            if(!uploadHook.isLoaded){
                if(uploadHook.ready){
                    alert("Upload Success")
                    setPageDataState({
                        ...pageDataState,
                        active:false
                    })
                    window.location.reload()
                }else if(uploadHook.errMsg !==""){
                    alert(uploadHook.errMsg)
                    setPageDataState({
                        ...pageDataState,
                        active:false
                    })
                }
            }
        }
    },[uploadHook])

    return (
    <>
        {"Domain: "} 
        <br></br>
        <select style={borderStyle}  onChange={(e)=>{changePageDataState(e.target.value,'domain')}} value={pageDataState.domain}>
                           
            {['public','server'].map((item,index)=>{
                return <option key={"domain-slecet-"+index} value={item} >{item}</option>
            })}
                            
        </select>
        <br></br>
        {"Language: "} 
        <br></br>
            <select style={borderStyle}  onChange={(e)=>{changePageDataState(e.target.value,'lang')}} value={pageDataState.lang} >
                
                {langData.map((item,index)=>{
                return <option key={"lang-slecet-"+index} value={item} >{item}</option>
            })}
        </select>
        <br></br>
        {"Path: "} 
        <br></br>
        <input style={borderStyle} type="text" 
        onChange={(e)=>{changePageDataState(e.target.value,'path')}} value={pageDataState.path}/>
        <br></br>
        <Button onClick={()=>upload()}>Upload</Button>
    </>
    )
}

export default PageUploader