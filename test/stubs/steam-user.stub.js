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

  /**
   * SteamUser#logOff stub.
   *
   * @private
   * @returns {void}
  **/
  logOff () {
    process.nextTick(_ => {
      this.emit('disconnected')
    })
  }

  /**
   * SteamUser#joinChat stub.
   *
   * @private
   * @param {string} chatId - User or group chat Steam ID
   * @param {Function} cb - Continuation function
   * @returns {void}
  **/
  joinChat (chatId, cb) {
    process.nextTick(_ => {
      cb(1)
    })
  }

  /**
   * SteamUser#leaveChat stub.
   *
   * @private
   * @param {string} chatId - User or group chat Steam ID
   * @returns {void}
  **/
  leaveChat (chatId) {
    // Do nothing
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = SteamUser
