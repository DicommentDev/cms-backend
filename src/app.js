// src/app.js
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const reviewRoutes = require('./modules/reviews/review.routes')
const categoryRoutes = require('./modules/categories/category.routes')
const requestLogger = require('./middleware/requestLogger')

function createApp() {
  const app = express()

  app.use(requestLogger)
  app.use(cors())
  app.use(express.json())
  app.use(morgan('dev'))

  app.get('/', (req, res)=>{
    res.send('cms-backend')
  })

  app.use('/api/reviews', reviewRoutes)
  app.use('/api/category', categoryRoutes)

  return app
}

module.exports = createApp