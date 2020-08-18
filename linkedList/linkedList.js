//	WHAT IS A LINKED LIST?

//	composed of nodes that point to eachother in 1 direction
//	every node has 2 properties: a value and a next

//  Node has properties 'data' and 'next'
class Node {
  constructor(data, next) {
    this.data = data
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  shift() {
    if (!this.head) {
      return
    }
    const oldHead = this.head
    this.head = this.head.next
    this.length--
    return oldHead
  }

  unshift(data) {
    const newHead = new Node(data, this.head)
    this.length++
    this.head = newHead
  }

  getFirst() {
    return this.head
  }

  getLast() {
    let currentNode = this.head
    while (currentNode && currentNode.next) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  clear() {
    this.head = null
    this.length = 0
  }

  pop() {
    if (!this.head) {
      return
    }

    if (this.length === 1) {
      return this.shift()
    }

    const last = this.getLast()
    let current = this.head

    while (current.next !== last) {
      current = current.next
    }

    current.next = null
    this.length--
    return last
  }

  push(data) {
    if (!this.head) {
      return this.unshift(data)
    }
    const last = this.getLast()
    last.next = new Node(data, null)
    this.length++
  }

  get(index) {
    if (index >= this.length || index < 0) {
      return null
    }

    let counter = 0
    let current = this.head

    while (counter < index) {
      current = current.next
      counter++
    }
    return current
  }

  set(index, data) {
    if (!this.get(index)) {
      return false
    }
    const node = this.get(index)
    node.data = data
    return true
  }

  remove(index) {
    if (!this.get(index)) {
      return false
    }

    if (index === 0) {
      return this.shift()
    }

    let prevNode = this.get(index - 1)
    let toRemoveNode = this.get(index)
    prevNode.next = prevNode.next.next
    this.length--
    return toRemoveNode
  }

  insert(index, data) {
    if (index > this.length || index < 0) {
      return false
    }

    if (index === 0) {
      this.unshift(data)
      return true
    }

    let prevNode = this.get(index - 1)
    let nextNode = this.get(index)
    prevNode.next = new Node(data, nextNode)
    this.length++
    return true
  }
}
