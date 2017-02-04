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

  tap.test('#exec', tap => {
    tap.test('should display help message', tap => {
      bot.exec('--help', (err, argv, output) => {
        tap.error(err)
        tap.ok(argv.help)
        tap.end()
      })
    })

    tap.test('should display version info', tap => {
      bot.exec('--version', (err, argv, output) => {
        tap.error(err)
        tap.ok(argv.version)
        tap.end()
      })
    })

    tap.end()
  })

  tap.end()
})
