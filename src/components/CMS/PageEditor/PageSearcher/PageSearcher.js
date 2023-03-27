import React,{useState} from 'react'
import { useEffect } from 'react'
import { Row,Col,ButtonGroup,Button } from 'react-bootstrap'
import useSendRequest from "../../../../hooks/useSendRequest";
import PageSearcherTable from './PageSearcherTable';

const borderStyle = {
    borderStyle:'solid',
    borderWidth:'1px',
    borderColor:'black',
}


const PageSearcher = ({startEdit,deletePage}) => {
    const [pageDataState,setPageDataState] = useState({
        domain:'public',
        lang:'',
        path:'',
        active:false
    })
  
    const searchPageHook = useSendRequest(getRequestURL(),'get',{},pageDataState.active,false,false)

    const [simpleFormHookState,setSimpleFormHookState] = useState(true)
    const simpleFormHook = useSendRequest(process.env.REACT_APP_LANGUAGE_HOST+'/simpleform','get',{},simpleFormHookState,false,false)
    const [langData,setLangData] = useState([])

    const [searchResult,setSearchResult] = useState([])
    const [ready,setReady] = useState(false)

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
        url += "editable=1"
        return url

    }

    function changePageDataState(value,target){
        
        setPageDataState({
            ...pageDataState,
            [target]:value
        })
    }

    function searchPage(){
        setPageDataState({
            ...pageDataState,
            active:true
        })
    }

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
    },[pageDataState])

    useEffect(()=>{
        if(pageDataState.active){
            if(!searchPageHook.isLoaded){
                if(searchPageHook.ready){
                    setSearchResult(searchPageHook.items)
                    setPageDataState({
                        ...pageDataState,
                        active:false
                    })
                }else if(searchPageHook.errMsg !==""){
                    alert(searchPageHook.errMsg)
                    setPageDataState({
                        ...pageDataState,
                        active:false
                    })
                }
            }
        }
    },[searchPageHook])

    useEffect(()=>{
        console.log(searchResult)
    },[searchResult])

    if(ready){
        return (
            <div>
                <Row className="mb-3 mt-3">
                    <Col sm={2}>
                        {"Domain: "} 
                        <select style={borderStyle}  onChange={(e)=>{changePageDataState(e.target.value,'domain')}} value={pageDataState.domain}>
                           
                            {['public','server'].map((item,index)=>{
                                return <option key={"domain-slecet-"+index} value={item} >{item}</option>
                            })}
                            
                        </select>
                    </Col>
                    <Col sm={2}>
                        {"Language: "} 
                        <select style={borderStyle}  onChange={(e)=>{changePageDataState(e.target.value,'lang')}} value={pageDataState.lang}>
                            <option value="">All</option>
                            {langData.map((item,index)=>{
                                return <option key={"lang-slecet-"+index} value={item} >{item}</option>
                            })}
                        </select>
                    </Col>
                    <Col sm={4}>
                        {"Path: "} 
                        <input style={borderStyle} type="text" 
                        onChange={(e)=>{changePageDataState(e.target.value,'path')}} value={pageDataState.path}/>
                    </Col>
                    <Col sm={4}>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="primary" onClick={()=>searchPage()}>Search</Button>
                        <Button variant="primary" onClick={()=>startEdit('','','')}>Create</Button>
                    </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col> 
                        {searchResult.length > 0 ? <PageSearcherTable data={searchResult} startEdit={startEdit} deletePage={deletePage}/> : null}
                        
                    </Col>
                </Row>
            </div>
        )
    }
    
}

export default PageSearcher