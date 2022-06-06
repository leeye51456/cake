import LinkedList from './LinkedList'

class RmsQueue {
  private capacity: number
  private queue: LinkedList<number>
  private sum: number

  constructor(capacity: number) {
    this.capacity = capacity
    this.queue = new LinkedList<number>()
    this.sum = 0
  }

  get average(): number {
    const size = this.queue.size

    if (size === 0) {
      return NaN
    }

    return this.sum / size
  }

  push(value: number): void {
    this.queue.pushAfterTail(value)
    this.sum += value

    if (this.queue.size > this.capacity) {
      const popped = this.pop()
      this.sum -= popped
    }
  }

  pop(): number {
    const popped = this.queue.popHead()
    this.sum -= popped

    return popped
  }
}

export default RmsQueue
