"use strict";
var delimiter = ':';
function flatten(o) {
    var output = {};
    function step(object, prev, depth) {
        depth = depth ? depth : 1;
        Object.keys(object).forEach(function (key) {
            var value = object[key];
            var type = Object.prototype.toString.call(value);
            var isObject = (type === '[object Object]' ||
                type === '[object Array]');
            var newKey = prev ? prev + delimiter + key : key;
            if (!Array.isArray(value) &&
                isObject && Object.keys(value).length)
                return step(value, newKey, depth + 1);
            output[newKey] = value;
        });
    }
    step(o);
    return output;
}
exports.flatten = flatten;
function unflatten(o) {
    if (Object.prototype.toString.call(o) !== '[object Object]')
        return o;
    var result = {};
    Object.keys(o).forEach(function (key) {
        var split = key.split(delimiter);
        var k1 = split.shift();
        var k2 = split[0];
        var receiver = result;
        while (k2 !== undefined) {
            var type = Object.prototype.toString.call(receiver[k1]);
            var isObject = (type === '[object Object]' ||
                type === '[object Array]');
            if (!isObject)
                receiver[k1] = {};
            receiver = receiver[k1];
            if (split.length > 0) {
                k1 = split.shift();
                k2 = split[0];
            }
        }
        receiver[k1] = unflatten(o[key]);
    });
    return result;
}
exports.unflatten = unflatten;
