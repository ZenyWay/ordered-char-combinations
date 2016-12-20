# ordered-char-combinations [![Join the chat at https://gitter.im/ZenyWay/ordered-char-combinations](https://badges.gitter.im/ZenyWay/ordered-char-combinations.svg)](https://gitter.im/ZenyWay/ordered-char-combinations?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM](https://nodei.co/npm/ordered-char-combinations.png?compact=true)](https://nodei.co/npm/ordered-char-combinations/)
[![build status](https://travis-ci.org/ZenyWay/ordered-char-combinations.svg?branch=master)](https://travis-ci.org/ZenyWay/ordered-char-combinations)
[![coverage status](https://coveralls.io/repos/github/ZenyWay/ordered-char-combinations/badge.svg?branch=master)](https://coveralls.io/github/ZenyWay/ordered-char-combinations)
[![Dependency Status](https://gemnasium.com/badges/github.com/ZenyWay/ordered-char-combinations.svg)](https://gemnasium.com/github.com/ZenyWay/ordered-char-combinations)

iterable over ordered character combinations from a list of alphabets.

# <a name="example"></a> example
a live version of this example can be viewed [here](https://cdn.rawgit.com/ZenyWay/ordered-char-combinations/v1.0.0/spec/example/index.html)
in the browser console,
or by cloning this repository and running the following commands from a terminal:
```bash
npm install
npm run example
```
the files of this example are available [here](./spec/example).

```ts
import newStrings from 'ordered-char-combinations'
import { Seq } from 'immutable'
import debug = require('debug')
const log = debug('example')

const strings = Seq(newStrings([ 'abc', 'ABC', '012' ]))
const subset = strings.skip(15).take(5).toArray()
log('subset:', subset) // ['bC0', 'bC1', 'bC2', 'cA0', 'cA1']
```

# <a name="api"></a> API v0.0.1 experimental
`ES5` and [`Typescript`](http://www.typescriptlang.org/) compatible.
Coded in `Typescript 2`.

for a detailed specification of the API,
run the [unit tests](https://cdn.rawgit.com/ZenyWay/ordered-char-combinations/v1.0.0/spec/web/index.html)
in your browser.

# <a name="contributing"></a> CONTRIBUTING
see the [contribution guidelines](./CONTRIBUTING.md)

# <a name="license"></a> LICENSE
Copyright 2016 Stéphane M. Catala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the [License](./LICENSE) for the specific language governing permissions and
Limitations under the License.
