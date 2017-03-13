"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var doublylinkedlist_1 = require("./doublylinkedlist");
var utils_1 = require("./utils");
// TODO: implement atomic object merging
var AstraMergeBehaviour;
(function (AstraMergeBehaviour) {
    AstraMergeBehaviour[AstraMergeBehaviour["DIFF_MERGE"] = 0] = "DIFF_MERGE";
    AstraMergeBehaviour[AstraMergeBehaviour["ATOMIC_MERGE"] = 1] = "ATOMIC_MERGE";
})(AstraMergeBehaviour = exports.AstraMergeBehaviour || (exports.AstraMergeBehaviour = {}));
var AstraSaveBehaviour;
(function (AstraSaveBehaviour) {
    AstraSaveBehaviour[AstraSaveBehaviour["PROPAGATE_ACROSS_STORAGES"] = 0] = "PROPAGATE_ACROSS_STORAGES";
    AstraSaveBehaviour[AstraSaveBehaviour["UPDATE_LAST"] = 1] = "UPDATE_LAST";
})(AstraSaveBehaviour = exports.AstraSaveBehaviour || (exports.AstraSaveBehaviour = {}));
var Astra = (function () {
    function Astra(mergeBehaviour, saveBehaviour) {
        if (mergeBehaviour === void 0) { mergeBehaviour = AstraMergeBehaviour.DIFF_MERGE; }
        this.mergeBehaviour = mergeBehaviour;
        this.saveBehaviour = saveBehaviour;
        this._overrides = {};
        this._flattenedOverrides = {};
        this._keyMap = {};
        this.storages = new doublylinkedlist_1.DoublyLinkedList();
    }
    // TODO: figure out parallel loading and sequential indexing
    Astra.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var storage, sequence, _loop_1;
            return __generator(this, function (_a) {
                storage = this.storages.first();
                sequence = Astra.Promise.resolve();
                _loop_1 = function () {
                    var st = storage;
                    sequence.then(function () { return storage.load(Astra.Promise); }).then(function (dict) {
                        Object.keys(dict).forEach(function (key) {
                            if (!_this._keyMap[key])
                                _this._keyMap[key] = [st];
                            else
                                _this._keyMap[key].push(st);
                        });
                    });
                    storage = storage._next;
                };
                while (storage) {
                    _loop_1();
                }
                return [2 /*return*/, sequence];
            });
        });
    };
    Astra.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, storage;
            return __generator(this, function (_a) {
                promises = [];
                storage = this.storages.first();
                while (storage) {
                    promises.push(storage.save(Astra.Promise));
                    storage = storage._next;
                }
                return [2 /*return*/, Astra.Promise.all(promises)];
            });
        });
    };
    Astra.prototype.register = function (storage) {
        this.storages.add(storage);
    };
    Astra.prototype.unregister = function (storage) {
        this.storages.remove(storage);
    };
    Astra.prototype.get = function (key, defaultValue) {
        var override = this._flattenedOverrides[key];
        if (override)
            return override;
        var tempValue = defaultValue ? defaultValue : null;
        var storage = this.storages.first();
        while (storage) {
            var tX = storage.get(key, false);
            if (tX)
                tempValue = tX;
            storage = storage._next;
        }
        return tempValue;
    };
    Astra.prototype.set = function (key, value) {
        if (!this._keyMap[key])
            this._keyMap[key] = [this.storages.last()];
        var arr = this._keyMap[key];
        for (var i = this.saveBehaviour == AstraSaveBehaviour.PROPAGATE_ACROSS_STORAGES ? 0 : arr.length - 1; i < arr.length; i++)
            arr[i].set(key, value);
    };
    Astra.prototype.has = function (key) {
        return Boolean(this.get(key, false));
    };
    Astra.prototype.overrides = function (kv) {
        this._overrides = kv;
        this._flattenedOverrides = utils_1.flatten(this._overrides);
    };
    return Astra;
}());
Astra.Promise = Promise;
var __instance = new Astra(AstraMergeBehaviour.DIFF_MERGE, AstraSaveBehaviour.UPDATE_LAST);
__instance.Astra = Astra;
module.exports = __instance;
