const { Router } = require("express")

const CategoriesController = require("../controllers/CategoriesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const categoriesController = new CategoriesController

const categoriesRoutes = Router()


categoriesRoutes.use(ensureAuthenticated)

categoriesRoutes.post("/", categoriesController.create)
categoriesRoutes.delete("/:id", categoriesController.delete)

module.exports = categoriesRoutes