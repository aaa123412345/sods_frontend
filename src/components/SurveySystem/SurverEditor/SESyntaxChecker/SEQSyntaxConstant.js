export const conditions = {
    'basic':[
        {name:"qid",type:"number"},
        {name:"type",type:"string"},
        {name:"msg",type:"string"}
    ]
    ,'sparttips':[


    ]
    ,'stext':[
        {name:"required",type:"boolean"}
    ]
    ,'sselect':[
        {name:"required",type:"boolean"},
        {name:"option",type:"object"}
    ]
    ,'sradio':[
        {name:"required",type:"boolean"},
        {name:"option",type:"object"}
    ]
    ,'schecker':[
        {name:"required",type:"boolean"},
        {name:"option",type:"object"},
        {name:"maxSelect",type:"number"},
        {name:"minSelect",type:"number"}

    ]
    ,'srange':[
        {name:"min",type:"number"},
        {name:"max",type:"number"},
        {name:"step",type:"number"}
    ]
}