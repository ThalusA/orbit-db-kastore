'use strict'

class KeyArrayIndex {
  constructor() {
    this._index = {}
    this._options = { disableDelete: false }
  }

  get(key) {
    return this._index[key]
  }

  updateOption(options) {
    Object.assign(this._options, options)
  }

  updateIndex(oplog) {
    oplog.values
      .slice()
      .reverse()
      .reduce((handled, item) => {
        if(!handled.includes(item.payload.key)) {
          handled.push(item.payload.key)
          if(item.payload.op === 'ADD') {
            if(!(item.payload.key in this._index))
              this._index[item.payload.key] = []
            if(Array.isArray(item.payload.value))
              this._index[item.payload.key] = this._index[item.payload.key].concat(item.payload.value)
            else
              this._index[item.payload.key].push(item.payload.value)
          } else if(item.payload.op === 'DEL') {
            if (this._options.disableDelete === false)
              delete this._index[item.payload.key]
          }
        }
        return handled
      }, [])
  }
}

module.exports = KeyArrayIndex
