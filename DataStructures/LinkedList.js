class Node{
    constructor(data){
        this.data = data;
        this.next = null;
        this.print = this.print.bind(this);
    }
    print(printFunction){
        if(printFunction && printFunction.constructor === Function){
            return printFunction(this.data);
        }
        if(this.data){
             switch(this.data.constructor){
                case Number:
                case String:
                    console.log(this.data);
                default:
                    console.log(JSON.stringify(this.data));
            }
        }
    }
    setNext(node){
        this.next = node;
    }
    getNext(){
        return this.next;
    }
    get(){
        return this.data;
    }
    set(data){
        this.data = data;
    }
}

class LinkedList{
    constructor(data){
        this.head = this.current = this.tail = null;
        if(data)
            this.current = this.head = this.tail = new Node(data);
    }
    insertFront(data){
        const node = new Node(data);
        this.current = node;
        node.setNext(this.head);
        this.head = node;
    }
    insertEnd(data){
        const node = new Node(data);
        if(this.head === null)
            return this.head = node;
        this.current = this.head;
        while(this.current.getNext()){
            this.current = this.current.getNext();
        }
        this.current.setNext(node);   
    }
    insertIndex(index,data){
        const node = new Node(data);
        this.current = this.head;
        let currentIndex = 0;
        while(this.current!== null && currentIndex<=index){
            if(index === currentIndex){
                node.setNext(this.current.getNext());
                this.current.setNext(node);
            }
            this.current = this.current.getNext();
            currentIndex++;
        }
    }
    insertMiddle(data){
        const node = new Node(data);
        const middle = this.findMiddle();
        node.setNext(middle.getNext());
        middle.setNext(node);
    }
    deleteFront(){
        if(!this.head)
            return;
        this.head = this.head.getNext();
    }
    deleteEnd(){
        if(!this.head)
            return;
        this.current = this.head;
        while(this.current !== null && this.current.getNext().getNext()){
            this.current = this.current.getNext();
        }
        if(this.current)
            this.current.setNext(null);
    }
    deleteMiddle(){
        let prevNode = this.findPrevMiddle();
        prevNode.setNext(prevNode.getNext().getNext());
    }
    deleteIndex(index){
        this.current = this.head;
        let prevNode = null;
        let currentIndex = 0;
        while(this.current!== null && this.current.getNext() !== null && currentIndex<= index){
            prevNode = this.current;
            if(index === currentIndex){
                prevNode.setNext(this.current.getNext().getNext());
            }
            currentIndex++;
            this.current = this.current.getNext();
        }
    }
    print(printFunction = null){
        this.current = this.head;
        while(this.current !== null){
            this.current.print(printFunction);
            this.current = this.current.getNext();
        }
    }
    reverse(){
        this.current = this.head;
        let prev  = null;
        while(this.current!==null){
            let next = this.current.getNext();
            this.current.setNext(prev);
            prev = this.current;
            this.current = next;
        }

        this.head = prev;
    }
    findFirst(){
        if(this.head !== null)
            return this.head.get();
    }
    findMiddle(){
        let middleNode = this.current = this.head;
        while(this.current!==null && this.current.getNext()!== null){
            middleNode = middleNode.getNext();
            this.current = this.current.getNext().getNext();
        }
        return middleNode;
    }
    findPrevMiddle(){
      this.current = this.head;
      let middle = this.current;
      let prev = null;
      while(this.current != null && this.current.getNext() != null)
      {
          prev = middle;
          middle = middle.getNext();
          this.current = this.current.getNext().getNext();
      }
      return prev;
    }
    size(){
        let count = 0;
        this.current = this.head;
        while(this.current != null){
            count++;
            this.current = this.current.getNext();
        }
        return count;
    }
    contains(needle){
        let position = 0;
        let found = false;
        this.current = this.head;
        while(this.current != null){
            if(needle === this.current.get()){
                found = true;
                break;
            }
            this.current = this.current.getNext();
            position++;
        }
        if(found)
            return position;
        return -1;
    }
    map(cb){
        this.current = this.head;
        let index = 0;
        while(this.current!== null){
            this.current.set(cb(this.current.get(),index));
            this.current = this.current.getNext();
            index++;
        }
    }

    isEmpty(){
        return (this.head === null)
    }
}

export default LinkedList;