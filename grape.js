const {Grape} = require('grenache-grape')
const {grapes} = require('./config/config')

grapes.map((options) => {
  const grape = new Grape(options)

  grape.start((err) => {
    if (err) {
      process.exit(1)
    }
  })
})
