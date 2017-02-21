'use strict'

// -- Public Interface ---------------------------------------------------------

/**
 * Whitelist a user or group.
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
 * whitelist 76561197962144253
 * // => 'Permissions updated'
 *
 * whitelist 76561197962144253 -r
 * // => 'Permissions updated'
 *
 * whitelist 76561197962144253 --remove
 * // => 'Permissions updated'
**/
function whitelist (bot) {
  return bot._permissions('whitelist')
}

// -- Exports ------------------------------------------------------------------

module.exports = whitelist
