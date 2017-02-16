'use strict'

// -- Public Interface ---------------------------------------------------------

/**
 * Blacklist a user or group.
 *
 * Expects one (1) required argument:
 *  * steam-id
 *    - 64-bit representation of the user or group Steam ID.
 *
 * @since 0.1.0
 * @param {SteamBot} bot - Bot instance
 * @returns {Object} Command object in yargs format
 * @example
 *
 * blacklist 76561197962144253
 * // => 'Blacklist updated'
**/
function blacklist (bot) {
  return {
    'command': 'blacklist <steam-id>',
    'description': 'Blacklist a user or group',

    builder (yargs) {
      yargs.check((argv, aliases) => bot.whitelisted(argv.senderId))
      yargs.option('steamId', { 'type': 'string' })
    },

    handler (argv) {
      bot.blacklist(argv.steamId, err => {
        err
          ? bot.respond(argv.chatId, err.message)
          : bot.respond(argv.chatId, 'Blacklist updated')
      })
    }
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = blacklist
