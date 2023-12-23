const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const IngredientsController = require("../controllers/IngredientsController")
const ingredientsController = new IngredientsController

const ingredientsRoutes = Router()


ingredientsRoutes.use(ensureAuthenticated)
ingredientsRoutes.use(verifyUserAuthorization(["admin"]))

ingredientsRoutes.post("/", ingredientsController.create)
ingredientsRoutes.delete("/:id", ingredientsController.delete)

module.exports = ingredientsRoutes