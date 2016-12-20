/*
 * Copyright 2016 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
;
import newOrderedStrings from '../src'
import { __assign as assign } from 'tslib'

interface TestResult {
  value?: any
  error?: any
}

const result: TestResult = {}

const ALPHANUM = '0123456789abcdefghijklmnopqrstuvwxyz'

const ORDERED_CHAR_COMBINATIONS = jasmine.objectContaining({
  [Symbol.iterator]: jasmine.any(Function),
  next: jasmine.any(Function),
  get: jasmine.any(Function),
  has: jasmine.any(Function),
  size: jasmine.any(Number)
})

beforeEach (() => {
  delete result.value
  delete result.error
})

describe('newOrderedStrings(alphabets: string[]): OrderedCharCombinations', () => {
  describe('when given an array of strings', () => {
    beforeEach(() => {
      try {
        result.value = newOrderedStrings([ ALPHANUM ])
      } catch (err) {
        result.error = err
      }
    })
    it('returns an OrderedCharCombinations instance', () => {
      expect(result.value).toEqual(ORDERED_CHAR_COMBINATIONS)
      expect(result.error).toBeUndefined()
    })
  })

  describe('when not given any argument', () => {
    beforeEach(() => {
      try {
        result.value = (<any>newOrderedStrings)()
      } catch (err) {
        result.error = err
      }
    })
    it('throws an "invalid argument" TypeError', () => {
      expect(result.value).toBeUndefined()
      expect(result.error).toEqual(jasmine.any(TypeError))
      expect(result.error.message).toBe('invalid argument')
    })
  })

  describe('when given anything else than an array of strings', () => {
    beforeEach(() => {
      const types = [
        null, undefined, true, 42, 'foo', () => {}, [ 42 ], { foo: 'foo' }
      ]
      assign(result, types.reduce((result: TestResult, arg: any) => {
        try {
          result.value.push((<any>newOrderedStrings)(arg))
        } catch (err) {
          result.error.push(err)
        }
        return result
      }, { value: [], error: [] }))
    })
    it('throws an "invalid argument" TypeError', () => {
      expect(result.value.length).toBe(0)
      expect(result.error.length).not.toBe(0)
      result.error.forEach((err: any) => {
        expect(err).toEqual(jasmine.any(TypeError))
        expect(err.message).toBe('invalid argument')
      })
    })
  })
})

describe('OderedCharCombinations', () => {
  describe('[Symbol.iterator](): OderedCharCombinations', () => {
    let strings: any
    beforeEach(() => {
      try {
        strings = newOrderedStrings([ 'abc', 'def' ])
        result.value = strings[Symbol.iterator]()
      } catch (err) {
        result.error = err
      }
    })
    it('returns a new OderedCharCombinations', () => {
      expect(result.value).toEqual(ORDERED_CHAR_COMBINATIONS)
      expect(result.value).not.toBe(strings)
      expect(result.error).toBeUndefined()
    })
  })

  describe('next()', () => {
    describe('when called until and past the last element', () => {
      let combinations: any
      beforeEach(() => {
        combinations = [
          'adg', 'adh', 'adi', 'aeg', 'aeh', 'aei', 'afg', 'afh', 'afi',
          'bdg', 'bdh', 'bdi', 'beg', 'beh', 'bei', 'bfg', 'bfh', 'bfi',
          'cdg', 'cdh', 'cdi', 'ceg', 'ceh', 'cei', 'cfg', 'cfh', 'cfi',
          undefined
        ].map(value => ({ value: value, done: typeof value === 'undefined' }))
        try {
          const strings = newOrderedStrings([ 'abc', 'def', 'ghi' ])
          result.value = combinations.map((val: any) => strings.next())
        } catch (err) {
          result.error = err
        }
      })
      it('returns iterator result objects of the ordered string combinations ' +
      'of all characters from all alphabet strings concatenated ' +
      'from the first to the last alphabet string, ' +
      'followed by an iteration termination object', () => {
        expect(result.value).toEqual(combinations)
        expect(result.error).toBeUndefined()
      })
    })
  })

  describe('size: number', () => {
    beforeEach(() => {
      try {
        result.value = newOrderedStrings([ 'abc', 'def', 'ghi' ])
      } catch (err) {
        result.error = err
      }
    })
    it('indicates the total number of combinations in the Iterable', () => {
      expect(result.value.size).toBe(27)
      expect(result.error).toBeUndefined()
    })
  })
})