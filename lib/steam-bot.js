'use strict'

// -- Dependencies -------------------------------------------------------------

// Node packaged modules
const SteamClient = require('steam-client')

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
    this._client = new SteamClient.CMClient()
  }

  /**
   * Starts the bot by connecting the client to the Steam network.
   *
   * @since 0.1.0
   * @param {Function} callback - Continuation function after connecting
   * @returns {void}
  **/
  start (callback) {
    this._client.connect()
    this._client.on('connected', callback)
  }

  //
  // Private
  //

  /**
   * Steam client object.
   *
   * @private
   * @memberof SteamBot
   * @member {SteamClient.CMClient} _client
  **/
}

// -- Exports ------------------------------------------------------------------

module.exports = SteamBot
