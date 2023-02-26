import { useState } from "react"
import { useEffect } from "react"

const NavigationConfigPanel = ({data,configNodeData}) =>{
    const [nodeNavData,setNodeNavData] = useState({})
    useEffect(()=>{
        if(configNodeData !== undefined){
            if(configNodeData.index >= 0 ){
                var parent

                if(configNodeData.sindex >=0 ){
                    parent = data.navdata[configNodeData.index].child[configNodeData.sindex]
                }else{
                    parent = data.navdata[configNodeData.index]
                }

                setNodeNavData(
                    {...nodeNavData, 
                    auth: parent.auth,
                    path: parent.path,
                    navName: parent.navName
                    }
                )
            }
        }
       
        
    },[configNodeData])
    if(configNodeData !== undefined){
        if(configNodeData.index >=0 ){
            return(
                <>
                <h4> Index: {configNodeData.index}</h4>
                <h4>S-Index: {configNodeData.sindex}</h4>
                <h4>auth : {nodeNavData.auth}</h4>
                <h4> path : {nodeNavData.path}</h4>
                <h4>navName : {nodeNavData.navName}</h4>

                </>
            )
        }
    }
}

export default NavigationConfigPanel