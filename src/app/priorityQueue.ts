type Queue = {
  value: string;
  priority: number;
};

class PriorityQueue {
  heap: Queue[];

  constructor(queue: Queue[] = []) {
    this.heap = queue;
  }

  enqueue(value: string, priority: number) {
    this.heap.push({ value, priority });
    this.#bubbleUp();
  }

  dequeue() {
    const root = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0 && end) {
      this.heap[0] = end;
      this.#sinkDown(0);
    }
    return root;
  }

  #swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  #bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      // 親ノードのインデックスを取得
      let parentIdex = Math.floor((index - 1) / 2);

      // 親ノードの優先度が、追加したノードの優先度より小さい場合は、ヒープ化を終了する
      if (this.heap[parentIdex].priority <= this.heap[index].priority) break;

      // 親ノードの方が小さい場合は、ノードを交換し、再度ヒープ化する
      this.#swap(parentIdex, index);
      index = parentIdex;
    }
  }

  #sinkDown(index: number) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let smallest = index;

    if (
      left < this.heap.length &&
      this.heap[left].priority < this.heap[smallest].priority
    ) {
      smallest = left;
    }

    if (
      right < this.heap.length &&
      this.heap[right].priority < this.heap[smallest].priority
    ) {
      smallest = right;
    }

    // 左右の子ノードのどちらかが小さい場合は、ノードを交換し、再度ヒープ化する
    if (smallest !== index) {
      this.#swap(smallest, index);
      this.#sinkDown(smallest);
    }
  }
}

export default PriorityQueue;
