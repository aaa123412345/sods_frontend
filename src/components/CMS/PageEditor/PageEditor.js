import React,{useEffect, useState,startTransition} from 'react'
import { Tab,Tabs } from 'react-bootstrap'

import PageSearcher from './PageSearcher/PageSearcher'
import PagePreview from './PagePreview/PagePreview'
import PageUploader from './PageUploader/PageUploader'
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

    const [removePageState, setRemovePageState] = useState({
        domain:'',
        language:'',
        path:'',
        active:false
    })
    const removePageHook = useSendRequest(process.env.REACT_APP_BASE_HOST+"rest/"+removePageState.domain+"/"+removePageState.language+"/"+removePageState.path,
    'delete',{},removePageState.active,false,false)

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
        console.log(pageData)
        if(pageDataUpdate){
            
            setPageDataUpdate(false)
        }
        
        
    }, [pageDataUpdate])

    useEffect(() => {
        if(removePageState){
            if(!removePageHook.isLoaded){
                if(removePageHook.ready){
                    setRemovePageState(false)
                    setKey('searcher')
                    window.location.reload()
                }else if(removePageHook.errMsg!==""){
                    alert(removePageHook.errMsg)
                    setRemovePageState(false)
                }
            }
        }
    }, [removePageHook])


    function getRESTUrl(){
        var url = process.env.REACT_APP_BASE_HOST
        url += "rest/"+pagePathData.domain+"/"+pagePathData.language+"/"+pagePathData.path
        return url
    }

    function startEdit(domain,language,path){
        if(domain === '' || language === '' || path === ''){
            const tmp = {
                page:{
                    useBootstrap:true,
                    useHeader:true,
                    title:'temp',
                    style:{},
                    auth:''
                },
                element:[

                ]
            }
            var tmp2 = new PageData(tmp)
            tmp2.addElementInNewRow({})
            startTransition(() => {
                setPageData(tmp2)
                setKey('editor')
            })
            
        }else{
            setPagePathData({
                domain:domain,
                language:language,
                path:path,
                active:true
            })
        }
        
    }

    function deletePage(domain,language,path){
        function confirmBox(string){
            var result = window.confirm(string)
            return result
        }
        var ok = confirmBox("Delete Page in: "+domain+"/"+language+"/"+path+"?")
           
        
        if(ok){
            setRemovePageState({
                domain:domain,
                language:language,
                path:path,
                active:true
            })

        }
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
        }else if(command === pageDataCommand.updateElement){
            pageData.updateElement(data)
        }else if(command === pageDataCommand.removeElement){
            pageData.removeElement(data)
        }


        setPageDataUpdate(true)

    }

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
            {pageData===null?
            <Tab eventKey="searcher" title="Searcher"  >
                <PageSearcher startEdit = {startEdit} deletePage={deletePage}/>
            </Tab>:null}

          
            <Tab eventKey="editor" title="Editor" disabled ={pageData===null}>
                {pageData===null?'':
                <>
                    <PageDetailEditor items={pageData.getData()} command={setPageDataFromChild}/>
                </>
                }
                
            </Tab>
            <Tab eventKey="preview" title="Preview" disabled ={pageData===null} >
                {pageData===null?'':
                <PagePreview items={pageData.getData()}/>
                }
            </Tab>
            <Tab eventKey="upload" title="Upload" disabled ={pageData===null} >
                {pageData===null?'':
                <PageUploader data={pageData.getData()} routing={pagePathData}/>
                }
            </Tab>

        </Tabs>
    )
    
}

export default PageEditor