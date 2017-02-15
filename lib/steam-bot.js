'use strict'

// -- Dependencies -------------------------------------------------------------

// Node.js API
const path = require('path')

// Node packaged modules
const lodash = require('lodash')
const nconf = require('nconf')
const SteamUser = require('steam-user')
const yargs = require('yargs/yargs')

// Local modules
const defaults = require('../config/defaults')

// -- Public Interface ---------------------------------------------------------

/**
 * Steam chat bot wrapper for the Steam client. The wrapper only encapsulates
 * common functionality used for maintaining a chat bot; it does not listen or
 * respond to events received from the Steam network. Triggers and commands must
 * be added as plugins.
**/
class SteamBot {

  /**
   * Create a bot wrapper for a new Steam client instance.
   *
   * @since 0.1.0
   * @param {string} config - Configuration file
  **/
  constructor (config) {
    this._store = new nconf.Provider()
    this._store.file(config)
    this._store.defaults(defaults)

    this._client = new SteamUser()
    this._client.on('friendOrChatMessage', (sender, msg, room) => {
      this.exec(msg, { sender, room })
    })
  }

  /**
   * Start the bot by connecting to the Steam network and logging into the bot's
   * Steam account.
   *
   * @since 0.1.0
   * @param {Function} cb - Continuation function after logging in
   * @returns {void}
  **/
  start (cb) {
    this._store.load((err, data) => {
      if (err) return cb(err)

      this._parser = yargs()
      this._parser.command({
        'command': data.cmd,
        'builder': yargs => {
          const cmds = path.join(__dirname, 'plugins/cmds/')
          yargs.commandDir(cmds, { 'visit': cmd => cmd(this) })
          // yargs.help()
          // yargs.version()
          yargs.wrap() // Disable right-align
          yargs.strict()
        }
      })

      this._client.logOn(data.login)
      this._client.once('loggedOn', (response, parental) => {
        this._client.setPersona(SteamUser.EPersonaState.Online)
        cb()
      })
    })
  }

  /**
   * Stop the bot by logging out and closing the connection.
   *
   * @since 0.1.0
   * @param {Function} cb - Continuation function after disconnecting
   * @returns {void}
  **/
  stop (cb) {
    this._client.logOff()
    this._client.once('disconnected', (eresult, msg) => {
      eresult === SteamUser.EResult.Invalid
        ? cb(new Error(msg))
        : cb()
    })
  }

  /**
   * Execute a command.
   *
   * @since 0.1.0
   * @param {string} cmd - Raw command
   * @param {Object} context - Message context information
   * @returns {void}
  **/
  exec (cmd, context) {
    this._parser.parse(cmd, context, (err, argv, output) => {
      if (err && !output) throw err
      if (output) {
        this._client.chatMsg(context.room, output)
      }
    })
  }

  /**
   * Check if whitelist includes Steam ID.
   *
   * @since 0.1.0
   * @param {string} steamId - Steam ID
   * @returns {boolean} True if whitelist includes Steam ID, else false
  **/
  whitelisted (steamId) {
    return lodash.includes(this._store.get('whitelist'), steamId)
  }

  /**
   * Whitelist a Steam ID.
   *
   * @since 0.1.0
   * @param {string} steamId - Steam ID
   * @param {Function} cb - Continuation function after saving whitelist
   * @returns {void}
  **/
  whitelist (steamId, cb) {
    this._list('whitelist', steamId, cb)
  }

  /**
   * Unwhitelist a Steam ID.
   *
   * @since 0.1.0
   * @param {string} steamId - Steam ID
   * @param {Function} cb - Continuation function after saving whitelist
   * @returns {void}
  **/
  unwhitelist (steamId, cb) {
    this._unlist('whitelist', steamId, cb)
  }

  /**
   * Check if blacklist includes Steam ID.
   *
   * @since 0.1.0
   * @param {string} steamId - Steam ID
   * @returns {boolean} True if blacklist includes Steam ID, else false
  **/
  blacklisted (steamId) {
    return lodash.includes(this._store.get('blacklist'), steamId)
  }

  /**
   * Blacklist a Steam ID.
   *
   * @since 0.1.0
   * @param {string} steamId - Steam ID
   * @param {Function} cb - Continuation function after saving blacklist
   * @returns {void}
  **/
  blacklist (steamId, cb) {
    this._list('blacklist', steamId, cb)
  }

  /**
   * Unblacklist a Steam ID.
   *
   * @since 0.1.0
   * @param {string} steamId - Steam ID
   * @param {Function} cb - Continuation function after saving blacklist
   * @returns {void}
  **/
  unblacklist (steamId, cb) {
    this._unlist('blacklist', steamId, cb)
  }

  //
  // Private
  //

  /**
   * Steam client.
   *
   * @private
   * @memberof SteamBot
   * @member {SteamUser} _client
  **/

  /**
   * Command parser.
   *
   * @private
   * @memberof SteamBot
   * @member {Yargs} _parser
  **/

  /**
   * Configuration store.
   *
   * @private
   * @memberof SteamBot
   * @member {File} _store
  **/

  /**
   * Add Steam ID to permissions list.
   *
   * @private
   * @param {string} name - Permissions list name
   * @param {string} steamId - Steam ID
   * @param {Function} cb - Continuation function after saving permissions list
   * @returns {void}
  **/
  _list (name, steamId, cb) {
    this._store.get(name).push(steamId)
    this._store.save(cb)
  }

  /**
   * Remove Steam ID from permissions list.
   *
   * @private
   * @param {string} name - Permissions list name
   * @param {string} steamId - Steam ID
   * @param {Function} cb - Continuation function after saving permissions list
   * @returns {void}
  **/
  _unlist (name, steamId, cb) {
    lodash.pull(this._store.get(name), steamId)
    this._store.save(cb)
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = SteamBot
