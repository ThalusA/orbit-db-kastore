'use strict'

const Store = require('orbit-db-store')
const KeyArrayIndex = require('./KeyArrayIndex')

class KeyArrayStore extends Store {
  constructor(ipfs, id, dbname, options) {
    const newOptions = Object.assign({}, options, { disableDelete: false })
    let opts = Object.assign({}, { Index: KeyArrayIndex }, newOptions)
    Object.assign(opts, newOptions)
    super(ipfs, id, dbname, opts)
    this._type = 'keyarray'
    this._index.updateOption(newOptions)
  }

  get all () {
    return this._index._index
  }

  values (key) {
    return this._index.get(key)
  }

  append (key, data, options = {}) {
    return this._addOperation({
      op: 'ADD',
      key: key,
      value: data
    }, options)
  }

  delete (key, options = {}) {
    if (this.disableDelete === true)
      throw new Error('Delete command is disabled.');
    return this._addOperation({
      op: 'DEL',
      key: key,
      value: null
    }, options)
  }
}

module.exports = KeyArrayStore
