(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";var src_1=require("../../src"),immutable_1=require("immutable"),debug=require("debug"),log=debug("example"),strings=immutable_1.Seq(src_1.default(["abc","ABC","012"])),subset=strings.skip(15).take(5).toArray();log("subset:",subset);
},{"../../src":2,"debug":undefined,"immutable":undefined}],2:[function(require,module,exports){
"use strict";function isArrayOfStrings(t){return Array.isArray(t)&&t.every(isString)}function isString(t){return"string"==typeof(t&&t.valueOf())}var tslib_1=require("tslib"),OrderedChars=function(){function t(t){this.alphabet=t,this.size=this.alphabet.length,this.index=-1}return t.prototype[Symbol.iterator]=function(){return new t(this.alphabet)},t.prototype.next=function(){return this.index++,this.has()?{done:!1,value:this.get()}:{done:!0,value:void 0}},t.prototype.get=function(){return this.alphabet[this.index]},t.prototype.has=function(){return this.index<this.alphabet.length},t}(),OrderedStrings=function(t){function e(r){var n=t.call(this,r[0])||this;return n.alphabets=r.slice(),n.substring=e.getInstance(r.slice(1)),n.size=n.alphabet.length*n.substring.size,n.index=0,n}return tslib_1.__extends(e,t),e.getInstance=function(t){if(!isArrayOfStrings(t))throw new TypeError("invalid argument");return t.length>1?new e(t):new OrderedChars(t[0])},e.prototype[Symbol.iterator]=function(){return new e(this.alphabets)},e.prototype.next=function(){var e=this.substring.next();if(!e.done)return{value:this.concat(e.value),done:!1};var r=t.prototype.next.call(this);return r.done?r:(this.substring=this.substring[Symbol.iterator](),this.next())},e.prototype.get=function(){return this.concat(this.substring.get())},e.prototype.concat=function(e){return t.prototype.get.call(this)+e},e}(OrderedChars),emptyIterator=[].keys(),newOrderedStrings=OrderedStrings.getInstance;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=newOrderedStrings;
},{"tslib":undefined}]},{},[1]);
