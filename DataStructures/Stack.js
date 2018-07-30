import LinkedList from "./LinkedList";

class Stack extends LinkedList{
    
    constructor(data){
        super(data);
    }

    push(data){
        this.insertFront(data);
    }

    pop(){
        let data = this.head.get();
        this.deleteFront()
        return data;
    }

    popToTop(){
        
    }
}


export default Stack;