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
                />

                <Form.Label className="mt-2">Activity Information</Form.Label>
                <Form.Control
                    type="text"
                    id="text-information"
                    as="textarea"
                    rows={4}
                    onChange={(e)=>setDict("information",e.target.value)}                                
                /><br></br>

                <label >Start (date and time):</label><br></br>
                <input type="datetime-local" id="starttime" name="starttime" 
                onChange={(e)=>setDict("startTime",e.target.value)}></input><br></br><br></br>

                <label >End  (date and time):</label><br></br>
                <input type="datetime-local" id="endtime" name="endtime" 
                onChange={(e)=>setDict("endTime",e.target.value)}></input> <br></br><br></br>
          
                <Button onClick={handleSubmit}> Upload </Button><br></br><br></br>
            
           

           
          </Form>
        </Row>
    )
}

export default BookingActivityForm