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
   * @param {Function} cb - Continuation function
   * @returns {void}
  **/
  save (cb) {
    process.nextTick(_ => {
      cb()
    })
  }
}

// -- Exports ------------------------------------------------------------------

module.exports.Provider = Provider
