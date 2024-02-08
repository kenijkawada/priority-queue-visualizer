"use client";

import { useState } from "react";
import PriorityQueue from "./priorityQueue";

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue("A", 10);
priorityQueue.enqueue("B", 20);
priorityQueue.enqueue("C", 30);
priorityQueue.enqueue("D", 5);
priorityQueue.enqueue("E", 25);
priorityQueue.enqueue("F", 15);

export default function Home() {
  const [queue, setQueue] = useState<PriorityQueue>(priorityQueue);

  const [fromValues, setFromValues] = useState({
    value: "",
    priority: "",
  });

  function action(formData: FormData) {
    const value = formData.get("value");
    const priority = formData.get("priority");
    setFromValues({
      value: "",
      priority: "",
    });
    if (value && priority) {
      queue.enqueue(value.toString(), Number(priority));
      setQueue(queue);
    }
  }

  function dequeue() {
    queue.dequeue();
    setQueue(queue);
  }

  return (
    <main className="max-w-[768px] mx-auto p-6">
      <h1 className="text-4xl font-bold my-6">Priority Queue Visualizer</h1>

      <form className="py-6 flex flex-col gap-6" action={action}>
        <label className="flex flex-row gap-2">
          <span>Value</span>
          <input
            type="text"
            name="value"
            value={fromValues.value}
            onChange={(e) =>
              setFromValues({ ...fromValues, value: e.target.value })
            }
            className="bg-transparent border"
          ></input>
        </label>

        <label className="flex flex-row gap-2">
          <span>Priority</span>
          <input
            type="number"
            name="priority"
            value={fromValues.priority}
            onChange={(e) =>
              setFromValues({ ...fromValues, priority: e.target.value })
            }
            className="bg-transparent border w-20"
          />
        </label>

        <div className="flex flex-row gap-4">
          <button
            type="submit"
            name="button"
            value="enqueue"
            className="bg-foreground w-[100px] text-background font-semibold border rounded"
          >
            Enqueue
          </button>
          <button
            name="button"
            onClick={dequeue}
            className="bg-foreground w-[100px] text-background font-semibold border rounded"
          >
            Dequeue
          </button>
        </div>
      </form>

      <section className="py-4">
        <h2 className="text-3xl font-semibold my-4">Queue</h2>
        <div className="flex flex-row">
          {queue.heap.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 items-center">
              <span>{item.priority}</span>
              <span className="p-4 border">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-4">
        <h2 className="text-3xl font-semibold my-4">Binary Heap</h2>
        <div className="bg-card w-full min-h-[200px] p-6">
          {BinaryHeapTree({ priorityQueue: queue })}
        </div>
      </section>
    </main>
  );
}

const BinaryHeapTree = ({
  priorityQueue,
}: {
  priorityQueue: PriorityQueue;
}) => {
  const createNode = (index: number) => {
    if (index >= priorityQueue.heap.length) return null;

    const value = priorityQueue.heap[index].value;
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;

    return (
      <div
        className={
          index === 0
            ? "rootNode"
            : leftChildIndex < priorityQueue.heap.length ||
                rightChildIndex < priorityQueue.heap.length
              ? "node"
              : "leafNode"
        }
      >
        {value}
        {(leftChildIndex < priorityQueue.heap.length ||
          rightChildIndex < priorityQueue.heap.length) && (
          <div className="nodeContainer">
            {leftChildIndex < priorityQueue.heap.length &&
              createNode(leftChildIndex)}
            {rightChildIndex < priorityQueue.heap.length &&
              createNode(rightChildIndex)}
          </div>
        )}
      </div>
    );
  };

  return <div className="binaryHeap">{createNode(0)}</div>;
};
