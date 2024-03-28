const { Router } = require('express')

const FoodsController = require('../controllers/FoodsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const foodsRoutes = Router()

const foodsController = new FoodsController()

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.post('/', foodsController.createFood)
foodsRoutes.put('/:id', foodsController.updatedFood)
foodsRoutes.get('/:id', foodsController.viewFood)
foodsRoutes.delete('/:id', foodsController.deleteFood)
foodsRoutes.get('/', foodsController.indexFood)

module.exports = foodsRoutes
