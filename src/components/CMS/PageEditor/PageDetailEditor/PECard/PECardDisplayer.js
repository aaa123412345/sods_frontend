import PECardModel from "./PECardModel";

import { Row,Col,Button } from "react-bootstrap";
import { useEffect } from "react";
import { pageDataCommand } from "../../PageDataCommand";



const PECardDisplayer = ({items,command}) =>{
    function getDistinctRow(elements){
        var rowArr = []
        for(var i=0;i<elements.length;i++){
            var tmpRow = elements[i].rank
            if(!rowArr.includes(tmpRow)){
                rowArr.push(tmpRow)
            }

        }
        return rowArr
    }
    
    function groupByRow(elements){
        var rowArr = getDistinctRow(elements)
        var rowGroup = {}
        for(var i=0;i<rowArr.length;i++){
            var rowData = elements.filter((element)=>element.rank===rowArr[i])
            //sort the rowData by subrank
            rowData.sort((a,b)=>a.subrank-b.subrank)
            rowGroup[rowArr[i]] = rowData
        }
        return rowGroup
    }

    useEffect(() => {
       
    }, [items])

     function colComponent(data,index,sindex){
            var bootstrapData = data.bootstrap
           
            return(
                <Col key={"col-major-"+index+"-"+sindex} lg={bootstrapData.lg} md={bootstrapData.md} sm={bootstrapData.sm}
                xl={bootstrapData.xl} xxl={bootstrapData.xxl} xs={bootstrapData.xs}>
                    <PECardModel key={"data-major-"+index+"-"+sindex} data={data} command={command}/>
                </Col>
            )
        }

    function rowComponent(rowData,rowkey){
        var style = {}
        style["border"] = "1px solid black"
        return(
            <Row key={"row-main-"+rowkey} className="mt-2" style={style}>
                <Col sm={1} key={"col-leftbtn-"+rowkey}>
                    <Row key={"row-leftbtn-"+rowkey}>
                        <Col key={"col-leftbtn-sub-"+rowkey}>
                            <Button key={"btn-leftbtn-"+rowkey} onClick={()=>command(pageDataCommand.addElementInLeft,{rank:rowkey})} className="mt-2" 
                            style={{width:"100%",paddingTop:"8px",paddingBottom:"8px"}}>Add</Button>
                        </Col>
                    </Row>
                </Col>
                <Col sm={10} key={"col-major-"+rowkey}>
                    <Row key={"row-major-"+rowkey}>
                       {rowData.map((element,sindex)=>
                            colComponent(element,rowkey,sindex)
                        )}
                    </Row>
                </Col>
                <Col sm={1} key={"col-rightbtn-"+rowkey}>
                    <Row key={"row-rightbtn-"+rowkey}>
                        <Col key={"col-rightbtn-sub-"+rowkey}>
                            <Button key={"btn-rightbtn-"+rowkey} onClick={()=>command(pageDataCommand.addElementInRight,{rank:rowkey})} className="mt-2" 
                            style={{width:"100%",paddingTop:"8px",paddingBottom:"8px"}}>Add</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    return(
        <div className="mt-3">
        
        {getDistinctRow(items.element).map((element,index)=>

            rowComponent(groupByRow(items.element)[element],index+1) 
        )
        }
        <Button style={{width:"100%",paddingTop:"8px",paddingBottom:"8px"}} className="mt-3" onClick={()=>command(pageDataCommand.addElementInNewRow,{})}>Add</Button>
       
        </div>
    )
}

export default PECardDisplayer;