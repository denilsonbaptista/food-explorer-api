const { Router } = require('express')

const FoodsController = require('../controllers/FoodsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const foodsRoutes = Router()

const foodsController = new FoodsController()

foodsRoutes.post('/', ensureAuthenticated, foodsController.createFood)

module.exports = foodsRoutes
