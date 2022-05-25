const {Grape} = require('grenache-grape')
const {grapes} = require('./config/config')
const { logger, } = require('./utils/utils');


grapes.map((options, idx) => {
  const grape = new Grape(options)

  grape.start((err) => {
    if (err) {
      logger(500,`grape ${idx}: cannot start`, err)
      process.exit(1)
    }
  })
})
