'use strict'

// -- Dependencies -------------------------------------------------------------

// Local modules
const SteamBot = require('../lib/steam-bot')

// -- Entry Point --------------------------------------------------------------

const cheevobot = new SteamBot()
cheevobot.start(err => {
  if (err) throw err
  console.log('logged in')
})
