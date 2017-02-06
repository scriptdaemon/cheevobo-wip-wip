'use strict'

// -- Public Interface ---------------------------------------------------------

/**
 * Command to retrieve the bot's uptime.
 *
 * @since 0.1.0
 * @param {SteamBot} bot - Bot instance
 * @returns {Object} Command object in yargs format
 * @example
 *
 * uptime
 * // => 'Bot uptime: 20.078s'
**/
function uptime (bot) {
  return {
    'command': 'uptime',
    'description': 'Retrieve bot uptime',

    handler (argv) {
      bot._client.chatMessage(argv.room, `Bot uptime: ${process.uptime()}s`)
    }
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = uptime
