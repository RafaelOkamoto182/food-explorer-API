const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")


const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

const DishesController = require("../controllers/DishesController")
const dishesController = new DishesController()

const dishesRoutes = Router()


dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post("/", verifyUserAuthorization(["admin"]), upload.single("dish_picture"), dishesController.create);
dishesRoutes.get("/:id", dishesController.getById)
dishesRoutes.get("/", dishesController.get)
dishesRoutes.delete("/:id", verifyUserAuthorization(["admin"]), dishesController.delete)
dishesRoutes.put("/:dish_id", dishesController.update)

module.exports = dishesRoutes