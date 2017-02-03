'use strict'

// -- Dependencies -------------------------------------------------------------

// Node.js API
const path = require('path')

// Node packaged modules
const confit = require('confit')

// Local modules
const SteamUser = require('steam-user')

// -- Public Interface ---------------------------------------------------------

/**
 * Steam chat bot wrapper for the Steam client. The wrapper only encapsulates
 * common functionality used for maintaining a chat bot; it does not listen or
 * respond to events received from the Steam network. Triggers and commands must
 * be added as plugins.
**/
class SteamBot {

  /**
   * Creates a bot wrapper for a new Steam client instance.
   *
   * @since 0.1.0
  **/
  constructor () {
    this._client = new SteamUser()
  }

  /**
   * Starts the bot by logging into its Steam account.
   *
   * @since 0.1.0
   * @param {Function} cb - Continuation function after logging in
   * @returns {void}
  **/
  start (cb) {
    confit(path.resolve('config/')).create((err, config) => {
      if (err) return cb(err)
      this._client.logOn(config.get('login'))
      this._client.on('loggedOn', response => {
        response.eresult !== SteamUser.EResult.OK
          ? cb(new Error('Login response: ' + response.eresult))
          : cb()
      });
    })
  }

  //
  // Private
  //

  /**
   * Steam client object.
   *
   * @private
   * @memberof SteamBot
   * @member {SteamClient} _client
  **/
}

// -- Exports ------------------------------------------------------------------

module.exports = SteamBot
