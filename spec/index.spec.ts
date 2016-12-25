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
import combination$ from '../src'
import * as most from 'most'
import { __assign as assign } from 'tslib'

interface TestResult {
  value?: any
  error?: any
}

const result: TestResult = {}

const ALPHABETS = [ 'abc', 'ABC', '012' ]

const COMBINATIONS = [
  'aA0', 'aA1', 'aA2', 'aB0', 'aB1', 'aB2', 'aC0', 'aC1', 'aC2',
  'bA0', 'bA1', 'bA2', 'bB0', 'bB1', 'bB2', 'bC0', 'bC1', 'bC2',
  'cA0', 'cA1', 'cA2', 'cB0', 'cB1', 'cB2', 'cC0', 'cC1', 'cC2'
]

const ALPHABETS_ITERABLE = <Iterable<string> & Iterator<string>>{
  [Symbol.iterator] () {
    const iterator = Object.create(this)
    iterator.keys = ALPHABETS.keys()
    return iterator
  },
  next () {
    const next = this.keys.next()
    return {
      done: next.done,
      value: next.done ? undefined : this.alphabets[next.value]
    }
  },
  alphabets: ALPHABETS
}

function isString (val:any): val is String|string {
  return typeof (val && val.valueOf()) === 'string'
}

function toArray <T>(stream: most.Stream<T>): Promise<T[]> {
  return stream.reduce((arr: T[], val: T) => arr.push(val) && arr, [])
}

beforeEach (() => {
  delete result.value
  delete result.error
})

describe('combination$ (alphabets: Iterable<string>|Stream<string>): Stream<string>', () => {
  describe('when given an Iterable or Stream of strings', () => {
    beforeEach((done) => {
      const combination$$ = most.from([
        ALPHABETS,
        ALPHABETS_ITERABLE,
        most.from<string>(ALPHABETS)
      ])
      .map(combination$)
      .flatMap(result$ => most.fromPromise(toArray(result$)))

      toArray(combination$$)
      .then(arr => result.value = arr)
      .catch(err => result.error = err)
      .then(() => setTimeout(done))
    })
    it('returns a Stream<string> instance with the ordered combinations ' +
    'of characters from each alphabet in the given sequence', () => {
      expect(result.value).toEqual([ COMBINATIONS, COMBINATIONS, COMBINATIONS ])
      expect(result.error).toBeUndefined()
    })
  })

  describe('when not given any argument', () => {
    beforeEach((done) => {
      toArray((<any>combination$)())
      .then((arr: any[]) => result.value = arr)
      .catch((err: any) => result.error = err)
      .then(() => setTimeout(done))
    })
    it('throws an "invalid argument" TypeError', () => {
      expect(result.value).toBeUndefined()
      expect(result.error).toEqual(jasmine.any(TypeError))
      expect(result.error.message).toBe('invalid argument')
    })
  })

  describe('when given anything else than an Iterable or Stream of strings', () => {
    beforeEach((done) => {
      const combination$$ = most.from([
        null, undefined, true, 42, /* 'foo', this is an Iterable<string> ! */
        () => {}, [ 42, 'foo' ], { foo: 'foo' }
      ].map(<any>combination$))

      toArray(combination$$
      .flatMap((val$: most.Stream<any>) => val$
        .recoverWith((err: any) => most.of(err))))
      .then(arr => result.error = arr)
      .then(() => setTimeout(done))
    })
    it('throws an "invalid argument" TypeError', () => {
      expect(result.error.length).toBe(7)
      result.error.forEach((err: any) => {
        expect(err).toEqual(jasmine.any(TypeError))
        expect(err.message).toBe('invalid argument')
      })
    })
  })
})
