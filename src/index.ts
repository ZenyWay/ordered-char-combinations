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
export interface OrderedCharCombinationsFactory {
  (alphabets: string[]): OrderedCharCombinations
}

export interface OrderedCharCombinations extends Iterable<string>, Iterator<string> {
  [Symbol.iterator] (): OrderedCharCombinations
  next (): IteratorResult<string>
  has (): boolean
  get (): string
  readonly index: number
  readonly size: number
}

class OrderedChars implements OrderedCharCombinations {
	[Symbol.iterator] (): OrderedCharCombinations {
	  return new OrderedChars(this.alphabet)
  }

	next (): IteratorResult<string> {
    if (!this.has()) {
      return { done: true, value: undefined }
    }
    this._index++
    return { done: false, value: this.get() }
  }

  get (): string {
  	return this.alphabet[this._index] // undefined if index out of range
  }

  has (): boolean {
  	return this._index < this.size - 1
  }

  get index (): number {
    return this._index
  }

	constructor (alphabet: string) {
    this.alphabet = alphabet
    this.size = this.alphabet.length
    this._index = -1
  }

  public readonly size: number
  private alphabet: string
  private _index: number
}

class OrderedStrings implements OrderedCharCombinations {
	static getInstance (alphabets: string[]): OrderedCharCombinations {
    if (!isArrayOfStrings(alphabets)) { throw new TypeError('invalid argument') }
  	return alphabets.length > 1 ? new OrderedStrings(alphabets) : new OrderedChars(alphabets[0])
  }

	[Symbol.iterator] (): OrderedCharCombinations {
	  return new OrderedStrings(this.alphabets)
  }

	next (): IteratorResult<string> {
  	const substring = this.substrings.next()
    if (!substring.done) {
      if (this.chars.index < 0) { this.chars.next() }
      return { value: this.concat(substring.value), done: false }
    }
    const char = this.chars.next()
    if (char.done) { return char }
    this.substrings = this.substrings[Symbol.iterator]()
    return this.next()
  }

  has (): boolean {
    return this.substrings.has() || this.chars.has()
  }

  get index (): number {
    return this.chars.index * this.substrings.size + this.substrings.index
  }

  get (): string {
    const substring = this.substrings.get()
    return substring && this.concat(substring)
  }

	private constructor (alphabets: string[]) {
  	this.chars = new OrderedChars(alphabets[0])
    this.alphabets = alphabets.slice()
    this.substrings = OrderedStrings.getInstance(alphabets.slice(1))
    this.size = this.alphabets[0].length * this.substrings.size
  }

  private concat (substring: string) {
  	return this.chars.get() + substring
  }

  public size: number
  private alphabets: string[]
  private chars: OrderedChars
  private substrings: OrderedCharCombinations
}

const emptyIterator = [ ].keys()

function isArrayOfStrings (val: any): val is (string|String)[] {
  return Array.isArray(val) && val.length && val.every(isString)
}

function isString (val: any): val is string|String {
  return typeof (val && val.valueOf()) === 'string'
}

const newOrderedStrings: OrderedCharCombinationsFactory = OrderedStrings.getInstance
export default newOrderedStrings