// Queue data structure.  T
// methods 'enqueue' and 'dequeue' add / remove elements from the queue
// AND also maintain 'first-in first-out' behaviour

// const q = new Queue();
// q.enqueue(1);
// q.enqueue(2);
// q.enqueue(3);
// expect(q.dequeue()).toEqual(1);

//  First-In                              First-out
//  end ================================> beginning

class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(val) {
    this.data.unshift(val);
  }

  dequeue() {
    return this.data.pop();
  }
}
