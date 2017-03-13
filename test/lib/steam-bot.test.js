'use strict'

// -- Dependencies -------------------------------------------------------------

// Node.js API
const path = require('path')

// Node packaged modules
const proxyquire = require('proxyquire')
const tap = require('tap')

// Local modules
const nconf = require('../stubs/nconf.stub')
const SteamUser = require('../stubs/steam-user.stub')

// -- Stubs --------------------------------------------------------------------

const SteamBot = proxyquire('../../lib/steam-bot', {
  nconf,
  'steam-user': SteamUser
})

// -- Tests --------------------------------------------------------------------

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

tap.test('#join should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.join('76561197962144253', err => {
      tap.error(err)
      tap.end()
    })
  })
})

tap.test('#leave should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.leave('76561197962144253')
    tap.end()
  })
})

tap.test('#befriend should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.befriend('76561197962144253', err => {
      tap.error(err)
      tap.end()
    })
  })
})

tap.test('#unfriend should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.unfriend('76561197962144253')
    tap.end()
  })
})

tap.test('#respond should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.respond('76561197962144253', 'msg')
    tap.end()
  })
})

tap.test('#exec should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.exec('cmd', '76561197962144253', '76561197962144253')
    tap.end()
  })
})

tap.test('#muted should return false', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    tap.false(bot.muted('76561197962144253'))
    tap.end()
  })
})

tap.test('#mute should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.mute('76561197962144253', err => {
      tap.error(err)
      tap.end()
    })
  })
})

tap.test('#unmute should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.unmute('76561197962144253', err => {
      tap.error(err)
      tap.end()
    })
  })
})

tap.test('#whitelisted should return false', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    tap.false(bot.whitelisted('76561197962144253'))
    tap.end()
  })
})

tap.test('#whitelist should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.whitelist('76561197962144253', err => {
      tap.error(err)
      tap.end()
    })
  })
})

tap.test('#unwhitelist should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.unwhitelist('76561197962144253', err => {
      tap.error(err)
      tap.end()
    })
  })
})

tap.test('#blacklisted should return false', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    tap.false(bot.blacklisted('76561197962144253'))
    tap.end()
  })
})

tap.test('#blacklist should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.blacklist('76561197962144253', err => {
      tap.error(err)
      tap.end()
    })
  })
})

tap.test('#unblacklist should not error', tap => {
  const bot = new SteamBot(path.join(__dirname, '../fixtures/config.json'))
  bot.start(err => {
    tap.error(err)
    bot.unblacklist('76561197962144253', err => {
      tap.error(err)
      tap.end()
    })
  })
})
