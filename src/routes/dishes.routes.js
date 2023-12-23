const { Router } = require("express")

const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

const DishesController = require("../controllers/DishesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const dishesController = new DishesController()

const dishesRoutes = Router()


dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post("/", upload.single("dish_picture"), dishesController.create);
dishesRoutes.get("/:id", dishesController.getById)
dishesRoutes.get("/", dishesController.get)
dishesRoutes.delete("/:id", dishesController.delete)

module.exports = dishesRoutes