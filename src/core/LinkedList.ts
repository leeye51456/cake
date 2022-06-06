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

    this.head = newHead
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

    this.tail = newTail
  }

  popHead(): T {
    const value = this.head?.value
    if (typeof value === 'undefined') {
      throw new RangeError('LinkedList is empty')
    }

    return value
  }

  popTail(): T {
    const value = this.tail?.value
    if (typeof value === 'undefined') {
      throw new RangeError('LinkedList is empty')
    }

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
