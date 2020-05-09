/*

CREATING SET USING CLASSES
set should maintein a list of unique values and should support;

-   ADD
-   DELETE
-   INCLUSION

*/

class Set {
  constructor(arr) {
    this.arr = arr;
  }

  add(val) {
    if (!this.has(val)) this.arr.push(val);
  }

  delete(val) {
    this.arr = this.arr.filter((x) => x !== val);
  }

  has(val) {
    return this.arr.includes(val);
  }

  get size() {
    return this.arr.length;
  }
}

let arr = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

//  added
arr.add(11);
//  not added
arr.add(1);
//  deleted
arr.delete(10);
//  returned length
arr.size;
