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
      const senderId = sender.getSteamID64()
      if (bot.blacklisted(senderId)) return

      const chatId = chat.getSteamID64()
      bot.exec(msg, senderId, chatId)
    }
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = execCmd
