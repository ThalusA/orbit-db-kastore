# orbit-db-kastore

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/orbitdb/Lobby) [![Matrix](https://img.shields.io/badge/matrix-%23orbitdb%3Apermaweb.io-blue.svg)](https://riot.permaweb.io/#/room/#orbitdb:permaweb.io) [![npm version](https://badge.fury.io/js/orbit-db-kastore.svg)](https://badge.fury.io/js/orbit-db-kastore)

> Key-Array database for orbit-db

A key-array database just like your favourite key-array database.

Used in [ipfs-browser](https://github.com/ThalusA/ipfs-browser).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install

```bash
npm install orbit-db ipfs orbit-db-kastore
```

## Usage

First, create an instance of OrbitDB:

```javascript
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const KeyArrayStore = require('orbit-db-kastore')

const ipfs = new IPFS()
OrbitDB.addDatabaseType("keyarray", KeyArrayStore)
const orbitdb = await OrbitDB.createInstance(ipfs)
```

Get a key-array database and add one or multiple entry to it:

```javascript
const options = Object.assign({ type: "keyarray" }, { create: true, disableDelete: false }) // yes you can disable delete command by setting this to true (it is optional and false by default)
const ka = await orbitdb.open('settings', options)
ka.add('volume', '100')
  .then(() => {
    console.log(ka.get('volume'))
    // [100]
  })
// Or:
ka.add('volume', ['100', '200'])
  .then(() => {
    console.log(ka.get('volume'))
    // [100, 200]
  })
```

Later, when the database contains data, load the history and query when ready:

```javascript
const options = Object.assign({ type: "keyarray" }, {})
const ka = await orbitdb.open('settings', options)
ka.events.on('ready', () => {
  console.log(ka.get('volume'))
  // [100] or [100, 200]
})
```

## API

### orbitdb.open(name|address, Object.assign({ type: "keyarray" }, options))

> Creates and opens a keyarray database

Returns a `Promise` that resolves to a [`KeyArrayStore` instance](https://github.com/ThalusA/orbit-db-kastore).

```javascript
const options = Object.assign({ type: "keyarray" }, { create: true })
const db = await orbitdb.open('application.settings', options)
// Or:
const db = await orbitdb.open(anotherkadb.address, options)
```

Module: [orbit-db-kastore](https://github.com/ThalusA/orbit-db-kastore)

#### append(key, value|values)

Returns a `Promise` that resolves to a `String` that is the multihash of the entry.

  ```javascript
  await db.append('hello', { name: 'World' })
  // Or:
  await db.append('hello', [{ name: 'World' }])
  ```

#### values(key)

Returns an `Array` of `Object` with the contents of the entry.

  ```javascript
  const values = db.values('hello')
  // [{ name: 'World' }]
  ```

#### delete(key)

Deletes the `Array` of `Object` associated with `key`. Returns a `Promise` that resolves to a `String` that is the multihash of the deleted entry.

  ```javascript
  const hash = await db.delete('hello')
  // QmbYHhnXEdmdfUDzZKeEg7HyG2f8veaF2wBrYFcSHJ3mvd
  ```

#### all

Returns an `Object` with the contents of all entries in the index.

  ```javascript
  const value = db.all
  // { hello: [{ name: 'World' }] }
  ```

## Contributing

If you think this could be better, please [open an issue](https://github.com/ThalusA/orbit-db-kastore/issues/new)!

Please note that all interactions in [orbit-db-kastore](https://github.com/ThalusA/orbit-db-kastore) fall under our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) ©️ 2016-2018 Protocol Labs Inc., 2018 Haja Networks Oy
