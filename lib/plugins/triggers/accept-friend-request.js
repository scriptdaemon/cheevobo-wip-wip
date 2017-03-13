'use strict'

// -- Dependencies -------------------------------------------------------------

// Node packaged modules
const SteamUser = require('steam-user')

// -- Public Interface ---------------------------------------------------------

/**
 * Accept a friend request.
 *
 * @since 0.2.0
 * @param {SteamBot} bot - Steam bot
 * @returns {Object} Object containing Steam events and their handlers
**/
function acceptFriendRequest (bot) {
  return {
    friendRelationship (requester, relationship) {
      const RequestRecipient = SteamUser.EFriendRelationship.RequestRecipient
      if (relationship !== RequestRecipient) return

      const requesterId = requester.getSteamID64()
      if (bot.blacklisted(requesterId)) return

      bot.befriend(requesterId, err => {
        if (err) bot.respond(requesterId, err.message)
      })
    }
  }
}

// -- Exports ------------------------------------------------------------------

module.exports = acceptFriendRequest
