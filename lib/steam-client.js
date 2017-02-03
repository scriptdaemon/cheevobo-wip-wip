'use strict'

// -- Dependencies -------------------------------------------------------------

// Node packaged modules
const SteamUser = require('steam-user')

// -- Public Interface ---------------------------------------------------------

/**
 * Represents a Steam client. A client object maintains the connection to the
 * Steam network and handles the information sent and received through the
 * network.
**/
class SteamClient {

  /**
   * Creates a Steam object.
   *
   * @since 0.1.0
  **/
  constructor () {
    this._user = new SteamUser()
  }

  /**
   * Logs the bot into its Steam account.
   *
   * @since 0.1.0
   * @param {Object} login - Login details
   * @param {Function} cb - Continuation function after logging in
   * @returns {void}
  **/
  logIn (login, cb) {
    this._user.logOn(login);
    this._user.on('loggedOn', response => {
      response.eresult !== SteamUser.EResult.OK
        ? cb(new Error('Login response: ' + response.eresult))
        : cb()
    });
  }

  //
  // Private
  //

  /**
   * Steam user handler.
   *
   * @private
   * @memberof SteamClient
   * @member {SteamUser} _user
  **/
}

// -- Exports ------------------------------------------------------------------

module.exports = SteamClient
