import axios from "axios";


function serverRequester(method,url,sentData){

    
        
        axios({
            method: method,
            url: url,
            data: sentData
          }).then(function(response){
            console.log("data:")
            console.log(response)
          }).catch(function(error){
            console.log(error)
          });

}

export default serverRequester;