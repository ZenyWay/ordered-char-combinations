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
  get (): string
  has (): boolean
  size: number
}

class OrderedChars implements OrderedCharCombinations {
	[Symbol.iterator] (): OrderedCharCombinations {
	  return new OrderedChars(this.alphabet)
  }

	next (): IteratorResult<string> {
  	this.index++
    return this.has()
    ? { done: false, value: this.get() }
    : { done: true, value: undefined }
  }

  get (): string {
  	return this.alphabet[this.index]
  }

  has (): boolean {
  	return this.index < this.alphabet.length
  }

	protected constructor (alphabet: string) {
    this.alphabet = alphabet
    this.size = this.alphabet.length
    this.index = -1
  }

  public size: number
  protected alphabet: string
  protected index: number
}

class OrderedStrings extends OrderedChars implements OrderedCharCombinations {
	static getInstance (alphabets: string[]): OrderedCharCombinations {
    if (!isArrayOfStrings(alphabets)) { throw new TypeError('invalid argument') }
  	return alphabets.length > 1 ? new OrderedStrings(alphabets) : new OrderedChars(alphabets[0])
  }

	[Symbol.iterator] (): OrderedCharCombinations {
	  return new OrderedStrings(this.alphabets)
  }

	next (): IteratorResult<string> {
  	const substring = this.substring.next()
    if (!substring.done) {
      return { value: this.concat(substring.value), done: false }
    }
    const char = super.next()
    if (char.done) { return char }
    this.substring = this.substring[Symbol.iterator]()
    return this.next()
  }

  get (): string {
  	return this.concat(this.substring.get())
  }

	private constructor (alphabets: string[]) {
  	super(alphabets[0])
    this.alphabets = alphabets.slice()
    this.substring = OrderedStrings.getInstance(alphabets.slice(1))
    this.size = this.alphabet.length * this.substring.size
    this.index = 0
  }

  private concat (substring: string) {
  	return super.get() + substring
  }

  public size: number
  private alphabets: string[]
  private substring: OrderedCharCombinations
}

const emptyIterator = [ ].keys()

function isArrayOfStrings (val: any): val is (string|String)[] {
  return Array.isArray(val) && val.every(isString)
}

function isString (val: any): val is string|String {
  return typeof (val && val.valueOf()) === 'string'
}

const newOrderedStrings: OrderedCharCombinationsFactory = OrderedStrings.getInstance
export default newOrderedStrings