'use strict'

// -- Dependencies -------------------------------------------------------------

// Node.js API
const EventEmitter = require('events')

// -- Public Interface ---------------------------------------------------------

/**
 * SteamUser stub.
**/
class SteamUser extends EventEmitter {

  /**
   * SteamUser#logOn stub.
   *
   * @private
   * @param {Object} login - Login details
   * @returns {void}
  **/
  logOn (login) {
    process.nextTick(_ => {
      this.emit('loggedOn')
    })
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = SteamUser
