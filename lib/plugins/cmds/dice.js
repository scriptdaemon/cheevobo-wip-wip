'use strict'

// -- Dependencies -------------------------------------------------------------

// Node packaged modules
const chance = require('chance')

// -- Public Interface ---------------------------------------------------------

/**
 * Simulate a dice roll. Responds with the result of each die roll as a single,
 * space-delimited string.
 *
 * Accepts one (1) optional argument:
 *  * roll (default: '1d6')
 *    - Expects a string in #d# format; the first # is the number of dice to
 *    - roll and the second # is the max of each die. This value is coerced to a
 *    - single, space-delimited string of the result rolls of each die.
 *
 * @since 0.1.0
 * @param {SteamBot} bot - Bot instance
 * @returns {Object} Command object in yargs format
 * @example
 *
 * dice
 * // => '3'
 *
 * dice 3d6
 * // => '4 2 5'
**/
function dice (bot) {
  return {
    'command': 'dice [roll]',
    'description': 'Simulate a dice roll',

    builder (yargs) {
      yargs.option('roll', { 'default': '1d6', 'type': 'string' })
      yargs.coerce('roll', arg => chance().rpg(arg).join(' '))
    },

    handler (argv) {
      bot.respond(argv.chatId, argv.roll)
    }
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = dice
