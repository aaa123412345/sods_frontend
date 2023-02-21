import React,{useState,useEffect} from "react";
import { Row,Form, Button } from "react-bootstrap";

const PageStyle = {
    color:"black",
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    border:"solid black",
    borderRadius: "25px"
  }

const BookingActivityForm = ({setDictUP,dict,handleSubmit}) =>{
    function setDict(key,value){
        var tmp = dict
        tmp[key]=value
        setDictUP(tmp)
        setUpdate(true)
        
    }

    const [update,setUpdate] = useState(false)

    useEffect(()=>{
        if(update){
            setUpdate(false)
        }
    },[update])

    return(
        <Row style={PageStyle} className="mt-4">
            <Form>
                <Form.Label className="mt-2">Location</Form.Label>
                <Form.Control
                    type="text"
                    id="text-location"
                    onChange={(e)=>setDict("location",e.target.value)}  
                    defaultValue = {dict.location === undefined?'':dict.location}                              
                />

                <Form.Label className="mt-2">Title</Form.Label>
                <Form.Control
                    type="text"
                    id="text-title"
                    onChange={(e)=>setDict("title",e.target.value)}  
                    defaultValue = {dict.title === undefined?'':dict.title}                              
                />

                <Form.Label className="mt-2">Activity Content</Form.Label>
                <Form.Control
                    type="text"
                    id="text-content"
                    as="textarea"
                    rows={4}
                    onChange={(e)=>setDict("content",e.target.value)}
                    defaultValue = {dict.content === undefined?'':dict.content}                                 
                /><br></br>

                <Form.Label className="mt-2">Quote</Form.Label>
                <Form.Control
                    type="number"
                    id="text-quote"
                    onChange={(e)=>setDict("maxQuote",e.target.value)}
                    defaultValue = {dict.maxQuote === undefined?'':dict.maxQuote}                                 
                /><br></br>

                <label >Start (date and time):</label><br></br>
                <input type="datetime-local" id="starttime" name="starttime" 
                onChange={(e)=>setDict("startTime",e.target.value)}
                defaultValue = {dict.startTime === undefined?'':dict.startTime}
                ></input><br></br><br></br>

                <label >End  (date and time):</label><br></br>
                <input type="datetime-local" id="endtime" name="endtime" 
                onChange={(e)=>setDict("endTime",e.target.value)}
                defaultValue = {dict.endTime === undefined?'':dict.endTime}></input> <br></br><br></br>
          
                <Button onClick={handleSubmit}> Upload </Button><br></br><br></br>
            
           

           
          </Form>
        </Row>
    )
}

export default BookingActivityForm