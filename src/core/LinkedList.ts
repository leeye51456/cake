export type LinkedListNodeOptions<T> = {
  next?: LinkedListNode<T> | null
  prev?: LinkedListNode<T> | null
  value: T
}

class LinkedList<T> {
  private head: LinkedListNode<T> | null
  private tail: LinkedListNode<T> | null
  private length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  get size(): number {
    return this.length
  }

  pushBeforeHead(value: T): void {
    const newHead = new LinkedListNode<T>({
      value,
      next: this.head,
      prev: null,
    })

    if (this.head) {
      this.head.prev = newHead
    }

    if (!this.tail) {
      this.tail = newHead
    }

    this.head = newHead
    this.length += 1
  }

  pushAfterTail(value: T): void {
    const newTail = new LinkedListNode<T>({
      value,
      next: null,
      prev: this.tail,
    })

    if (this.tail) {
      this.tail.next = newTail
    }

    if (!this.head) {
      this.head = newTail
    }

    this.tail = newTail
    this.length += 1
  }

  popHead(): T {
    if (!this.head) {
      throw new RangeError('LinkedList is empty')
    }

    const value = this.head.value

    if (this.head.next) {
      this.head.next.prev = null
    }
    this.head = this.head.next

    this.length -= 1
    return value
  }

  popTail(): T {
    if (!this.tail) {
      throw new RangeError('LinkedList is empty')
    }

    const value = this.tail.value

    if (this.tail.prev) {
      this.tail.prev.next = null
    }
    this.tail = this.tail.prev

    this.length -= 1
    return value
  }
}

export class LinkedListNode<T> {
  public next: LinkedListNode<T> | null
  public prev: LinkedListNode<T> | null
  public value: T

  constructor({ next, prev, value }: LinkedListNodeOptions<T>) {
    this.next = next ?? null
    this.prev = prev ?? null
    this.value = value
  }
}

export default LinkedList
