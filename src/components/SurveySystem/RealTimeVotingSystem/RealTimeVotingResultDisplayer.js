import React from "react";

import ReactWordcloud from "react-wordcloud"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie,Bar,Line } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);


const ResultRenderMethod = {
    WORDCLOUD:'WORDCLOUD',
    PIECHART:'PIECHART',
    BARCHART:'BARCHART',
    LINECHART:'LINECHART'
}



const RealTimeVotingResultDisplayer = ({data}) => {

    function dataConvertToWordCloud(dataDict){
        var textDictArr = []
        Object.entries(dataDict).forEach(([key, value]) => {
           
            var tempTextDict = {text:key,value:value}
            textDictArr.push(tempTextDict)
         });
         return textDictArr;
    }

    function dataConvertToChart(dataDict){
       
        var labels = []
        var data = []
        var backgroundColor = []
        var borderColor= []
        Object.entries(dataDict).forEach(([key, value],index) => {
            labels.push(key);
            data.push(value);
            var tmpColor;
            if(index<14){
                tmpColor = RGBTalbe(index)
            }else{
                tmpColor = randomRGB()
            }
            backgroundColor.push(getRGBAstr(tmpColor,0.2))
            borderColor.push(getRGBAstr(tmpColor,1))
         }); 
         return {
            labels:labels,
            datasets:[
                {
                    label: '# of Votes',
                    data:data,
                    backgroundColor:backgroundColor,
                    borderColor:borderColor,
                    borderWidth: 1,
                }
            ]
         }
    }
    function RGBTalbe(index){
        var R=[255,0,0,255,0,255,192,128,128,128,0,128,0,0]
        var G=[0,255,0,255,255,0,192,128,0,128,128,0,128,0]
        var B =[0,0,255,0,255,255,192,128,0,0,0,128,128,128]
        return {r:R[index],g:G[index],b:B[index]}
    }

    function randomRGB(){
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return {r:r,g:g,b:b}
    }

    function getRGBAstr(color,a){
        return "rgba(" + color.r + "," + color.g + "," + color.b + "," + a +")";
    }

    function displaySelector(data){
        <Pie data={dataConvertToChart(data.map)} />
        /*
       if(data.resultRenderMethod === ResultRenderMethod.PIECHART){
        return ( <Pie data={dataConvertToChart(data.map)} />)

        }else if(data.resultRenderMethod === ResultRenderMethod.LINECHART){
            return ( <Line data={dataConvertToChart(data.map)} />)

        }else if(data.resultRenderMethod === ResultRenderMethod.BARCHART){
            return ( <Bar data={dataConvertToChart(data.map)} />)

        }else if(data.resultRenderMethod === ResultRenderMethod.WORDCLOUD){
            return(
                <ReactWordcloud words={dataConvertToWordCloud(data.map)} size={[10,10]} options = {{rotations: 2,rotationAngles: [-90, 0]}}></ReactWordcloud>
            )
        }*/
    }
   
    return(
        displaySelector(data)
        /*
        <>
        <Pie data={dataConvertToChart(data.map)} />
        </>*/
        
    )
        

    
        
        
    
    
}

export default RealTimeVotingResultDisplayer;