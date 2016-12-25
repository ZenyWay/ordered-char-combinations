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
import { Stream, from, fromPromise, throwError } from 'most'
//import { Observable } from 'rxjs/Observable'

export default combination$

function combination$ (alphabet$: Stream<string>|Iterable<string>): Stream<string> {
  const char$ = assertAlphabetStream(stream<string>(alphabet$), 'invalid argument')
  const char$$ = char$.map(alphabet => stream<string>(alphabet))
  const length = char$.constant(1).reduce(sum, 0)

  return unwrap(length.then(length => char$$.skip(1)
    .scan(combine, char$$.take(1).join())
    .slice(length - 1, void 0) // incorrect type definition requires two arguments
    .join()))
}

function combine (combination$: Stream<string>, char$: Stream<string>): Stream<string> {
  return combination$
  .flatMap(combination => char$.map(char => combination + char))
}

function sum (a: number, b: number): number {
  return a + b
}

function unwrap <T> (promise: Promise<Stream<T>>): Stream<T> {
  return fromPromise(promise).join()
}

function assertAlphabetStream (alphabet$: Stream<any>, error: string): Stream<string> {
  return unwrap(isValidAlphabetStream(alphabet$)
  .catch(() => false)
  .then(isValid => !isValid
  ? Promise.reject<Stream<string>>(new TypeError('invalid argument'))
  : alphabet$))
}

function isValidAlphabetStream (val: Stream<any>): Promise<boolean> {
  return val
  .reduce((assert, val) => assert && isValidAlphabet(val), true)
}

function isValidAlphabet (val: any): val is string|String {
  return isString(val) && !!val.length
}

function stream <T>(val: Iterable<T>|Stream<T>): Stream<T> {
  try {
    return from<T>(val)
  } catch (err) {
    return throwError(err)
  }
}

function isString (val: any): val is string|String {
  return typeof (val && val.valueOf()) === 'string'
}
