const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const FoodsController = require('../controllers/FoodsController')
const FoodsImagesController = require('../controllers/FoodsImagesController')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')

const foodsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const foodsController = new FoodsController()
const foodsImagesController = new FoodsImagesController()

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.get('/', foodsController.indexFood)
foodsRoutes.get('/:id', foodsController.viewFood)
foodsRoutes.post('/', verifyUserAuthorization('admin'), foodsController.createFood)
foodsRoutes.put('/:id', verifyUserAuthorization('admin'), foodsController.updatedFood)
foodsRoutes.delete('/:id', verifyUserAuthorization('admin'), foodsController.deleteFood)
foodsRoutes.patch('/image', verifyUserAuthorization('admin'), upload.single('image'), foodsImagesController.update)

module.exports = foodsRoutes
