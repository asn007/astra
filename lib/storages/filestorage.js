"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("../utils");
var fs = require('fs');
var basestorage_1 = require("./basestorage");
var FileStorageOptions = (function () {
    function FileStorageOptions(fileName, encoding) {
        this.fileName = fileName;
        this.encoding = encoding;
        if (!encoding)
            this.encoding = 'utf-8';
    }
    return FileStorageOptions;
}());
exports.FileStorageOptions = FileStorageOptions;
var FileStorage = (function (_super) {
    __extends(FileStorage, _super);
    function FileStorage(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        return _this;
    }
    FileStorage.prototype.get = function (key, defaultValue) {
        var tKey = this.flattenedDictionary[key];
        return tKey ? tKey : (defaultValue ? defaultValue : null);
    };
    FileStorage.prototype.set = function (key, value) {
        var _this = this;
        console.log(key + " => " + value);
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
    FileStorage.prototype.has = function (key) {
        return Boolean(this.get(key, false));
    };
    FileStorage.prototype.load = function (P) {
        var _this = this;
        return new P(function (resolve, reject) {
            fs.readFile(_this.options.fileName, _this.options.encoding, function (err, str) {
                if (err)
                    return reject(err);
                _this.dictionary = JSON.parse(str);
                _this.flattenedDictionary = utils_1.flatten(_this.dictionary);
                resolve(_this.flattenedDictionary);
            });
        });
    };
    FileStorage.prototype.save = function (P) {
        var _this = this;
        if (!this._modified)
            return new P(function (resolve, reject) { return resolve(); });
        return new P(function (resolve, reject) {
            _this.dictionary = utils_1.unflatten(_this.flattenedDictionary);
            fs.writeFile(_this.options.fileName, JSON.stringify(_this.dictionary), _this.options.encoding, function (err) {
                if (err)
                    return reject(err);
                _this._modified = false;
                resolve();
            });
        });
    };
    FileStorage.prototype.reload = function () {
        return undefined;
    };
    return FileStorage;
}(basestorage_1.BaseStorage));
exports.FileStorage = FileStorage;
