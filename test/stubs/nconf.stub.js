'use strict'

// -- Dependencies -------------------------------------------------------------

// Node packaged modules
const nconf = require('nconf')

// -- Public Interface ---------------------------------------------------------

/**
 * Provider stub.
**/
class Provider extends nconf.Provider {
  /**
   * Provider#save stub.
   *
   * @private
   * @param {Function} func - Continuation function
   * @returns {void}
  **/
  save (func) {
    process.nextTick(_ => {
      func()
    })
  }
}

// -- Exports ------------------------------------------------------------------

module.exports.Provider = Provider
