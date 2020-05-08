//	WHAT IS A LINKED LIST?

//	composed of nodes that point to eachother in 1 direction
//	every node has 2 properties: a value and a next

//  Node has properties 'data' and 'next'
class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  shift() {
    if (!this.head) {
      return;
    }
    const oldHead = this.head;
    this.head = this.head.next;
    this.length--;
    return oldHead;
  }

  unshift(data) {
    const newHead = new Node(data, this.head);
    this.length++;
    this.head = newHead;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    let currentNode = this.head;
    while (currentNode && currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }

  pop() {
    if (!this.head) {
      return;
    }

    if (this.length === 1) {
      return this.shift();
    }

    const last = this.getLast();
    let current = this.head;

    while (current.next !== last) {
      current = current.next;
    }

    current.next = null;
    this.length--;
    return last;
  }

  push(data) {
    if (!this.head) {
      return this.unshift(data);
    }
    const last = this.getLast();
    last.next = new Node(data, null);
    this.length++;
  }

  get(index) {
    if (index >= this.length || index < 0) {
      return null;
    }

    let counter = 0;
    let current = this.head;

    while (counter < index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  set(index, data) {
    if (!this.get(index)) {
      return false;
    }
    const node = this.get(index);
    node.data = data;
    return true;
  }

  remove(index) {
    if (!this.get(index)) {
      return false;
    }

    if (index === 0) {
      return this.shift();
    }

    let prevNode = this.get(index - 1);
    let toRemoveNode = this.get(index);
    prevNode.next = prevNode.next.next;
    this.length--;
    return toRemoveNode;
  }

  insert(index, data) {
    if (index > this.length || index < 0) {
      return false;
    }

    if (index === 0) {
      this.unshift(data);
      return true;
    }

    let prevNode = this.get(index - 1);
    let nextNode = this.get(index);
    prevNode.next = new Node(data, nextNode);
    this.length++;
    return true;
  }
}

/*======================================================================================
                                    explanation                  
======================================================================================*/

//  Removes AND returns first node, updates length for linked list w/ one node.‣
//  Removes the first node and returns it, decreases length of list.‣
//  Does not crash AND returns null on empty list. Does not decrease length.

function shift() {
  if (!this.head) {
    return;
  }
  const oldHead = this.head;
  this.head = this.head.next;
  this.length--;
  return oldHead;
}

//  Adds new node to start of list by correctly setting head and updating length.
//  Does not overwrite old head.

function unshift(data) {
  const newHead = new Node(data, this.head);
  this.length++;
  this.head = newHead;
}

//  Returns the first node in linked list.

function getFirst() {
  return this.head;
}

//  Returns the last node in linked list.
//  Does not crash AND returns null on empty list.

function getLast() {
  let currentNode = this.head;
  while (currentNode && currentNode.next) {
    currentNode = currentNode.next;
  }
  return currentNode;
}

//  Clears out the linked list and resets length to 0.

function clear() {
  this.head = null;
  this.length = 0;
}

//  Removes AND returns last node, decreases length.‣
//  Removes AND returns last node, decreases length on linked-list w/ one node.‣
//  Returns null on empty list AND does not decrease length.

function pop() {
  if (!this.head) {
    return;
  }

  if (this.length === 1) {
    return this.shift();
  }

  const last = this.getLast();
  let current = this.head;

  while (current.next !== last) {
    current = current.next;
  }

  current.next = null;
  this.length--;
  return last;
}

//  adds to the end of the list and increases length.‣
//  adds to end of empty list and increases length without crashing.

function push(data) {
  if (!this.head) {
    return this.unshift(data);
  }
  const last = this.getLast();
  last.next = new Node(data, null);
  this.length++;
}

//  returns null on negative or out of bounds index.‣
//  returns the node at given index.

function get(index) {
  if (index >= this.length || index < 0) {
    return null;
  }

  let counter = 0;
  let current = this.head;

  while (counter < index) {
    current = current.next;
    counter++;
  }
  return current;
}

//  returns falsy value on out of bounds or negative index.‣
//  Updates node and returns true.

function set(index, data) {
  if (!this.get(index)) {
    return false;
  }
  const node = this.get(index);
  node.data = data;
  return true;
}

//  returns falsy value on out of bounds OR negative index.‣
//  removes and returns node at given index. Decreases length.‣
//  removes node at index 0, decreases length, and returns removed node.

function remove(index) {
  if (!this.get(index)) {
    return false;
  }

  if (index === 0) {
    return this.shift();
  }

  let prevNode = this.get(index - 1);
  let toRemoveNode = this.get(index);
  prevNode.next = prevNode.next.next;
  this.length--;
  return toRemoveNode;
}

//  returns false on index greater than length or negative index.‣
//  inserts new node at given index, increases length, and returns true.‣
//  inserts node at 0 index correctly, increases length, returns true.

function insert(index, data) {
  if (index > this.length || index < 0) {
    return false;
  }

  if (index === 0) {
    this.unshift(data);
    return true;
  }

  let prevNode = this.get(index - 1);
  let nextNode = this.get(index);
  prevNode.next = new Node(data, nextNode);
  this.length++;
  return true;
}
