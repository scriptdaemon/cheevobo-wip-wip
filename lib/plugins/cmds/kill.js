'use strict'

// -- Public Interface ---------------------------------------------------------

/**
 * Terminate the bot process.
 *
 * @since 0.1.0
 * @param {SteamBot} bot - Bot instance
 * @returns {Object} Command object in yargs format
**/
function kill (bot) {
  return {
    'command': 'kill',
    'description': 'Terminate bot process',

    builder (yargs) {
      yargs.check((argv, aliases) => bot.whitelisted(argv.sender))
    },

    handler (argv) {
      bot.stop(err => {
        if (err) throw err
      })
    }
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = kill
