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
    this._client.on('friendOrChatMessage', (sender, msg, chat) => {
      this.exec(msg, sender.getSteamID64(), chat.getSteamID64())
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
          yargs.strict()
          yargs.wrap() // Disable right-align
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
   * Respond a message to a user or group chat. If the bot has been muted for
   * the given chat, then do nothing.
   *
   * @since 0.1.0
   * @param {string} chatId - User or group chat Steam ID
   * @param {string} msg - Message to respond
   * @returns {void}
  **/
  respond (chatId, msg) {
    if (this.muted(chatId)) return
    this._client.chatMsg(chatId, msg)
  }

  /**
   * Execute a command.
   *
   * @since 0.1.0
   * @param {string} cmd - Raw command
   * @param {string} senderId - Command issuer Steam ID
   * @param {string} chatId - User or group chat Steam ID
   * @returns {void}
  **/
  exec (cmd, senderId, chatId) {
    this._parser.parse(cmd, { senderId, chatId }, (err, argv, output) => {
      if (err && !output) throw err
      if (output) {
        this.respond(chatId, output)
      }
    })
  }

  /**
   * Check if the bot is muted for a user or group chat.
   *
   * @since 0.1.0
   * @param {string} chatId - User or group chat Steam ID
   * @returns {boolean} True if bot is muted for a given chat, else false
  **/
  muted (chatId) {
    return lodash.includes(this._store.get('mute'), chatId)
  }

  /**
   * Mute the bot for a user or group chat.
   *
   * @since 0.1.0
   * @param {string} chatId - User or group chat Steam ID
   * @param {Function} cb - Continuation function after saving mute list
   * @returns {void}
  **/
  mute (chatId, cb) {
    this._list('mute', chatId, cb)
  }

  /**
   * Unmute the bot for a user or group chat.
   *
   * @since 0.1.0
   * @param {string} chatId - User or group chat Steam ID
   * @param {Function} cb - Continuation function after saving mute list
   * @returns {void}
  **/
  unmute (chatId, cb) {
    this._unlist('mute', chatId, cb)
  }

  /**
   * Check if a user or group is whitelisted.
   *
   * @since 0.1.0
   * @param {string} steamId - User or group Steam ID
   * @returns {boolean} True if a user or group is whitelisted, else false
  **/
  whitelisted (steamId) {
    return lodash.includes(this._store.get('whitelist'), steamId)
  }

  /**
   * Whitelist a user or group.
   *
   * @since 0.1.0
   * @param {string} steamId - User or group Steam ID
   * @param {Function} cb - Continuation function after saving whitelist
   * @returns {void}
  **/
  whitelist (steamId, cb) {
    this._list('whitelist', steamId, cb)
  }

  /**
   * Unwhitelist a user or group.
   *
   * @since 0.1.0
   * @param {string} steamId - User or group Steam ID
   * @param {Function} cb - Continuation function after saving whitelist
   * @returns {void}
  **/
  unwhitelist (steamId, cb) {
    this._unlist('whitelist', steamId, cb)
  }

  /**
   * Check if a user or group is blacklisted.
   *
   * @since 0.1.0
   * @param {string} steamId - User or group Steam ID
   * @returns {boolean} True if a user or group is blacklisted, else false
  **/
  blacklisted (steamId) {
    return lodash.includes(this._store.get('blacklist'), steamId)
  }

  /**
   * Blacklist a user or group.
   *
   * @since 0.1.0
   * @param {string} steamId - User or group Steam ID
   * @param {Function} cb - Continuation function after saving blacklist
   * @returns {void}
  **/
  blacklist (steamId, cb) {
    this._list('blacklist', steamId, cb)
  }

  /**
   * Unblacklist a user or group.
   *
   * @since 0.1.0
   * @param {string} steamId - User or group Steam ID
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
   * Add a user or group to permissions list.
   *
   * @private
   * @param {string} name - Permissions list name
   * @param {string} steamId - User or group Steam ID
   * @param {Function} cb - Continuation function after saving permissions list
   * @returns {void}
  **/
  _list (name, steamId, cb) {
    const list = this._store.get(name)
    if (!lodash.includes(list, steamId)) {
      this._store.set(name, lodash.concat(list, steamId))
    }
    this._store.save(cb)
  }

  /**
   * Remove a user or group from permissions list.
   *
   * @private
   * @param {string} name - Permissions list name
   * @param {string} steamId - User or group Steam ID
   * @param {Function} cb - Continuation function after saving permissions list
   * @returns {void}
  **/
  _unlist (name, steamId, cb) {
    this._store.set(name, lodash.without(this._store.get(name), steamId))
    this._store.save(cb)
  }

  /**
   * Dynamically create command to add or remove a user or group to or from a
   * permissions list.
   *
   * @private
   * @param {string} cmd - Command name
   * @returns {Object} Command object in yargs format
  **/
  _permissions (cmd) {
    return {
      'command': `${cmd} <steam-id>`,
      'description': `${lodash.capitalize(cmd)} a user or group`,

      'builder': yargs => {
        yargs.check((argv, aliases) => this.whitelisted(argv.senderId))
        yargs.string('_') // Parse flagless args as strings
      },

      'handler': argv => {
        this[cmd](argv.steamId, err => {
          err
            ? this.respond(argv.chatId, err.message)
            : this.respond(argv.chatId, 'Permissions updated')
        })
      }
    }
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = SteamBot
