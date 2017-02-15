'use strict'

// -- Dependencies -------------------------------------------------------------

// Node.js API
const path = require('path')

// Node packaged modules
const proxyquire = require('proxyquire')
const tap = require('tap')

// Local modules
const SteamUser = require('../stubs/steam-user.stub')

// -- Helpers ------------------------------------------------------------------

const SteamBot = proxyquire('../../lib/steam-bot', { 'steam-user': SteamUser })

// -- Tests --------------------------------------------------------------------

tap.test('SteamBot', tap => {
  tap.plan(12)

  //
  // Methods
  //

  tap.test('#start should not error', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      tap.end()
    })
  })

  tap.test('#stop should not error', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      bot.stop(err => {
        tap.error(err)
        tap.end()
      })
    })
  })

  tap.test('#exec should not error', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      bot.exec('cmd', (err, argv, output) => {
        tap.error(err)
        tap.end()
      })
    })
  })

  tap.test('#muted should return false', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      tap.false(bot.muted('ID'))
      tap.end()
    })
  })

  tap.test('#mute should not error', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      bot.mute('ID', err => {
        tap.error(err)
        tap.end()
      })
    })
  })

  tap.test('#unmute should not error', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      bot.unmute('ID', err => {
        tap.error(err)
        tap.end()
      })
    })
  })

  tap.test('#whitelisted should return false', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      tap.false(bot.whitelisted('ID'))
      tap.end()
    })
  })

  tap.test('#whitelist should not error', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      bot.whitelist('ID', err => {
        tap.error(err)
        tap.end()
      })
    })
  })

  tap.test('#unwhitelist should not error', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      bot.unwhitelist('ID', err => {
        tap.error(err)
        tap.end()
      })
    })
  })

  tap.test('#blacklisted should return false', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      tap.false(bot.blacklisted('ID'))
      tap.end()
    })
  })

  tap.test('#blacklist should not error', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      bot.blacklist('ID', err => {
        tap.error(err)
        tap.end()
      })
    })
  })

  tap.test('#unblacklist should not error', tap => {
    const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
    bot.start(err => {
      tap.error(err)
      bot.unblacklist('ID', err => {
        tap.error(err)
        tap.end()
      })
    })
  })
})
