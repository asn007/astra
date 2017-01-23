"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var doublylinkedlist_1 = require("../doublylinkedlist");
var BaseStorage = (function (_super) {
    __extends(BaseStorage, _super);
    function BaseStorage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._modified = false;
        return _this;
    }
    BaseStorage.prototype.markModified = function () { this._modified = true; };
    return BaseStorage;
}(doublylinkedlist_1.DoublyLinkedListItem));
exports.BaseStorage = BaseStorage;
