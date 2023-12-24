const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const DishesIngredientsController = require("../controllers/DishesIngredientsController")
const dishesIngredientsController = new DishesIngredientsController()

const dishes_ingredientsRoutes = Router()


dishes_ingredientsRoutes.use(ensureAuthenticated)

dishes_ingredientsRoutes.post("/", verifyUserAuthorization(["admin"]), dishesIngredientsController.create);
dishes_ingredientsRoutes.delete("/:dish_id/:ingredient_id", verifyUserAuthorization(["admin"]), dishesIngredientsController.delete)

module.exports = dishes_ingredientsRoutes