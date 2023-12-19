const { Router } = require("express")

const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

const DishesController = require("../controllers/DishesController")
const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.post("/", upload.single("dish_picture"), dishesController.create);
dishesRoutes.get("/", dishesController.get)
dishesRoutes.delete("/:id", dishesController.delete)

module.exports = dishesRoutes