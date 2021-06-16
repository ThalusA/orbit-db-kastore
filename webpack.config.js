'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: "production",
    entry: './src/KeyArrayStore.js',
    output: {
      library: {
        name: 'OrbitDBKAStore',
        type: 'var'
      },
      filename: 'orbitdb.kastore.min.js',
      path: path.resolve(__dirname, "dist")
    },
    target: 'web',
    devtool: 'source-map',
    node: false,
    resolve: {
      modules: ['node_modules'],
      fallback: {
        "util": require.resolve("util/"),
        "path": require.resolve("path-browserify")
      }
    }
  }