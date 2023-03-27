import cloneDeep from "lodash.clonedeep";

const elementTemplate = {
    subrank: 0,
    rank: 0,
    style:{},
    bootstrap: {
        lg: 12,
        md: 12,
        sm: 12,
        xl: 12,
        xxl: 12,
        xs: 12
    },
   
    type: "ctext",
    content: "New Content",
}


class PageData{

    constructor(data){
        this.element = cloneDeep(data.element);
        this.page = cloneDeep(data.page);
    }

    sortElement(){
        this.element.sort((a,b)=>a.subrank-b.subrank)
        this.element.sort((a,b)=>a.rank-b.rank)
        
    }

    removeElement(data){
        
        if('rank' in data && 'subrank' in data){
            //get the all element expect the target element (Remove the target element)
            console.log(this.element)
            this.element = this.element.filter((element)=>element.rank!==data.rank || element.subrank!==data.subrank)
            //Get the number of element with the same rank of target
            var targetElement = this.element.filter((element)=>element.rank===data.rank)
            var targetElementSize = targetElement.length
            //If targetElementSize is 0, remove the rank of all element with rank > target rank
            if(targetElementSize===0){
                this.element.forEach((element)=>{
                    if(element.rank>data.rank){
                        element.rank = element.rank-1
                    }
                })
            }
            //If targetElementSize is not 0, remove the rank of all element with the smae rank but subrank > target subrank
            else{
                this.element.forEach((element)=>{
                    if(element.rank===data.rank && element.subrank>data.subrank){
                        element.subrank = element.subrank-1
                    }
                })
            }


            

            


        }
        
    }

    addElementInRight(data){
        if('rank' in data){
           //Get the target element with the same rank. All subrank in target element should be +1
                var targetElement = this.element.filter((element)=>element.rank===data.rank)
                targetElement.forEach((element)=>{
                    element.subrank = element.subrank+1
                })
                //Add the new element
                var newElement = cloneDeep(elementTemplate)
                newElement.rank = data.rank
                newElement.subrank = 1
                this.element.push(newElement)
        }
        
    }

    addElementInLeft(data){
        if('rank' in data){
            //Get the target element with the same rank. Find the size of the target element
            var targetElement = this.element.filter((element)=>element.rank===data.rank)
            var targetElementSize = targetElement.length

            //Add the new element in the tail
            var newElement = cloneDeep(elementTemplate)
            newElement.rank = data.rank
            newElement.subrank = targetElementSize+1
            this.element.push(newElement)
            
        }
        
    }

    addElementInNewRow(data){
            //Find the maxium rank in the element
            var maxRank = 0
            if(this.element.length>0){
                this.element.forEach((element)=>{
                    if(element.rank>maxRank){
                        maxRank = element.rank
                    }
                }
            )}
            //Add the new element in the new row with max rank +1
            var newElement = cloneDeep(elementTemplate)
            newElement.rank = maxRank+1
            newElement.subrank = 1
            this.element.push(newElement)
            
    }

    updateElement(data){
        if('element' in data && 'rank' in data && 'subrank' in data){
            //get the all element expect the target element
            var targetElement = this.element.filter((element)=>element.rank!==data.rank || element.subrank!==data.subrank)
            //Add the new element
            targetElement.push(data.element)
            this.element = targetElement
            
        }
        console.log("result")
        console.log(this.element)
    }


    

    getData(){
        this.sortElement()
        return {page : this.page, element: this.element}
    }
}

export default PageData