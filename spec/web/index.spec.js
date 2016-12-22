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
    _a.index = jasmine.any(Number),
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
    describe('next(): IteratorResult<string>', function () {
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
            it('returns IteratorResult instances of the ordered string combinations ' +
                'of all characters from all alphabet strings concatenated ' +
                'from the first to the last alphabet string, ' +
                'followed by a termination IteratorResult instance', function () {
                expect(result.value).toEqual(combinations);
                expect(result.error).toBeUndefined();
            });
        });
    });
    describe('skip (steps: number): number', function () {
        var strings;
        beforeEach(function () {
            strings = src_1.default(['abc', 'def', 'ghi']);
        });
        describe('when called with a number of steps ' +
            'within the remaining iteration range', function () {
            beforeEach(function () {
                try {
                    result.value = [3, 1, 9, 12, 2].map(function (steps) {
                        var skip = strings.skip(steps);
                        return { skip: skip, value: strings.get() };
                    });
                }
                catch (err) {
                    result.error = err;
                }
            });
            it('forwards the iterator by the given number of iteration steps', function () {
                expect(result.value).toEqual(['adi', 'aeg', 'beg', 'cfg', 'cfi']
                    .map(function (value) { return jasmine.objectContaining({ value: value }); }));
            });
            it('returns the given number of steps', function () {
                expect(result.value).toEqual([3, 1, 9, 12, 2]
                    .map(function (steps) { return jasmine.objectContaining({ skip: steps }); }));
                expect(result.error).toBeUndefined();
            });
        });
        describe('when called with a number of steps ' +
            'beyond the remaining iteration range', function () {
            beforeEach(function () {
                strings.next();
                strings.next();
                try {
                    result.value = strings.skip(27);
                }
                catch (err) {
                    result.error = err;
                }
            });
            it('forwards the iterator to the end of its iteration range', function () {
                expect(strings.has()).toBe(false);
            });
            it('returns the number of steps to the end of the iteration range', function () {
                expect(result.value).toBe(25);
                expect(result.error).toBeUndefined();
            });
        });
    });
    describe('get (): string', function () {
        var strings;
        beforeEach(function () {
            strings = src_1.default(['abc', 'def', 'ghi']);
        });
        describe('when called before any calls to next()', function () {
            beforeEach(function () {
                try {
                    result.value = strings.get();
                }
                catch (err) {
                    result.error = err;
                }
            });
            it('returns `undefined`', function () {
                expect(result.value).toBe(undefined);
                expect(result.error).toBeUndefined();
            });
        });
        describe('when called after any calls to next()', function () {
            beforeEach(function () {
                try {
                    strings.next();
                    strings.next();
                    result.value = strings.get();
                }
                catch (err) {
                    result.error = err;
                }
            });
            it('returns the current value of the OrderedCharCombinations', function () {
                expect(result.value).toBe('adh');
                expect(result.error).toBeUndefined();
            });
        });
    });
    describe('has (): boolean', function () {
        var strings;
        beforeEach(function () {
            strings = src_1.default(['abc', 'def', 'ghi']);
        });
        describe('when called before the last element', function () {
            beforeEach(function () {
                try {
                    result.value = Array.from(strings).slice(0, -1)
                        .every(function (string) { return strings.next() && strings.has(); });
                }
                catch (err) {
                    result.error = err;
                }
            });
            it('returns `true`', function () {
                expect(result.value).toBe(true);
                expect(result.error).toBeUndefined();
            });
        });
        describe('when called after iterating through all elements', function () {
            beforeEach(function () {
                try {
                    Array.from(strings)
                        .forEach(function (string) { return strings.next(); });
                    result.value = strings.has();
                }
                catch (err) {
                    result.error = err;
                }
            });
            it('returns `false`', function () {
                expect(result.value).toBe(false);
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
;
var OrderedChars = (function () {
    function OrderedChars(alphabet) {
        this.alphabet = alphabet;
        this.size = this.alphabet.length;
        this._index = -1;
    }
    OrderedChars.prototype[Symbol.iterator] = function () {
        return new OrderedChars(this.alphabet);
    };
    OrderedChars.prototype.next = function () {
        if (!this.has()) {
            return { done: true, value: undefined };
        }
        this._index++;
        return { done: false, value: this.get() };
    };
    OrderedChars.prototype.skip = function (steps) {
        if (!(steps > 0)) {
            return 0;
        }
        if (steps === 1) {
            return this.next().done ? 0 : 1;
        }
        var rest = this.size - this._index - 1;
        var skip = steps < rest ? steps : rest;
        this._index += skip;
        return skip;
    };
    OrderedChars.prototype.get = function () {
        return this.alphabet[this._index];
    };
    OrderedChars.prototype.has = function () {
        return this._index < this.size - 1;
    };
    Object.defineProperty(OrderedChars.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    return OrderedChars;
}());
var OrderedStrings = (function () {
    function OrderedStrings(alphabets) {
        this.chars = new OrderedChars(alphabets[0]);
        this.alphabets = alphabets.slice();
        this.substrings = OrderedStrings.getInstance(alphabets.slice(1));
        this.size = this.alphabets[0].length * this.substrings.size;
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
        var substring = this.substrings.next();
        if (!substring.done) {
            if (this.chars.index < 0) {
                this.chars.next();
            }
            return { value: this.concat(substring.value), done: false };
        }
        var char = this.chars.next();
        if (char.done) {
            return char;
        }
        this.substrings = this.substrings[Symbol.iterator]();
        return this.next();
    };
    OrderedStrings.prototype.skip = function (steps) {
        if (!(steps > 0)) {
            return 0;
        }
        if (steps >= this.size) {
            return this.chars.skip(steps) * this.substrings.size
                + this.substrings.skip(steps);
        }
        var init = +(this.chars.index < 0);
        if (init) {
            this.next();
        }
        var subskip = (steps - init) % this.substrings.size;
        var subrest = subskip - this.substrings.skip(subskip);
        var skip = (steps - init - subskip) / this.substrings.size + +(!!subrest);
        var rest = skip - this.chars.skip(skip);
        if (!rest && subrest) {
            this.substrings = this.substrings[Symbol.iterator]();
            this.substrings.skip(subrest);
            return steps;
        }
        return steps - rest * this.substrings.size - subrest;
    };
    OrderedStrings.prototype.has = function () {
        return this.substrings.has() || this.chars.has();
    };
    Object.defineProperty(OrderedStrings.prototype, "index", {
        get: function () {
            return this.chars.index * this.substrings.size + this.substrings.index;
        },
        enumerable: true,
        configurable: true
    });
    OrderedStrings.prototype.get = function () {
        var substring = this.substrings.get();
        return substring && this.concat(substring);
    };
    OrderedStrings.prototype.concat = function (substring) {
        return this.chars.get() + substring;
    };
    return OrderedStrings;
}());
var emptyIterator = [].keys();
function isArrayOfStrings(val) {
    return Array.isArray(val) && val.length && val.every(isString);
}
function isString(val) {
    return typeof (val && val.valueOf()) === 'string';
}
var newOrderedStrings = OrderedStrings.getInstance;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = newOrderedStrings;

},{}]},{},[1]);
