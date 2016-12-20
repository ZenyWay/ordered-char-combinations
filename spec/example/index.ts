/**
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
import newStrings from '../../src'
import { Seq } from 'immutable'
import debug = require('debug')
const log = debug('example')

const strings = Seq(newStrings([ 'abc', 'ABC', '012' ]))

const subset = strings.skip(15).take(5).toArray()
log('subset:', subset) // ['bC0', 'bC1', 'bC2', 'cA0', 'cA1']
