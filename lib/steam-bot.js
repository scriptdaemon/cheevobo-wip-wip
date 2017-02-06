'use strict'

// -- Dependencies -------------------------------------------------------------

// Node.js API
const path = require('path')

// Node packaged modules
const confit = require('confit')
const SteamUser = require('steam-user')
const yargs = require('yargs/yargs')

// Local modules
const dice = require('./plugins/cmds/dice')
const uptime = require('./plugins/cmds/uptime')

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
  **/
  constructor () {
    this._client = new SteamUser()
    this._client.on('friendOrChatMessage', (sender, msg, room) => {
      this.exec(msg, { sender, room })
    })
  }

  /**
   * Start the bot by logging into its Steam account.
   *
   * @since 0.1.0
   * @param {Function} cb - Continuation function after logging in
   * @returns {void}
  **/
  start (cb) {
    confit(path.resolve('config/')).create((err, config) => {
      if (err) return cb(err)

      // Build command parser
      this._parser = yargs()
      this._parser.command(dice(this))
      this._parser.command(uptime(this))
      this._parser.help()
      this._parser.version()

      this._client.logOn(config.get('login'))
      this._client.on('loggedOn', response => {
        this._client.setPersona(SteamUser.EPersonaState.Online)
        cb()
      })
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
        this._client.chatMessage(context.room, output)
      }
    })
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
}

// -- Exports ------------------------------------------------------------------

module.exports = SteamBot
