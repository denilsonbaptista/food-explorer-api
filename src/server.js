require('dotenv/config')
require('express-async-errors')

const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')

const AppError = require('./utils/AppError')
const routes = require('./routes')

const app = express()

app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
)
app.use(express.json())

app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      menssage: error.message,
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    menssage: 'Internal server error',
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
