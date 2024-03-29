const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const FoodsController = require('../controllers/FoodsController')
const FoodsImagesController = require('../controllers/FoodsImagesController')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const foodsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const foodsController = new FoodsController()
const foodsImagesController = new FoodsImagesController()

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.post('/', foodsController.createFood)
foodsRoutes.put('/:id', foodsController.updatedFood)
foodsRoutes.get('/:id', foodsController.viewFood)
foodsRoutes.delete('/:id', foodsController.deleteFood)
foodsRoutes.get('/', foodsController.indexFood)
foodsRoutes.patch(
  '/image/:id',
  upload.single('image'),
  foodsImagesController.update,
)

module.exports = foodsRoutes
