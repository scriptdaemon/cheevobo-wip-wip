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
   * @param {Function} func - Continuation function
   * @returns {void}
  **/
  joinChat (chatId, func) {
    process.nextTick(_ => {
      func(1)
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

  /**
   * SteamUser#addFriend stub.
   *
   * @private
   * @param {string} userId - User Steam ID
   * @param {Function} func - Continuation function
   * @returns {void}
  **/
  addFriend (userId, func) {
    process.nextTick(_ => {
      func()
    })
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = SteamUser
