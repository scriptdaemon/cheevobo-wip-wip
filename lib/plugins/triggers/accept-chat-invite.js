'use strict'

// -- Public Interface ---------------------------------------------------------

/**
 * Accept a chat invite.
 *
 * @since 0.2.0
 * @param {SteamBot} bot - Steam bot
 * @returns {Object} Object containing Steam events and their handlers
**/
function acceptChatInvite (bot) {
  return {
    chatInvite (inviter, chat, name) {
      const inviterId = inviter.getSteamID64()
      if (bot.blacklisted(inviterId)) return

      const chatId = chat.getSteamID64()
      if (bot.blacklisted(chatId)) return

      bot.join(chatId, err => {
        if (err) bot.respond(inviterId, err.message)
      })
    }
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = acceptChatInvite
