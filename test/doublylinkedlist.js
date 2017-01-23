import test from 'ava'
import {DoublyLinkedList, DoublyLinkedListItem} from "../lib/doublylinkedlist";


test('will report correct length', t => {
  const list = new DoublyLinkedList();
  for(let i = 0; i < 10; i++) list.add(new DoublyLinkedListItem());
  t.is(list.length, 10);
  list.pop();
  t.is(list.length, 9);
});

test('will remove element from bottom', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) list.add(new Temp());
  t.is(list.shift().value, 0);
});

test('will remove element from top', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) list.add(new Temp());
  t.is(list.pop().value, 9);
});

test('will return first element', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) list.add(new Temp());
  t.is(list.first().value, 0);
});

test('will return last element', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) list.add(new Temp());
  t.is(list.last().value, 9);
});

test('will return array of elements in correct order', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  const arr = [];
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) {
    const temp = new Temp();
    list.add(temp);
    arr.push(temp);
  }
  t.deepEqual(list.toArray(), arr);
});

test('will remove last node', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) {
    const temp = new Temp();
    list.add(temp);
  }
  t.is(list.last().value, 9);
  t.is(list.length, 10);
  list.remove(list.last());
  t.is(list.length, 9);
  t.is(list.last().value, 8);
});

test('will remove first node', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) {
    const temp = new Temp();
    list.add(temp);
  }
  t.is(list.first().value, 0);
  t.is(list.length, 10);
  list.remove(list.first());
  t.is(list.length, 9);
  t.is(list.first().value, 1);
});

test('will insert new node at the beginning', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) {
    const temp = new Temp();
    list.add(temp);
  }
  const tx = new Temp();
  list.insertAtBeginning(tx);
  t.is(list.length, 11);
  t.is(list.first(), tx);
});

test('will return null on pop if list is empty', t => {
  const list = new DoublyLinkedList();
  t.is(list.length, 0);
  t.is(list.pop(), null);
});

test('will return null on shift if list is empty', t => {
  const list = new DoublyLinkedList();
  t.is(list.length, 0);
  t.is(list.shift(), null);
});

test('will return empty array if list is empty', t => {
  const list = new DoublyLinkedList();
  t.deepEqual(list.toArray(), []);
});

test('will return null if index < 0', t => {
  const list = new DoublyLinkedList();
  t.is(list.nodeAt(-1), null);
});

test('will return null if index > length', t => {
  const list = new DoublyLinkedList();
  t.is(list.nodeAt(100), null);
});

test('will return null on empty list', t => {
  const list = new DoublyLinkedList();
  t.is(list.nodeAt(0), null);
});

test('will insert new node before item in the middle', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  const arr = [];
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) {
    const temp = new Temp();
    list.add(temp);
    arr.push(temp);
  }
  list.insertBefore(list.nodeAt(5), new Temp());
  t.is(list.nodeAt(5).value, 10);
  t.is(list.length, 11);
});

test('will insert new node after item in the middle', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  const arr = [];
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) {
    const temp = new Temp();
    list.add(temp);
    arr.push(temp);
  }
  list.insertAfter(list.nodeAt(5), new Temp());
  t.is(list.nodeAt(6).value, 10);
  t.is(list.length, 11);
});

test('will return first item if given 0 as index and the list is not empty', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) {
    const temp = new Temp();
    list.add(temp);
  }
  t.is(list.nodeAt(0).value, 0);
});

test('will return last item if given length - 1 as index and the list is not empty', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) {
    const temp = new Temp();
    list.add(temp);
  }
  t.is(list.nodeAt(list.length - 1).value, 9);
});
