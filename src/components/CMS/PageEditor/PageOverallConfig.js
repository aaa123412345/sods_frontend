import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import useSendRequest from '../../../hooks/useSendRequest'

const PageOverallConfig = ({items,command}) => {
    const [serchPemissionState,setSerchPemissionState] = useState({active:true})
    const serchPemissionHook = useSendRequest(process.env.REACT_APP_SECURITY_HOST+"permissions",'get',{},serchPemissionState.active,false,false)
    const [pageConfigChoice,setPageConfigChoice] = useState({
       
        permission:[]
    })

    const [pageConfig, setPageConfig] = useState(null)

    useEffect(()=>{
        if(items !== undefined){
            setPageConfig({
                auth:items.page.auth,
                style:items.page.style,
                title:items.page.title,
                useBootstrap:items.page.useBootstrap,
                useHeader:items.page.useHeader,
                description:items.page.description,
            })
        }
    },[items])

    useEffect(()=>{
        if(serchPemissionState.active){
            if(!serchPemissionHook.isLoaded){
                if(serchPemissionHook.ready){
                    setSerchPemissionState({
                        ...serchPemissionState,
                        active:false
                    })
                    //get the "perms" in serchPemissionHook.items and store it in pageConfigChoice.permission
                    var tmp = []
                    for(var i=0;i<serchPemissionHook.items.length;i++){
                        tmp.push(serchPemissionHook.items[i].perms)
                    }
                    setPageConfigChoice({
                        ...pageConfigChoice,
                        permission:tmp
                    })
                }else if(serchPemissionHook.errMsg !== ""){
                    alert(serchPemissionHook.errMsg)
                    setSerchPemissionState({
                        ...serchPemissionState,
                        active:false
                    })
                }
            }
        }
    },[serchPemissionHook])

    useEffect(()=>{
        console.log(items)
        console.log(pageConfig)
    },[pageConfig])


    function setPageData(key,value){
        setPageConfig({
            ...pageConfig,
            [key]:value
        })
    }
    if(pageConfig !== null){
    return(
        <>
            <h1 style={{fontSize:"1.5vw"}}>{"Auth: "}</h1>
            <select value={pageConfig?.auth} style={{border:'solid black 1px'}}
                onChange={(e)=>setPageData("auth",e.target.value)}>
                <option value={"anonymous"}>permit all</option>
                <option value={"anonymousOnly"}>anonymous</option>
                <option value={"authenticated"}>authenticated</option>
                {pageConfigChoice.permission.map((item,index)=>{
                    return <option value={item} key={index}>{item}</option>
                })
                }
            </select>

            <h1 style={{fontSize:"1.5vw"}}>{"Title: "}</h1>
            <input type="text" value={pageConfig?.title} style={{border:'solid black 1px'}}
                onChange={(e)=>setPageData("title",e.target.value)}>
            </input>
            <h1 style={{fontSize:"1.5vw"}}>{"Description: "}</h1>
            <input type="text" value={pageConfig?.description} style={{border:'solid black 1px'}}
                onChange={(e)=>setPageData("description",e.target.value)}>
            </input>
            <h1 style={{fontSize:"1.5vw"}}>{"Use Bootstrap: "}</h1>
            <input type="checkbox" checked={pageConfig?.useBootstrap} style={{border:'solid black 1px'}}
                onChange={(e)=>setPageData("useBootstrap",e.target.checked)}>
            </input>
            <h1 style={{fontSize:"1.5vw"}}>{"Use Header: "}</h1>
            <input type="checkbox" checked={pageConfig?.useHeader} style={{border:'solid black 1px'}}
                onChange={(e)=>setPageData("useHeader",e.target.checked)}>
            </input>
        </>
    )
            }


}

export default PageOverallConfig