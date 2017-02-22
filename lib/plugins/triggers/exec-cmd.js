'use strict'

// -- Public Interface ---------------------------------------------------------

/**
 * Execute a command.
 *
 * @since 0.1.0
 * @param {SteamBot} bot - Steam bot
 * @returns {Object} Object containing Steam events and their handlers
**/
function execCmd (bot) {
  return {
    friendOrChatMessage (sender, msg, chat) {
      bot.exec(msg, sender.getSteamID64(), chat.getSteamID64())
    }
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = execCmd
