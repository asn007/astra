import test from 'ava'
import {DoublyLinkedList, DoublyLinkedListItem} from "../lib/doublylinkedlist";


test('DoublyLinkedList will report correct length', t => {
  const list = new DoublyLinkedList();
  for(let i = 0; i < 10; i++) list.add(new DoublyLinkedListItem());
  list.pop();
  t.is(list.length, 9);
});

test('DoublyLinkedList.shift() will remove element from bottom', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) list.add(new Temp());
  t.is(list.shift().value, 0);
});

test('DoublyLinkedList.pop() will remove element from top', t => {
  let state = 0;
  const list = new DoublyLinkedList();
  class Temp extends DoublyLinkedListItem {
    value = 0;
    constructor() { super(); this.value = state++; }
  }
  for(let i = 0; i < 10; i++) list.add(new Temp());
  t.is(list.pop().value, 9);
});
