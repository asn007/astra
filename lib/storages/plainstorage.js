"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("../utils");
var fs = require('fs');
var basestorage_1 = require("./basestorage");
var PlainStorage = (function (_super) {
    __extends(PlainStorage, _super);
    function PlainStorage(object) {
        var _this = _super.call(this) || this;
        _this.object = object;
        return _this;
    }
    PlainStorage.prototype.get = function (key, defaultValue) {
        var tKey = this.flattenedDictionary[key];
        return tKey ? tKey : (defaultValue ? defaultValue : null);
    };
    PlainStorage.prototype.set = function (key, value) {
        var _this = this;
        this.markModified();
        var type = Object.prototype.toString.call(value);
        var isObject = (type === '[object Object]');
        if (isObject) {
            var flattened_1 = utils_1.flatten(value);
            Object.keys(flattened_1).forEach(function (flattenedKey) {
                _this.flattenedDictionary[key + ':' + flattenedKey] = flattened_1[flattenedKey];
            });
        }
        else
            this.flattenedDictionary[key] = value;
    };
    PlainStorage.prototype.has = function (key) {
        return Boolean(this.get(key, false));
    };
    PlainStorage.prototype.load = function (P) {
        var _this = this;
        return new P(function (resolve) {
            _this.dictionary = _this.object;
            _this.flattenedDictionary = utils_1.flatten(_this.object);
            resolve(_this.flattenedDictionary);
        });
    };
    PlainStorage.prototype.save = function (P) {
        var _this = this;
        if (!this._modified)
            return P.resolve();
        return new P(function (resolve) {
            _this.dictionary = utils_1.unflatten(_this.flattenedDictionary);
            // FIXME: figura out something about complexity
            for (var _i = 0, _a = Object.keys(_this.object); _i < _a.length; _i++) {
                var key = _a[_i];
                delete _this.object[key];
            }
            for (var _b = 0, _c = Object.keys(_this.dictionary); _b < _c.length; _b++) {
                var key = _c[_b];
                _this.object[key] = _this.dictionary[key];
            }
            _this._modified = false;
            return resolve();
        });
    };
    PlainStorage.prototype.reload = function (P) {
        return P.resolve();
    };
    return PlainStorage;
}(basestorage_1.BaseStorage));
exports.PlainStorage = PlainStorage;
