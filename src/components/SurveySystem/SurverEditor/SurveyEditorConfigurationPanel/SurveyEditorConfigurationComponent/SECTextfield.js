import React, { useEffect } from "react";
import Form from 'react-bootstrap/Form'

const SECTextfield = ({partName,qid,setQDictInChild,qDict})=>{
   
    const switchDict={
        'on':true,
        'off':false
    }

   function change(event){
        setQDictInChild('required',switchDict[event.target.value])
   }

   useEffect(()=>{
        if(!('required' in qDict)){
            setQDictInChild('required',false)
        }
    }
   )

    return(
     <>
      <Form.Check 
        type="switch"
        id="custom-switch"
        key={partName+qid+"SECTextfield"}
        label="Required?"
        defaultChecked={'required' in qDict?qDict.required:false}
        onChange={change}
      />
      </>
      
  );
}
export default SECTextfield