import LinkedList from "./LinkedList";

class Queue extends LinkedList{

    constructor(data){
        super(data);
    }

    enqueue(data){
        this.insertEnd(data);
    }

    dequeue(){
        if(this.isEmpty())
            return null;
        const value = this.head.get();
        this.deleteFront();
        return value;
    }

}

export default Queue;