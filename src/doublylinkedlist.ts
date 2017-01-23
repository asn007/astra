export class DoublyLinkedList<T extends DoublyLinkedListItem> {
  private _first: T = null;
  private _last: T = null;
  private length: number = 0;

  public first(): T {
    return this._first;
  }

  public last(): T {
    return this._last;
  }

  public insertAfter(node: T, newNode: T) {
    newNode._prev = node;
    if(node._next == null) this._last = newNode;
    else {
      newNode._next = node._next;
      newNode._next._prev = node;
    }
  }

  public insertBefore(node: T, newNode: T) {
    newNode._next = node;
    if(node._prev == null) this._first = newNode;
    else {
      newNode._prev = node._prev;
      node._prev._next = newNode;
    }
  }

  public insertAtBeginning(node: T) {
    if(this._first == null) {
      this._first = this._last = node;
      node._next = null;
      node._prev = null;
    } else this.insertBefore(this._first, node);
  }

  public add(node: T) {
    if(this._last == null) this.insertAtBeginning(node);
    else this.insertAfter(this._last, node);
    this.length++;
  }

  public remove(node: T) {
    if(node._prev == null) this._first = <T> node._next;
    else node._prev._next = node._next;
    if(node._next == null) this._last = <T> node._prev;
    else node._next._prev = node._prev;
  }


  public pop(): T {
    const t: T = this._last;
    if(t == null) {
      this.length = 0;
      return null;
    }
    this.remove(t);
    this.length--;
    return t;
  }

  public shift(): T {
    const t: T = this._first;
    if(t == null) {
      this.length = 0;
      return null;
    }
    this.remove(t);
    this.length--;
    return t;
  }

  public toArray(): T[] {
    const items: T[] = [];
    if(this._first == null) return items;
    let it: T = this._first;
    while(it) {
      items.push(it);
      it = <T> it._next;
    }
    return items;
  }

}

export abstract class DoublyLinkedListItem {
  _prev: DoublyLinkedListItem;
  _next: DoublyLinkedListItem;
}
