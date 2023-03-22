import React,{useEffect, useState} from 'react'
import { Button, Tab,Tabs } from 'react-bootstrap'

import PageSearcher from './PageSearcher/PageSearcher'
import PagePreview from './PagePreview/PagePreview'
import PageDetailEditor from './PageDetailEditor/PageDetailEditor'
import useSendRequest from '../../../hooks/useSendRequest'
import { pageDataCommand } from './PageDataCommand'

import PageData from './PageData'


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
    const [pageDataUpdate, setPageDataUpdate] = useState(false)

    useEffect(() => {
        if(pagePathData.active){
            if(!pageDataHook.isLoaded){
                if(pageDataHook.ready){
                    
                    setPageData(new PageData(pageDataHook.items))
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
        if(pageDataUpdate){
            console.log(pageData)
            setPageDataUpdate(false)
        }
        
        
    }, [pageDataUpdate])

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

    function setPageDataFromChild(command,data){
        console.log(command)
        console.log(data)
        if(command === pageDataCommand.addElementInRight){
            pageData.addElementInRight(data)
        }else if(command === pageDataCommand.addElementInLeft){
            pageData.addElementInLeft(data)
        }else if(command === pageDataCommand.addElementInNewRow){
            pageData.addElementInNewRow(data)
        }


        setPageDataUpdate(true)

    }

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
            {pageData===null?
            <Tab eventKey="searcher" title="Searcher"  >
                <PageSearcher startEdit = {startEdit}/>
            </Tab>:null}

          
            <Tab eventKey="editor" title="Editor" disabled ={pageData===null}>
                {pageData===null?'':
                <>
                    <PageDetailEditor items={pageData.getData()} command = {setPageDataFromChild}/>
                </>
                }
                
            </Tab>
            <Tab eventKey="preview" title="Preview" disabled ={pageData===null} >
                {pageData===null?'':
                <PagePreview items={pageData.getData()}/>
                }
            </Tab>
        </Tabs>
    )
    
}

export default PageEditor