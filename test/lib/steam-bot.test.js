'use strict'

// -- Dependencies -------------------------------------------------------------

// Node packaged modules
const proxyquire = require('proxyquire')
const tap = require('tap')

// Local modules
const SteamUser = require('../stub/steam-user.stub')

// -- Helpers ------------------------------------------------------------------

const SteamBot = proxyquire('../../lib/steam-bot', { 'steam-user': SteamUser })

// -- Tests --------------------------------------------------------------------

tap.test('SteamBot', tap => {
  tap.plan(2)

  //
  // Methods
  //

  tap.test('#start should not pass an error', tap => {
    const bot = new SteamBot()
    bot.start(err => {
      tap.error(err)
      tap.end()
    })
  })

  tap.test('#exec should not pass an error', tap => {
    const bot = new SteamBot()
    bot.start(err => {
      tap.error(err)
      bot.exec('--help', (err, argv, output) => {
        tap.error(err)
        tap.end()
      })
    })
  })
})
