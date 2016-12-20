(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
;
var src_1 = require("../src");
var tslib_1 = require("tslib");
var result = {};
var ALPHANUM = '0123456789abcdefghijklmnopqrstuvwxyz';
var ORDERED_CHAR_COMBINATIONS = jasmine.objectContaining((_a = {},
    _a[Symbol.iterator] = jasmine.any(Function),
    _a.next = jasmine.any(Function),
    _a.get = jasmine.any(Function),
    _a.has = jasmine.any(Function),
    _a.size = jasmine.any(Number),
    _a));
beforeEach(function () {
    delete result.value;
    delete result.error;
});
describe('newOrderedStrings(alphabets: string[]): OrderedCharCombinations', function () {
    describe('when given an array of strings', function () {
        beforeEach(function () {
            try {
                result.value = src_1.default([ALPHANUM]);
            }
            catch (err) {
                result.error = err;
            }
        });
        it('returns an OrderedCharCombinations instance', function () {
            expect(result.value).toEqual(ORDERED_CHAR_COMBINATIONS);
            expect(result.error).toBeUndefined();
        });
    });
    describe('when not given any argument', function () {
        beforeEach(function () {
            try {
                result.value = src_1.default();
            }
            catch (err) {
                result.error = err;
            }
        });
        it('throws an "invalid argument" TypeError', function () {
            expect(result.value).toBeUndefined();
            expect(result.error).toEqual(jasmine.any(TypeError));
            expect(result.error.message).toBe('invalid argument');
        });
    });
    describe('when given anything else than an array of strings', function () {
        beforeEach(function () {
            var types = [
                null, undefined, true, 42, 'foo', function () { }, [42], { foo: 'foo' }
            ];
            tslib_1.__assign(result, types.reduce(function (result, arg) {
                try {
                    result.value.push(src_1.default(arg));
                }
                catch (err) {
                    result.error.push(err);
                }
                return result;
            }, { value: [], error: [] }));
        });
        it('throws an "invalid argument" TypeError', function () {
            expect(result.value.length).toBe(0);
            expect(result.error.length).not.toBe(0);
            result.error.forEach(function (err) {
                expect(err).toEqual(jasmine.any(TypeError));
                expect(err.message).toBe('invalid argument');
            });
        });
    });
});
describe('OderedCharCombinations', function () {
    describe('[Symbol.iterator](): OderedCharCombinations', function () {
        var strings;
        beforeEach(function () {
            try {
                strings = src_1.default(['abc', 'def']);
                result.value = strings[Symbol.iterator]();
            }
            catch (err) {
                result.error = err;
            }
        });
        it('returns a new OderedCharCombinations', function () {
            expect(result.value).toEqual(ORDERED_CHAR_COMBINATIONS);
            expect(result.value).not.toBe(strings);
            expect(result.error).toBeUndefined();
        });
    });
    describe('next()', function () {
        describe('when called until and past the last element', function () {
            var combinations;
            beforeEach(function () {
                combinations = [
                    'adg', 'adh', 'adi', 'aeg', 'aeh', 'aei', 'afg', 'afh', 'afi',
                    'bdg', 'bdh', 'bdi', 'beg', 'beh', 'bei', 'bfg', 'bfh', 'bfi',
                    'cdg', 'cdh', 'cdi', 'ceg', 'ceh', 'cei', 'cfg', 'cfh', 'cfi',
                    undefined
                ].map(function (value) { return ({ value: value, done: typeof value === 'undefined' }); });
                try {
                    var strings_1 = src_1.default(['abc', 'def', 'ghi']);
                    result.value = combinations.map(function (val) { return strings_1.next(); });
                }
                catch (err) {
                    result.error = err;
                }
            });
            it('returns iterator result objects of the ordered string combinations ' +
                'of all characters from all alphabet strings concatenated ' +
                'from the first to the last alphabet string, ' +
                'followed by an iteration termination object', function () {
                expect(result.value).toEqual(combinations);
                expect(result.error).toBeUndefined();
            });
        });
    });
    describe('size: number', function () {
        beforeEach(function () {
            try {
                result.value = src_1.default(['abc', 'def', 'ghi']);
            }
            catch (err) {
                result.error = err;
            }
        });
        it('indicates the total number of combinations in the Iterable', function () {
            expect(result.value.size).toBe(27);
            expect(result.error).toBeUndefined();
        });
    });
});
var _a;

},{"../src":2,"tslib":undefined}],2:[function(require,module,exports){
"use strict";
var tslib_1 = require("tslib");
;
var OrderedChars = (function () {
    function OrderedChars(alphabet) {
        this.alphabet = alphabet;
        this.size = this.alphabet.length;
        this.index = -1;
    }
    OrderedChars.prototype[Symbol.iterator] = function () {
        return new OrderedChars(this.alphabet);
    };
    OrderedChars.prototype.next = function () {
        this.index++;
        return this.has()
            ? { done: false, value: this.get() }
            : { done: true, value: undefined };
    };
    OrderedChars.prototype.get = function () {
        return this.alphabet[this.index];
    };
    OrderedChars.prototype.has = function () {
        return this.index < this.alphabet.length;
    };
    return OrderedChars;
}());
var OrderedStrings = (function (_super) {
    tslib_1.__extends(OrderedStrings, _super);
    function OrderedStrings(alphabets) {
        var _this = _super.call(this, alphabets[0]) || this;
        _this.alphabets = alphabets.slice();
        _this.substring = OrderedStrings.getInstance(alphabets.slice(1));
        _this.size = _this.alphabet.length * _this.substring.size;
        _this.index = 0;
        return _this;
    }
    OrderedStrings.getInstance = function (alphabets) {
        if (!isArrayOfStrings(alphabets)) {
            throw new TypeError('invalid argument');
        }
        return alphabets.length > 1 ? new OrderedStrings(alphabets) : new OrderedChars(alphabets[0]);
    };
    OrderedStrings.prototype[Symbol.iterator] = function () {
        return new OrderedStrings(this.alphabets);
    };
    OrderedStrings.prototype.next = function () {
        var substring = this.substring.next();
        if (!substring.done) {
            return { value: this.concat(substring.value), done: false };
        }
        var char = _super.prototype.next.call(this);
        if (char.done) {
            return char;
        }
        this.substring = this.substring[Symbol.iterator]();
        return this.next();
    };
    OrderedStrings.prototype.get = function () {
        return this.concat(this.substring.get());
    };
    OrderedStrings.prototype.concat = function (substring) {
        return _super.prototype.get.call(this) + substring;
    };
    return OrderedStrings;
}(OrderedChars));
var emptyIterator = [].keys();
function isArrayOfStrings(val) {
    return Array.isArray(val) && val.every(isString);
}
function isString(val) {
    return typeof (val && val.valueOf()) === 'string';
}
var newOrderedStrings = OrderedStrings.getInstance;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = newOrderedStrings;

},{"tslib":undefined}]},{},[1]);
