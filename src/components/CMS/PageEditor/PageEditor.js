import React,{useEffect, useState} from 'react'
import { Tab,Tabs } from 'react-bootstrap'

import PageSearcher from './PageSearcher/PageSearcher'
import PagePreview from './PagePreview/PagePreview'
import PageDetailEditor from './PageDetailEditor/PageDetailEditor'
import useSendRequest from '../../../hooks/useSendRequest'


const PageEditor = () => {
    const [key, setKey] = useState('searcher');
    const [pagePathData, setPagePathData] = useState({
        domain:'',
        language:'',
        path:'',
        active:false
    })
    const pageDataHook = useSendRequest(getRESTUrl(),'get',{},pagePathData.active,false,false)
    const [pageData, setPageData] = useState(null)

    useEffect(() => {
        if(pagePathData.active){
            if(!pageDataHook.isLoaded){
                if(pageDataHook.ready){
                    setPageData(pageDataHook.items)
                    setPagePathData({
                        ...pagePathData,
                        active:false
                    })

                    setKey('editor')
                }else if(pageDataHook.errMsg!==""){
                    alert(pageDataHook.errMsg)
                    setPagePathData({
                        ...pagePathData,
                        active:false
                    })

                }
            }
        }
    }, [pageDataHook])

    useEffect(() => {
        console.log(pageData)
    }, [pageData])


    function getRESTUrl(){
        var url = process.env.REACT_APP_BASE_HOST
        url += "rest/"+pagePathData.domain+"/"+pagePathData.language+"/"+pagePathData.path
        return url
    }

    function startEdit(domain,language,path){
       
        setPagePathData({
            domain:domain,
            language:language,
            path:path,
            active:true
        })
        
    }

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
            {pageData===null?
            <Tab eventKey="searcher" title="Searcher"  >
                <PageSearcher startEdit = {startEdit}/>
            </Tab>:null}

          
            <Tab eventKey="editor" title="Editor" disabled ={pageData===null?true:false}>
                <PageDetailEditor items={pageData}/>
            </Tab>
            <Tab eventKey="preview" title="Preview" disabled ={pageData===null?true:false} >
                <PagePreview items={pageData}/>
            </Tab>
        </Tabs>
    )
    
}

export default PageEditor