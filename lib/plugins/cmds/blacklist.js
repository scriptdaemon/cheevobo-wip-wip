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
 * // => 'Permissions updated'
**/
function blacklist (bot) {
  return {
    'command': 'blacklist <steam-id>',
    'description': 'Blacklist a user or group',
    'builder': bot._cmdBuilder,
    'handler': bot._cmdHandler(bot.blacklist, bot.unblacklist)
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = blacklist
