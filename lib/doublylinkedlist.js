"use strict";
var DoublyLinkedList = (function () {
    function DoublyLinkedList() {
        this._first = null;
        this._last = null;
        this.length = 0;
    }
    DoublyLinkedList.prototype.first = function () {
        return this._first;
    };
    DoublyLinkedList.prototype.last = function () {
        return this._last;
    };
    DoublyLinkedList.prototype.insertAfter = function (node, newNode) {
        newNode._prev = node;
        if (node._next == null)
            this._last = newNode;
        else {
            newNode._next = node._next;
            node._next._prev = newNode;
        }
        node._next = newNode;
        this.length++;
    };
    DoublyLinkedList.prototype.insertBefore = function (node, newNode) {
        newNode._next = node;
        if (node._prev == null)
            this._first = newNode;
        else {
            newNode._prev = node._prev;
            node._prev._next = newNode;
        }
        this.length++;
    };
    DoublyLinkedList.prototype.insertAtBeginning = function (node) {
        if (this._first == null) {
            this._first = node;
            this._last = node;
            node._next = null;
            node._prev = null;
            this.length++;
        }
        else
            this.insertBefore(this._first, node);
    };
    DoublyLinkedList.prototype.add = function (node) {
        if (this._last == null)
            this.insertAtBeginning(node);
        else
            this.insertAfter(this._last == this._first ? this._first : this._last, node);
    };
    DoublyLinkedList.prototype.remove = function (node) {
        if (node._prev == null)
            this._first = node._next;
        else
            node._prev._next = node._next;
        if (node._next == null)
            this._last = node._prev;
        else
            node._next._prev = node._prev;
        this.length--;
    };
    DoublyLinkedList.prototype.nodeAt = function (idx) {
        if (idx < 0 || idx >= this.length)
            return null;
        if (idx == 0)
            return this._first;
        if (idx == this.length - 1)
            return this._last;
        var currentIdx = 0;
        var currentItem = this._first;
        while (currentIdx < idx) {
            currentItem = currentItem._next;
            currentIdx++;
        }
        return currentItem;
    };
    DoublyLinkedList.prototype.pop = function () {
        var t = this._last;
        if (t == null) {
            this.length = 0;
            return null;
        }
        this.remove(t);
        return t;
    };
    DoublyLinkedList.prototype.shift = function () {
        var t = this._first;
        if (t == null) {
            this.length = 0;
            return null;
        }
        this.remove(t);
        return t;
    };
    DoublyLinkedList.prototype.toArray = function () {
        var items = [];
        if (this._first == null)
            return items;
        var it = this._first;
        while (it != null) {
            items.push(it);
            it = it._next;
        }
        return items;
    };
    return DoublyLinkedList;
}());
exports.DoublyLinkedList = DoublyLinkedList;
var DoublyLinkedListItem = (function () {
    function DoublyLinkedListItem() {
    }
    return DoublyLinkedListItem;
}());
exports.DoublyLinkedListItem = DoublyLinkedListItem;
