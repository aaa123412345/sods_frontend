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
            //Get the target element
            var targetElement = this.element.filter((element)=>element.rank===data.rank && element.subrank===data.subrank)
            //Get the target element rank
            var targetRank = targetElement[0].rank
            //Get the target element subrank
            var targetSubrank = targetElement[0].subrank
            //Get the target element size
            var targetElementSize = this.element.filter((element)=>element.rank===targetRank).length
            //Remove the target element
            this.element = this.element.filter((element)=>element.rank!==targetRank || element.subrank!==targetSubrank)
            //Get the element with the same rank and subrank > target subrank
            var targetElement = this.element.filter((element)=>element.rank===targetRank && element.subrank>targetSubrank)
            //Subtract the subrank by 1
            targetElement.forEach((element)=>{
                element.subrank = element.subrank-1
            })
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
            this.element.forEach((element)=>{
                if(element.rank>maxRank){
                    maxRank = element.rank
                }
            }
            )
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