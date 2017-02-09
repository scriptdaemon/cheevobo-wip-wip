'use strict'

// -- Dependencies -------------------------------------------------------------

// Node.js API
const path = require('path')

// Local modules
const SteamBot = require('../lib/steam-bot')

// -- Entry Point --------------------------------------------------------------

const cheevobot = new SteamBot(path.resolve('config/cheevobot.json'))
cheevobot.start(err => {
  if (err) throw err
})
