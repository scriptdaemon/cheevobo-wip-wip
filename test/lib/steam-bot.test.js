'use strict'

// -- Dependencies -------------------------------------------------------------

// Node packaged modules
const tap = require('tap')

// Local modules
const SteamBot = require('../../lib/steam-bot')

// -- Tests --------------------------------------------------------------------

tap.test('SteamBot', tap => {
  const bot = new SteamBot()
  bot._client.logOn = login => {
    process.nextTick(_ => {
      bot._client.emit('loggedOn')
    })
  }

  tap.test('#start', tap => {
    tap.test('should not pass an error', tap => {
      bot.start(err => {
        tap.error(err)
        tap.end()
      })
    })
    tap.end()
  })

  tap.end()
})
