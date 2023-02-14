import React from "react";

import ReactWordcloud from "react-wordcloud"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { color } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const data2 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


ChartJS.register(ArcElement, Tooltip, Legend);

const ResultRenderMethod = {
    WORDCLOUD:'WORDCLOUD'
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
        Object.entries(dataDict).forEach(([key, value]) => {
            labels.push(key);
            data.push(value);
            
            var tmpColor = randomRGB()
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
        if(data.resultRenderMethod === ResultRenderMethod.WORDCLOUD) {
            return(
                <ReactWordcloud words={dataConvertToWordCloud(data.map)} size={[10,10]} options = {{rotations: 2,rotationAngles: [-90, 0]}}></ReactWordcloud>

            )
        }
    }
   
    return(
        //displaySelector(data)
        <Pie data={dataConvertToChart(data.map)} />
    )
        

    
        
        
    
    
}

export default RealTimeVotingResultDisplayer;