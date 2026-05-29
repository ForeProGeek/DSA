/**
 * A minimal Stack implementation (LIFO - Last In First Out).
 */
export class Stack {
  constructor(initialItems = []) {
    this.items = [...initialItems];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toArray() {
    return [...this.items];
  }
}
